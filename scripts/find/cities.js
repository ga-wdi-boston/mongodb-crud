//

db.cities.find({country: 'US', region: 'MA'});

print('count of cites by country (with more than one city per country)');
db.cities.aggregate({ $group: { "_id": "$country", "count": { $sum: 1 } } }, {$match: { "count": { $gt: 1 } } }).forEach(printjson);
