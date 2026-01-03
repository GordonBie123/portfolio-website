import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  variant?: "white" | "off-white";
}

export default function Section({
  children,
  id,
  className,
  containerClassName,
  variant = "white",
}: SectionProps) {
  const bgColors = {
    white: "bg-white",
    "off-white": "bg-off-white",
  };

  return (
    <section
      id={id}
      className={cn("py-20 md:py-32 overflow-hidden", bgColors[variant], className)}
    >
      <div className={cn("max-w-7xl mx-auto px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
