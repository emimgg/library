const bookArray = [];

const container = document.querySelector(".books");
const addBookBtn = document.querySelector("#add-new");
const dialog = document.querySelector("dialog");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookIsRead = document.querySelector("#is-read");
const bookColor = document.querySelector("#color")

const bookForm = document.querySelector("form");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let isRead = bookIsRead.checked;
    let color = bookColor.value;

    let book = new Book(title, author, pages, isRead, color);
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
        bookArray[index].removeFromDisplay(); 
    }
});

container.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle")) {
        let index = event.target.dataset.key;
        bookArray[index].toggleReadStatus();
        bookArray[index].checkReadStatus();
    }
});

Book.prototype.removeFromDisplay = function(book) {
    let index = bookArray.indexOf(this);
    if (index !== -1) {
        bookArray.splice(index, 1);
        container.innerHTML = "";
        bookArray.forEach(book => book.displayBook());
    }
}


function clearInput() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookIsRead.checked = false;
    bookColor.value = "";
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


Book.prototype.displayBook = function(){
        const bookCard = document.createElement("article");
        bookCard.classList.add("card");
        bookCard.style.textAlign = "center";
        bookCard.style.backgroundColor = this.color;
        container.appendChild(bookCard);
        
        const displayTitle = document.createElement("h3");
        displayTitle.classList.add("title");
        displayTitle.textContent = `${this.title}`;
        bookCard.appendChild(displayTitle);

        const displayAuthor = document.createElement("span");
        displayAuthor.classList.add("author");
        displayAuthor.textContent = `${this.author}`
        bookCard.appendChild(displayAuthor);

        const displayPages = document.createElement("span");
        displayPages.classList.add("pages");
        displayPages.textContent = `${this.pages} pages`;
        bookCard.appendChild(displayPages);

        bookCard.dataset.key = bookArray.indexOf(this);
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

Book.prototype.addToggleReadBtn = function(card) {
    let toggleReadBtn = document.createElement("button");
    toggleReadBtn.classList.add("toggle");
    toggleReadBtn.dataset.key = card.dataset.key;
    card.appendChild(toggleReadBtn);
    this.toggleReadBtn = toggleReadBtn;
    this.checkReadStatus();
}


Book.prototype.checkReadStatus = function(){
    this.toggleReadBtn.classList.remove("read", "not-read");
    if (this.isRead === true) {
        this.toggleReadBtn.classList.add("read");
        this.toggleReadBtn.textContent = "READ"; 
    } else {
        this.toggleReadBtn.classList.add("not-read");
        this.toggleReadBtn.textContent = "Not read"; 
    }
}

