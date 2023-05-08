let myLibrary = JSON.parse(localStorage.getItem('books')) || [];

const container = document.querySelector('.container');
const modal = document.querySelector('dialog');
const btnModal = document.querySelector('.btn-header');
const btnModalClose = document.querySelector('.btn-close button');
const form = document.querySelector('form');

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');


btnModal.addEventListener('click', () => modal.showModal());
btnModalClose.addEventListener('click', () => modal.close());

form.addEventListener('submit', createBook);

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.addToLib = function () {
    myLibrary.push(this);
}


function createBook(e) {
    // e.preventDefault();
    const book = new Book(title.value, author.value, pages.value, read.checked)
    book.addToLib();
    
    updateDisplay(myLibrary);
    form.reset();

}

function addFeatures() {
    const btnDel = document.querySelectorAll('.btn-delete button');
    btnDel.forEach(btn => {
        btn.addEventListener('click', removeItem);
    })
}

function removeItem() {
    myLibrary.splice(this.dataset.id,1)
    updateDisplay(myLibrary)
}

function updateLocalstorage() {
    localStorage.setItem('books', JSON.stringify(myLibrary));
}

function reset() {
    const allBooks = document.querySelectorAll('.item-container');
    allBooks.forEach(book => book.remove());
}

function updateDisplay(arr) {
    updateLocalstorage();
    reset();

    arr.map((book, index) => {
        const div = document.createElement('div');
        div.classList.add('item-container')
        
        book.index = index;

        const readSpan = book.isRead ? "👍" : "👎";

        div.innerHTML = `
            <div class="item">
                <p class="el title" data-style="title">${book.title}</p>
                <p class="el author" data-style="author"><span>by</span>${book.author}</p>
                <p class="el pages" data-style="pages"><span>${book.pages} Pages</p>
                <p class="el read" data-style="read">Read <span>${readSpan}</span>
            </div>
            <div class="btn-delete">
                <button data-id="${index}">Delete <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 0V1.66667H0V5H1.5V26.6667C1.5 27.5507 1.81607 28.3986 2.37868 29.0237C2.94129 29.6488 3.70435 30 4.5 30H19.5C20.2956 30 21.0587 29.6488 21.6213 29.0237C22.1839 28.3986 22.5 27.5507 22.5 26.6667V5H24V1.66667H16.5V0H7.5ZM4.5 5H19.5V26.6667H4.5V5ZM7.5 8.33333V23.3333H10.5V8.33333H7.5ZM13.5 8.33333V23.3333H16.5V8.33333H13.5Z" fill="white"/>
            </svg></button>
            </div>    
        `
        container.appendChild(div);

        addFeatures();
        
    })
    
}

updateDisplay(myLibrary);

