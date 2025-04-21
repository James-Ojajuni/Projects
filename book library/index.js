// creating a library array
let  myLibrary = []; 

// constructor function that creates book objects with a unique id
function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${title} by ${author}, ${pages}, ${read}`;
    };
}

// a prototype function to change the read status of the book object
Book.prototype.toggleReadStatus = function () {
    if (this.read === "has been read") this.read = "not read yet";
    else if (this.read === "not read yet") this.read = "currently reading";
    else this.read = "has been read";
};

// function that adds books to the "myLibrary" array
function addBookToLibrary(id, title, author, pages, read) {
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book); 
}

//adding multiple books to the array by calling the "addBookToLibrary" function and passing the necessary arguments/data of the book 
addBookToLibrary(crypto.randomUUID(), "Deep Work", "Cal Newport", "240 pages", "has been read");
addBookToLibrary(crypto.randomUUID(), "The Power of Habit", "Charles Duhigg", "400 pages", "not read yet");
addBookToLibrary(crypto.randomUUID(), "The Lord of the Rings", "J.R.R. Tolkien", "1178 pages", "has been read");
addBookToLibrary(crypto.randomUUID(), "Pride and Prejudice", "Jane Austen", "432 pages", "has been read");
addBookToLibrary(crypto.randomUUID(), "To Kill a Mockingbird", "Harper Lee", "281 pages", "has been read");
addBookToLibrary(crypto.randomUUID(), "1984", "George Orwell", "328 pages", "not read yet");
addBookToLibrary(crypto.randomUUID(), "The Great Gatsby", "F. Scott Fitzgerald", "180 pages", "has been read");
addBookToLibrary(crypto.randomUUID(), "Sapiens: A Brief History of Humankind", "Yuval Noah Harari", "498 pages", "currently reading");
addBookToLibrary(crypto.randomUUID(), "The Hitchhiker's Guide to the Galaxy", "Douglas Adams", "224 pages", "has been read");
addBookToLibrary(crypto.randomUUID(), "Little Women", "Louisa May Alcott", "449 pages", "not read yet");
addBookToLibrary(crypto.randomUUID(), "The Alchemist", "Paulo Coelho", "197 pages", "has been read");
addBookToLibrary(crypto.randomUUID(), "Educated: A Memoir", "Tara Westover", "352 pages", "currently reading");

// carry out specifics for each book object in the "myLibrary" array
myLibrary.forEach((value)=> {
    // creating a row for each book object and passing in the book data into the row that'll be appended into the table
    const bookData = document.createElement('tr'); 
    bookData.innerHTML = `<td>${value.title}</td>
                          <td>${value.author}</td>
                          <td>${value.pages}</td>
                          <td>${value.read}</td>
                          <td><button>Remove Book</button></td>
                          <td><button>Toggle Read Status</button></td>`;
    const table = document.querySelector("table");
    table.appendChild(bookData)
    // setting the id of the row as the id of the object
    bookData.setAttribute("data-id", value.id);
})

// assigning the "addBook" button to the "addBook" constant
const addBook = document.querySelector(".addBook");

// adding a event listener to the button which changes the display of the form for adding a new book from "none" to "flex" when a click happens
addBook.addEventListener("click", () => {
    const form = document.querySelector("form");
    form.style.display = "flex";
});

// adding a submit event listener to the form to add a new book to the table
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    // prevents the default action of the submission of the form action
    event.preventDefault();
    // creating a row for the book object added and passes the book data into the row which is added to the table
    const bookData = document.createElement('tr');
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");
    const book = new Book(crypto.randomUUID(), title.value, author.value, pages.value, read.value);
    
    bookData.innerHTML = `<td>${title.value}</td>
                          <td>${author.value}</td>
                          <td>${pages.value}</td>
                          <td>${read.value}</td>
                          <td><button>Remove Book</button></td>
                          <td><button>Toggle Read Status</button></td>`
    const table = document.querySelector("table");

    if (title.value.trim() && author.value.trim() && pages.value.trim() && read.value.trim()) {
        table.appendChild(bookData);
        myLibrary.push(book);
        form.style.display = "none";
        document.querySelector("p").style.display = "none";
        console.log(myLibrary)
    }
    
    else {
        document.querySelector("p").textContent = "complete form";
        document.querySelector("p").style.display = "block";
    }
    
    // setting the id of the row as the id of the object
    bookData.setAttribute("data-id", book.id);  
});

// adding a listener that to the table that targets specific elements in the table
document.querySelector("table").addEventListener("click", (e) => {
    // closest row to the target
    const row = e.target.closest("tr");
    // stores the value of the id of the row in which the button is clicked to an id constant 
    const id = row.getAttribute("data-id");
    // finds the object that has the same id as the row in the library, returns true if it is the object
    const book = myLibrary.find(book => book.id === id);
  
    if (e.target.textContent === "Remove Book") {
        // targets the remove book button on each row and removes the entire row when clicked 
        row.remove();
        if (book) {
            myLibrary.pop(book);
            console.log(myLibrary);
        }
    }
  
    else if (e.target.textContent === "Toggle Read Status") {
        // if it finds the book object, it toggles the read status and updates the value on the table
        if (book) {
                book.toggleReadStatus();
                row.children[3].textContent = book.read;
        }
    }
});
  


  