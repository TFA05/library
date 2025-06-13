const myLibrary = [];

function Book(title, author, read, numPages){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.read = read;
    this.numPages = numPages;
}

function addBookToLibrary(title, author, read, numPages){
    myLibrary.push(new Book(title, author, read, numPages));
}