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
import useExchangeSelector from "@/app/store/useExchangeSelector";

// 거래소 데이터를 배열로 정의
const exchanges = [
  { value: "binance", name: "Binance", image: Binance },
  { value: "okx", name: "OKX", image: Okx },
  { value: "bybit", name: "Bybit", image: Bybit },
  { value: "gemini", name: "Gemini", image: Gemini },
  { value: "kraken", name: "Kraken", image: Kraken },
  { value: "coinbase", name: "Coinbase", image: Coinbase },
  { value: "upbit", name: "Upbit", image: Upbit },
  { value: "bithumb", name: "Bithumb", image: Bithumb },
];

interface ExchangeSelectorProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  disabledValues?: string[]; // 선택 불가능한 값들의 배열
}

export function ExchangeSelector({
  placeholder,
  value,
  onChange,
  disabledValues = [],
}: ExchangeSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[190px] hover:ring-1 hover:ring-[#28f4af] hover:border-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Exchanges</SelectLabel>
          {exchanges.map((exchange) => (
            <SelectItem
              key={exchange.value}
              value={exchange.value}
              disabled={disabledValues.includes(exchange.value)} // 선택 불가능한 값 설정
            >
              <div className="flex items-center gap-2">
                <Image
                  src={exchange.image}
                  alt={exchange.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span>{exchange.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Zustand 스토어를 사용하는 컴포넌트
export function ReferenceExchange() {
  const { referenceExchange, setReferenceExchange, comparisonExchange } =
    useExchangeSelector();

  return (
    <ExchangeSelector
      placeholder="Reference Exchange"
      value={referenceExchange}
      onChange={setReferenceExchange}
      disabledValues={comparisonExchange ? [comparisonExchange] : []} // 비교 거래소에서 선택한 값 비활성화
    />
  );
}

export function ComparisonExchange() {
  const { comparisonExchange, setComparisonExchange, referenceExchange } =
    useExchangeSelector();

  return (
    <ExchangeSelector
      placeholder="Comparison Exchange"
      value={comparisonExchange}
      onChange={setComparisonExchange}
      disabledValues={referenceExchange ? [referenceExchange] : []} // 기준 거래소에서 선택한 값 비활성화
    />
  );
}
