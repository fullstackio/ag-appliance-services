"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data/site";

/** Full-screen preloader that fades out once the window has loaded. */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const finish = () => {
      setDone(true);
      window.setTimeout(() => setRemoved(true), 700);
    };
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  if (removed) return null;

  return (
    <div className={`preloader${done ? " is-done" : ""}`} aria-hidden="true">
      <div className="preloader__spinner" />
      <span className="preloader__label">{siteConfig.name}</span>
    </div>
  );
}
