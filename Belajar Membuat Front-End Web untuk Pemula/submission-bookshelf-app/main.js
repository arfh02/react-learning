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
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
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
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = "Hapus buku";

    const buttonContainer = document.createElement('div');
    buttonContainer.append(buttonUndo, buttonDelete);

    const textContainer = document.createElement('div');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.setAttribute('data-testid', `bookItem`);
    container.setAttribute('data-bookid', bookObject.id);
    container.append(textContainer, buttonContainer);

    if (bookObject.isCompleted) {
        buttonUndo.innerText = "Belum selesai dibaca";
        const completeList = document.getElementById('completeBookList');
        completeList.append(container);
    } else {
        buttonUndo.innerText = "Selesai dibaca";
        const incompleteList = document.getElementById('incompleteBookList');
        incompleteList.append(container);
    }

    buttonUndo.addEventListener('click', function () {
        undoAction(bookObject.id);
    });
    buttonDelete.addEventListener('click', function () {
        removeBook(bookObject.id);
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
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function removeBook(bookId) {
    const bookTarget = findBookIndex(bookId);
    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}
