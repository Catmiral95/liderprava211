const express = require('express');
const request = require('request');
const app = express();

const config = require('./config'); 
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./var/www/liderpravapf_usr/data/www/liderpravapfo.ru/public'));

app.use(bodyParser.urlencoded({ extended: true }))
const urlencodedParser = express.urlencoded({extended: false});


app.get("/", function staticFile (_, response) {
    response.sendFile(__dirname + "./var/www/liderpravapf_usr/data/www/liderpravapfo.ru/public/index.html");
});

app.get("/", function staticFile (_, response) {
    response.sendFile(__dirname + "./var/www/liderpravapf_usr/data/www/liderpravapfo.ru/public/agreement.html");
});

app.get("/", function staticFile (_, response) {
    response.sendFile(__dirname + "./var/www/liderpravapf_usr/data/www/liderpravapfo.ru/public/confidence.html");
});

app.post('/form', urlencodedParser, function (req, res) {
    const data = req.body;
    const message = `Новая заявка:
    Имя: ${data.name}
    Номер: ${data.number}
    Email: ${data.email}
    Тема обращения: ${data.theme}
    Подробности: ${data.details}
    `;
        

    request.post({
        url: `https://api.telegram.org/bot${config.telegram.token}/sendMessage`,
        form: { 
            chat_id: config.telegram.chat,
            text: message,
        }
    }, 
     

 (error, response, body) => {

        if (response.statusCode === 200) {
            res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
        } else {
            console.error('Ошибка отправки:', error);
            res.status(400).json({status: 'error', message: 'Произошла ошибка!'});
        }
    }

);
}); 

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});



