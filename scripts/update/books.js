// Update documents

// update the book 1984 with the correct publishing date
db.books.update(
  {
    title: 1984
  },
  {
    $set: {
      "published_on": "1949-06-08"
    }
  })

// update the book Slaughterhouse-Five with several properties
db.books.update(
  {
    title: "Slaughterhouse-Five"
  },
  {
    $set: {
      published_on: "1969-03-31",
      book_cover: "brown",
      pages: 247
    }
  })
  
