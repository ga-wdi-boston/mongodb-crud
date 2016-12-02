# bulk load data
mongoimport --db=mongo-crud --collection=doctors --type=csv --headerline --file=data/doctors.csv --drop
