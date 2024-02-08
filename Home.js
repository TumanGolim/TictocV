const express = require("express");
const Telegraf = require("telegraf");

const app = express();
const bot = new Telegraf("6619034502:AAHkuNvShiOvEUqW9ek7JrQbk1LPTEuDOWY");
const TELEGRAM_CHAT_ID = 750458682;

app.use(express.urlencoded({ extended: true }));

// Обработка POST запроса на отправку ссылки на TikTok
app.post("/send-tiktok-link", (req, res) => {
  const tiktokLink = req.body["tiktok-link"];

  // Отправка ссылки в телеграм-чат
  bot.telegram
    .sendMessage(TELEGRAM_CHAT_ID, `Новая ссылка на TikTok: ${tiktokLink}`)
    .then(() => {
      res.send("Ссылка успешно отправлена в телеграм.");
    })
    .catch((error) => {
      console.error("Ошибка при отправке сообщения в телеграм:", error);
      res
        .status(500)
        .send("Произошла ошибка при отправке сообщения в телеграм.");
    });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
