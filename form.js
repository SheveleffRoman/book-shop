let cartCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*=\s*([^;]*).*$)|^.*$/, "$1");
let cart = JSON.parse(cartCookie);

console.log(cart);

// const form = document.querySelector('form');
// const nameInput = form.querySelector('#name');
// const surnameInput = form.querySelector('#surname');
// const streetInput = form.querySelector('#street');
// const houseNumberInput = form.querySelector('#house-number');
// const flatNumberInput = form.querySelector('#flat-number');
// const deliveryDateInput = form.querySelector('#delivery-date');
// const paymentInputs = form.querySelectorAll('input[name="payment"]');
// const giftsInputs = form.querySelectorAll('input[name="gifts"]');
// const submitButton = form.querySelector('button[type="submit"]');

// const errorMessages = {
//     name: 'Введите свое имя (не менее 4 символов)',
//     surname: 'Введите свою фамилию (не менее 5 символов)',
//     street: 'Введите название улицы (не менее 5 символов)',
//     houseNumber: 'Введите номер дома (не менее 1)',
//     flatNumber: 'Введите номер квартиры',
//     deliveryDate: 'Выберите дату доставки (не ранее завтрашнего дня)',
//     payment: 'Выберите способ оплаты',
//     gifts: 'Выберите два подарка',
// };

const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');

const lettersOnlyRegex = /^[a-zA-Z]+$/;

document.querySelector('form').addEventListener('submit', function(event) {
    // проверяем валидность полей формы
    if (!nameInput.checkValidity()) {
        // если имя не валидно, отменяем отправку формы
        alert('Please enter a valid name');
        event.preventDefault();
    }

    if (!surnameInput.checkValidity()) {
        // если фамилия не валидна, отменяем отправку формы
        alert('Please enter a valid surname');
        event.preventDefault();
    }
});

nameInput.addEventListener('input', function(event) {
    if (!nameInput.value.match(lettersOnlyRegex)) {
        nameInput.setCustomValidity('Please enter letters only');
    } else {
        nameInput.setCustomValidity('');
    }
});

surnameInput.addEventListener('input', function(event) {
    if (!surnameInput.value.match(lettersOnlyRegex)) {
        surnameInput.setCustomValidity('Please enter letters only');
    } else {
        surnameInput.setCustomValidity('');
    }
});


