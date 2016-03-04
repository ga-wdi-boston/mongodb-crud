// retrieve person documents
print('count by gender');
db.people.aggregate({ $group: { "_id": "$gender", "count": { $sum: 1 } } }).forEach(printjson);
print('count by height');
db.people.aggregate({$match: { height: {$gt: 69}}}, { $group: { "_id": "$height", "count": { $sum: 1 } } }).forEach(printjson);
