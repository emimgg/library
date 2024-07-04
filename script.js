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
    book.displayBook();
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

function Book(title, author, pages, isRead, color) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.color = color;
}

Book.prototype.addBookToArray = function() {
    bookArray.push(this)
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
}


Book.prototype.displayBook = function(index){
        const bookCard = document.createElement("article");
        bookCard.classList.add("card");
        bookCard.style.textAlign = "center";
        
        bookCard.textContent = `${this.title}\nby ${this.author}`;
        container.appendChild(bookCard);

        bookCard.dataset.key = index;
        this.addRemoveBtn(bookCard);
        this.addToggleReadBtn(bookCard);
    }

Book.prototype.addRemoveBtn = function(card) {
    let removeBtn;
    removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.textContent = "Remove";
    removeBtn.dataset.key = card.dataset.key;
    card.appendChild(removeBtn);
}

let toggleReadBtn;
Book.prototype.addToggleReadBtn = function(card) {
    toggleReadBtn = document.createElement("button");
    toggleReadBtn.dataset.key = card.dataset.key;
    this.checkReadStatus();
    card.appendChild(toggleReadBtn);
}


Book.prototype.checkReadStatus = function(){
    clearClasses(toggleReadBtn);
    if (this.isRead === true) {
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


