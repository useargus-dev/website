import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

export function SecuritySection({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "border-b border-border px-6 py-12 sm:px-8 last:border-b-0",
        className
      )}
    >
      <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
          {description}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </motion.section>
  );
}
