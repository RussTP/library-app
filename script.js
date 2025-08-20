const addBtn = document.querySelector("#add-btn");
const bookContainer = document.querySelector("#book-container");
const bookForm = document.querySelector("#book-form");


class Book {
  constructor(author, title, pages, read) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}


class Library {
  constructor(container, formContainer, addBtn) {
    this.books = [];
    this.container = container;
    this.formContainer = formContainer;
    this.addBtn = addBtn;

    this.#renderForm();
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(id) {
    this.books = this.books.filter(book => book.id !== id);
  }

  display() {
    this.container.innerHTML = "";

    this.books.forEach(book => {
      const bookCardDiv = document.createElement("div");
      bookCardDiv.classList.add("book-card");

      bookCardDiv.insertAdjacentHTML("beforeend", `
        <p><b>Title:</b> ${book.title}</p>
        <p><b>Author:</b> ${book.author}</p>
        <p><b>Pages:</b> ${book.pages}</p>
        <p><b>Read:</b> ${book.read ? "Yes" : "No"}</p>
      `);

      const readBtn = document.createElement("button");
      readBtn.textContent = "Status";
      readBtn.addEventListener("click", () => {
        book.toggleRead();
        this.display();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Remove";
      deleteBtn.addEventListener("click", () => {
        this.removeBook(book.id);
        this.display();
      });

      bookCardDiv.appendChild(readBtn);
      bookCardDiv.appendChild(deleteBtn);
      this.container.appendChild(bookCardDiv);
    });
  }


  #renderForm() {
    const formHTML = `
      <form id="inner-form" style="display:none;">
        <label for="book-title">Book title</label>
        <input type="text" id="book-title" required>
        <label for="author">Author</label>
        <input type="text" id="author" required>
        <label for="pages">Pages</label>
        <input type="number" id="pages" required>
        <label for="read">Read</label>
        <input type="checkbox" id="read">
        <input type="submit" value="Submit">
      </form>
    `;

    this.formContainer.innerHTML = formHTML;
    this.innerForm = document.querySelector("#inner-form");

    // Handle form submission
    this.innerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = document.querySelector("#book-title").value;
      const author = document.querySelector("#author").value;
      const pages = parseInt(document.querySelector("#pages").value);
      const read = document.querySelector("#read").checked;

      this.addBook(new Book(author, title, pages, read));

      this.innerForm.style.display = "none";
      this.innerForm.reset();
      this.addBtn.disabled = false;

      this.display();
    });

    // Show form on add button
    this.addBtn.addEventListener("click", () => {
      this.innerForm.style.display = "block";
      this.formContainer.style.backgroundColor = "rgb(133, 147, 179)";
      this.addBtn.disabled = true;
    });
  }
}


const myLibrary = new Library(bookContainer, bookForm, addBtn);

// Starter books
myLibrary.addBook(new Book("King, Stephen", "Misery", 310, true));
myLibrary.addBook(new Book("Yarros, Rebecca", "Fourth Wing", 517, false));
myLibrary.addBook(new Book("Cline, Ernest", "Ready Player One", 480, false));
myLibrary.addBook(new Book("Herbert, Frank", "Dune", 658, true));

myLibrary.display();
