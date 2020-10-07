let myLibrary = [];
let x; //checkbox
let y; // delete

const container = document.querySelector(".container");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const checkit = document.querySelector("#check");
const sub = document.querySelector(".sub");

//book constructor & prototype
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype = {
  addBook() {
    myLibrary.push(this);
  },
  displayBook() {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages. Read: ${this.read}`
    );
    return `${this.title} by ${this.author}, ${this.pages} pages.`;
  },
};

sub.addEventListener("click", () => {
  if (title.value == "" || author.value == "" || pages == "") {
    prompt("You cannot add an empty book, write one at least");
  } else {
    const div = document.createElement("div");
    container.append(div);
    div.classList = "card";
    div.setAttribute("id", title.value);
    const newBook = new Book(
      title.value,
      author.value,
      pages.value,
      checkit.checked
    );
    newBook.addBook();
    x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.classList.add("toggle");
    y = document.createElement("BUTTON");
    y.classList.add("delete");
    y.innerHTML = "x";
    if (checkit.checked == true) {
      div.innerHTML += `${newBook.displayBook()} Read: `;
      x.setAttribute("checked", true);
      div.append(x);
      div.append(y);
    } else {
      div.innerHTML += `${newBook.displayBook()} Read: `;
      div.append(x);
      div.append(y);
    }
    console.log("There are currently: " + myLibrary.length + " books: ");
    console.log(myLibrary);
    author.value = "";
    title.value = "";
    pages.value = "";
    checkit.checked = "";
  }
});

container.addEventListener("click", (k) => {
  const par = k.target.parentElement;
  if (k.target.classList == "delete") {
    container.removeChild(par);
    console.log("Deleting " + par.id);
    myLibrary = myLibrary.filter((k) => k.title !== par.id);
    console.log(myLibrary);
  }
  if (k.target.classList == "toggle") {
    console.log("clicking it");
    myLibrary
      .filter((k) => k.title == par.id)
      .map((x) => (x.read == true ? (x.read = false) : (x.read = true)));

    console.log(myLibrary);
  }
});
const search = document.getElementById("filter");
const itemList = document.getElementById("items");

const filterItems = (e) => {
  //convert to lowercase
  let text = e.target.value.toLowerCase();
  //get list
  let items = itemList.getElementsByTagName("div");
  console.log(text);
  //conversion to an array
  Array.from(items).forEach(function (item) {
    let itemName = item.firstChild.textContent;
    console.log(itemName);
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};
search.addEventListener("keyup", filterItems);
