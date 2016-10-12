// Remove Doctors
db.doctors.remove(
 {
   family_name: "Miller"
 },
 {
   multi: true
 }
)
