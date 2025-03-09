import BugerMenu from "@/components/layouts/BugerMenu";
import { navItems } from "@/app/common/navItems";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-between p-4 border-[#28f4af]/70">
        <h1 className="text-2xl font-bold font-orbitron bg-gradient-to-b from-[#28f4af] via-indigo-400 to-indigo-600 text-transparent bg-clip-text bg-[length:100%_200%] ">
          MINERVA
        </h1>
        <nav
          className="hidden sm:flex items-center gap-4"
          aria-label="Main Navigation"
        >
          {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <span className="font-exo font-semibold relative hover:text-[#28f4af] after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="sm:hidden mt-1 hover:text-[#28f4af]">
            <BugerMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
