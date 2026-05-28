import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LINKS } from "@/constants/links";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function CtaSection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-5"
      >
        <div className="rounded-2xl border border-border bg-surface-muted px-8 py-12 text-center shadow-subtle sm:px-12">
          <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Ready to keep secrets off disk in your repo?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-text-muted">
            Download the latest build for your platform or read the security
            model before you trust it with production keys.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LinkButton
              href={LINKS.releases}
              target="_blank"
              rel="noreferrer"
            >
              View releases
              <ArrowRight size={16} />
            </LinkButton>
            <Link
              to="/security"
              className={cn(
                "inline-flex items-center justify-center rounded-md border border-border bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-muted"
              )}
            >
              Security overview
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
