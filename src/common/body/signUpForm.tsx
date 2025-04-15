"use client";
import React from "react";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";

export function SignupFormDemo() {
  return (
    <LabelInputContainer>
      <Input id="email" placeholder="Search " type="email" autoComplete="off" />
      <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] flex h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium opacity-100 [&amp;_span]:text-xs">
        <span>⌘</span>K
      </kbd>
    </LabelInputContainer>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
