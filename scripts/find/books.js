// find documents

// find all books matching one parameter exactly
db.books.find(
  {
    author: "Ernest Hemingway"
  }
).pretty()

// get the count of all books published in the 21st century
db.books.find(
  {
    published_on: /20/
  }
).count()

// get 2 books published in the 21st century, sorted in reverse alphabetical
// order by title
db.books.find(
  {
    published_on: /20/
  }
).sort(
  {
    title: -1
  }
).limit(2).pretty()
