// remove documents
db.people.remove(
  {
    family_name: "Horn"
  },
  {
    justOne: true
  }
)
