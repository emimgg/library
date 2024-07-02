const bookArray = [];

const container = document.querySelector(".books");
const addBookBtn = document.querySelector("#add-new");
const dialog = document.querySelector("dialog");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookIsRead = document.querySelector("#is-read");

const bookForm = document.querySelector("form");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let isRead = bookIsRead.value;

    let book = new Book(title, author, pages, isRead);
    book.addBookToArray();
    displayBooks();
    dialog.close();
    clearInput();
});

function clearInput() {
    bookTitle.value= "";
    bookAuthor.value= "";
    bookPages.value= "";
    bookIsRead.value= "";
}

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
})


function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.addBookToArray = function() {
    bookArray.push(this)
}

function displayBooks(book) {
    container.innerHTML = "";
    for (let book of bookArray) {
        const bookCard = document.createElement("article");
        bookCard.classList.add("card");
        bookCard.textContent = `${book.title} by ${book.author}`;
        container.appendChild(bookCard);
    }
}


// const book1 = new Book("Lord of the Rings: The fellowship of The Ring", "JRR Tolkien", "536", "not yet")

// book1.addBookToArray();
// console.log(bookArray);
// displayBook();
