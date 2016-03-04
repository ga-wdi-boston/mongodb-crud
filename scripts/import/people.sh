# bulk load data
mongoimport --drop --db=mongo-crud --collection=people --type=csv --headerline --file=sample-data/csv/people.csv
