function getTotalBooksCount(books=[]) {
  return books.length;
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let counter = books.reduce((accumulator, bookObj)=>{
    const {borrows}= bookObj;
    borrows.forEach((borrowsObj)=>{
      if (borrowsObj.returned === false){
        accumulator++
      }
    })
    return accumulator;
  },0)
  return counter;
}

function getMostCommonGenres(books=[]) {
  const lookup = {};
  books.forEach((bookObj)=>{
    const {genre} = bookObj;
    if(lookup[genre] === undefined){
      lookup[genre] = 1;
    }else{
      lookup[genre]++;
    }
  })
  const genreKeys = Object.keys(lookup);
  const result = genreKeys.map((genre)=>{
    return {name: genre, count: lookup[genre]}
  })
  result.sort((elementA, elementB)=> elementB.count - elementA.count);
  return result.slice(0,5);
}

//helper function below
function sortBooksByPopularity(books = []){
  books.sort((bookA, bookB)=>{
    return bookB.borrows.length - bookA.borrows.length
  })
  return books
}

function getMostPopularBooks(books) {
  books = sortBooksByPopularity(books)
  const topFiveBooks = books.slice(0,5);
  const result = topFiveBooks.map((bookObj)=>{
    return {name: bookObj.title, count: bookObj.borrows.length}
  })
  return result;
}

function getMostPopularAuthors(books, authors) {
  books = sortBooksByPopularity(books)
  const topFiveBooks = books.slice(0,5);
  const result = [];
  topFiveBooks.forEach((bookObj)=>{
    const {authorId} = bookObj;
    const foundAuthor = authors.find((authorObj)=>{
      return authorId === authorObj.id
    })
    const formatted = {name: `${foundAuthor.name.first} ${foundAuthor.name.last}`, count: bookObj.borrows.length}
    result.push(formatted)
  })
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
