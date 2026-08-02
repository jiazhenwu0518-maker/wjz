import React, { useState } from 'react';
import { MERCHANT_ID, ECPAY_URL, generateCheckMacValue, getTradeDate } from '../services/ecpay';

const Sponsor: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const params: Record<string, string> = {
        MerchantID: MERCHANT_ID,
        MerchantTradeNo: "CAMP" + Date.now(),
        MerchantTradeDate: getTradeDate(),
        PaymentType: "aio",
        TotalAmount: "100",
        TradeDesc: "vibe coding camp test",
        ItemName: "Vibe Coding 專案 x 1",
        ReturnURL: "https://example.com/payment-result",
        ChoosePayment: "Credit",
        EncryptType: "1",
      };

      // 產生 CheckMacValue
      params.CheckMacValue = await generateCheckMacValue(params);

      // 動態建立表單並送出
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = ECPAY_URL;
      // 加上 target="_blank" 避免在 iframe 預覽環境中被綠界的 X-Frame-Options 阻擋導致「拒絕連線」
      form.target = '_blank'; 
      form.style.display = 'none';

      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // 送出後稍微延遲，清理 DOM 並恢復按鈕狀態
      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
        setIsProcessing(false);
      }, 1000);

    } catch (error) {
      console.error("Payment error:", error);
      alert("付款發生錯誤，請稍後再試。");
      setIsProcessing(false);
    }
  };

  return (
    <section className="max-w-[1000px] mx-auto mt-16 mb-10 px-0">
      <h2 className="text-center text-3xl md:text-[2.2rem] mb-8 text-slate-800 dark:text-[#c0caf5] transition-colors duration-400 font-bold">
        贊助專案
      </h2>
      <div className="flex justify-center">
        <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-400 flex flex-col items-center gap-4 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] max-w-sm w-full text-center border-t-4 border-light-primary dark:border-dark-primary">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
            <span className="text-3xl">🚀</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-[#c0caf5]">Vibe Coding 專案</h3>
          <div className="text-4xl font-extrabold text-light-primary dark:text-dark-primary my-2">NT$ 100</div>
          <p className="text-gray-500 dark:text-[#a9b1d6] mb-6 text-sm">
            支持我的創作與專案開發 (綠界測試環境)
          </p>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-light-primary text-white py-3.5 px-8 border-none rounded-full text-lg font-semibold cursor-pointer shadow-[0_5px_15px_rgba(52,152,219,0.3)] transition-all duration-300 hover:bg-light-primaryHover hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex justify-center items-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                處理中...
              </>
            ) : (
              '前往付款'
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sponsor;