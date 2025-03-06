import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/routes";
import { Button } from "./ui/button";

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
              <Link
                href={ROUTES.DASHBOARD}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
              >
                <span className="font-exo font-semibold">
                  <DrawerClose>Dashboard</DrawerClose>
                </span>
              </Link>
              <Link
                href={ROUTES.MARKET_CAP}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
              >
                <span className="font-exo font-semibold">
                  <DrawerClose>Market Cap</DrawerClose>
                </span>
              </Link>
              <Link
                href={ROUTES.EXCHANGE}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
              >
                <span className="font-exo font-semibold">
                  <DrawerClose>Exchange</DrawerClose>
                </span>
              </Link>
              <Link
                href={ROUTES.NEWS}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
              >
                <span className="font-exo font-semibold">
                  <DrawerClose>News</DrawerClose>
                </span>
              </Link>
              <Link
                href={ROUTES.ABOUT}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
              >
                <span className="font-exo font-semibold">
                  <DrawerClose>About</DrawerClose>
                </span>
              </Link>
            </nav>
          </div>

          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
