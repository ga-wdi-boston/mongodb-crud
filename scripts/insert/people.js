// insert documents
// db.people.insert(
//   {
//     surname: 'Teller',
//     gender: 'm',
//     dob: '1951-05-05',
//     occupation: 'magician'
//   }
// );

db.people.insert([
  {
    given_name: 'Henry',
    surname: 'Rollins',
    middle_initial: 'F',
    dob: '1961-02-13',
    occupation: 'Musician'
  },
  {
    given_name: 'Grace',
    surname: 'Hopper',
    dob: '1906-12-09',
    occupation: 'Bad Ass'
  }
]);
