let cartCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*=\s*([^;]*).*$)|^.*$/, "$1");
let cart = JSON.parse(cartCookie);
console.log(cart);

let dataArray;

function getData() {
    return fetch('./assets/books.json')
        .then(response => response.json())
        .then(data => {
            dataArray = data;
            return dataArray;
        })
        .catch(error => console.error(error));
}

getData().then(dataArray => {
    runCart();
});

function createHTMLTag(parentElement = null, tagName, attributes = {}, content = '', where = 'beforeend') {
    const element = document.createElement(tagName);

    // Добавляем произвольные атрибуты: id, class, etc
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    // Добавляем произвольный контент
    if (content !== '') {
        element.innerHTML = content;
    }

    // Вставляем элемент после указанного родительского элемента
    if (parentElement !== null) {
        parentElement.insertAdjacentElement(where, element);
    }

    return element;
}

// const form = document.querySelector('form');
// const nameInput = form.querySelector('#name');
// const surnameInput = form.querySelector('#surname');
// const streetInput = form.querySelector('#street');
// const houseNumberInput = form.querySelector('#house-number');
// const flatNumberInput = form.querySelector('#flat-number');
// const deliveryDateInput = form.querySelector('#delivery-date');
// const paymentInputs = form.querySelectorAll('input[name="payment"]');
// const giftsInputs = form.querySelectorAll('input[name="gifts"]');


const errorMessages = {
    name: 'Enter your name',
    surname: 'Enter your surname',
    patternLetters: 'Only latin or cyrillic letters required',
    street: 'Enter street',
    houseNumber: 'Enter house number',
    patternHouse: 'Positive numbers only',
    patternFlat: 'Positive numbers only. Separating dash symbol is allowed',
    flatNumber: 'Enter flat number',
    deliveryDate: 'Choose delivery date (not earlier than tomorrow)',
    payment: 'Choose a payment method',
    gifts: 'Choose only two gifts',
};


const form = document.getElementById('formCheckout');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function (event) {
    if (!nameInput.validity.valid) {
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
    } else if (!dateInput.validity.valid) {
        showErrorDate();
        event.preventDefault();
    } else if (!cash.validity.valid) {
        showErrorPay();
        event.preventDefault();
    } else if (!card.validity.valid) {
        showErrorPay();
        event.preventDefault();
    } else if (errorGifts.textContent === errorMessages.gifts) {
        event.preventDefault();
    }
});

form.addEventListener('input', () => {
    if (nameInput.validity.valid && surnameInput.validity.valid && streetInput.validity.valid
        && houseInput.validity.valid && flatInput.validity.valid && dateInput.validity.valid && cash.validity.valid && card.validity.valid) {
        submitButton.removeAttribute('disabled')
    }
})


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
        nameInput.classList.remove('invalid')
    } else {
        // Если поле не валидно, показываем ошибку
        submitButton.setAttribute('disabled', 'true');
        nameInput.classList.add('invalid')
        showErrorName();
    }
})

// nameInput.addEventListener('focusin', () => {
//     if (nameInput.validity.valid) {
//         errorName.textContent = '';
//         errorName.className = 'error';
//         nameInput.classList.remove('invalid')
//     } else {
//         submitButton.setAttribute('disabled', 'true');
//         nameInput.classList.add('invalid')
//         showErrorName();
//     }
// })

nameInput.addEventListener('focusout', () => {
    if (nameInput.validity.valid) {
        errorName.textContent = '';
        errorName.className = 'error';
        nameInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        nameInput.classList.add('invalid');
        showErrorName();
    }
})


function showErrorName() {
    if (nameInput.validity.valueMissing) {
        errorName.textContent = errorMessages.name;
    } else if (nameInput.validity.patternMismatch) {
        errorName.textContent = errorMessages.patternLetters;
    } else if (nameInput.validity.tooShort) {
        errorName.textContent = `Name should be at least ${nameInput.minLength} characters; you entered ${nameInput.value.length}.`;
    }
    errorName.className = 'error active';
}


//surname
const surnameInput = document.getElementById('surname');
const errorSurname = document.querySelector('#surname + span.error');

surnameInput.addEventListener('input', () => {
    if (surnameInput.validity.valid) {
        errorSurname.textContent = '';
        errorSurname.className = 'error';
        surnameInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        surnameInput.classList.add('invalid');
        showErrorSurname();
    }
})

surnameInput.addEventListener('focusout', () => {
    if (surnameInput.validity.valid) {
        errorSurname.textContent = '';
        errorSurname.className = 'error';
        surnameInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        surnameInput.classList.add('invalid');
        showErrorSurname();
    }
})

function showErrorSurname() {
    if (surnameInput.validity.valueMissing) {
        errorSurname.textContent = errorMessages.surname;
    } else if (surnameInput.validity.patternMismatch) {
        errorSurname.textContent = errorMessages.patternLetters;
    } else if (surnameInput.validity.tooShort) {
        errorSurname.textContent = `Surname should be at least ${surnameInput.minLength} characters; you entered ${surnameInput.value.length}.`;
    }
    errorSurname.className = 'error active';
}

//street
const streetInput = document.getElementById('street');
const errorStreet = document.querySelector('#street + span.error');

streetInput.addEventListener('input', () => {
    if (streetInput.validity.valid) {
        errorStreet.textContent = '';
        errorStreet.className = 'error';
        streetInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        streetInput.classList.add('invalid');
        showErrorStreet()
    }
})

streetInput.addEventListener('focusout', () => {
    if (streetInput.validity.valid) {
        errorStreet.textContent = '';
        errorStreet.className = 'error';
        streetInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        streetInput.classList.add('invalid');
        showErrorStreet();
    }
})

function showErrorStreet() {
    if (streetInput.validity.valueMissing) {
        errorStreet.textContent = errorMessages.street;
    } else if (streetInput.validity.tooShort) {
        errorStreet.textContent = `Street should be at least ${streetInput.minLength} characters; you entered ${streetInput.value.length}.`;
    }
    errorStreet.className = 'error active';
}

//house
const houseInput = document.getElementById('house-number');
const errorHouse = document.querySelector('#house-number + span.error');

houseInput.addEventListener('input', () => {
    if (houseInput.validity.valid) {
        errorHouse.textContent = '';
        errorHouse.className = 'error';
        houseInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        houseInput.classList.add('invalid')
        showErrorHouse()
    }
})

houseInput.addEventListener('focusout', () => {
    if (houseInput.validity.valid) {
        errorHouse.textContent = '';
        errorHouse.className = 'error';
        houseInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        houseInput.classList.add('invalid')
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
        errorFlat.className = 'error';
        flatInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        flatInput.classList.add('invalid')
        showErrorFlat()
    }
})

flatInput.addEventListener('focusout', () => {
    if (flatInput.validity.valid) {
        errorFlat.textContent = '';
        errorFlat.className = 'error';
        flatInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        flatInput.classList.add('invalid')
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
const dateInput = document.getElementById('delivery-date');
const errorDate = document.querySelector('#delivery-date + span.error');
dateInput.addEventListener('input', () => {
    if (dateInput.validity.valid) {
        errorDate.textContent = '';
        errorDate.className = 'error';
        dateInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        dateInput.classList.add('invalid');
        showErrorDate()
    }
})

dateInput.addEventListener('focusout', () => {
    if (dateInput.validity.valid) {
        errorDate.textContent = '';
        errorDate.className = 'error';
        dateInput.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        dateInput.classList.add('invalid');
        showErrorDate()
    }
})

function showErrorDate() {
    if (dateInput.validity.valueMissing) {
        errorDate.textContent = errorMessages.deliveryDate
    } else if (dateInput.value < minDate) {
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
// document.getElementById("delivery-date").setAttribute("value", minDate);

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
        errorPay.className = 'error';
        cash.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        cash.classList.add('invalid');
        showErrorPay()
    }
})

cash.addEventListener('focusout', () => {
    if (cash.validity.valid) {
        errorPay.textContent = '';
        errorPay.className = 'error';
        cash.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        cash.classList.add('invalid');
        showErrorPay()
    }
})

card.addEventListener('input', () => {
    if (card.validity.valid) {
        errorPay.textContent = '';
        errorPay.className = 'error';
        card.classList.remove('invalid')
    } else {
        submitButton.setAttribute('disabled', 'true');
        card.classList.add('invalid');
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
    gifts[i].addEventListener('change', function () {
        let checkedCount = 0;
        for (let j = 0; j < gifts.length; j++) {
            if (gifts[j].checked) {
                checkedCount++;
            }
        }
        if (checkedCount > 2) {
            showErrorGifts();
            submitButton.setAttribute('disabled', 'true')
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

const subTotal = document.querySelector('.subTotal')
submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = new FormData(form); // создаем FormData на основе формы

    // перебираем все чекбоксы
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    let selectedGifts = []; // создаем пустой массив для выбранных чекбоксов
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) { // если чекбокс выбран, добавляем его значение в массив
            selectedGifts.push(checkbox.value);
        }
    });

    // добавляем выбранные значения в объект FormData
    formData.append('selectedGifts', selectedGifts);
    const data = Object.fromEntries(formData.entries())
    console.log(data);
    /*let data = {};
    for (let [name, value] of formData) {
        if (data[name]) {
            if (!Array.isArray(data[name])) {
                data[name] = [data[name]];
            }
            data[name].push(value);
        } else {
            data[name] = value;
        }
    }
    console.log(data);*/

    const giftsString = selectedGifts.join(", ");

    subTotal.innerHTML = `<h1>Your order successfully created</h1>
                          <div>
                          <div>Customer: ${data.name} ${data.surname}</div>
                          <div>Delivery address: ${data.street} ${data['house-number'
        ]}, flat: ${data['flat-number']}</div>
                          <div>Date: ${data['delivery-date']}</div>
                          <div>Payment type: ${data.payment}</div>
                          <div>Gifts: ${giftsString}</div>
                          <a class="toMain" href="./index.html">To main page</a>
</div>`
    subTotal.classList.remove('hide')
    submitForm()
})

function submitForm() {
    const goMainPage = document.querySelector('.toMain')
    goMainPage.addEventListener('click', () => {
        form.submit()
    })

}


const cartSection = document.querySelector('.cartSection')
console.log(cartSection)

function runCart() {
    const cartDiv = createHTMLTag(cartSection, 'div', {'class': 'cart', 'id': 'cart'}, '', 'afterbegin');
    const cartName = createHTMLTag(cartDiv, 'h2', {}, 'Cart');
    const cartItems = createHTMLTag(cartDiv, 'ul', {'class': 'cart-items'});
    const totalPrice = createHTMLTag(cartDiv, 'p', {'class': 'price'}, `Total price: <span class="total-price">$0</span>`);

    renderCart()

    function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        cart.forEach((item, index) => {
            const li = createHTMLTag(cartItems, 'li', {'class': 'mini-card'},
                `<div class="mini-card-content"><img class="img-mini" src="${item.img}"><div class="mini-card-creds"><h5 class="mini-card-title">${dataArray[item.id].title}</h5><h5 class="mini-card-author">${dataArray[item.id].author}</h5></div></div><div class="mini-card-order">$${item.price} x <input type="number" value="${item.quantity}" min="1" max="5"> <button class="remove-from-cart" data-id="${item.id}">&#128465;</button></div>`);

            li.querySelector(".remove-from-cart").addEventListener("click", () => {
                removeFromCart(index);
                if (cart.length < 1) {
                    const exit = document.querySelector('.goMain')
                    window.location.href = exit.href

                }
            });

            li.querySelector("input").addEventListener("change", (event) => {
                const quantity = parseInt(event.target.value);
                if (quantity <= 0) {
                    removeFromCart(index);
                    if (cart.length >= 1) {
                        return;
                    }
                    const exit = document.querySelector('.goMain')
                    window.location.href = exit.href
                } else {
                    cart[index].quantity = quantity;
                    renderCart();
                }
            });
        })

        const totalPriceSelector = document.querySelector(".total-price");
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalPriceSelector.textContent = `$${total}`;
    }
}