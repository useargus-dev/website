import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { UsageLanguageTabs } from "@/components/sdk/usage-language-tabs";
import { SDK_SHARED_NOTES } from "@/constants/sdk";

export function UsagePage() {
  return (
    <div className="mx-auto w-full max-w-4xl min-w-0 px-4 py-12 sm:px-5 lg:py-16">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 max-w-2xl"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-signal">
          Usage
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Client libraries
        </h1>
        <p className="mt-4 leading-relaxed text-text-muted">
          Official client libraries load secrets from Argus over local IPC into
          your process environment — similar to dotenv, but values come from your
          encrypted bucket when the desktop app is signed in. When Argus Proxy
          is enabled on a bucket, use the per-library factories documented below.
        </p>
      </motion.header>

      <UsageLanguageTabs variant="full" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-10 overflow-hidden rounded-xl border border-border bg-surface p-5 sm:p-6"
      >
        <h2 className="text-lg font-semibold text-text">All libraries</h2>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          {SDK_SHARED_NOTES.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-signal" aria-hidden>
                ·
              </span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-8 text-center text-sm text-text-muted"
      >
        <Link to="/security" className="font-medium text-signal hover:underline">
          Security model
        </Link>
        {" · "}
        <Link to="/#how-it-works" className="font-medium text-signal hover:underline">
          How it works
        </Link>
      </motion.div>
    </div>
  );
}
