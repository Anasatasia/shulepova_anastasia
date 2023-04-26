const setValidation = function () {
    const forms = document.querySelectorAll('.form-popup__form');
    forms.forEach((form) => {
        setEventListeners(form);
    })
}

const setEventListeners = function (form) {
    const inputs = form.querySelectorAll('input');
    const button = form.querySelector('.form-popup__button');
    disabledButton(inputs, button);
    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            disabledButton(inputs, button);
            isValid(form, input);
        })
    })
}

const disabledButton = function (inputs, button) {
    let fl = 1;
    inputs.forEach((input) => {
        if (!input.validity.valid) {
            fl = 0;
            button.setAttribute('disabled', 'disabled');
            button.classList.add('disabled');
            return 0;
        }
    })
    if (fl === 1) {
        button.removeAttribute('disabled');
        button.classList.remove('disabled');
    }
}

const isValid = function (form, input) {
    if (input.id) {
        if (!input.validity.valid) {
            showInputError(form, input, input.validationMessage);
        }
        else {
            hideInputError(form, input);
        }
    }
}

const showInputError = function (form, input, message) {
    input.classList.add('error');
    const span = document.querySelector(`.${input.id}-error`);
    span.textContent = "ошибка";
    span.classList.add('show');
}

const hideInputError = function (form, input) {
    input.classList.remove('error');
    const span = document.querySelector(`.${input.id}-error`);
    span.classList.remove('show');
}

setValidation();

const checkLinks = function (img) {
    let imgParent = img.parentElement;
    if (!imgParent.nextElementSibling) {
        let popupRightLink = document.querySelector(".popup__link_right");
        popupRightLink.setAttribute('style', 'display: none');
    }
    else {
        let popupRightLink = document.querySelector(".popup__link_right");
        popupRightLink.setAttribute('style', 'display: block');
    }
    if (!imgParent.previousElementSibling) {
        let popupLeftLink = document.querySelector(".popup__link_left");
        popupLeftLink.setAttribute('style', 'display: none');
    }
    else {
        let popupLeftLink = document.querySelector(".popup__link_left");
        popupLeftLink.setAttribute('style', 'display: block');
    }
}

let popupItems = document.querySelectorAll(".link_popup");

popupItems.forEach((item) => {
    item.addEventListener('click', function (evt) {
        evt.preventDefault();
        let popup = document.querySelector(".popup");
        popup.classList.add("popup_open");
        let imgLink = evt.currentTarget.getAttribute('href');
        let img = evt.currentTarget;
        img.classList.add('active');
        let popupImage = document.querySelector(".popup__image");
        if (img.classList.contains("video")) {
            popupImage.innerHTML = `<video src="${imgLink}" style="max-width: 100%"  autoplay muted loop>`;
        }
        else {
            popupImage.innerHTML = `<img src="${imgLink}"alt="Картинка" style="max-width: 100%">`;
        }
        checkLinks(img);
    })
})

let popupRightLink = document.querySelector(".popup__link_right");

popupRightLink.addEventListener('click', function(evt) {
    evt.preventDefault();
    let img = document.querySelector(".active");
    let imgLink = img.parentElement.nextElementSibling.firstElementChild.getAttribute("href");
    let popupImage = document.querySelector(".popup__image");
    if (img.parentElement.nextElementSibling.firstElementChild.classList.contains("video")) {
        popupImage.innerHTML = `<video src="${imgLink}" style="max-width: 100%"  autoplay muted loop>`;
    }
    else {
        popupImage.innerHTML = `<img src="${imgLink}"alt="Картинка" style="max-width: 100%">`;
    }
    img.classList.remove("active");
    let nextImg = img.parentElement.nextElementSibling.firstElementChild;
    nextImg.classList.add("active");
    checkLinks(nextImg);
})

let popupLeftLink = document.querySelector(".popup__link_left");

popupLeftLink.addEventListener('click', function(evt) {
    evt.preventDefault();
    let img = document.querySelector(".active");
    let imgLink = img.parentElement.previousElementSibling.firstElementChild.getAttribute("href");
    let popupImage = document.querySelector(".popup__image");
    if (img.parentElement.previousElementSibling.firstElementChild.classList.contains("video")) {
        popupImage.innerHTML = `<video src="${imgLink}" style="max-width: 100%"  autoplay muted loop>`;
    }
    else {
        popupImage.innerHTML = `<img src="${imgLink}"alt="Картинка" style="max-width: 100%">`;
    }
    img.classList.remove("active");
    let previousImg = img.parentElement.previousElementSibling.firstElementChild;
    previousImg.classList.add("active");
    checkLinks(previousImg);
})

let oPopup = document.querySelector(".popup");
let oFormPopup = document.querySelector(".form-popup");
let oTimePopup = document.querySelector(".time-popup");

document.addEventListener('click', function(evt){
    if(evt.target === oPopup && oPopup.classList.contains("popup_open")){
        let img = document.querySelector(".active");
        img.classList.remove("active");
        oPopup.classList.remove("popup_open");
        oPopup.querySelectorAll('.popup').forEach((popupItem) => {
            popupItem.classList.remove("popup_active");
        });
    }
    if (evt.target === oFormPopup && oFormPopup.classList.contains("form-popup_open")) {
        evt.preventDefault();
        changeClass();
        setTimeout(changeZIndex, 500);
    }
    if (evt.target === oTimePopup && oTimePopup.classList.contains("time-popup_open")) {
        evt.preventDefault();
        localStorage.setItem("hello-flag", "true");
        let popupHello = document.querySelector(".time-popup_open");
        popupHello.classList.remove("time-popup_open");
    }
});

const sayHello = function() {
    let popupHello = document.querySelector(".time-popup");
    popupHello.classList.add("time-popup_open");
}

if (!localStorage.getItem("hello-flag")) {
    setTimeout(sayHello, 30000);
}

let timePopupButton = document.querySelector(".time-popup__close-button");

timePopupButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    localStorage.setItem("hello-flag", "true");
    let popupHello = document.querySelector(".time-popup_open");
    popupHello.classList.remove("time-popup_open");
})

const changeClass = function() {
    let formPopup = document.querySelector(".form-popup");
    formPopup.classList.toggle("form-popup_open");
}

const changeZIndex = function() {
    let formPopup = document.querySelector(".form-popup");
    formPopup.setAttribute('style', 'z-index: -1000');
}

let formClosePopupButton = document.querySelector(".form-popup__close-button");

formClosePopupButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    changeClass();
    setTimeout(changeZIndex, 500);
})

let formButton = document.querySelector(".footer__button");

formButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    let formPopup = document.querySelector(".form-popup");
    formPopup.setAttribute("style", "z-index: 1000");
    changeClass();
})