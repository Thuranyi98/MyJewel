"use client";

import Image from "next/image";
import { useActionState, useState, type FormEvent } from "react";
import {
  subscribeToNewsletter,
  type NewsletterState,
} from "@/app/actions/newsletter";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const initialState: NewsletterState = { status: "idle", message: "" };

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );
  const [clientError, setClientError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
      event.preventDefault();
      setClientError("Please enter a valid email address.");
      return;
    }
    setClientError("");
  }

  const message = clientError || state.message;
  const isError = Boolean(clientError) || state.status === "error";

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="relative flex h-8 w-full max-w-[422px] md:h-[46px]"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email Address"
        aria-invalid={isError}
        aria-describedby="newsletter-message"
        onChange={() => clientError && setClientError("")}
        className="h-full min-w-0 flex-1 bg-white px-2.5 font-sans text-[13px] text-ink md:text-[15px] outline-none placeholder:text-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        disabled={pending}
        className="grid size-8 shrink-0 md:size-[46px] place-items-center bg-brand transition-opacity disabled:opacity-60"
      >
        <Image
          src="/icons/VscSend.svg"
          alt=""
          width={18}
          height={18}
          loading="eager"
          className="size-3 md:size-[18px]"
        />
      </button>
      <p
        id="newsletter-message"
        role="status"
        aria-live="polite"
        className={`absolute top-full left-0 mt-2 font-sans text-xs ${
          isError ? "text-red-700" : "text-brand"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
