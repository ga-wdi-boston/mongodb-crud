// Delete Doctors

db.doctors.deleteMany(
  {
    specialty: "Internal medicine"
  }
)
