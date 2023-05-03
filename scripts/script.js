let dataArray;

function getData() {
    return fetch('../assets/books.json')
        .then(response => response.json())
        .then(data => {
            dataArray = data;
            return dataArray;
        })
        .catch(error => console.error(error));
}

getData().then(dataArray => {
    console.log(dataArray); // Выведет массив данных
    createCards(dataArray);// сделает карточки и заполнит
    openModal(); // открываем и закрывваем окно
    closeModal();
    runCart(); //  делает всю работу с карточками и корзиной
    dragAndDrop(); // перетаскивания карточек
});

// import {createHTMLTag} from "./createElem.js";
import {createHTMLTag} from "./createElem.js";

// const main = document.querySelector('main');
const body = document.querySelector('body');
const wrapper = createHTMLTag(body, 'div', {'class': 'wrapper'}, '', 'afterbegin')
const header = createHTMLTag(wrapper, 'header');
const logoDiv = createHTMLTag(header, 'div', {'class': 'logo'}, '<h1 class="title">Book Heaven</h1><h2 class="subTitle">Discover Your Next Favorite Read</h2>');
const bagDiv = createHTMLTag(header, 'div', {
    'id': 'bag',
    'class': 'bag'
}, '<i class="fa-solid fa-cart-shopping fa-2xl"></i><span class="itemsBag zero"><span>0</span></span><span>Your cart</span>');
const main = createHTMLTag(wrapper, 'main')
const bookCatalog = createHTMLTag(main, 'div', {'id': 'catalog', 'class': 'bookCatalog'});

const modalWindow = createHTMLTag(wrapper, 'div', {'class': 'modalWindowContainer hideModal'}, '', 'afterend');
const imgModal = createHTMLTag(modalWindow, 'div', {'class': 'imgModal'}, '');
const img = createHTMLTag(imgModal, 'img', {'src': ''});
const descriptionModal = createHTMLTag(modalWindow, 'div', {'class': 'descrModal'}, '');
const description = createHTMLTag(descriptionModal, 'div', {'class': 'description'}, '')
const authorDescr = createHTMLTag(descriptionModal, 'div', {'class': 'author'}, '');
const titleDescr = createHTMLTag(descriptionModal, 'div', {'class': 'title'}, '')
const modalCloseBtn = createHTMLTag(modalWindow, 'button', {'class': 'modalClose', 'id': 'modalClose'}, 'X');


/*function logClick() {
    const elements = document.querySelectorAll('*'); // выбираем все элементы на странице

    // добавляем обработчик клика на каждый элемент
    elements.forEach(function(element) {
        element.addEventListener('click', function(event) {
            console.log(event.target); // выводим элемент на который был клик в консоль
            event.stopPropagation(); // останавливаем всплытие события
        });
    });
}


logClick();*/

function createCards(arr) {
    arr.forEach((item) => {
        createHTMLTag(bookCatalog, 'div', {'id': `${arr.indexOf(item)}`, 'class': 'card', 'draggable': "true"},
            `<img class="bookCardLogo" src="${item.imageLink}" alt="${item.title}">
                    <div class="bookCreds"><div class="bookTitle"><h3>${item.title}</h3></div>
                    <div class="bookAuthor"><h4>${item.author}</h4></div></div>
                    <button class="showMore" data-id="${arr.indexOf(item)}">Show More</button>
                    <div class="buy"><div class="bookPrice">$${item.price}</div>
                    <button class="addToCart" data-id="${arr.indexOf(item)}" data-price="${item.price}">Add to Cart</button></div>`)
    });
}

function openModal() {
    const buttons = document.querySelectorAll('button.showMore');
    // console.log(buttons);
    buttons.forEach((item) => {
        item.addEventListener('click', () => {
            pasteContentModalWindow(item.dataset.id);
            modalWindow.classList.remove('hideModal');
            body.classList.add('noscroll');
        })
    })
}

function pasteContentModalWindow(i) {
    img.src = `${dataArray[i].imageLink}`;
    description.textContent = `${dataArray[i].description}`;
    authorDescr.textContent = `${dataArray[i].author}`;
    titleDescr.textContent = `${dataArray[i].title}`
}

function closeModal() {
    modalCloseBtn.addEventListener('click', () => {
        modalWindow.classList.add('hideModal');
        body.classList.remove('noscroll');
    })
}


function runCart() {

    const cartDiv = createHTMLTag(main, 'div', {'class': 'cart empty', 'id': 'cart'}, '', 'afterbegin');
    const cartName = createHTMLTag(cartDiv, 'h2', {}, 'Cart');
    const cartItems = createHTMLTag(cartDiv, 'ul', {'class': 'cart-items'});
    const totalPrice = createHTMLTag(cartDiv, 'p', {'class': 'price'}, `Total price: <span class="total-price">$0</span>`);
    const checkout = createHTMLTag(totalPrice, 'a', {'href': './form.html', 'id': 'checkout'}, 'checkout');

    const cartItemsSelector = document.querySelector(".cart-items");
// console.log(cartItemsSelector);

    const totalPriceSelector = document.querySelector(".total-price");
// console.log(totalPrice);

// создаем корзину
    const cart = [];

// Функция добавления товара в корзину
    function addToCart(event) {
        // Получаем цену товара из атрибута data
        const price = parseInt(event.target.dataset.price);
        const imgSrc = dataArray[event.target.dataset.id].imageLink;
        // привяжем дата-аттрибут из кнопки "добавить в корзину
        const id = event.target.dataset.id;

        // Добавляем товар в корзину
        cart.push({id: id, img: imgSrc, price: price, quantity: 1});
        // console.log(cart);
        const counter = document.querySelector('span.itemsBag');
        // console.log(counter);
        const btn = document.querySelector(`button.addToCart[data-id="${event.target.dataset.id}"]`);
        // console.log(btn);
        const card = document.getElementById(`${event.target.dataset.id}`);
        card.classList.add('inCart');
        btn.setAttribute('disabled', 'true')
        btn.textContent = 'Added!'
        counter.classList.remove('zero');
        counter.firstChild.textContent = cart.length;
        cartDiv.classList.remove('empty');


        // Обновляем элементы корзины
        renderCart();
    }

// Функция удаления товара из корзины
    function removeFromCart(index) {
        cart.splice(index, 1);

        const counter = document.querySelector('span.itemsBag');
        counter.classList.remove('zero');
        counter.firstChild.textContent = cart.length;
        if (cart.length < 1) {
            counter.classList.add('zero');
            cartDiv.classList.add('empty');
        }
        renderCart();
    }

// Получаем кнопки "Add to cart"
    const addToCartButtons = document.querySelectorAll("button.addToCart");
// console.log(addToCartButtons);

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", addToCart);
    });


    // const checkoutBtn = document.getElementById('checkout');
    // console.log(checkoutBtn);
    // checkoutBtn.addEventListener("click", function (event) {
    //     // Отменяем стандартное поведение ссылки, чтобы не переходить на новую страницу
    //     event.preventDefault();
    //
    //     // Получаем данные корзины и преобразуем их в строку JSON
    //     let cartJson = JSON.stringify(cart);
    //     console.log(cartJson)
    //
    //     // Сохраняем данные корзины в cookie
    //     document.cookie = "cart=" + cartJson + "; path=/";
    //     console.log(document.cookie)
    //
    //     // Переходим на страницу оформления заказа
    //     window.location.href = this.href;
    // });

    const checkoutBtn = document.getElementById('checkout');
    bagDiv.addEventListener('click', proceedToCheckout);
    checkoutBtn.addEventListener('click', proceedToCheckout);

    function proceedToCheckout(event) {
        event.preventDefault();

        // Получаем данные корзины и преобразуем их в строку JSON
        let cartJson = JSON.stringify(cart);
        // console.log(cartJson)

        // Сохраняем данные корзины в cookie
        document.cookie = "cart=" + cartJson + "; path=/";
        // console.log(document.cookie);
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        window.location.href = checkoutBtn.href;
    }


    function renderCart() {
        // Очищаем элементы корзины
        cartItems.innerHTML = "";

        // Обходим все товары в корзине
        cart.forEach((item, index) => {
            // Создаем элемент списка товаров в корзине
            // в кнопку удаления записываем дата-аттрибут из кнопки "добавить в корзину", чтоб их связать
            const li = createHTMLTag(cartItems, 'li', {'class': 'mini-card'},
                `<div class="mini-card-content"><img class="img-mini" src="${item.img}" alt="${dataArray[item.id].title}"><div class="mini-card-creds"><h5 class="mini-card-title">${dataArray[item.id].title}</h5><h5 class="mini-card-author">${dataArray[item.id].author}</h5></div></div><div class="mini-card-order">$${item.price} x <input type="number" value="${item.quantity}" min="1" max="5"> <button class="remove-from-cart" data-id="${item.id}">&#128465;</button></div>`);


            // Добавляем обработчик события на кнопку удаления товара из корзины
            li.querySelector(".remove-from-cart").addEventListener("click", () => {
                removeFromCart(index);
                // снова включаем кнопку добавление в корзину
                const btn = document.querySelector(`button.addToCart[data-id="${item.id}"]`);
                // console.log(btn);
                btn.removeAttribute('disabled');
                btn.textContent = 'Add to Cart';
                const card = document.getElementById(`${event.target.dataset.id}`);
                card.classList.remove('inCart')

            });

            // Добавляем обработчик события на поле ввода количества товара
            li.querySelector("input").addEventListener("change", (event) => {
                const quantity = parseInt(event.target.value);
                if (quantity <= 0) {
                    removeFromCart(index);
                    // на случай, если будет поставлен 0 в количество товара
                    const removeBtn = li.querySelector('input').nextElementSibling;
                    // console.log(removeBtn);
                    const card = document.getElementById(`${removeBtn.dataset.id}`);
                    card.classList.remove('inCart');
                    const btn = document.querySelector(`button.addToCart[data-id="${removeBtn.dataset.id}"]`);
                    btn.removeAttribute('disabled');
                    btn.textContent = 'Add to Cart';
                } else {
                    cart[index].quantity = quantity;
                    renderCart();
                }
            });
        });

        // Обновляем общую стоимость
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalPriceSelector.textContent = `$${total}`;
    }
}

// drag and drop

function dragAndDrop() {
    const catalog = document.getElementById("catalog");
    // console.log(catalog)
    const cartIcon = document.getElementById("bag"); // иконка
    // console.log(cart)
    const cartZone = document.getElementById('cart'); // зона корзины, когда непустая
    // console.log(cartZone)

// dragstart для каждой карточки товара
    const cards = catalog.querySelectorAll(".card");
    console.log(cards)
    cards.forEach(card => {
        card.addEventListener("dragstart", event => {
            // найдем id перетаскиваемого элемента, далее он пригодится для поиска кнопок
            event.dataTransfer.setData("text/plain", card.id);
            // Устанавливаем разрешение на перемещение курсора в виде копии карточки
            event.dataTransfer.effectAllowed = "copy";
        });
    });

// dragover для иконки корзины
    cartIcon.addEventListener("dragover", event => {
        // убираем стандартное поведение браузера, чтобы корзина стала активна
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    });

// drop для иконки корзины
    cartIcon.addEventListener("drop", event => {
        event.preventDefault();
        // console.log(event);
        // Получаем id перетаскиваемого элемента из данных перетаскивания
        const cardId = event.dataTransfer.getData("text/plain");
        // console.log(cardId);
        // найдем нужную кнопку Add to cart и делаем по ней клик
        const addBtn = document.querySelector(`.addToCart[data-id="${cardId}"]`);
        // console.log(addBtn)
        addBtn.click();
    });

    // dragover для зоны корзины
    cartZone.addEventListener("dragover", event => {
        // убираем стандартное поведение браузера, чтобы корзина стала активна
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    });
    // drop для зоны корзины
    cartZone.addEventListener("drop", event => {
        event.preventDefault();
        // console.log(event);
        // Получаем id перетаскиваемого элемента из данных перетаскивания
        const cardId = event.dataTransfer.getData("text/plain");
        // console.log(cardId);
        // найдем нужную кнопку Add to cart и делаем по ней клик
        const addBtn = document.querySelector(`.addToCart[data-id="${cardId}"]`);
        // console.log(addBtn)
        addBtn.click();
    });
}