const books = [];
const RENDER_EVENT = 'render-bookshelf';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('bookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }

    const searchForm = document.getElementById('searchBook');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        searchBook();
    });
});

function addBook() {
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = document.getElementById('bookFormYear').value;
    const isCompleted = document.getElementById('bookFormIsComplete').checked;

    const id = generateId();
    const bookObject = generateBookObject(id, title, author, year, isCompleted);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return { id, title, author, year, isCompleted };
}

document.addEventListener(RENDER_EVENT, function () {
    const unreadBook = document.getElementById('incompleteBookList');
    const readBook = document.getElementById('completeBookList');

    unreadBook.innerHTML = '';
    readBook.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted) {
            unreadBook.append(bookElement);
        } else {
            readBook.append(bookElement);
        }
    }
});

function makeBook(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = bookObject.year;

    const buttonUndo = document.createElement('button');
    buttonUndo.innerText = bookObject.isCompleted ?
        "Belum selesai dibaca" : "Selesai dibaca";
    buttonUndo.setAttribute('data-testid', `undoButton`);

    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = "Hapus buku";
    buttonDelete.setAttribute('data-testid', `bookItemDeleteButton`);

    const buttonEdit = document.createElement('button');
    buttonEdit.innerText = "Edit Buku";
    buttonEdit.setAttribute('data-testid', `bookItemEditButton`);

    const buttonContainer = document.createElement('div');
    buttonContainer.append(buttonUndo, buttonDelete, buttonEdit);

    const textContainer = document.createElement('div');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.setAttribute('data-testid', `bookItem`);
    container.setAttribute('data-bookid', bookObject.id);
    container.append(textContainer, buttonContainer);

    // EVENT LISTENERS
    buttonUndo.addEventListener('click', function () {
        undoAction(bookObject.id);
    });

    buttonDelete.addEventListener('click', function () {
        removeBook(bookObject.id);
    });

    buttonEdit.addEventListener('click', function () {
        editBook(bookObject.id);
    });

    return container;
}

function undoAction(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isCompleted = !bookTarget.isCompleted;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBook(bookId) {
    return books.find(book => book.id === bookId) || null;
}

function removeBook(bookId) {
    const bookTarget = findBookIndex(bookId);
    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBookIndex(bookId) {
    return books.findIndex(book => book.id === bookId);
}

function saveData() {
    if (isStorageExist()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function isStorageExist() {
    if (typeof (Storage) === "undefined") {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function searchBook() {
    const searchText = document.getElementById('searchBookTitle').value.toLowerCase();

    const unreadBook = document.getElementById('incompleteBookList');
    const readBook = document.getElementById('completeBookList');

    unreadBook.innerHTML = '';
    readBook.innerHTML = '';

    for (const bookItem of books) {
        const title = bookItem.title.toLowerCase();

        if (title.includes(searchText)) {
            const bookElement = makeBook(bookItem);

            if (!bookItem.isCompleted) {
                unreadBook.append(bookElement);
            } else {
                readBook.append(bookElement);
            }
        }
    }

    if (searchText === "") {
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
}

function editBook(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    const newTitle = prompt("Masukkan judul buku baru:", bookTarget.title);
    const newAuthor = prompt("Masukkan penulis buku baru:", bookTarget.author);
    const newYear = prompt("Masukkan tahun terbit buku baru:", bookTarget.year);

    if (newTitle !== null && newAuthor !== null && newYear !== null) {
        bookTarget.title = newTitle;
        bookTarget.author = newAuthor;
        bookTarget.year = newYear;

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }
}