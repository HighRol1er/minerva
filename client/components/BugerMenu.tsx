import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/routes";

export default function BugerMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon className="h-6 w-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={ROUTES.MARKET_CAP}>Market Cap</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={ROUTES.EXCHANGE}>Exchange</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={ROUTES.NEWS}>News</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={ROUTES.ABOUT}>About</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
