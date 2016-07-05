db.cities.find({name:"Jasontopia"});

db.cities.find({population: {$gt: 2000}}).pretty()

db.cities.find("this.population > 20000");
