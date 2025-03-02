import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GOOGLE_FINANCE_URL } from 'src/common/constants';

interface ForexRate {
  currency_pair: string;
  rate: number;
  timestamp: Date;
}

@Injectable()
export class ForexClient {
  private readonly logger = new Logger(ForexClient.name);
  private readonly reqHeader = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  };

  public async fetchUsdKrwRate(): Promise<number> {
    try {
      const { data } = await axios.get(GOOGLE_FINANCE_URL.USD_KRW, {
        headers: this.reqHeader,
      });
      const $ = cheerio.load(data);
      const rateText = $('.YMlKec.fxKbKc').text();
      const rate = parseFloat(rateText.replace(/,/g, ''));

      if (isNaN(rate)) {
        this.logger.error('Invalid rate format');
      }

      return rate;
    } catch (error) {
      this.logger.error('Failed to fetch USD/KRW rate', error);
      throw error;
    }
  }

  public async fetchUsdJpyRate(): Promise<number> {
    try {
      const { data } = await axios.get(GOOGLE_FINANCE_URL.USD_JPY, {
        headers: this.reqHeader,
      });
      const $ = cheerio.load(data);
      const rateText = $('.YMlKec.fxKbKc').text();
      const rate = parseFloat(rateText.replace(/,/g, ''));

      if (isNaN(rate)) {
        this.logger.error('Invalid rate format');
      }

      return rate;
    } catch (error) {
      this.logger.error('Failed to fetch USD/JPY rate', error);
      throw error;
    }
  }

  public async fetchUsdEurRate(): Promise<number> {
    try {
      const { data } = await axios.get(GOOGLE_FINANCE_URL.USD_EUR, {
        headers: this.reqHeader,
      });
      const $ = cheerio.load(data);
      const rateText = $('.YMlKec.fxKbKc').text();
      const rate = parseFloat(rateText.replace(/,/g, ''));

      if (isNaN(rate)) {
        this.logger.error('Invalid rate format');
      }

      return rate;
    } catch (error) {
      this.logger.error('Failed to fetch USD/EUR rate', error);
      throw error;
    }
  }

  public async fetchUsdGbpRate(): Promise<number> {
    try {
      const { data } = await axios.get(GOOGLE_FINANCE_URL.USD_GBP, {
        headers: this.reqHeader,
      });
      const $ = cheerio.load(data);
      const rateText = $('.YMlKec.fxKbKc').text();
      const rate = parseFloat(rateText.replace(/,/g, ''));

      if (isNaN(rate)) {
        this.logger.error('Invalid rate format');
      }

      return rate;
    } catch (error) {
      this.logger.error('Failed to fetch USD/GBP rate', error);
      throw error;
    }
  }

  public async fetchUsdCnyRate(): Promise<number> {
    try {
      const { data } = await axios.get(GOOGLE_FINANCE_URL.USD_CNY, {
        headers: this.reqHeader,
      });
      const $ = cheerio.load(data);
      const rateText = $('.YMlKec.fxKbKc').text();
      const rate = parseFloat(rateText.replace(/,/g, ''));

      if (isNaN(rate)) {
        this.logger.error('Invalid rate format');
      }

      return rate;
    } catch (error) {
      this.logger.error('Failed to fetch USD/CNY rate', error);
      throw error;
    }
  }

  //*****************
  //*  FOREX_DATA   *
  //*****************
  // public async fetchAllForexData(): Promise<ForexRate[]> {

  // }
}
