//СКРЫТИЕ НАВБАРА//
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-1000px";
  }
  prevScrollpos = currentScrollPos;
};

//POPUPform//

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("pop-up");
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      popup.style.display = "block";
    });
  });
  document.querySelectorAll(".pop-up-close").forEach((button) => {
    button.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });
});

//POPUPCASE

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("case-popup");
  document.querySelectorAll(".case-block").forEach((button) => {
    button.addEventListener("click", () => {
      popup.style.display = "block";
    });
  });
  document.querySelectorAll(".case-popup-close").forEach((button) => {
    button.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });
});

const buttons = document.querySelectorAll(".case-block");
const popups = document.querySelectorAll(".case-popup");

// Функция открытия попапа
function caseBlock(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = "block";
}

// Функция закрытия попапа
function closePopup() {
  popups.forEach((popup) => {
    popup.style.display = "none";
  });
}

// Обработчик кликов по кнопкам
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const popupId = button.dataset.popup;
    caseBlock(popupId);
  });
});

//закрытие по крестику//

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("case-popup-close")) {
    closePopup();
  }
});

// Закрытие попапа при нажатии Esc
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
  }
});

//КНОПКА ВОЗВРАТА ВВЕРХ

const goTopBtn = document.querySelector(".go-top");

goTopBtn.addEventListener("click", goTop);
window.addEventListener("scroll", trackScroll);

function trackScroll() {
  const offset = window.scrollY;
  const coords = document.documentElement.clientHeight;
  if (offset > coords) {
    goTopBtn.classList.add("go-top--show");
  } else {
    goTopBtn.classList.remove("go-top--show");
  }
}

function goTop() {
  if (window.scrollY > 0) {
    window.scrollBy(0, -9999);
    setTimeout(goTop, 0);
  }
}
//УВЕДОМЛЕНИЕ
function message() {
  var Name = document.getElementById("name");
  var Number = document.getElementById("number");
  var Details = document.getElementById("details");
  const success = document.getElementById("success");
  const danger = document.getElementById("danger");

  if (Name.value === "" || Number.value === "" || Details.value === "") {
    danger.style.display = "block";
  } else {
    setTimeout(() => {
      Name.value = "";
      Number.value = "";
      Details.value = "";
    }, 2000);

    success.style.display = "block";
  }

  setTimeout(() => {
    danger.style.display = "none";
    success.style.display = "none";
  }, 4000);
}

//NOTIFY

if (!localStorage.getItem("privacyPolicyAccepted")) {
  var modal = document.getElementById("privacyModal");
  modal.style.display = "block";
}

document.getElementById("acceptButton").addEventListener("click", function () {
  localStorage.setItem("privacyPolicyAccepted", "true");
  document.getElementById("privacyModal").style.display = "none";
});

document
  .getElementsByClassName("notify-close")[0]
  .addEventListener("click", function () {
    document.getElementById("privacyModal").style.display = "none";
  });

window.onclick = function (event) {
  if (event.target == modal) {
    document.getElementById("privacyModal").style.display = "none";
  }
};

//NO RELOAD

const forms = document.querySelectorAll("form");

function toJSONString(form) {
  var obj = {};
  var elements = form.querySelectorAll("input, select, textarea");
  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i];
    var name = element.name;
    var value = element.value;
    if (name) {
      obj[name] = value;
    }
  }
  return JSON.stringify(obj);
}

forms.forEach((form) => {
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const json = toJSONString(form);

      const formReq = new XMLHttpRequest();
      formReq.open("POST", "/form", true);

      formReq.onload = function (oEvent) {
        if (formReq.status === 200) {
        } else {
        }
      };

      formReq.setRequestHeader("Content-Type", "application/json");
      formReq.send(json);
    });
  }
});

//Увед нижней формы

const popupOverlay = document.getElementById("popup-page");
const popup = document.getElementById("popuphtml");
const form = document.querySelector(".form");

function showPopup() {
  popupOverlay.style.display = "block";
}

function hidePopup() {
  popupOverlay.style.display = "none";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  showPopup();

  form.reset();
});

function validateForm() {
  const name = form.name.value;
  const number = form.number.value;
  const details = form.details.value;

  if (!name || !number || !details) {
    alert("Пожалуйста, заполните все поля");
    return false;
  }

  return true;
}

popupOverlay.addEventListener("click", hidePopup);
popup.addEventListener("click", (event) => event.stopPropagation());

//ОТПРАВКА ФОРМЫ С ПОПАП
/*const send = document.querySelector("#form");

send.addEventListener("submit", (e) => {
  e.preventDefault();

  var text1 = document.querySelector("#name").value;
  var text2 = document.querySelector("#number").value;
  var text3 = document.querySelector("#email").value;
  var text4 = document.querySelector("#theme").value;
  var details = document.querySelector("#details").value;

  var token = "7879976159:AAGIhnwaBwcagbkBO-OdTd1opU9oycoxdfI";

  var chat_id = "-4718888505";

  var my_text = `Новое обращение:%0A Имя: ${text1} %0A Телефон: ${text2} %0A Почта: ${text3} %0A Тема обращения: ${text4} %0A Детали: ${details}`;

  var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${my_text}`;

  let api = new XMLHttpRequest();
  api.open("GET", url, true);
  api.send();

  text.value = "";
});

//ОТПРАВКА ФОРМЫ СО СТРАНИЦЫ

// Настройки бота
const botToken = "7879976159:AAGIhnwaBwcagbkBO-OdTd1opU9oycoxdfI";
const chatId = "-4718888505";

// Функция отправки данных
async function sendForm() {
  // Получаем значения полей формы
  const name = document.getElementById("sendname").value;
  const number = document.getElementById("sendnumber").value;
  const email = document.getElementById("sendemail").value;
  const theme = document.getElementById("sendtheme").value;
  const details = document.getElementById("senddetails").value;

  // Формируем сообщение
  const text = `
    Новая заявка:
    Имя: ${name}
    Номер: ${number}
    Email: ${email}
    Тема: ${theme}
    Детали: ${details}
    `;

  // Отправляем запрос
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      }
    );

    const result = await response.json();

    if (result.ok) {
      document.getElementById("status").textContent =
        "Сообщение успешно отправлено!";
      document.getElementById("contactForm").reset();
    } else {
      document.getElementById("status").textContent =
        "Ошибка при отправке сообщения";
    }
  } catch (error) {
    console.error("Ошибка:", error);
    document.getElementById("status").textContent =
      "Произошла ошибка при отправке";
  }
}



// Привязываем обработчик к кнопке
document.getElementById("sendsubmit").addEventListener("click", () => {
  if (validateForm()) {
    sendForm();
  }
});

// Получаем все формы на странице
/*const send = document.querySelectorAll('form');

// Добавляем обработчик ко всем формам
send.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Получаем все поля формы
        const fields = form.elements;
        const data = {};

        // Собираем данные из всех полей
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (field.name) {
                data[field.name] = field.value;
            }
        }

        // Настройки Telegram API
        const token = '7879976159:AAGIhnwaBwcagbkBO-OdTd1opU9oycoxdfI';
        const chat_id = '-4718888505';

        // Формируем сообщение
        let my_text = 'Новое обращение:\n';
        
        // Добавляем только заполненные поля
        for (const key in data) {
            if (data[key] !== '') {
                my_text += `${key.toUpperCase()}: ${data[key]}\n`;
            }
        }

        // Формируем URL
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(my_text)}`;

        // Отправляем запрос
        const api = new XMLHttpRequest();
        api.open('GET', url, true);
        api.send();

        // Обработчик ответа
        api.onreadystatechange = function() {
            if (api.readyState === 4) {
                if (api.status === 200) {
                    console.log('Сообщение отправлено');
                    form.reset(); // Очищаем форму
                } else {
                    console.error('Ошибка отправки:', api.statusText);
                }
            }
        };
    });
});  */
