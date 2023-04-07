const books = [];

fetch('./assets/books.json') // path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        books.push(...data);
        console.log(books);
        createCards(books);
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

const main = document.querySelector('main');
const header = createHTMLTag(main, 'header', {'class': 'wrapper'},'', 'beforebegin');
const logoDiv = createHTMLTag(header, 'div', {'class': 'logo'},'<h1 class="title">Book Heaven</h1><h2 class="subTitle">Discover Your Next Favorite Read</h2>')
const bagDiv = createHTMLTag(header, 'div', {'class': 'bag'}, '<i class="fa-solid fa-cart-shopping fa-2xl"></i><span class="itemsBag"><span>1</span></span><span>Your cart</span>')
const bookCatalog = createHTMLTag(main, 'div', {'class': 'bookCatalog'})

function createCards() {
    books.forEach((item) => {
        createHTMLTag(bookCatalog, 'div', {'id': `${books.indexOf(item) + 1}`, 'class': 'card'},
            `<img class="bookCardLogo" src="${item.imageLink}" alt="">
                    <div class="bookCreds"><div class="bookTitle"><h3>${item.title}</h3></div>
                    <div class="bookAuthor"><h4>${item.author}</h4></div></div>
                    <button class="showMore">Show More</button>
                    <div class="buy"><div class="bookPrice">$${item.price}</div>
                    <button class="addToCart">Add to Cart</button></div>`)
    });
}





