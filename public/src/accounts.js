function findAccountById(accounts, id) {
  const result = accounts.find((element)=>{
    return element.id === id
})
return result;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB)=>{
    return accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  })
  return accounts;
}

function getTotalNumberOfBorrows(account={}, books=[]) {
  let counter = 0;
  books.forEach((bookObj)=>{
    const {borrows} = bookObj;
    borrows.forEach((borrowsObj)=>{
      if(account.id === borrowsObj.id){
       counter++; 
      }
    })
  })
return counter;
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  const result = [];
  books.forEach((bookObj)=>{
    const {borrows} = bookObj;
    borrows.forEach((borrowsObj)=>{
      if(borrowsObj.id === account.id && borrowsObj.returned === false){
        bookObj.author = authors.find((authorObj)=>{
          return authorObj.id === bookObj.authorId
        })
        result.push(bookObj);
      }
    })
  })
  
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
