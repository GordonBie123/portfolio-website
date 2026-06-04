"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Send, Check } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 border-2 bg-background text-fg font-sans text-sm focus:outline-none transition-colors ${
    hasError
      ? "border-accent focus:border-accent"
      : "border-border-light focus:border-fg"
  }`;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    try {
      const response = await fetch("https://formspree.io/f/mqeglrlg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("There was a problem submitting your form.");
      }
    } catch {
      alert("There was a problem submitting your form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="border-2 border-fg bg-surface p-10 flex flex-col items-start">
        <div className="flex items-center gap-3 mb-4">
          <Check size={20} className="text-fg" />
          <h3 className="font-display font-extrabold text-xl uppercase text-fg">Sent.</h3>
        </div>
        <p className="text-fg-muted text-sm mb-8">
          Thank you for reaching out — I&apos;ll get back to you soon.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <div className="border-2 border-fg bg-surface p-5 sm:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-mono text-[10px] text-fg-muted uppercase tracking-[0.15em] block mb-2">
              Name
            </label>
            <input {...register("name")} placeholder="Your name" className={inputClass(!!errors.name)} />
            {errors.name && (
              <p className="font-mono text-[10px] text-accent mt-1.5">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="font-mono text-[10px] text-fg-muted uppercase tracking-[0.15em] block mb-2">
              Email
            </label>
            <input {...register("email")} placeholder="you@example.com" className={inputClass(!!errors.email)} />
            {errors.email && (
              <p className="font-mono text-[10px] text-accent mt-1.5">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] text-fg-muted uppercase tracking-[0.15em] block mb-2">
            Subject
          </label>
          <input {...register("subject")} placeholder="What's on your mind?" className={inputClass(!!errors.subject)} />
          {errors.subject && (
            <p className="font-mono text-[10px] text-accent mt-1.5">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label className="font-mono text-[10px] text-fg-muted uppercase tracking-[0.15em] block mb-2">
            Message
          </label>
          <textarea
            {...register("message")}
            placeholder="Hi Gordon, I'd like to..."
            rows={5}
            className={`${inputClass(!!errors.message)} resize-none`}
          />
          {errors.message && (
            <p className="font-mono text-[10px] text-accent mt-1.5">{errors.message.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full flex items-center gap-2">
          {isSubmitting ? "Sending..." : <><Send size={15} /> Send Message</>}
        </Button>
      </form>
    </div>
  );
}
