import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HOW_IT_WORKS_STEPS } from "@/constants/how-it-works";
import type { HowItWorksStep } from "@/constants/how-it-works";
import {
  AppScreenContent,
  AppScreenShell,
} from "./app-screen-content";
type AppScreenPreviewProps = {
  activeStepId?: HowItWorksStep["id"];
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
};

export function AppScreenPreview({
  activeStepId: controlledStepId,
  autoPlay = false,
  intervalMs = 3500,
  className,
}: AppScreenPreviewProps) {
  const [internalStep, setInternalStep] = useState(0);
  const stepIndex = controlledStepId
    ? HOW_IT_WORKS_STEPS.findIndex((s) => s.id === controlledStepId)
    : internalStep;
  const safeIndex = stepIndex >= 0 ? stepIndex : 0;
  const step = HOW_IT_WORKS_STEPS[safeIndex];

  useEffect(() => {
    if (controlledStepId || !autoPlay) return;
    const id = setInterval(() => {
      setInternalStep((i) => (i + 1) % HOW_IT_WORKS_STEPS.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, controlledStepId, intervalMs]);

  return (
    <AppScreenShell className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center center" }}
          className="h-full w-full"
        >
          <AppScreenContent stepId={step.id} />
        </motion.div>
      </AnimatePresence>
    </AppScreenShell>
  );
}
