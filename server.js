const express = require("express");
const request = require("request");
const app = express();
const config = require("./config");
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
const urlencodedParser = express.urlencoded({ extended: false });

app.get("/", function staticFile(_, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/", function staticFile(_, response) {
  response.sendFile(
    __dirname + "/public/pages/agreement.html"
  );
});
app.get("/", function staticFile(_, response) {
  response.sendFile(
    __dirname + "/public/pages/confidence.html"
  );
});

app.post("/form", urlencodedParser, function (req, res) {

 if (req.body.info && req.body.info.trim() !== '') {
    console.log('Обнаружен бот:', req.body.info);
    return res.status(200).send('Спасибо за ваше сообщение!');
  }

  // const formStartTime = req.body.formStartTime;
  // const submitTime = Date.now();
  
  // if (submitTime - formStartTime < 10000) { // Меньше 3 секунд
  //   return res.status(400).json({ error: 'Form submitted too quickly' });
  // }

  const { number } = req.body;
  const blockedNumbers = ['0000000000', '0000000000']; // Список запрещённых номеров

  // Проверяем, есть ли номер в чёрном списке
  if (blockedNumbers.includes(number)) {
    return res.status(400).json({ 
      error: 'Этот номер заблокирован для отправки форм',
      code: 'BLOCKED_NUMBER'
    });
  }

  const data = req.body;
  const message = `Новая заявка:
    Имя: ${data.name}
    Номер: ${data.number}
    Email: ${data.email}
    Тема обращения: ${data.theme}
    Подробности: ${data.details}
    `;
request.post(
    {
      url: `https://api.telegram.org/bot${config.telegram.token}/sendMessage`,
      form: {
        chat_id: config.telegram.chat,
        text: message,
      },
    },

    (error, response, body) => {
      if (response.statusCode === 200) {
        res.status(200).json({ status: "ok", message: "Успешно отправлено!" });
      } 
      else {
        console.error("Ошибка отправки:", error);
        res.status(400).json({ status: "error", message: "Произошла ошибка!" });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});


