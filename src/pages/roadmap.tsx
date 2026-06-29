import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { RoadmapTimeline } from "@/components/roadmap/roadmap-timeline";
import { ROADMAP_PHASES } from "@/constants/roadmap";

export function RoadmapPage() {
  const shippedPhases = ROADMAP_PHASES.filter((p) => p.shipped).length;

  return (
    <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-12 sm:px-5 lg:py-16">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-12 max-w-2xl md:mb-16"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-signal">
          Product direction
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Roadmap
        </h1>
        <p className="mt-4 leading-relaxed text-text-muted">
          Where Argus is headed — from the local vault and bucket IPC through optional
          HTTP proxy, OS-level{" "}
          <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-xs text-text">
            argus run
          </code>
          , and a future self-hosted system for teams.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          Current release: <span className="font-medium text-text">v0.3</span> — Argus
          Sandbox on Linux and Windows;{" "}
          {shippedPhases} of {ROADMAP_PHASES.length} phases fully shipped, Argus Sandbox
          in progress.
        </p>
      </motion.header>

      <RoadmapTimeline phases={ROADMAP_PHASES} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-10 text-center text-sm text-text-muted"
      >
        <Link to="/usage" className="font-medium text-signal hover:underline">
          Usage guide
        </Link>
        {" · "}
        <Link to="/security" className="font-medium text-signal hover:underline">
          Security model
        </Link>
        {" · "}
        <Link to="/" className="font-medium text-signal hover:underline">
          Home
        </Link>
      </motion.div>
    </div>
  );
}
