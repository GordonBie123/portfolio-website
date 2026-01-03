"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
    // Simulate API call
    console.log("Form Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-light-gray shadow-sm">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 size={64} className="text-matcha mb-4" />
          <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
          <p className="text-medium-gray">
            Thank you for reaching out. I&apos;ll get back to you soon.
          </p>
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => setIsSuccess(false)}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-charcoal ml-1">Name</label>
              <input
                {...register("name")}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-light-gray focus:ring-matcha"
                } focus:outline-none focus:ring-2 transition-all bg-off-white/50`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-charcoal ml-1">Email</label>
              <input
                {...register("email")}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-light-gray focus:ring-matcha"
                } focus:outline-none focus:ring-2 transition-all bg-off-white/50`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-charcoal ml-1">Subject</label>
            <input
              {...register("subject")}
              placeholder="Collaboration Opportunity"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.subject ? "border-red-500 focus:ring-red-500" : "border-light-gray focus:ring-matcha"
              } focus:outline-none focus:ring-2 transition-all bg-off-white/50`}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1 ml-1">{errors.subject.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-charcoal ml-1">Message</label>
            <textarea
              {...register("message")}
              placeholder="Hi Gordon, I'd like to chat about..."
              rows={5}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.message ? "border-red-500 focus:ring-red-500" : "border-light-gray focus:ring-matcha"
              } focus:outline-none focus:ring-2 transition-all bg-off-white/50 resize-none`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center gap-2"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Send Message <Send size={18} />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
