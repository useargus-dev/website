import { motion } from "motion/react";
import { ArrowRight, Code2 } from "lucide-react";
import { LINKS } from "@/constants/links";
import { LinkButton } from "@/components/ui/button";
import { AppScreenPreview } from "./app-screen-preview";

export function Hero() {
  return (
    <section className="relative overflow-x-clip border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--signal) 25%, transparent), transparent)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl min-w-0 gap-12 px-4 py-16 sm:px-5 lg:grid-cols-2 lg:items-center lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-signal">
            <span className="size-1.5 rounded-full bg-signal" />
            Open source · privacy-first
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl">
            Secrets stay on your machine.{" "}
            <span className="text-signal">You approve every access.</span>
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-muted">
            Argus is a privacy-first developer secrets vault with app buckets and local IPC.
            Map env vars to encrypted storage, add a bucket ID and token to your
            project env, and grant access when a real process asks.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton
              href={LINKS.releases}
              target="_blank"
              rel="noreferrer"
              className="px-5"
            >
              Download for your OS
              <ArrowRight size={16} />
            </LinkButton>
            <LinkButton
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              <Code2 size={16} />
              View source
            </LinkButton>
          </div>
          <p className="mt-4 text-xs text-text-muted">
            AGPL-3.0 community edition · Windows, macOS, Linux
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex w-full min-w-0 justify-center pb-6 lg:justify-end"
        >
          <AppScreenPreview autoPlay />
        </motion.div>
      </div>
    </section>
  );
}
