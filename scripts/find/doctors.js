// find documents
db.doctors.find(
  {
    specialty: /surgery/
  }
).count()
