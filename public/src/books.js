function findAuthorById(authors, id) {
  const result = authors.find((element)=>{
    return element.id === id
})
return result;
}

function findBookById(books, id) {
  const result = books.find((element)=>{
    return element.id === id
})
return result;
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = books.filter((booksElement)=>{
    return booksElement.borrows[0].returned === false
  })

  const returnedBooks = books.filter((booksElement)=>{
    return booksElement.borrows[0].returned === true
  })

  let result = [checkedOutBooks, returnedBooks]
  return result
}

function getBorrowersForBook(book={}, accounts=[]) {
  const {borrows} = book;
  const result = [];
  borrows.forEach((borrowsObj)=>{
    let foundAccount = undefined;
    accounts.forEach((accountObj)=>{
      if (accountObj.id === borrowsObj.id){
        foundAccount = accountObj;
        foundAccount.returned=borrowsObj.returned
      }
    })
    if(result.length < 10){
          result.push(foundAccount);
    }

  })
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
