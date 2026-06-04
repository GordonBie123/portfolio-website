"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary:
        "bg-fg text-background border-2 border-fg hover:shadow-[3px_3px_0px_#7A7269] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
      secondary:
        "bg-surface text-fg border-2 border-fg hover:shadow-[3px_3px_0px_#7A7269] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
      outline:
        "bg-background text-fg border-2 border-fg hover:shadow-[3px_3px_0px_#7A7269] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
      ghost: "text-fg-muted hover:text-fg border-2 border-transparent",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-mono uppercase tracking-[0.1em] font-bold transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
