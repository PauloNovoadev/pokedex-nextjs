"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ checked, ...props }: SwitchProps) {
  const isChecked = checked === true;

  return (
    <SwitchPrimitive.Root
      checked={checked}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        isChecked ? "bg-zinc-900" : "bg-zinc-300"
      }`}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={`block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
          isChecked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </SwitchPrimitive.Root>
  );
}