// Update documents
db.doctors.update(
  {
    specialty: "General practice"
  },
  {
    $set: {specialty: "General Practice"}
  },
  {
    multi: true,
  }
)
