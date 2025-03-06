import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ROUTES } from "@/routes";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";

export default function BugerMenu() {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <MenuIcon className="h-6 w-6" />
      </DrawerTrigger>
      <DrawerContent className="right-0 left-auto h-full w-[300px] rounded-l-lg">
        <div className="h-full flex flex-col">
          <DrawerHeader className="flex">
            <DrawerTitle className="flex justify-between items-center">
              <span className="font-exo font-semibold">Menu</span>
              <DrawerClose>
                <X className=" hover:text-teal-500 h-6 w-6" />
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 px-4">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link href={ROUTES.DASHBOARD}>
                <span className="font-exo font-semibold relative hover:text-[#28f4af] after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
                  Dashboard
                </span>
              </Link>
              <Link href={ROUTES.MARKET_CAP}>
                <span className="font-exo font-semibold relative hover:text-[#28f4af] after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
                  <DrawerClose>Market Cap</DrawerClose>
                </span>
              </Link>
              <Link href={ROUTES.EXCHANGE}>
                <span className="font-exo font-semibold relative hover:text-[#28f4af] after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
                  <DrawerClose>Exchange</DrawerClose>
                </span>
              </Link>
              <Link href={ROUTES.NEWS}>
                <span className="font-exo font-semibold relative hover:text-[#28f4af] after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
                  <DrawerClose>News</DrawerClose>
                </span>
              </Link>
              <Link href={ROUTES.ABOUT}>
                <span className="font-exo font-semibold relative hover:text-[#28f4af] after:block after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-teal-500 after:to-indigo-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
                  <DrawerClose>About</DrawerClose>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
