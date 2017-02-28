# bulk load data
mongoimport --db=mongo-crud --collection=books --type=csv --headerline --file=data/books.csv --drop
