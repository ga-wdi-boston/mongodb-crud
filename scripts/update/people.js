// update documents
db.people.update({surname:"Bob"} $set:{surname:"Jason"})

db.people.update(
  {surname:"Jason"},
    {
      $set:{
        pets:["Mr.Kitty", "Dave"]
      }
    },
      {multi: true}
)
