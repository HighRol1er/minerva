import ThemeSwitch from "@/components/ThemeSwitch";
import React from "react";

export default function Navbar() {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">MINERVA</h1>
        <ThemeSwitch />
      </div>
    </React.Fragment>
  );
}
