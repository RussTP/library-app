const addBtn = document.querySelector("#add-btn");
const bookContainer = document.querySelector("#book-container");
const bookForm = document.querySelector("#book-form");

const myLibrary = [];
displayDefault()

function Book(author, title, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeRead = function () {
    this.read = !this.read;
};

function displayDefault() {


}

function bookDisplay() {
    bookContainer.innerHTML = "";
    myLibrary.forEach(book => {
        const bookCardDiv = document.createElement("div");
        bookCardDiv.classList.add("book-card");

        const pTitle = book.title;
        const pAuthor = book.author;
        const pPages = book.pages;
        const pRead = book.read ? "Yes" : "No";

        bookCardDiv.insertAdjacentHTML("beforeend",
            `
            <p><b>Title:</b> ${pTitle}</p>
            <p><b>Author:</b> ${pAuthor}</p>
            <p><b>Pages:</b> ${pPages}</p>
            <p><b>Read:</b> ${pRead}</p>
            `
        );

        const readBtn = document.createElement("button");
        readBtn.textContent = "Status";
        readBtn.id = book.id;
        readBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(book => book.id === readBtn.id);
            myLibrary[index].changeRead();
            bookDisplay();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.id = book.id;
        deleteBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(book => book.id === deleteBtn.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                bookDisplay();
            }
        });

        bookCardDiv.appendChild(readBtn);
        bookCardDiv.appendChild(deleteBtn);
        bookContainer.appendChild(bookCardDiv);
    });
}


const formHTML = `
<form id="inner-form" style="display:none;">
    <label for="book-title">Book title</label>
    <input type="text" name="name" id="book-title" required>
    <label for="author">Author</label>
    <input type="text" name="author" id="author" required>
    <label for="pages">Pages</label>
    <input type="number" name="pages" id="pages" required>
    <label for="read">Read</label>
    <input type="checkbox" name="read" id="read">
    <input type="submit" value="Submit">
</form>
`;

bookForm.innerHTML = formHTML;

const innerForm = document.querySelector("#inner-form");


innerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#author").value;
    const pages = parseInt(document.querySelector("#pages").value);
    const read = document.querySelector("#read").checked;

    addBookToLibrary(author, title, pages, read);
    console.log(myLibrary);

    innerForm.style.display = "none";
    bookForm.style.backgroundColor = "";
    bookForm.style.width = "";
    bookForm.style.height = "";
    innerForm.reset();

    addBtn.disabled = false;

    bookDisplay();
});


addBtn.addEventListener("click", () => {
    innerForm.style.display = "block";
    bookForm.style.backgroundColor = "rgb(133, 147, 179)";
    addBtn.disabled = true;
});

function addBookToLibrary(author, title, pages, read) {
    const book = new Book(author, title, pages, read);
    myLibrary.push(book);
}


myLibrary.push(new Book("King, Stephen", "Misery", 310, true));
bookDisplay();

myLibrary.push(new Book("Yarros, Rebecca", "Fourth Wing", 517, false));
bookDisplay();

myLibrary.push(new Book("Cline, Ernest", "Ready Player One", 480, false));
bookDisplay();

myLibrary.push(new Book("Herbert, Frank", "Dune", 658, true));
bookDisplay();
