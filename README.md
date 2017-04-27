[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# An Introduction to MongoDB

## Instructions

Fork and clone this repository.

## Objectives

By the end of the lesson, students should be able to:

-   Use the MongoDB shell to interact with MongoDB databases and collections
-   Create, Read, Update, and Delete documents in MongoDB collections using the
    MongoDB shell.

## Prerequisites

Basic JavaScript.

Required readings:

-   [SQL noSQL Disussion](https://github.com/ga-wdi-boston/sql-nosql-discussion)
-   [Mongo DB Is Web Scale](https://www.youtube.com/watch?v=b2F-DItXtZs)
-   [Getting Started with MongoDB (MongoDB Shell Edition)](https://docs.mongodb.org/getting-started/shell/)

## Installation

We'll run `brew install mongodb` then to make sure we're up to date run
`brew update` then `brew upgrade mongo`.

### On Ubuntu

Run `sudo apt-get install mongodb`

## Introduction

Relational databases are good at modeling data that fits into tables.  What do
you use if your data isn't that structured?

Perhaps a [noSQL](https://en.wikipedia.org/wiki/NoSQL) data-store.

MongoDB is a schema-less document-store that organizes documents in collections.
What does this mean?

### Terminology

| **Relational Database Term** | **MongoDB Term** |
|:-----------------------------|:-----------------|
| database                     | database         |
| table                        | collection       |
| row                          | document         |
| column                       | field            |

## Create a database

### Code along

We'll use `mongo-crud` as the database to hold our tables and
[mongo](https://docs.mongodb.org/manual/reference/program/mongo/) to interact
with it.  `mongo` is MongoDB's command line client which lets us execute
commands interactively and from scripts.

First let's fire up our server:

```bash
brew services start mongodb
```

```bash
$ mongo mongo-crud
MongoDB shell version: 3.2.10
connecting to: mongo-crud
>
```

The command to list databases is `show databases` (or `show dbs`):

```bash
> show databases
local  0.000GB # or local  0.078GB
>
```

Unlike PostgreSQL, MongoDB lets us select a database that hasn't been created.
When we add a collection, the database will be created.

If we didn't specify the database on the command line we can connect to a
database with `use <database name>`:

```bash
MongoDB shell version: 3.2.10
connecting to: test
> use mongo-crud
switched to db mongo-crud
> show databases
local  0.078GB
>
```

## Create a Collection

### Code Along

Our first collection will be called `people`. It has no entries.

```bash
> show collections
> db.people.count();
0
```

This is a common pattern in MongoDB: you can refer to things that don't yet
exist, and it will cooperate.  MongoDB won't create them until you give it
something to remember.

## Adding a document to a collection

-   [Inserting data](https://docs.mongodb.org/getting-started/shell/insert/) - Overview of adding documents to a collection.
-   [db.collection.insert()](https://docs.mongodb.org/manual/reference/method/db.collection.insert/) - detailed documentation of MongoDB's `insert` collection method.
-   [Importing data](https://docs.mongodb.org/getting-started/shell/import-data/) - overview of MongoDB's `mongoimport` command line utility.
-   [mongoimport](https://docs.mongodb.org/manual/reference/program/mongoimport/) - detailed documentation of MongoDB's `mongoimport` command line utility.

MongoDB's `mongoimport` command will let us load bulk data from a `JSON` or
`CSV` file.

### Demo: Bulk Load Books

Watch as I load data in bulk from `data/books.csv`.  We'll save the
command in `scripts/import/books.sh`.

```bash
mongoimport --db=mongo-crud --collection=books --type=csv --headerline --file=data/books.csv
```

#### Code along: Bulk Load People

First we'll load data in bulk from `data/people.csv`.  We'll save the
command in `scripts/import/people.sh`.

```bash
mongoimport --db=mongo-crud --collection=people --type=csv --headerline --file=data/people.csv
```

If we want to clear the collection before the import, we pass the `--drop` flag.

Run this script by typing:

 ``` sh path_to_file.sh ```

Now that we've inserted data into it, the `mongo-crud` database and the `people`
collection both exist.

```bash
$ mongo mongo-crud
MongoDB shell version: 3.2.10
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

Next we'll use the `insert` collection method to add a few more people.  We'll
save our invocations in `insert/people.js`.  We'll execute that script using the
`mongo` `load` method.  Let's give these people a middle_initial or a nick_name.
Note that the attributes we choose for these people need not match those from
the data we loaded in bulk.

```bash
> load('scripts/insert/people.js');
```

MongoDB uses JSON natively (technically
[BSON](https://docs.mongodb.org/manual/reference/glossary/#term-bson)), which
makes it well suited for JavaScript applications.  Conveniently, MongoDB lets us
specify the JSON as a JavaScript object.

### Code along: Insert Doctors

Together we'll add a few doctors then we'll bulk load
`data/doctors.csv`.

### Lab: Insert Ingredients

Add an ingedient to the `ingredients` collection using `insert` then bulk load
`data/ingredients.csv`.

---

## Retrieving documents from a collection

-   [Querying](https://docs.mongodb.org/getting-started/shell/query/) - Overview of retrieving data from MongoDB.
-   [Queries](https://docs.mongodb.org/manual/reference/mongo-shell/#queries) - More detailed overview on retrieving data.
-   [find](https://docs.mongodb.org/manual/reference/method/db.collection.find/) - Detailed documentation on the `find` collection method.
-   [findOne](https://docs.mongodb.org/manual/reference/method/db.collection.findOne/) - Detailed documentation on the `findOne` collection method.
-   [Data aggregation](https://docs.mongodb.org/getting-started/shell/aggregation/) - Overview of summarizing documents.
-   [aggregate](https://docs.mongodb.org/manual/reference/method/db.collection.aggregate/) - Detailed documentation on the `aggregate` collection method.

### Demo: Read Books

Let's see some what we can learn about the books in the database.

```bash
> db.books.find({author: "Ernest Hemingway"}).pretty()
{
	"_id" : ObjectId("583ee3f3e6ae0faa5547068e"),
	"title" : "A Farewell to Arms",
	"author" : "Ernest Hemingway",
	"published_on" : "1986-02-15"
}
{
	"_id" : ObjectId("583ee3f3e6ae0faa5547071a"),
	"title" : "The Sun Also Rises",
	"author" : "Ernest Hemingway",
	"published_on" : "2002-10-20"
}
> db.books.find({published_on: /20/}).count()
36
> db.books.find({published_on: /20/}).sort({title: -1}).limit(2).pretty()
{
	"_id" : ObjectId("583ee3f3e6ae0faa5547072f"),
	"title" : "Wide Sargasso Sea",
	"author" : "Jean Rhys",
	"published_on" : "2011-01-14"
}
{
	"_id" : ObjectId("583ee3f3e6ae0faa55470725"),
	"title" : "Trader",
	"author" : "Charles de Lint",
	"published_on" : "2003-06-23"
}
```

**Note:**   When using the REPL the `.pretty()` method can be quite helpful.

What do we see?

-   MongoDB gave each of our documents a unique ID field, called _id.
-   MongoDB doesn't care that some documents have fewer or more attributes.



### Code along: Read People and Doctors

Together we'll build a query to our people collections table. Let's see if we
can find all people born after a date. How about the number of people under
5 feet tall, and doctors who perform surgery?

### Lab: Read Ingredients

Write a query to get all the ingredients of unit of `tbsp`.

---

## Changing the data in documents in a collection

-   [Updating Data](https://docs.mongodb.org/getting-started/shell/update/) - overview of changing documents
-   [update](https://docs.mongodb.org/manual/reference/method/db.collection.update/) - detailed documentation of MongoDB's `update` collection method.
-   [Update Operators](https://docs.mongodb.org/manual/reference/operator/update/) - The different modifications we can make during an update.

### Demo: Update Books

MongoDB makes it easy to add an array of items to a document.  We'll update
some books and give them a correct `published_on` value.

```bash
> db.books.update({title: 1984}, {$set: {published_on: "1949-06-08"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.books.update({title: "Slaughterhouse-Five"}, {$set: {published_on: "1969-03-31", book_cover: "brown", pages: 247} })
```

What happens if we run an `update` command without the `$set` option?

### Code along: Update People and Doctors

Now, let's update some people with a hometown. Let's update some doctors
specialty.

### Lab: Update Ingredients

Update a couple of ingredients units.

---

## Deleting documents

-   [Removing Data](https://docs.mongodb.org/getting-started/shell/remove/) - Overview of removing documents from a collection.
-   [remove](https://docs.mongodb.org/manual/reference/method/db.collection.remove/) - detailed documentation of MongoDB's `remove` collection method.

If we want to clean up, `db.<collection>.drop();` drops the specified collection
and `db.dropDatabase();` drops the current database.

### Demo: Delete Books

We'll remove a few books from the data-store. There are methods for removing
one and multiple entries.

```bash
> db.books.deleteOne({author:"Mongo Expert"})
WriteResult({ "nRemoved" : 1 })
> db.books.deleteOne({author:"Mongo Expert"})
WriteResult({ "nRemoved" : 3 })
```

### Code along: Delete People and Doctors

Let's remove all the people with a specific `bornOn` date and doctors with
`Internal Medicine` as their specialty

### Lab: Delete Ingredients

Remove Ingredients that have `ml` as their unit of measure.

## Additional resources

-   [BSON Types](https://docs.mongodb.org/manual/reference/bson-types/)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
