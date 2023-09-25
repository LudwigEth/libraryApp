const libraryGrid = document.getElementById('libraryGrid');
const addBookButton = document.getElementById('addBookButton');
const bookModal = document.getElementById('bookModal');
const bookFormAddBook = document.getElementById('bookFormAddBook');
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');
const bookPagesInput = document.getElementById('bookPages');
const removeBookModal = document.getElementById('removeBookModal');
const confirmRemoval = document.getElementById('confirmRemoval');
const declineRemoval = document.getElementById('declineRemoval');

const library = [];
let bookID = 0;
let lastClickedID = 0;

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
    newBook.id = bookID;

    library.push(newBook);
    createBookCard(title, author, pages, bookID);

    bookID++;
};

function createBookCard(title, author, pages, bookID) {
    if (hasInvalidType(title, author, pages)) return;

    const newBookDiv = document.createElement('div');
    const bookTitleElement = document.createElement('h3');
    const bookAuthorElement = document.createElement('p');
    const bookPagesElement = document.createElement('p');
    const buttonsContainer = document.createElement('div');
    const readOrNotButton = document.createElement('button');
    const removeBookButton = document.createElement('button');

    newBookDiv.classList.add('new-book');
    bookTitleElement.classList.add('book-title');
    bookAuthorElement.classList.add('book-author');
    bookPagesElement.classList.add('book-pages');
    buttonsContainer.classList.add('button-group', 'container', 'flex-column', 'centering');
    readOrNotButton.classList.add('not-read');
    removeBookButton.classList.add('remove-button');

    newBookDiv.setAttribute('data-id', bookID);
    readOrNotButton.setAttribute('type', 'button');
    removeBookButton.setAttribute('type', 'button');
    removeBookButton.setAttribute('data-id', bookID);

    readOrNotButton.addEventListener('click', function() {
        if (readOrNotButton.classList.contains('not-read')) {
            readOrNotButton.classList.remove('not-read');
            readOrNotButton.classList.add('read');
            readOrNotButton.textContent = 'read';
        } else if (readOrNotButton.classList.contains('read')) {
            readOrNotButton.classList.remove('read');
            readOrNotButton.classList.add('not-read');
            readOrNotButton.textContent = 'not read';
        }
    });

    removeBookButton.addEventListener('click', function() {
        removeBookModal.showModal();
        lastClickedID = bookID;
    });



    bookTitleElement.textContent = title;
    bookAuthorElement.textContent = author;
    bookPagesElement.textContent = pages;
    readOrNotButton.textContent = 'not read';
    removeBookButton.textContent = 'remove';

    buttonsContainer.appendChild(readOrNotButton);
    buttonsContainer.appendChild(removeBookButton);

    newBookDiv.appendChild(bookTitleElement);
    newBookDiv.appendChild(bookAuthorElement);
    newBookDiv.appendChild(bookPagesElement);
    newBookDiv.appendChild(buttonsContainer);

    libraryGrid.appendChild(newBookDiv);
};

bookFormAddBook.addEventListener('click', (e) => {

    const title = bookTitleInput.value;
    const author = bookAuthorInput.value;
    const pages = bookPagesInput.value;

    addBookToLibrary(title, author, pages);

    closeBookModal();
    resetBookModalInputs();
});

// modal for removal confirmation

function deleteBookCard() {
    const bookIDtoDelete = library.findIndex(book => book.id === lastClickedID);
    const elementToRemove = document.querySelector(`[data-id="${lastClickedID}"]`);
    elementToRemove.remove();
    if (bookIDtoDelete > -1) {
        library.splice(bookIDtoDelete, 1);
    }
};

confirmRemoval.addEventListener('click', function() {
    removeBookModal.close();
    deleteBookCard();
});

declineRemoval.addEventListener('click', function() {
    removeBookModal.close();
});

// modal functionality

addBookButton.addEventListener('click', openBookModal);

function openBookModal() {
    document.body.style.filter = 'blur(0.15rem)';
    document.body.style.transition = 'filter 0.31s ease';
    bookModal.showModal();
    bookModal.addEventListener('click', outsideBookModalClick);
};

function closeBookModal() {
    document.body.style.filter = 'none';
    document.body.style.transition = 'filter 0.168s ease';
    bookModal.close();
    bookModal.removeEventListener('click', outsideBookModalClick);
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

function resetBookModalInputs() {
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    bookPagesInput.value = '';
};