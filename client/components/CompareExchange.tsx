import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Upbit from "@/public/exchange/upbit.png";
import Bithumb from "@/public/exchange/bithumb.png";
import Binance from "@/public/exchange/binance.svg";
import Bybit from "@/public/exchange/bybit.jpg";
import Okx from "@/public/exchange/okx.webp";
import Gemini from "@/public/exchange/gemini.png";
import Kraken from "@/public/exchange/kraken.jpeg";
import Coinbase from "@/public/exchange/coinbase.png";
export function ReferenceExchange() {
  return (
    <Select>
      <SelectTrigger className="w-[190px] hover:ring-1 hover:ring-[#28f4af] hover:border-none">
        <SelectValue placeholder="Reference Exchange" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Exchanges</SelectLabel>
          <SelectItem value="binance">
            <Image
              src={Binance}
              alt="Binance"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Binance</span>
          </SelectItem>
          <SelectItem value="okx">
            <Image
              src={Okx}
              alt="OKX"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>OKX</span>
          </SelectItem>
          <SelectItem value="bybit">
            <Image
              src={Bybit}
              alt="Bybit"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Bybit</span>
          </SelectItem>
          <SelectItem value="gemini">
            <Image
              src={Gemini}
              alt="Gemini"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Gemini</span>
          </SelectItem>
          <SelectItem value="kraken">
            <Image
              src={Kraken}
              alt="Kraken"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Kraken</span>
          </SelectItem>
          <SelectItem value="coinbase">
            <Image
              src={Coinbase}
              alt="Coinbase"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Coinbase</span>
          </SelectItem>
          <SelectItem value="upbit">
            <Image
              src={Upbit}
              alt="Upbit"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Upbit</span>
          </SelectItem>
          <SelectItem value="bithumb">
            <Image
              src={Bithumb}
              alt="Bithumb"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Bithumb</span>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function ComparisonExchange() {
  return (
    <Select>
      <SelectTrigger className="w-[190px] hover:ring-1 hover:ring-[#28f4af] hover:border-none">
        <SelectValue placeholder="Comparison Exchange" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Exchanges</SelectLabel>
          <SelectItem value="binance">
            <Image
              src={Binance}
              alt="Binance"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Binance</span>
          </SelectItem>
          <SelectItem value="okx">
            <Image
              src={Okx}
              alt="OKX"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>OKX</span>
          </SelectItem>
          <SelectItem value="bybit">
            <Image
              src={Bybit}
              alt="Bybit"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Bybit</span>
          </SelectItem>
          <SelectItem value="gemini">
            <Image
              src={Gemini}
              alt="Gemini"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Gemini</span>
          </SelectItem>
          <SelectItem value="kraken">
            <Image
              src={Kraken}
              alt="Kraken"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Kraken</span>
          </SelectItem>
          <SelectItem value="coinbase">
            <Image
              src={Coinbase}
              alt="Coinbase"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Coinbase</span>
          </SelectItem>
          <SelectItem value="upbit">
            <Image
              src={Upbit}
              alt="Upbit"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Upbit</span>
          </SelectItem>
          <SelectItem value="bithumb">
            <Image
              src={Bithumb}
              alt="Bithumb"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>Bithumb</span>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
