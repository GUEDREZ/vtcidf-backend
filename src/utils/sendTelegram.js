// ============================================================
//   Telegram Sender – Premium VTC IDF
// ============================================================

import axios from "axios";

export const sendTelegram = async (message) => {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT_ID) {
    console.error("⚠️ Telegram token ou chat_id manquant.");
    return;
  }

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  await axios.post(url, {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: "HTML",
  });
};
