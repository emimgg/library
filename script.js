const bookArray = [];

const container = document.querySelector(".books");


function Book(title, author, pages, isread) {
    this.title = title;
    this.author - author;
    this.pages = pages;
    this.isread = isread;
}

Book.prototype.addBookToArray = function() {
    bookArray.push(this)
}


const book1 = new Book("Lord of the Rings: The fellowship of The Ring", "JRR Tolkien", "536", "not yet")

book1.addBookToArray();
console.log(bookArray);
displayBook();

function displayBook() {
    for (let i of bookArray) {
        const bookCard = document.createElement("article");
        bookCard.classList.add("card");
        bookCard.textContent = i.title;
        container.appendChild(bookCard);
    }
}