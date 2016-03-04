//
//db.cities.update({"country": "US"}, { $mul: {"population": 1.2} }, {"multi": true});

//Use find and snapshot and forEach then update from that and truncate the value

db.cities.update({"country": "US"}, { $inc: {"population": -1} }, {"multi": true})
