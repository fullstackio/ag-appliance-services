"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AnimHead } from "@/components/common/anim-head";
import { isValidEmail } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [values, setValues] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameInvalid = values.name.trim() === "";
    const emailInvalid = values.email.trim() === "" || !isValidEmail(values.email);
    setErrors({ name: nameInvalid, email: emailInvalid });

    if (nameInvalid || emailInvalid) {
      setStatus({ text: "Please fill in your name and a valid email.", ok: false });
      return;
    }
    setStatus({
      text: "Thanks! Your message has been sent — I'll get back to you soon.",
      ok: true,
    });
    toast.success("Message sent — I'll get back to you soon.");
    setValues({ name: "", email: "", message: "" });
  };

  return (
    <section className="block card contact" id="contact" data-aos="fade-up" suppressHydrationWarning>
      <div className="contact__inner">
        <div className="contact__info">
          <AnimHead
            as="h2"
            className="contact__title"
            lines={["WE'RE HERE TO ANSWER", "YOUR QUESTIONS"]}
          />
          <div className="contact__rows">
            <div>
              <p className="contact__label">MAIL ADDRESS</p>
              {siteConfig.emails.map((email) => (
                <p key={email}>
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              ))}
            </div>
            <div>
              <p className="contact__label">SOCIAL</p>
              <ul className="socials" aria-label="Social links">
                <li>
                  <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    In
                  </a>
                </li>
                <li>
                  <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    Gh
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.emails[0]}`} aria-label="Email">
                    @
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="contact__label">PHONE NUMBER</p>
              <p>
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </p>
            </div>
            <div>
              <p className="contact__label">BASED IN</p>
              <p>
                {siteConfig.location}
                <br />
                Available remotely worldwide
              </p>
            </div>
          </div>
        </div>

        <form className="contact__form" onSubmit={onSubmit} noValidate>
          <AnimHead as="h3" className="contact__form-title" lines={["GET IN TOUCH"]} />
          <div className={`field${errors.name ? " has-error" : ""}`}>
            <label className="visually-hidden" htmlFor="cf-name">
              Your Name
            </label>
            <input
              type="text"
              id="cf-name"
              name="name"
              placeholder="Your Name*"
              required
              autoComplete="name"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            />
          </div>
          <div className={`field${errors.email ? " has-error" : ""}`}>
            <label className="visually-hidden" htmlFor="cf-email">
              Email
            </label>
            <input
              type="email"
              id="cf-email"
              name="email"
              placeholder="Email*"
              required
              autoComplete="email"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            />
          </div>
          <div className="field">
            <label className="visually-hidden" htmlFor="cf-message">
              Message
            </label>
            <textarea
              id="cf-message"
              name="message"
              placeholder="Message"
              rows={3}
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn--pill">
            Send Message
          </button>
          <p
            className="form-status"
            role="status"
            aria-live="polite"
            style={status ? { color: status.ok ? "#d6ffe2" : "#ffd6d6" } : undefined}
          >
            {status?.text}
          </p>
        </form>
      </div>
    </section>
  );
}
