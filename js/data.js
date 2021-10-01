const BOOKS_KEY = "BOOKS_KEY";
let books = [];
function cekStorage(){
    if(typeof(Storage) !== undefined){
        return true
    }
    alert("Upss Browser tidak mendukung localStorage... :(")
    return false
}
function saveDataToLocalStorage(){
    if(cekStorage()){
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    }
    document.dispatchEvent(new Event("ondatasaved"));
}
function loadDataFromStorage() {
    let data = JSON.parse(localStorage.getItem(BOOKS_KEY));
    if (data !== null) 
        books = data;   
    document.dispatchEvent(new Event("ondataloaded"))
}
function showBookList(title, author, year, isCompleted){
    return {
            id: +new Date(),
            title,
            author,
            year,
            isCompleted
    };
}
function destroyBook(){
    localStorage.removeItem(BOOKS_KEY)
}
function updateDataToStorage(){
    if (cekStorage());
    saveDataToLocalStorage();
}
function findBook(bookId) {
    for (book of books){
        if(book.id === bookId)
        return book;
    }
    return null;
}
function findBookIndex(bookId){
    let index = 0
    for (book of books){
        if (book.id === bookId)
            return index;
        index++;
    }
    return -1;
}
function refreshDataFromBooks(){
    const incompletedReadingBook = document.getElementById(INCOMPLETED_READING_BOOK_ID);
    let completedReadingBook = document.getElementById(COMPLETED_READING_BOOK_ID);
    for (book of books) {
        const newBook = makeListBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;
        if(book.isCompleted) {
            completedReadingBook.append(newBook);
        } else {
            incompletedReadingBook.append(newBook);
        }
    }
}