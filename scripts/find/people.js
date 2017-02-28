// find documents
db.people.find(
  {
    height: {
      $lt: 60,
    }
  }
).count()
