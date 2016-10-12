 // Remove books
db.books.remove(
 {
   author: "J.K. Rowling"
 },
 {
   justOne: true
 }
)
