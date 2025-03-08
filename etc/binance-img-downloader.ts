import axios from "axios";
import * as fs from "fs/promises";
import * as path from "path";
import { binanceMarketData } from "./scripts/market/binance-market-data";

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    await fs.writeFile(filepath, response.data);
    console.log(`✅ Downloaded: ${url}`);
    return true;
  } catch (error) {
    console.log(`❌ Failed to download: ${url}`);
    return false;
  }
}

async function ensureDirectoryExists(dirPath: string) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function main() {
  // 저장 디렉토리 생성
  const saveDir = path.join(process.cwd(), "..", "client", "public", "coins");
  await ensureDirectoryExists(saveDir);

  // binance-market-data.ts에서 baseAsset 추출
  const coins = new Set(
    binanceMarketData
      .map((market) => market.baseAsset)
      .filter((symbol) => symbol && symbol !== ("USDT" as any))
  );

  console.log(`Found ${coins.size} unique coins from Binance`);

  // 각 코인에 대해 이미지 다운로드
  for (const coin of coins) {
    try {
      const savePath = path.join(saveDir, `${coin.toLowerCase()}.png`);

      // 바이낸스 이미지 다운로드
      const binanceUrl = `https://bin.bnbstatic.com/static/assets/logos/${coin}.png`;
      await downloadImage(binanceUrl, savePath);

      // 요청 간 간격 추가
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error processing coin ${coin}:`, error);
      continue;
    }
  }

  console.log("Binance image download process completed!");
}

main().catch(console.error);
