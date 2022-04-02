let myLibrary = [];
const body = document.querySelector("body");
const main = document.querySelector("main");
const form = document.querySelector("form");
const readCount = document.querySelector("#readCount");
const unreadCount = document.querySelector("#unreadCount");

class Book {
  constructor(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
  }
}

printCards();
UpdateCount();

body.addEventListener("click", (e) => HandleClick(e));

function printCards() {
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let card = document.createElement("div");

    let title = document.createElement("p");
    title.textContent = book.title;
    title.classList.add("card__title");
    card.appendChild(title);

    let author = document.createElement("p");
    author.textContent = `By ${book.author}`;
    author.classList.add("card__author");
    card.appendChild(author);

    let pages = document.createElement("p");
    pages.textContent = `${book.pages} pages`;
    card.appendChild(pages);

    let buttons = document.createElement("div");

    let remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.classList.add("remove");
    buttons.appendChild(remove);

    let toggle = document.createElement("button");
    toggle.textContent = "Toggle Read";
    toggle.classList.add("toggle");
    buttons.appendChild(toggle);

    card.appendChild(buttons);

    card.dataset.index = i;
    card.classList.add("card");
    card.classList.add(book.isRead ? "read" : "unread");
    main.appendChild(card);
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  let book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  main.innerHTML = "";
  printCards();
}

function HandleClick(e) {
  {
    if (e.target.tagName.toLowerCase() === "button") {
      if (e.target.classList.contains("remove")) {
        RemoveBook(e.target.parentNode.parentNode.dataset.index);
      } else if (e.target.classList.contains("toggle")) {
        Toggle(e.target.parentNode.parentNode.dataset.index);
        e.target.parentNode.parentNode.classList.toggle("read");
        e.target.parentNode.parentNode.classList.toggle("unread");
      } else if (e.target.classList.contains("deleteAll")) {
        DeleteAll();
      } else if (e.target.classList.contains("submit")) {
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let isRead = document.querySelector("#read").checked;
        addBookToLibrary(title, author, pages, isRead);
        form.reset();
      }
    }
    UpdateCount();
  }
}
function RemoveBook(index) {
  myLibrary.splice(index, 1);
  main.innerHTML = "";
  printCards();
}
function Toggle(index) {
  if (myLibrary[index].isRead === true) {
    myLibrary[index].isRead = false;
  } else {
    myLibrary[index].isRead = true;
  }
}
function DeleteAll() {
  myLibrary = [];
  main.innerHTML = "";
}
function UpdateCount() {
  const count = myLibrary.reduce((count, book) => (count += book.isRead), 0);
  readCount.textContent = count;
  unreadCount.textContent = myLibrary.length - count;
}
