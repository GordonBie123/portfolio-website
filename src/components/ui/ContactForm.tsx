"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters"),
  email: z.string().email("that email doesn't look right"),
  subject: z.string().min(5, "subject must be at least 5 characters"),
  message: z.string().min(10, "message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass = (hasError: boolean) =>
  `w-full rounded-md bg-sub-alt px-4 py-3 text-sm text-text caret-main outline-none transition-shadow duration-150 focus:ring-2 ${
    hasError ? "ring-2 ring-error focus:ring-error" : "focus:ring-main"
  }`;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs text-sub">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSendError(false);
    try {
      const response = await fetch("https://formspree.io/f/mqeglrlg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg bg-sub-alt p-8">
        <p className="flex items-center gap-2 text-lg text-main">
          <Check size={18} aria-hidden /> sent
        </p>
        <p className="text-sm text-sub">thanks for reaching out, i&apos;ll get back to you soon.</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="rounded-md bg-bg px-4 py-2 text-sm text-text transition-colors duration-150 hover:bg-text hover:text-bg"
        >
          send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field id="name" label="name" error={errors.name?.message}>
          <input id="name" {...register("name")} autoComplete="name" placeholder="your name" className={inputClass(!!errors.name)} />
        </Field>
        <Field id="email" label="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            {...register("email")}
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>
      <Field id="subject" label="subject" error={errors.subject?.message}>
        <input id="subject" {...register("subject")} placeholder="what's on your mind?" className={inputClass(!!errors.subject)} />
      </Field>
      <Field id="message" label="message" error={errors.message?.message}>
        <textarea
          id="message"
          {...register("message")}
          placeholder="hi gordon, i'd like to..."
          rows={6}
          className={`${inputClass(!!errors.message)} resize-none`}
        />
      </Field>

      {sendError && (
        <p role="alert" className="text-xs text-error">
          something went wrong sending that. try again, or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-md bg-sub-alt px-4 py-3 text-sm text-text transition-colors duration-150 hover:bg-text hover:text-bg disabled:cursor-wait disabled:opacity-50"
      >
        <Send size={14} aria-hidden />
        {isSubmitting ? "sending..." : "send message"}
      </button>
    </form>
  );
}
