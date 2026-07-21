"use client";

import { useState } from "react";
import { isValidEmail } from "@/lib/utils";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [placeholder, setPlaceholder] = useState("Email Address");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) return;
    setEmail("");
    setPlaceholder("Subscribed — thank you!");
  };

  return (
    <form className="newsletter__form" onSubmit={onSubmit} noValidate>
      <div className="newsletter__row">
        <label className="visually-hidden" htmlFor="nl-email">
          Email Address
        </label>
        <input
          type="email"
          id="nl-email"
          name="email"
          placeholder={placeholder}
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn--pill">
          Sign Up
        </button>
      </div>
      <label className="newsletter__agree">
        <input type="checkbox" name="agree" />
        <span>
          I agree to receive your newsletters and accept the data privacy
          statement.
        </span>
      </label>
    </form>
  );
}
