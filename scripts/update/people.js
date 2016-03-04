// update documents
// db.people.update({"_id" : ObjectId("564c91c44804658f265584a7")},
//   { $push : { pets: { name: 'Nemo', kind: 'cat'} } } );

db.people.update({}, {$unset: {middle_initial: ""}}, {multi: true});
