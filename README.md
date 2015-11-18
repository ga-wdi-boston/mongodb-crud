![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

# An Introduction to MongoDB

## Instructions

Fork and clone this repository.

Please use `git clone --recursive` to ensure you retrieve the `sample-data` submodule.

## Objectives

By the end of the lesson, students should be able to:

* Use the MongoDB shell to interact with MongoDB databases and collections
* Create, Read, Update, and Delete documents in MongoDB collections using the MongoDB shell.

## Prerequisites

Basic JavaScript.

Required readings:

- [Completely unbiased explanation of noSQL](https://www.mongodb.com/nosql-explained)
- [Mongo DB Is Web Scale](https://www.youtube.com/watch?v=b2F-DItXtZs)
- [Getting Started with MongoDB (MongoDB Shell Edition)](https://docs.mongodb.org/getting-started/shell/)

## Installation

We'll run `brew install mongodb` then execute the first two commands suggested.

### On Ubuntu:

Run `sudo apt-get install mongodb`

## Introduction

Relational databases are good at modeling data that fits into tables.  What do you use if your data isn't that structured?

Perhaps a [noSQL](https://en.wikipedia.org/wiki/NoSQL) data-store. An important consideration is [ACID](http://en.wikipedia.org/wiki/ACID) versus [BASE](https://en.wikipedia.org/wiki/Eventual_consistency) and the [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem).

MongoDB is a schema-less document-store that organizes documents in collections.  What does this mean?

### Terminology

|**Relational Database Term**|**MongoDB Term**|
|:-------|:------|
| database | database |
| table | collection |
| row | document |
| column | field |

## Create a database

### Code along

We'll use `mongo-crud` as the database to hold our tables and [mongo](https://docs.mongodb.org/manual/reference/program/mongo/) to interact with it.  `mongo` is MongoDB's command line client which lets us execute commands interactively and from scripts.

First we start the mongo shell:

```bash
$ mongo mongo-crud
MongoDB shell version: 3.0.7
connecting to: mongo-crud
>
```

The command to list databases is `show databases` (or `show dbs`):

```
> show databases
local  0.078GB
>
```

Unlike PostgreSQL, MongoDB lets us select a database that hasn't been created.  When we add a collection, the database will be created.

If we didn't specify the database on the command line we can connect to a database with `use <database name>`:

```
MongoDB shell version: 3.0.7
connecting to: test
> use mongo-crud
switched to db mongo-crud
> show databases
local  0.078GB
>
```

## Create a collection

### Code along

Our first collection will be called `people`. It has no entries.

```
> show collections
> db.people.count();
0
```

This is a common pattern in MongoDB: you can refer to things that don't yet exist, and it will cooperate.  MongoDB won't create them until you give it something to remember.

## Adding a document to a collection.

- [Inserting data](https://docs.mongodb.org/getting-started/shell/insert/) - Overview of adding documents to a collection.
- [db.<collection>.insert()](https://docs.mongodb.org/manual/reference/method/db.collection.insert/) - detailed documentation of MongoDB's `insert` collection method.
- [Importing data](https://docs.mongodb.org/getting-started/shell/import-data/) - overview of MongoDB's `mongoimport` command line utility.
- [mongoimport](https://docs.mongodb.org/manual/reference/program/mongoimport/) - detailed documentation of MongoDB's `mongoimport` command line utility.

MongoDB's `mongoimport` command will let us load bulk data from a `JSON` or `CSV` file.

### Demonstration

First we'll load data in bulk from `sample-data/csv/people.csv`.  We'll save the command in `scripts/import/people.sh`.

```bash
mongoimport --db=mongo-crud --collection=people --type=csv --headerline --file=sample-data/csv/people.csv
```

If we want to clear the collection before the import we pass the `--drop` flag.

Now that we've inserted data into it, the `mongo-crud` database and the `people` collection both exist.

```bash
$ mongo mongo-crud
MongoDB shell version: 3.0.7
connecting to: mongo-crud
> show dbs
local       0.078GB
mongo-crud  0.078GB
> show collections
people
system.indexes
> db.people.count();
2438
```

Next we'll use the `insert` collection method to add a few more people.  We'll save our invocations in `insert/people.js`.  We'll execute that script using the `mongo` `load` method.  Let's give these people a middle_initial or a nick_name. Note that the attributes we choose for these people need not match those from the data we loaded in bulk.

```
> load('scripts/insert/people.js');
```

MongoDB uses JSON natively (technically [BSON](https://docs.mongodb.org/manual/reference/glossary/#term-bson)), which makes it well suited for JavaScript applications.  Conveniently, MongoDB lets us specify the JSON as a JavaScript object.

#### Code along

Together we'll add a few cities then we'll bulk load `sample-data/csv/cities.csv`.

#### Practice

Add a pet to the `pets` collection using `insert` then bulk load `sample-data/csv/pets.csv`.

Next add a person to the `people` collection using `insert` then bulk load `sample-data/csv/people.csv`.

---


## Retrieving documents from a collection

- [Querying](https://docs.mongodb.org/getting-started/shell/query/) - Overview of retrieving data from MongoDB.
- [Queries](https://docs.mongodb.org/manual/reference/mongo-shell/#queries) - More detailed overview on retrieving data.
- [find](https://docs.mongodb.org/manual/reference/method/db.collection.find/) - Detailed documentation on the `find` collection method.
- [findOne](https://docs.mongodb.org/manual/reference/method/db.collection.findOne/) - Detailed documentation on the `findOne` collection method.
- [Data aggregation](https://docs.mongodb.org/getting-started/shell/aggregation/) - Overview of summarizing documents.
- [aggregate](https://docs.mongodb.org/manual/reference/method/db.collection.aggregate/) - Detailed documentation on the `aggregate` collection method.

### Demonstration

Let's see some what we can learn about the people in the database.

**Note:**   In a MongoDB shell script we'll use `.forEach(printjson)` to display results.  When using the REPL the `.pretty()` method can be quite helpful.

What do we see?

* MongoDB gave each of our documents a unique ID field, called _id.

* MongoDB doesn't care that some documents have fewer or more attributes.

Let's look at the [SQL to MongoDB Mapping Chart](http://docs.mongodb.org/manual/reference/sql-comparison/).

### Code along

Together we'll build a query to get the count of cities by country.

### Practice

Write a query to get the count of animals by kind born before 2010.

Then write a query to count people by height.

---

## Changing the data in documents in a collection

- [Updating Data](https://docs.mongodb.org/getting-started/shell/update/) - overview of changing documents
- [update](https://docs.mongodb.org/manual/reference/method/db.collection.update/) - detailed documentation of MongoDB's `update` collection method.
- [Update Operators](https://docs.mongodb.org/manual/reference/operator/update/) - The different modifications we can make during an update.

### Demonstration

MongoDB makes it easy to add an array of items to a document.  We'll update some people and give them some pets.  Then we'll remove everyone's nick_name.

### Code along

Let's update some cities population.

### Practice

Update weight for pets then people.

---

## Deleting documents

- [Removing Data](https://docs.mongodb.org/getting-started/shell/remove/) - Overview of removing documents from a collection.
- [remove](https://docs.mongodb.org/manual/reference/method/db.collection.remove/) - detailed documentation of MongoDB's `remove` collection method.

If we want to clean up, `db.<collection>.drop();` drops the specified collection and `db.dropDatabase();` drops the current database.

### Demonstration

We'll remove a few people from the data-store.

### Code along

Let's remove the cities that don't have a region.

### Practice

Remove pets born before 1996 then people taller than 5'11".

## Assessment

