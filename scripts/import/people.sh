# bulk load data
mongoimport --db=mongo-crud --collection=people --type=csv --headerline --file=data/people.csv
