db.books.update(
  {
    author: "J.K. Rowling"
  },
  {
    $set: {publisher: "Penguin"}
  }
)
