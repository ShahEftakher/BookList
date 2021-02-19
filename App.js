//Book object constructor function
function Book(bookName, author, publishYear, genre) {
  this.bookName = bookName;
  this.author = author;
  this.publishYear = publishYear;
  this.genre = genre;
}

//storage constructor function
function Storage() {
  this.books = [];
}

//UI constructor function
function UI(cardBody) {
  this.cardBody = cardBody;
}

//instantiate storage
const storage = new Storage();
//instantiate UI
const ui = new UI(document.getElementById("book-card"));

document.addEventListener("DOMContentLoaded",()=>{
  storage.getBooks()
});

//storage prototype methods
//add a book to local storage
Storage.prototype.addToLocalStore = function (book) {
  this.books.push(book);
  window.localStorage.setItem("books", JSON.stringify(this.books));
};

Storage.prototype.getBooks = function () {
  let booksInStorage = JSON.parse(window.localStorage.getItem("books"));
  if (booksInStorage === null) {
    window.localStorage.setItem("books", JSON.stringify([]));
  }
  booksInStorage = JSON.parse(window.localStorage.getItem("books"));
  this.books=booksInStorage;
  storage.sendBooksToDOM();
};

//Add books to DOM
Storage.prototype.sendBooksToDOM = function () {
  this.books.forEach((book) => {
    ui.addBookCard(book);
  });
};

//Remove from storage
Storage.prototype.removeFromStorage = function(book){
  let currentIndex = this.books.indexOf(book);
  if(currentIndex > -1){
    this.books.splice(currentIndex,1)
  }
  //store the changes to the storage
  window.localStorage.setItem("books", JSON.stringify(this.books))
}

//UI prototype method
//remove a book from the DOM
UI.prototype.removeBook = function (cardInnerDiv, book) {
  console.log(cardInnerDiv)
  storage.removeFromStorage(book)
  cardInnerDiv.remove();
};

//Add a book
UI.prototype.addBook = function () {
  let bookName = document.getElementById("book-name").value;
  let authorName = document.getElementById("author-name").value;
  let publishedYear = document.getElementById("published-year").value;
  let genre = document.getElementById("book-genre").value;
  if (
    bookName === "" ||
    authorName === "" ||
    publishedYear === "" ||
    genre === ""
  ) {
    alert("Please fill up all the fields");
    return;
  }
  let newBook = new Book(bookName, authorName, publishedYear, genre);
  this.addBookCard(newBook);
  storage.addToLocalStore(newBook);
  console.log(newBook);
};

//clearing input fields
UI.prototype.clearFields = function () {
  document.getElementById("book-name").value = "";
  document.getElementById("author-name").value = "";
  document.getElementById("published-year").value = "";
  document.getElementById("book-genre").value = "";
};

//Add books by list
UI.prototype.addBookCard = function (book) {
  let cardInnerDiv = document.createElement("div");
  cardInnerDiv.className += "card mb-3";
  cardInnerDiv.style += "width: 70rem; margin-top: 2%";
  let card = document.createElement("div");
  card.className += "card-body";
  let h5 = document.createElement("h5");
  h5.className += "card-title";
  let authorName = document.createElement("h6");
  let publishedYear = document.createElement("h6");
  let genre = document.createElement("h6");
  let removeBtn = document.createElement("button");
  let btnDiv = document.createElement("div");
  btnDiv.className += "d-grid gap-2 d-md-flex justify-content-md-end mb-4";
  removeBtn.className += "btn btn-outline-danger me-4";
  removeBtn.type += "button";
  removeBtn.innerHTML = "Remove";
  removeBtn.addEventListener("click", () => {
    this.removeBook(cardInnerDiv, book);
  });
  authorName.className += "list-group-item";
  publishedYear.className += "list-group-item";
  genre.className += "list-group-item";
  h5.innerHTML = book.bookName.toUpperCase();
  authorName.innerHTML = "Author: " + book.author;
  publishedYear.innerHTML = "Published: " + book.publishYear;
  genre.innerHTML = "Genre: " + book.genre;
  btnDiv.appendChild(removeBtn);
  card.appendChild(h5);
  card.appendChild(authorName);
  card.appendChild(publishedYear);
  card.appendChild(genre);
  cardInnerDiv.appendChild(card);
  cardInnerDiv.appendChild(btnDiv);
  this.cardBody.appendChild(cardInnerDiv);
};

//add button event handler
const addBtn = document.getElementById("add-book-btn");
addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  ui.addBook();
  ui.clearFields();
});

//enter event handler
const submitForm = (document.getElementById("book-input").onsubmit = (
  event
) => {
  event.preventDefault();

  ui.addBook();
  ui.clearFields();
});
