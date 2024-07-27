const UI = (() => {
    const container = document.querySelector(".books");
    const addBookBtn = document.querySelector("#add-new");
    const dialog = document.querySelector("dialog");
    const bookTitle = document.querySelector("#title");
    const bookAuthor = document.querySelector("#author");
    const bookPages = document.querySelector("#pages");
    const bookIsRead = document.querySelector("#is-read");
    const bookColor = document.querySelector("#color")
    const bookForm = document.querySelector("form");

    return {
        container,
        addBookBtn,
        dialog,
        bookTitle,
        bookAuthor,
        bookPages,
        bookIsRead,
        bookColor,
        bookForm
    };
})();

const bookArray = [];

UI.addBookBtn.addEventListener("click", () => {
    UI.dialog.showModal();
});

UI.bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = UI.bookTitle.value;
    let author = UI.bookAuthor.value;
    let pages = UI.bookPages.value;
    let isRead = UI.bookIsRead.checked;
    let color = UI.bookColor.value;

    let book = new Book(title, author, pages, isRead, color);
    book.addBookToArray();
    book.displayBook();
    UI.dialog.close();
    clearInput();
});

UI.container.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
        let index = event.target.dataset.key;
        bookArray[index].removeFromDisplay(); 
    }
});

UI.container.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle")) {
        let index = event.target.dataset.key;
        bookArray[index].toggleReadStatus();
        bookArray[index].checkReadStatus();
    }
});

class Book {
    constructor(title, author, pages, isRead, color) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.color = color;
    }

    addBookToArray() {
        bookArray.push(this);
    }

    toggleReadStatus() {
        this.isRead = !this.isRead;
    }

    displayBook() {
        const bookCard = document.createElement("article");
        bookCard.classList.add("card");
        bookCard.style.textAlign = "center";
        bookCard.style.backgroundColor = this.color;
        UI.container.appendChild(bookCard);
        
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

    addRemoveBtn(card) {
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove");
        removeBtn.textContent = "Remove";
        removeBtn.dataset.key = card.dataset.key;
        card.appendChild(removeBtn);
    }

    addToggleReadBtn(card) {
        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.classList.add("toggle");
        toggleReadBtn.dataset.key = card.dataset.key;
        card.appendChild(toggleReadBtn);
        this.toggleReadBtn = toggleReadBtn;
        this.checkReadStatus();
    }

    checkReadStatus() {
        this.toggleReadBtn.classList.remove("read", "not-read");
        if (this.isRead === true) {
            this.toggleReadBtn.classList.add("read");
            this.toggleReadBtn.textContent = "READ"; 
        } else {
            this.toggleReadBtn.classList.add("not-read");
            this.toggleReadBtn.textContent = "Not read"; 
        }    
    }

    removeFromDisplay() {
        let index = bookArray.indexOf(this);
        if (index !== -1) {
            bookArray.splice(index, 1);
            UI.container.innerHTML = "";
            bookArray.forEach(book => book.displayBook());
        }
    }
}

function clearInput() {
    UI.bookTitle.value = "";
    UI.bookAuthor.value = "";
    UI.bookPages.value = "";
    UI.bookIsRead.checked = false;
    UI.bookColor.value = "";
}
