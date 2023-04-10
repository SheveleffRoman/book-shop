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
    console.log(dataArray); // Выведет массив данных
    createCards(dataArray);// сделает карточки и заполнит
    openModal(); // открываем и закрывваем окно
    closeModal();
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

// const main = document.querySelector('main');
const body = document.querySelector('body');
const wrapper = createHTMLTag(body, 'div', {'class': 'wrapper'},'', 'afterbegin')
const header = createHTMLTag(wrapper, 'header');
const logoDiv = createHTMLTag(header, 'div', {'class': 'logo'},'<h1 class="title">Book Heaven</h1><h2 class="subTitle">Discover Your Next Favorite Read</h2>');
const bagDiv = createHTMLTag(header, 'div', {'class': 'bag'}, '<i class="fa-solid fa-cart-shopping fa-2xl"></i><span class="itemsBag"><span>1</span></span><span>Your cart</span>');
const main = createHTMLTag(wrapper,'main')
const bookCatalog = createHTMLTag(main, 'div', {'class': 'bookCatalog'})



const modalWindow = createHTMLTag(wrapper, 'div', {'class': 'modalWindowContainer hideModal'},'', 'afterend');
const imgModal = createHTMLTag(modalWindow, 'div', {'class':'imgModal'}, '');
const img = createHTMLTag(imgModal, 'img', {'src': ''});
const descriptionModal = createHTMLTag(modalWindow, 'div', {'class': 'descrModal'}, '');
const description = createHTMLTag(descriptionModal, 'div', {'class': 'description'}, '')
const authorDescr = createHTMLTag(descriptionModal, 'div', {'class': 'author'}, '');
const titleDescr = createHTMLTag(descriptionModal,'div', {'class':'title'},'')
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
        createHTMLTag(bookCatalog, 'div', {'id': `${arr.indexOf(item) + 1}`, 'class': 'card'},
            `<img class="bookCardLogo" src="${item.imageLink}" alt="">
                    <div class="bookCreds"><div class="bookTitle"><h3>${item.title}</h3></div>
                    <div class="bookAuthor"><h4>${item.author}</h4></div></div>
                    <button class="showMore" data-id="${arr.indexOf(item)}">Show More</button>
                    <div class="buy"><div class="bookPrice">$${item.price}</div>
                    <button class="addToCart">Add to Cart</button></div>`)
    });
}

function openModal() {
    const buttons = document.querySelectorAll('button.showMore');
    console.log(buttons);
    buttons.forEach((item) => {
        item.addEventListener('click', () => {
            pasteContentModalWindow(item.dataset.id);
            modalWindow.classList.remove('hideModal')
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
    modalCloseBtn.addEventListener('click', () => modalWindow.classList.add('hideModal'))
}