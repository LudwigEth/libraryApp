const libraryGrid = document.getElementById("libraryGrid");

const library = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
};

const hasInvalidType = (title, author, pages) => {
    return  typeof title !== 'string' ||
            typeof author !== 'string' ||
            typeof pages !== 'number'
};

function addBookToLibrary(title, author, pages) {
    if (hasInvalidType(title, author, pages)) return;

    const newBook = new Book(title, author, pages);

    library.push(newBook);
};