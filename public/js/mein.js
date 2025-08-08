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
  document.addEventListener("click", (event) => {
    if (popup.style.display === "block" && 
        !popup.contains(event.target) && 
        !event.target.closest(".btn")) {
      popup.style.display = "none";
    }
  });
});

    //скрытие по ссылке
    document.querySelectorAll('.nav-block a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('check').checked = false;
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
  let Number = document.getElementById("number");
  const success = document.getElementById("success");
  const danger = document.getElementById("danger");

  if (Number.value === "") {
    danger.style.display = "block";
  } else {
    setTimeout(() => {
       Number.value = "";
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
  const number = form.number.value;

  if (!number) {
    alert("Пожалуйста, заполните все поля");
    return false;
  }

  return true;
}

popupOverlay.addEventListener("click", hidePopup);
popup.addEventListener("click", (event) => event.stopPropagation());


//ТФ

// const phoneInput = document.getElementById('number');
  
//   phoneInput.addEventListener('blur', function() {
//     const phoneRegex = /^\+7\s9\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
    
//     if (!phoneRegex.test(phoneInput.value)) {
//       alert('Некорректный формат! Введите +7 9XX XXX XX XX');
//       phoneInput.focus();
//     }
//   });