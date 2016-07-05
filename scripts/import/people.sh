# bulk load data
mongoimport --db=mongo-crud --collection=people --type=csv --drop --headerline --file=sample/csv/people.csv
