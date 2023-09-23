const libraryGrid = document.getElementById('libraryGrid');
const addBookButton = document.getElementById('addBookButton');
const bookModal = document.getElementById('bookModal');
const bookForm = document.getElementById('bookForm');
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');
const bookPagesInput = document.getElementById('bookPages');

const library = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
};

function hasInvalidType(title, author, pages) {
    return  typeof title !== 'string' ||
            typeof author !== 'string' ||
            typeof pages !== 'string'
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
    const readOrNotButton = document.createElement('button');

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

addBookButton.addEventListener('click', openBookModal);

function openBookModal() {
    bookModal.showModal();
    bookModal.addEventListener('click', outsideBookModalClick);
    console.log("ez");
};

function closeBookModal() {
    bookModal.close();
    bookModal.removeEventListener('click', outsideBookModalClick);
    console.log("pz");
};

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

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = bookTitleInput.value;
    const author = bookAuthorInput.value;
    const pages = bookPagesInput.value;

    addBookToLibrary(title, author, pages);
    createBookCard(title, author, pages);

    closeBookModal();
});