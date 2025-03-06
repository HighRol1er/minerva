import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Upbit from "@/public/exchange/upbit.png";
import Bithumb from "@/public/exchange/bithumb.png";
import Binance from "@/public/exchange/binance.svg";
const invoices = [
  {
    name: "BTC",
    price: "80,000",
    changes: "1.22%",
    volume: "140,0",
    premium: "2.54%",
  },
  {
    name: "ETH",
    price: "2,283",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
  {
    name: "XRP",
    price: "0.500",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
  {
    name: "XRP",
    price: "0.500",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
  {
    name: "XRP",
    price: "0.500",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
  {
    name: "XRP",
    price: "0.500",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
  {
    name: "XRP",
    price: "0.500",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
];
export default function Home() {
  return (
    <React.Fragment>
      <div className="flex-col w-full px-4 sm:px-6 md:px-8 lg:px-12 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto">
        <div className="flex gap-2">
          <Image
            src={Upbit}
            alt="upbit"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Image src={Bithumb} alt="bithumb" width={50} height={50} />
          <Image src={Binance} alt="binance" width={50} height={50} />
        </div>

        {/* 테이블 스타일 수정 - 그라데이션 테두리 추가 */}
        <div className="relative p-[1px] rounded-md overflow-hidden bg-black">
          {/* 그라데이션 테두리 배경 */}
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500 to-blue-600 rounded-md"></div>

          {/* 테이블 내용 */}
          <div className="relative bg-black rounded-md overflow-hidden">
            <Table>
              <TableCaption className="text-gray-400">Upbit</TableCaption>
              <TableHeader>
                <TableRow className="border-b border-teal-500/30 hover:bg-teal-950/30">
                  <TableHead className="w-[100px] text-gray-300">
                    Name
                  </TableHead>
                  <TableHead className="text-gray-300">Price($)</TableHead>
                  <TableHead className="text-gray-300">Changes</TableHead>
                  <TableHead className="text-gray-300">Volume</TableHead>
                  <TableHead className="text-right text-gray-300">
                    Premium
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.name}
                    className="border-b border-blue-500/30 hover:bg-blue-950/30 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-white">
                      {invoice.name}
                    </TableCell>
                    <TableCell className="text-white">
                      {invoice.price}
                    </TableCell>
                    <TableCell className="text-white">
                      {invoice.changes}
                    </TableCell>
                    <TableCell className="text-white">
                      {invoice.volume}
                    </TableCell>
                    <TableCell className="text-right text-white">
                      {invoice.premium}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
