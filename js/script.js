document.addEventListener("DOMContentLoaded", function(){
    const inputBook = document.getElementById("inputBook");

    inputBook.addEventListener("submit", function(event){
        event.preventDefault();
        addBookToRack();
        makeListBook();
    });
    if(cekStorage()){
        loadDataFromStorage();
    }
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});
