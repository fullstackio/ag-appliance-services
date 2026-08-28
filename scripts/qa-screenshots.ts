/**
 * Visual QA: logs into the dashboard and screenshots every page, plus the public site on
 * desktop/mobile (light + dark) and the booking dialog.
 *
 *   npm run qa -- http://localhost:3100 owner@example.com Password1
 *
 * Output: ./qa/*.png  (git-ignored). Requires a running server and Google Chrome.
 * Author: Avijit Ghosh
 */
import { mkdirSync } from "node:fs";
import path from "node:path";

import puppeteer from "puppeteer-core";

const [base = "http://localhost:3000", email = "", password = ""] = process.argv.slice(2);
const out = path.resolve("qa");
mkdirSync(out, { recursive: true });

const CHROME =
  process.env.CHROME_PATH ??
  ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium"].find((p) => {
    try {
      return require("node:fs").existsSync(p);
    } catch {
      return false;
    }
  });

async function main(): Promise<void> {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const shot = async (name: string, url: string, w: number, h: number, full = true, dark = false) => {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h });
    await page.goto(`${url}${dark ? (url.includes("?") ? "&" : "?") + "theme=dark" : ""}`, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(out, `${name}.png`), fullPage: full });
    console.log("✓", name);
    return page;
  };

  // public site
  await (await shot("site-desktop-light", `${base}/`, 1440, 900)).close();
  await (await shot("site-desktop-dark", `${base}/`, 1440, 900, true, true)).close();
  await (await shot("site-mobile-light", `${base}/`, 390, 844)).close();
  await (await shot("site-tablet-light", `${base}/`, 900, 1000)).close();

  // booking dialog
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(`${base}/`, { waitUntil: "networkidle0" });
  await p.click("nav .nav-cta a[href='#book']");
  await new Promise((r) => setTimeout(r, 700));
  await p.screenshot({ path: path.join(out, "site-booking-dialog.png") });
  console.log("✓ site-booking-dialog");
  await p.close();

  // mobile menu
  const m = await browser.newPage();
  await m.setViewport({ width: 390, height: 844 });
  await m.goto(`${base}/`, { waitUntil: "networkidle0" });
  await m.click("nav .nav-burger");
  await new Promise((r) => setTimeout(r, 700));
  await m.screenshot({ path: path.join(out, "site-mobile-menu.png") });
  console.log("✓ site-mobile-menu");
  await m.close();

  await (await shot("auth-login", `${base}/login`, 1440, 900, false)).close();
  await (await shot("auth-register", `${base}/register`, 1440, 900, false)).close();
  await (await shot("not-found", `${base}/does-not-exist`, 1440, 900, false)).close();

  if (email && password) {
    const d = await browser.newPage();
    await d.setViewport({ width: 1440, height: 900 });
    await d.goto(`${base}/login`, { waitUntil: "networkidle0" });
    await d.type("#email", email);
    await d.type("#password", password);
    await Promise.all([d.waitForNavigation({ waitUntil: "networkidle0" }), d.click("button[type=submit]")]);
    for (const route of [
      "",
      "/banners",
      "/menus",
      "/content",
      "/content/services",
      "/content/gallery",
      "/settings",
      "/bookings",
      "/enquiries",
      "/users",
    ]) {
      await d.goto(`${base}/dashboard${route}`, { waitUntil: "networkidle0" });
      await new Promise((r) => setTimeout(r, 500));
      const name = `dashboard${route.replace(/\//g, "-") || "-overview"}`;
      await d.screenshot({ path: path.join(out, `${name}.png`), fullPage: true });
      console.log("✓", name);
    }
    await d.close();
  } else {
    console.log("(no credentials given — dashboard screenshots skipped)");
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
