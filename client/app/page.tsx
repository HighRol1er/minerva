"use client";

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
import {
  ReferenceExchange,
  ComparisonExchange,
} from "@/components/CompareExchange";
import { useWebSocketQuery } from "./hooks/useWebSocketQuery";
import { SOCKET_EVENTS } from "./constants/SocketEvent";
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
    name: "TRON",
    price: "0.500",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
  {
    name: "SOL",
    price: "0.500",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
  {
    name: "ADA",
    price: "0.500",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
  {
    name: "DOGE",
    price: "0.500",
    changes: "1.72%",
    volume: "140,0",
    premium: "2.54%",
  },
];
export default function Home() {
  // WebSocket 데이터 구독
  // const {
  //   data: marketData,
  //   isLoading,
  //   error,
  // } = useWebSocketQuery(
  //   ["marketData"],
  //   process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000",
  //   SOCKET_EVENTS.CONSOLIDATED_MARKET_DATA,
  //   {
  //     refetchOnWindowFocus: false,
  //     // staleTime: Infinity,
  //   }
  // );
  // console.log("Market data in component:", marketData);
  return (
    <React.Fragment>
      <div className="flex-col w-full px-4 sm:px-6 md:px-8 lg:px-12 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto">
        <div className="flex gap-2 p-4 items-center">
          <ReferenceExchange />
          <ComparisonExchange />
        </div>

        {/* 테이블 스타일 수정 - 그라데이션 테두리 추가 */}
        <div className="relative p-[1px] rounded-md overflow-hidden">
          {/* 그라데이션 테두리 배경 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#28f4af] via-indigo-500 to-blue-600 rounded-md"></div>

          {/* 테이블 내용 */}
          <div className="relative bg-black rounded-md overflow-hidden">
            <Table>
              <TableCaption>End</TableCaption>
              <TableHeader>
                <TableRow className="border-b border-[#28f4af]/30">
                  <TableHead className="">Name</TableHead>
                  <TableHead className="">Price(1)</TableHead>
                  <TableHead className="">Price(2)</TableHead>
                  <TableHead className="text-right">Changes</TableHead>
                  <TableHead className="text-right">Volume</TableHead>
                  <TableHead className="text-right ">Premium</TableHead>
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
                    <TableCell>{invoice.price}</TableCell>
                    <TableCell>{invoice.price}</TableCell>
                    <TableCell className="text-right">
                      {invoice.changes}
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.volume}
                    </TableCell>
                    <TableCell className="text-right">
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
