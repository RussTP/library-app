
const addBtn = document.querySelector("#add-btn");
const bookResult = document.querySelector("#book-result");

const myLibrary = [];

function Book(author, title, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;

}


addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    
    const bookForm = document.querySelector("#book-form");
    
     const formHTML = 
            `<form>
            <label for ="book-title">Book title</label>
            <input type="text" name="name" id="book-title" required>
            <label for="author">Author</label>
            <input type="text" name="author" id="author" required>
            <label for="pages">Pages</labal>
            <input type="number" name="pages" id="pages" required>
            <label for="read">Read</label>
            <input type="checkbox" name="read" id="read">
            <input type="submit" value="Submit"> 
        </form>`;
        bookForm.insertAdjacentHTML("beforeend", formHTML);
        this.disabled = true;
    bookForm.addEventListener("submit", function (event) {
        event.preventDefault()

        const title = document.querySelector("#book-title").value;
        const author = document.querySelector("#author").value;
        const pages = parseInt(document.querySelector("#pages").value);
        const read = document.querySelector("#read").checked;

        addBookToLibrary(author, title, pages, read);
        console.log(myLibrary);

        addBtn.disabled = false;

    });
});

function addBookToLibrary(author, title, pages, read) {
    const book = new Book(author, title, pages, read);
    myLibrary.push(book)
}




