// Delete documents

db.people.deleteOne(
  {
    family_name: "Horn"
  },
  {
    justOne: true
  }
)

db.people.deleteMany(
  {
    bornOn: /194/
  }
)
