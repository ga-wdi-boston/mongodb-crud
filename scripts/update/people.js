// update documents
db.people.update(
  {
    family_name: "Payne"
  },
  {
    $set: {surname: "PAIN"}
  }
)
