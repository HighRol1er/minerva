// *************************
// *     KOREA EXCHANGE    *
// *************************
export interface UpbitMarketResponse {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface BithumbMarketResponse {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface KrExchangeMarketResponse {
  market: string;
  korean_name: string;
  english_name: string;
}

// *************************
// *    GLOBAL EXCHANGE    *
// *************************

export interface BinanceMarketResponse {
  timezone: string;
  serverTime: number;
  symbols: BinanceSymbol[];
}

export interface BinanceSymbol {
  symbol: string;
  status:
    | 'TRADING'
    | 'PRE_TRADING'
    | 'POST_TRADING'
    | 'END_OF_DAY'
    | 'HALT'
    | 'AUCTION_MATCH'
    | 'BREAK';
  baseAsset: string;
  quoteAsset: string;
}
