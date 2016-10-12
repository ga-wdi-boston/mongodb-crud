// find documents
db.people.find(
  {
    height: {
      $gt: 65,
    }
  }
)
