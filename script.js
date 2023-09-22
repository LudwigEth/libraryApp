const libraryGrid = document.getElementById('libraryGrid');
const addBookButton = document.getElementById('addBookButton');

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

