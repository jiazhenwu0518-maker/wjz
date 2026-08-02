export const MERCHANT_ID = "2000132";
export const HASH_KEY = "5294y06JbISpM5x9";
export const HASH_IV = "v77hoKGq4kWxNNIS";
export const ECPAY_URL = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";

// 綠界規定的 URL encode 規則 (.NET 樣式)
export function urlEncodeDotNet(str: string): string {
  return encodeURIComponent(str)
    .replace(/%20/g, "+")
    .replace(/'/g, "%27")
    .replace(/~/g, "%7e");
}

// 使用 Web Crypto API 計算 SHA256
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}

// 計算檢查碼 CheckMacValue
export async function generateCheckMacValue(params: Record<string, string>): Promise<string> {
  const sorted = Object.keys(params).sort();
  const query = sorted.map((k) => `${k}=${params[k]}`).join("&");
  const raw = `HashKey=${HASH_KEY}&${query}&HashIV=${HASH_IV}`;
  const encoded = urlEncodeDotNet(raw).toLowerCase();
  return await sha256(encoded);
}

// 產生綠界格式的交易時間
export function getTradeDate(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
