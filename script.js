(global => {
 

  let myLibrary = [];
  const stored = JSON.parse(localStorage.getItem("myLibrary"))
  const container = document.querySelector(".container");
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const pages = document.querySelector("#pages");
  const checkit = document.querySelector("#check");
  const sub = document.querySelector(".sub");
  const search = document.getElementById("filter");
  const itemList = document.querySelector("#items");
  let x; //checkbox
  let y; // delete
  
  //book constructor & prototype
  class Book {
    constructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages
    this.read = read;
    }
    addBook() {
      myLibrary.push(this);
    }
  };
  
  const rendering = (book) => {
    const div = document.createElement("div");
    container.append(div);
    div.classList = "card";
    div.setAttribute("id", book.title);
    x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.classList.add("toggle");
    y = document.createElement("BUTTON");
    y.classList.add("delete");
    y.innerHTML = "x";
    const capBook = (w) => {
      return w.charAt(0).toUpperCase() + w.slice(1)
    }
    const capAuthor = (w) => {
      w = w.split(" ")
      w = w.map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
      return w.join(" ")
    }
    if (checkit.checked == true || book.read == true) {
      div.innerHTML += `"${capBook(book.title).italics()}"  by  ${capAuthor(book.author).bold()} [${
        book.pages
      } pages] .  Read: `;
      x.setAttribute("checked", true);
      div.append(x);
      div.append(y);
    } else {
      div.innerHTML += `"${capBook(book.title).italics()}"  by  ${capAuthor(book.author).bold()} [${
        book.pages
      } pages] .  Read: `;
      div.append(x);
      div.append(y);
    }
    author.value = "";
    title.value = "";
    pages.value = "";
    checkit.checked = "";
  }
  
  const createNewBook = () => {
    if (title.value === "" || author.value === "" || pages.value === "") {
      alert(`You have to complete the information before adding`);
    } else if(Number.isNaN(parseInt(pages.value))){
      alert(`The value of pages must be a number`)
      pages.value = ""
    }
    else {
      const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        checkit.checked
      );
      console.log(typeof pages.value)
      newBook.addBook();
      rendering(newBook)
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    }
  }
  

  
  const deleting = (k) => {
    k.stopPropagation();
    const par = k.target.parentElement;
    if (k.target.classList == "delete") {
      container.removeChild(par);
      myLibrary = myLibrary.filter((k) => k.title !== par.id);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    }
  }
  
  const toggling = (k) => {
    k.stopPropagation();
    const par = k.target.parentElement;
    if (k.target.classList == "toggle") {
      myLibrary = myLibrary
        .filter((k) => k.title == par.id)
        .map((k) => {
          if (k.read == true) {
            k.read = false;
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
          } else {
            k.read = true;
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
          }
        });
    }
  
  }
  
  const filterItems = (e) => {
    //convert to lowercase
    let text = e.target.value.toLowerCase();
    //get list
    let items = itemList.getElementsByTagName("div");
    //conversion to an array
    Array.from(items).forEach(function (item) {
      let itemName = item.innerHTML;
      if (itemName.toLowerCase().indexOf(text) != -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };
  

  const renderPage = (arrLocalS, original) =>{
      arrLocalS.forEach(b => {
        original.push(b)
        rendering(b)
      })
  }

  if(stored != null){
  renderPage(stored, myLibrary)
  }
  
  sub.addEventListener("click", 
      createNewBook
  );

 window.addEventListener("keyup", function(e){
    if (e.keyCode === 13) {
    // Cancel the default action, if needed
    e.preventDefault();
    // Trigger the button element with a click
   createNewBook()
    }
  })
  
  container.addEventListener("click", deleting)
  container.addEventListener("click", toggling)
  
  search.addEventListener("keyup", filterItems);
  
  
  })(window)
  
  