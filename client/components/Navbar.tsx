import BugerMenu from "@/components/BugerMenu";
import ThemeSwitch from "@/components/ThemeSwitch";
import { ROUTES } from "@/routes";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-between p-4 border-b border-teal-500/70">
        <h1 className="text-2xl font-bold font-orbitron">MINERVA</h1>
        <nav
          className="hidden sm:flex items-center gap-4"
          aria-label="Main Navigation"
        >
          <Link href={ROUTES.DASHBOARD}>
            <span className="font-exo relative hover:text-teal-500 after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
              Dashboard
            </span>
          </Link>
          <Link href={ROUTES.MARKET_CAP}>
            <span className="font-exo relative hover:text-teal-500 after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
              Market Cap
            </span>
          </Link>
          <Link href={ROUTES.EXCHANGE}>
            {" "}
            <span className="font-exo relative hover:text-teal-500 after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
              Exchange
            </span>
          </Link>
          <Link href={ROUTES.NEWS}>
            {" "}
            <span className="font-exo relative hover:text-teal-500 after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
              News
            </span>
          </Link>
          <Link href={ROUTES.ABOUT}>
            <span className="font-exo relative hover:text-teal-500 after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
              About
            </span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="sm:hidden mt-1">
            <BugerMenu />
          </div>
          <div className="hidden sm:block">
            <ThemeSwitch />
          </div>
        </div>
      </div>
      <div className="border-b border-teal-500/70 p-1 mb-6">
        {" "}
        ₩ 1,400 ￥9,786
      </div>
    </header>
  );
}
