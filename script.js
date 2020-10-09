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
      `${this.title} by ${this.author} ( ${this.pages} pages ) .  Read: ${this.read} `
    );
    return `"${this.title.italics()}"  by  ${this.author.bold()} ( ${
      this.pages
    } pages ) .`;
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
      div.innerHTML += `${newBook.displayBook()}  Read: `;
      x.setAttribute("checked", true);
      div.append(x);
      div.append(y);
    } else {
      div.innerHTML += `${newBook.displayBook()}  Read: `;
      div.append(x);
      div.append(y);
    }
    /////----------------------------------------------firebase below
    db.collection("books")
      .add({
        title: newBook.title,
        author: newBook.author,
        pages: newBook.pages,
        read: newBook.read,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        div.setAttribute("data-id", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    /////----------------------------------------------firebase above
    console.log("There are currently: " + myLibrary.length + " books: ");
    console.log(myLibrary);
    author.value = "";
    title.value = "";
    pages.value = "";
    checkit.checked = "";
  }
});

container.addEventListener("click", (k) => {
  k.stopPropagation();
  const par = k.target.parentElement;
  let code = k.target.parentElement.getAttribute("data-id");

  if (k.target.classList == "delete") {
    db.collection("books").doc(code).delete();
    container.removeChild(par);
    myLibrary = myLibrary.filter((k) => k.title !== par.id);
    console.log("Deleting " + par.id);
    console.log("data-id " + code);
    console.log(myLibrary);
  } else if (k.target.classList == "toggle") {
    myLibrary
      .filter((k) => k.title == par.id)
      .map((k) => {
        if (k.read == true) {
          console.log("data-id " + code);
          db.collection("books").doc(code).update({ read: false });
          k.read = false;
        } else {
          console.log("data-id " + code);
          db.collection("books").doc(code).update({ read: true });
          k.read = true;
        }
      });

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
