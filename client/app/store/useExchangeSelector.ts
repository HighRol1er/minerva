import { create } from "zustand";

interface ExchangeSelectorState {
  referenceExchange: string;
  comparisonExchange: string;
  setReferenceExchange: (exchange: string) => void;
  setComparisonExchange: (exchange: string) => void;
}

const useExchangeSelector = create<ExchangeSelectorState>((set) => ({
  referenceExchange: "upbit",
  comparisonExchange: "binance",
  setReferenceExchange: (exchange: string) =>
    set({ referenceExchange: exchange }),
  setComparisonExchange: (exchange: string) =>
    set({ comparisonExchange: exchange }),
}));

export default useExchangeSelector;
