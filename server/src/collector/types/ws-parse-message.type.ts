export type FilterdMessageType = {
  exchange: string;
  baseAsset: string;
  quoteAsset: string;
  symbol: string;
  currentPrice: string | number;
  changeRate: string | number;
  tradeVolume: string | number;
  timestamp: string | number;
} | null;
