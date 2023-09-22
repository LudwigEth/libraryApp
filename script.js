const libraryGrid = document.getElementById('libraryGrid');
const addBookButton = document.getElementById('addBookButton');
const bookModal = document.getElementById('bookModal');
const bookForm = document.getElementById('bookForm');

const library = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
};

function hasInvalidType(title, author, pages) {
    return  typeof title !== 'string' ||
            typeof author !== 'string' ||
            typeof pages !== 'number'
};

function addBookToLibrary(title, author, pages) {
    if (hasInvalidType(title, author, pages)) return;

    const newBook = new Book(title, author, pages);

    library.push(newBook);
};

function createBookCard(title, author, pages) {
    if (hasInvalidType(title, author, pages)) return;

    const newBookDiv = document.createElement('div');
    const bookTitleElement = document.createElement('h3');
    const bookAuthorElement = document.createElement('p');
    const bookPagesElement = document.createElement('p');
    const readOrNotButton = document.createElement('button')

    newBookDiv.classList.add('new-book');
    bookTitleElement.classList.add('book-title');
    bookAuthorElement.classList.add('book-author');
    bookPagesElement.classList.add('book-pages');
    readOrNotButton.classList.add('not-read');

    readOrNotButton.setAttribute('type', 'button');

    bookTitleElement.textContent = title;
    bookAuthorElement.textContent = author;
    bookPagesElement.textContent = pages;
    readOrNotButton.textContent = 'not read';

    newBookDiv.appendChild(bookTitleElement);
    newBookDiv.appendChild(bookAuthorElement);
    newBookDiv.appendChild(bookPagesElement);
    newBookDiv.appendChild(readOrNotButton);

    libraryGrid.appendChild(newBookDiv);
};


// modal functionality

function openBookModal() {
    bookModal.showModal();
    document.addEventListener('click', outsideBookModalClick);
};

function closeBookModal() {
    bookModal.close();
    document.removeEventListener('click', outsideBookModalClick);
}

function outsideBookModalClick(e) {
    const bookModalDimensions = bookModal.getBoundingClientRect();
    if (
        e.clientX < bookModalDimensions.left    ||
        e.clientX > bookModalDimensions.right   ||
        e.clientY < bookModalDimensions.top     ||
        e.clientY > bookModalDimensions.bottom
    ) {
        closeBookModal();
    }
};

addBookButton.addEventListener('click', openBookModal);