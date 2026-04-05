"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function TestSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-8">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
      />
    </div>
  );
}