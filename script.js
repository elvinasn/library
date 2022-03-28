let myLibrary = [];
const body = document.querySelector("body");
const main = document.querySelector("main");

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}
myLibrary.push(new Book("J.K Rowling", "Haris Poteris", 292, true));
myLibrary.push(new Book("Kelly MCgonagal", "Valios Galia", 222, false));
myLibrary.push(new Book("J.K Rowling", "Haris Poteris", 292, true));
myLibrary.push(new Book("Kelly MCgonagal", "Valios Galia", 222, false));
myLibrary.push(new Book("J.K Rowling", "Haris Poteris", 292, true));
myLibrary.push(new Book("Kelly MCgonagal", "Valios Galia", 222, false));
printCards();

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
        RemoveBook(e);
      } else if (e.target.classList.contains("toggle")) {
        Toggle(e);
      } else if (e.target.classList.contains("deleteAll")) {
        DeleteAll();
      } else if (e.target.classList.contains("submit")) {
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let isRead = document.querySelector("#read").checked;
        addBookToLibrary(title, author, pages, isRead);
      }
    }
  }
}
function RemoveBook(e) {
  let i = e.target.parentNode.parentNode.dataset.index;
  myLibrary.splice(i, 1);
  main.innerHTML = "";
  printCards();
}
function Toggle(e) {
  let i = e.target.parentNode.parentNode.dataset.index;
  if (myLibrary[i].isRead === true) {
    myLibrary[i].isRead = false;
  } else {
    myLibrary[i].isRead = true;
  }
  e.target.parentNode.parentNode.classList.toggle("read");
  e.target.parentNode.parentNode.classList.toggle("unread");
}
function DeleteAll() {
  myLibrary = [];
  main.innerHTML = "";
}
