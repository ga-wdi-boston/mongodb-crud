# bulk load data
mongoimport --db=mongo-crud --collection=ingredients --type=csv --headerline --file=data/ingredients.csv --drop
