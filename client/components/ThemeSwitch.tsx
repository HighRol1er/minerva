"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트된 후에만 테마 상태에 접근
  useEffect(() => {
    setMounted(true);
  }, []);

  // 다크모드 상태 변경 핸들러
  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <SwitchPrimitive.Root
      checked={theme === "dark"}
      onCheckedChange={handleToggle}
      className={cn(
        "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        theme === "dark" ? "bg-slate-800" : "bg-slate-200"
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none flex items-center justify-center rounded-full shadow-lg ring-0 transition-transform",
          "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
          theme === "dark" ? "bg-indigo-600" : "bg-amber-400"
        )}
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4 text-white" />
        ) : (
          <Sun className="h-4 w-4 text-white" />
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}
