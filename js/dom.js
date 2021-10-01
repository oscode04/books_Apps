const INCOMPLETED_READING_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_READING_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "bookId";
const searchBookTitle = document.getElementById("searchBookTitle");
function addBookToRack(){
    const incompletedReadingBook = document.getElementById(INCOMPLETED_READING_BOOK_ID);
    const completedReadingBook = document.getElementById(COMPLETED_READING_BOOK_ID);
    const inputBookTitle = document.getElementById("inputBookTitle");
    const inputBookAuthor = document.getElementById("inputBookAuthor");
    const inputBookYear = document.getElementById("inputBookYear");
    const inputBookIsComplete = document.getElementById("inputBookIsComplete");
    const dataBook = {
        id: +new Date(),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
        year: inputBookYear.value,
        isCompleted: inputBookIsComplete.checked
    };
    console.log(dataBook);
    const newBook = makeListBook(dataBook.title, dataBook.author, dataBook.year, dataBook.isCompleted );
    if(inputBookIsComplete.checked) {
        completedReadingBook.append(newBook);
    } else {
        incompletedReadingBook.append(newBook)
    }
    const bookObjek = showBookList(dataBook.title, dataBook.author, dataBook.year, dataBook.isCompleted );
    newBook[BOOK_ITEMID] = bookObjek.id;
    books.push(bookObjek);
    updateDataToStorage();
}
function makeListBook(title, author, year, isCompleted){
    const h2 = document.createElement("h2");
    h2.innerHTML = title;
    const pAuthor = document.createElement("p");
    pAuthor.innerHTML = author;
    const pYear = document.createElement("p");
    pYear.className = "pYear";
    pYear.innerText = year;    
    const btnDiv = document.createElement("div");
    btnDiv.className = "action";
    if(isCompleted){
        btnDiv.append(createUndobtn(), createDeleteButton());
    } else {
        btnDiv.append(createDoneBtn(), createDeleteButton());
    }
    const article = document.createElement("article")
    article.className = "book_item";
    article.append(h2, pAuthor, pYear, btnDiv);
    return article;
}
searchBookTitle.addEventListener("keyup", searchBook);
function searchBook(event) {
    const findBookTitle = event.target.value.toLowerCase();
    const bookItem = document.querySelectorAll(".book_item");
    bookItem.forEach((item) => {
        const bookList = item.firstChild.textContent.toLowerCase();
        if(bookList.indexOf(findBookTitle) != -1) {
            item.setAttribute("style", "display: block;");
        } else {
            item.setAttribute("style", "display: none !important;");
        }
    })
}
function createButton(btnTypeClass, btnTypeName, eventListener){
    const btn = document.createElement("button");
    btn.classList.add(btnTypeClass);
    btn.innerHTML = btnTypeName;
    btn.addEventListener("click", function(event){
        eventListener(event);
    });
    return btn;
}
function createDoneBtn(){
    return createButton("green", "Selesai dibaca", function(event){
        const element = event.target.parentElement;
        const elementList = element.parentElement;
        const btnDone = elementList;
        addBookToCompletedReading(btnDone);
        }
    )
}
function addBookToCompletedReading(bookElement) {
    const bookCompleted = document.getElementById(COMPLETED_READING_BOOK_ID);
    const bookTitle = bookElement.querySelector(".book_item > h2").innerHTML;
    const bookAuthor = bookElement.querySelector(".book_item > p").innerHTML;
    const bookYear = bookElement.querySelector(".book_item > .pYear").innerHTML;
    const newBook = makeListBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
    bookCompleted.append(newBook);
    bookElement.remove();
    updateDataToStorage();
} 
function undoBookFromCompletedReading(bookElement){
    const bookUncompleted = document.getElementById(INCOMPLETED_READING_BOOK_ID);
    const bookTitle = bookElement.querySelector(".book_item > h2").innerHTML;
    const bookAuthor = bookElement.querySelector(".book_item > p").innerHTML;
    const bookYear = bookElement.querySelector(".book_item > .pYear").innerHTML;
    const newBook = makeListBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(bookElement[BOOK_ITEMID]); 
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
    bookUncompleted.append(newBook);
    bookElement.remove();
    updateDataToStorage();
}
function createUndobtn(){
    return createButton("green", "Belum selesai dibaca", function(event){
        const element = event.target.parentElement;
        const elementList = element.parentElement;
        const btnUndo = elementList;
        undoBookFromCompletedReading(btnUndo);
        }
    )
}
function createDeleteButton(){
    return createButton("red", "Hapus buku", function(event){
            const element = event.target.parentElement;
            const elementList = element.parentElement;
            deleteBook(elementList);
        }
    )
}
function deleteBook(bookElement){
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    bookElement.remove();
    updateDataToStorage();
}