import { BinanceSymbol, KrExchangeMarketResponse } from 'src/types/exchange-http';
/**
 * KR Exchange Market Parser
 * @param data KR Exchange API로부터 받은 전체 마켓 데이터 배열
 * @returns KRW 마켓의 심볼 목록 (예: ["KRW-BTC", "KRW-ETH", ...])
 * @example
 * const allMarkets = [
 *   { market: "KRW-BTC" },
 *   { market: "BTC-ETH" },
 *   { market: "KRW-XRP" }
 * ];
 * const krwMarkets = krExchangeMarketParser(allMarkets);
 * // 결과: ["KRW-BTC", "KRW-XRP"]
 */
export const krExchangeMarketFilter = (data: KrExchangeMarketResponse[]) => {
  return data.filter(ticker => ticker.market.startsWith('KRW-')).map(ticker => ticker.market);
};

/**
 * Binance Market Parser
 * @param data Binance API로부터 받은 전체 마켓 데이터 배열
 * @returns USDT 마켓의 심볼 + 트레이딩 가능 종목
 * @example
 * const allMarkets = [
 *   { symbol: "BTCUSDT", status: "TRADING", baseAsset: "BTC", quoteAsset: "USDT" },
 *   { symbol: "ETHBTC", status: "TRADING", baseAsset: "ETH", quoteAsset: "BTC" },
 *   { symbol: "ETHUSDT", status: "TRADING", baseAsset: "ETH", quoteAsset: "USDT" },
 *   { symbol: "BTCBTC", status: "BREAK", baseAsset: "BTC", quoteAsset: "BTC" },
 * ];
 * const usdtMarkets = binanceMarketParser(allMarkets);
 * // Returns: [
 *   { symbol: "BTCUSDT", status: "TRADING", baseAsset: "BTC", quoteAsset: "USDT" },
 *   { symbol: "ETHUSDT", status: "TRADING", baseAsset: "ETH", quoteAsset: "USDT" },
 * ]
 */

export function binanceMarketFilter(data: BinanceSymbol[]): BinanceSymbol[] {
  return data.filter(symbol => symbol.status === 'TRADING' && symbol.quoteAsset === 'USDT'); // USDT 페어만 필터링
  // .map(symbol => symbol.symbol);
}
