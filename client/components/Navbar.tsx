import ThemeSwitch from "@/components/ThemeSwitch";
import React from "react";
import Link from "next/link";
import { ROUTES } from "@/routes";

export default function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">MINERVA</h1>
        <nav className="flex items-center gap-4" aria-label="Main Navigation">
          <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
          <Link href={ROUTES.MARKET_CAP}>Market Cap</Link>
          <Link href={ROUTES.EXCHANGE}>Exchange</Link>
          <Link href={ROUTES.NEWS}>News</Link>
          <Link href={ROUTES.ABOUT}>About</Link>
        </nav>
        <ThemeSwitch />
      </div>
    </header>
  );
}
