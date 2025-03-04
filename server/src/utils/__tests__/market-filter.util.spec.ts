import {
  krExchangeMarketFilter,
  binanceMarketFilter,
} from '../market-filter.util';
import { BinanceSymbol, KrExchangeMarketResponse } from 'src/collector/types';

describe('Market Filter Utils', () => {
  describe('krExchangeMarketFilter', () => {
    it('should filter KRW markets correctly', () => {
      const mockData: KrExchangeMarketResponse[] = [
        { market: 'KRW-BTC', korean_name: '비트코인', english_name: 'Bitcoin' },
        {
          market: 'BTC-ETH',
          korean_name: '이더리움',
          english_name: 'Ethereum',
        },
        {
          market: 'KRW-ETH',
          korean_name: '이더리움',
          english_name: 'Ethereum',
        },
        { market: 'BTC-XRP', korean_name: '리플', english_name: 'Ripple' },
        { market: 'KRW-XRP', korean_name: '리플', english_name: 'Ripple' },
      ];

      const result = krExchangeMarketFilter(mockData);

      expect(result).toEqual(['KRW-BTC', 'KRW-ETH', 'KRW-XRP']);
      expect(result).toHaveLength(3);
      expect(result.every((market) => market.startsWith('KRW-'))).toBe(true);
    });

    it('should return empty array when no KRW markets exist', () => {
      const mockData: KrExchangeMarketResponse[] = [
        {
          market: 'BTC-ETH',
          korean_name: '이더리움',
          english_name: 'Ethereum',
        },
        { market: 'ETH-XRP', korean_name: '리플', english_name: 'Ripple' },
      ];

      const result = krExchangeMarketFilter(mockData);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('binanceMarketFilter', () => {
    it('should filter USDT trading pairs correctly', () => {
      const mockData: BinanceSymbol[] = [
        {
          symbol: 'BTCUSDT',
          status: 'TRADING',
          baseAsset: 'BTC',
          quoteAsset: 'USDT',
        },
        {
          symbol: 'ETHBTC',
          status: 'TRADING',
          baseAsset: 'ETH',
          quoteAsset: 'BTC',
        },
        {
          symbol: 'ETHUSDT',
          status: 'TRADING',
          baseAsset: 'ETH',
          quoteAsset: 'USDT',
        },
        {
          symbol: 'BTCUSDT',
          status: 'BREAK',
          baseAsset: 'BTC',
          quoteAsset: 'USDT',
        },
      ];

      const result = binanceMarketFilter(mockData);

      expect(result).toHaveLength(2);
      expect(result.every((symbol) => symbol.quoteAsset === 'USDT')).toBe(true);
      expect(result.every((symbol) => symbol.status === 'TRADING')).toBe(true);
    });

    it('should return empty array when no valid trading pairs exist', () => {
      const mockData: BinanceSymbol[] = [
        {
          symbol: 'ETHBTC',
          status: 'TRADING',
          baseAsset: 'ETH',
          quoteAsset: 'BTC',
        },
        {
          symbol: 'BTCUSDT',
          status: 'BREAK',
          baseAsset: 'BTC',
          quoteAsset: 'USDT',
        },
      ];

      const result = binanceMarketFilter(mockData);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
