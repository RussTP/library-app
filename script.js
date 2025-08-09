
const addBtn = document.querySelector("#add-btn");
const bookContainer = document.querySelector("#book-container");


 



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

    function  bookDisplay() {
    myLibrary.forEach(book => {
       const bookCardDiv =  bookContainer.appendChild(document.createElement("div"))
        bookCardDiv.classList.add("book-card");
        const pTitle = book.title;
        const pAuthor = book.author;
        const pPages = book.pages;
        const pRead = book.read ? "Yes" : "No";
        bookCardDiv.insertAdjacentHTML("beforeend",
            `
            <p>Title: ${pTitle}</p>
            <p>Author: ${pAuthor}</p>
            <p>Pages: ${pPages}</p>
            <p>Read: ${pRead}</p>
            `
        )
        return book;
     })

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

        bookForm.innerHTML = "";
        bookContainer.innerHTML = "";
        addBtn.disabled = false;
         bookDisplay();
     
  });
   
});



function addBookToLibrary(author, title, pages, read) {
    const book = new Book(author, title, pages, read);
    myLibrary.push(book)
}








