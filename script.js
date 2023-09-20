const library = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
};

function addBookToLibrary(title, author, pages) {
    if (typeof title !== 'string' ||
        typeof author !== 'string' ||
        typeof pages !== 'number') {
            return 'invalid input';
        };

    const newBook = new Book(title, author, pages);

    library.push(newBook);
};