import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { SdkUsageSection } from "@/constants/sdk";
import { CodeBlock } from "@/components/sdk/code-block";
import { cn } from "@/lib/cn";

type SdkUsageAccordionProps = {
  sections: SdkUsageSection[];
};

export function SdkUsageAccordion({ sections }: SdkUsageAccordionProps) {
  const [openId, setOpenId] = useState<string>(sections[0]?.id ?? "");

  return (
    <div className="mt-5 space-y-3">
      {sections.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div
            key={section.id}
            className="overflow-hidden rounded-xl border border-border bg-surface-raised"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? "" : section.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-muted"
            >
              <div>
                <h4 className="font-medium text-text">{section.title}</h4>
                <p className="mt-1 text-sm text-text-muted">{section.description}</p>
              </div>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-text-muted transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-5 border-t border-border px-5 pb-5 pt-4">
                    {section.blocks.map((block) => (
                      <CodeBlock key={block.label} label={block.label} code={block.code} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
