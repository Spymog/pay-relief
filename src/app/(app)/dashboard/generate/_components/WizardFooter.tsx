"use client";

import { cn } from "@/lib/utils";

/**
 * Bottom action bar shared by the Generate wizard steps.
 *
 * `sticky bottom-0` holds the step's primary action in the same spot on screen
 * however tall the step's content is. The wizard column is sized to fill the
 * viewport (see GeneratePage), so short steps push the bar down to the same
 * place that taller, scrolling steps pin it to.
 *
 * The negative inline margin lets the bar's background and border span the
 * page container's horizontal padding rather than stopping short of it.
 */
export default function WizardFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 -mx-4 mt-auto flex items-center justify-between gap-3 border-t border-border bg-background px-4 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
