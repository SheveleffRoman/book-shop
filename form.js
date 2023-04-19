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

const errorMessages = {
    name: 'Enter your name',
    surname: 'Enter your surname',
    patternLetters: 'Only latin or cyrillic letters required',
    street: 'Enter street',
    houseNumber: 'Enter house number',
    patternHouse: 'Positive numbers only',
    patternFlat: 'Positive numbers only. Separating dash symbol is allowed',
    flatNumber: 'Enter flat number',
    deliveryDate: 'Выберите дату доставки (не ранее завтрашнего дня)',
    payment: 'Выберите способ оплаты',
    gifts: 'Выберите два подарка',
};


const form  = document.getElementById('formCheckout');
form.addEventListener('submit', function (event) {
    // Если поле email валдно, позволяем форме отправляться

    if(!nameInput.validity.valid) {
        showErrorName();
        event.preventDefault();
    } else if (!surnameInput.validity.valid) {
        showErrorSurname();
        event.preventDefault();
    } else if (!streetInput.validity.valid) {
        showErrorStreet();
        event.preventDefault();
    } else if (!houseInput.validity.valid) {
        showErrorHouse();
        event.preventDefault();
    } else if (!flatInput.validity.valid) {
        showErrorFlat();
        event.preventDefault();
    } else if (!date.validity.valid) {
        showErrorDate();
        event.preventDefault()
    }
    else if (!cash.validity.valid) {
        showErrorPay();
        event.preventDefault();
    } else if (!card.validity.valid) {
        showErrorPay();
        event.preventDefault();
    } else if (errorGifts.textContent === errorMessages.gifts) {
        event.preventDefault();
    }
});


// name
const nameInput = document.getElementById('name');
const errorName = document.querySelector('#name + span.error');
// const lettersOnlyRegex = /^[a-zA-Z]+$/;

nameInput.addEventListener('input', () => {
    if (nameInput.validity.valid) {
        // Если на момент валидации какое-то сообщение об ошибке уже отображается,
        // если поле валидно, удаляем сообщение
        errorName.textContent = ''; // Сбросить содержимое сообщения
        errorName.className = 'error'; // Сбросить визуальное состояние сообщения
    } else {
        // Если поле не валидно, показываем правильную ошибку
        showErrorName();
    }
})

function showErrorName() {
    if(nameInput.validity.valueMissing) {
        errorName.textContent = errorMessages.name;
    } else if(nameInput.validity.patternMismatch) {
        errorName.textContent = errorMessages.patternLetters;
    } else if(nameInput.validity.tooShort) {
        errorName.textContent = `Name should be at least ${ nameInput.minLength } characters; you entered ${ nameInput.value.length }.`;
    }
    errorName.className = 'error active';
}


//surname
const surnameInput = document.getElementById('surname');
const errorSurname = document.querySelector('#surname + span.error');

surnameInput.addEventListener('input', () => {
    if (surnameInput.validity.valid) {
        // Если на момент валидации какое-то сообщение об ошибке уже отображается,
        // если поле валидно, удаляем сообщение
        errorSurname.textContent = ''; // Сбросить содержимое сообщения
        errorSurname.className = 'error'; // Сбросить визуальное состояние сообщения
    } else {
        // Если поле не валидно, показываем правильную ошибку
        showErrorSurname();
    }
})

function showErrorSurname() {
    if(surnameInput.validity.valueMissing) {
        errorSurname.textContent = errorMessages.surname;
    } else if(surnameInput.validity.patternMismatch) {
        errorSurname.textContent = errorMessages.patternLetters;
    } else if(surnameInput.validity.tooShort) {
        errorSurname.textContent = `Surname should be at least ${ surnameInput.minLength } characters; you entered ${ surnameInput.value.length }.`;
    }
    errorSurname.className = 'error active';
}

//street
const streetInput = document.getElementById('street');
const errorStreet = document.querySelector('#street + span.error');

streetInput.addEventListener('input', () => {
    if (streetInput.validity.valid) {
        // Если на момент валидации какое-то сообщение об ошибке уже отображается,
        // если поле валидно, удаляем сообщение
        errorStreet.textContent = ''; // Сбросить содержимое сообщения
        errorStreet.className = 'error'; // Сбросить визуальное состояние сообщения
    } else {
        // Если поле не валидно, показываем правильную ошибку
        showErrorStreet();
    }
})

function showErrorStreet() {
    if(streetInput.validity.valueMissing) {
        errorStreet.textContent = errorMessages.street;
    } else if(streetInput.validity.tooShort) {
        errorStreet.textContent = `Street should be at least ${ streetInput.minLength } characters; you entered ${ streetInput.value.length }.`;
    }
    errorStreet.className = 'error active';
}

//house
const houseInput = document.getElementById('house-number');
const errorHouse = document.querySelector('#house-number + span.error');

houseInput.addEventListener('input', () => {
    if (houseInput.validity.valid) {
        errorHouse.textContent = '';
        errorHouse.className = 'error'
    } else {
        showErrorHouse()
    }
})

function showErrorHouse() {
    if (houseInput.validity.valueMissing) {
        errorHouse.textContent = errorMessages.houseNumber;
    } else if (houseInput.validity.tooShort) {
        errorHouse.textContent = `House number should be at least ${houseInput.minLength} characters`;
    } else if (houseInput.textContent < 1) {
        errorHouse.textContent = errorMessages.patternHouse;
    } else if (houseInput.validity.typeMismatch) {
        errorHouse.textContent = errorMessages.patternHouse;
    }
    errorHouse.className = 'error active';
}

//flat
const flatInput = document.getElementById('flat-number');
const errorFlat = document.querySelector('#flat-number + span.error');

flatInput.addEventListener('input', () => {
    if (flatInput.validity.valid) {
        errorFlat.textContent = '';
        errorFlat.className = 'error'
    } else {
        showErrorFlat()
    }
})

function showErrorFlat() {
    if (flatInput.validity.valueMissing) {
        errorFlat.textContent = errorMessages.flatNumber;
    } else if (flatInput.validity.patternMismatch) {
        errorFlat.textContent = errorMessages.patternFlat;
    }
    errorFlat.className = 'error active';
}


//date
const date = document.getElementById('delivery-date');
const errorDate = document.querySelector('#delivery-date + span.error');
date.addEventListener('input', () => {
    if (date.validity.valid) {
        errorDate.textContent = '';
        errorDate.className = 'error'
    } else {
        showErrorDate()
    }
})

function showErrorDate() {
    if (date.validity.valueMissing) {
        errorDate.textContent = errorMessages.deliveryDate
    }
    errorDate.className = 'error active';
}



// min date
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const minDate = tomorrow.toISOString().split('T')[0];
document.getElementById("delivery-date").setAttribute("min", minDate);

// max date
// const thirtyDay = new Date(today);
// thirtyDay.setDate(today.getDate() + 30);
// const maxDate = thirtyDay.toISOString().split('T')[0];
// document.getElementById("delivery-date").setAttribute("max", maxDate);

//payment
const cash = document.getElementById('cash');
const card = document.getElementById('card');
const errorPay = document.querySelector('#payment > span.error');

cash.addEventListener('input', () => {
    if (cash.validity.valid) {
        errorPay.textContent = '';
        errorPay.className = 'error'
    } else {
        showErrorPay()
    }
})

card.addEventListener('input', () => {
    if (card.validity.valid) {
        errorPay.textContent = '';
        errorPay.className = 'error'
    } else {
        showErrorPay()
    }
})

function showErrorPay() {
    if (cash.validity.valueMissing) {
        errorPay.textContent = errorMessages.payment;
    }
    errorPay.className = 'error active';
}

//gifts
const gifts = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < gifts.length; i++) {
    gifts[i].addEventListener('change', function() {
        let checkedCount = 0;
        for (let j = 0; j < gifts.length; j++) {
            if (gifts[j].checked) {
                checkedCount++;
            }
        }
        if (checkedCount > 2) {
            showErrorGifts()
        } else {
            errorGifts.textContent = '';
            errorGifts.className = 'error';
        }
    });
}
const errorGifts = document.querySelector('#gifts > span.error')
function showErrorGifts() {
    errorGifts.textContent = errorMessages.gifts;
    errorGifts.className = 'error active';
}