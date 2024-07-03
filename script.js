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
    let isRead = bookIsRead.checked;

    let book = new Book(title, author, pages, isRead);
    book.addBookToArray();
    displayBooks();
    dialog.close();
    clearInput();
});

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

container.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
        let index = event.target.dataset.key;
        removeFromDisplay(index);
    }
});

container.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle")) {
        let index = event.target.dataset.key;
        bookArray[index].toggleReadStatus();
        checkReadStatus(index);
    }
});



function removeFromDisplay(index) {
    bookArray.splice(index, 1);
    displayBooks();
}

function clearInput() {
    bookTitle.value= "";
    bookAuthor.value= "";
    bookPages.value= "";
    bookIsRead.value= "";
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.addBookToArray = function() {
    bookArray.push(this)
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
}


function displayBooks(book) {
    container.innerHTML = "";
    for (let book of bookArray) {
        const bookCard = document.createElement("article");
        bookCard.classList.add("card");
        bookCard.textContent = `${book.title} by ${book.author}`;
        container.appendChild(bookCard);

        let index = bookArray.indexOf(book);
        bookCard.dataset.key = index;
        addRemoveBtn(bookCard);
        addToggleReadBtn(bookCard);
    }
}
let removeBtn ;
function addRemoveBtn(card) {
    removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.textContent = "Remove";
    removeBtn.dataset.key = card.dataset.key;
    card.appendChild(removeBtn);
}

let toggleReadBtn;
function addToggleReadBtn(card) {
    toggleReadBtn = document.createElement("button");
    toggleReadBtn.dataset.key = card.dataset.key;
    checkReadStatus(card.dataset.key);
    card.appendChild(toggleReadBtn);
}

function checkReadStatus(index) {
    clearClasses(toggleReadBtn);
    if (bookArray[index].isRead === true) {
        toggleReadBtn.classList.add("toggle");
        toggleReadBtn.classList.add("read");
        toggleReadBtn.textContent = "READ";
    } else {
        toggleReadBtn.classList.add("toggle");
        toggleReadBtn.classList.add("not-read");
        toggleReadBtn.textContent = "Not read.";
    }
}

function clearClasses(element) {
    element.classList.remove(...element.classList);
}
// const book1 = new Book("Lord of the Rings: The fellowship of The Ring", "JRR Tolkien", "536", "not yet")

// book1.addBookToArray();
// console.log(bookArray);
// displayBook();
