![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

# An Introduction to MongoDB

Relational databases are good at modeling data that fits into tables.  What do you use if your data isn't that structured?

## Objectives

By the end of the lesson, students should be able to:

* Describe tradeoffs between using a NoSQL database versus a relational database
* Use the MongoDB shell to interact with MongoDB databases and collections
* Create, Read, Update, and Delete documents in MongoDB collections using the Mongo shell

## Installation

We'll walk through the instructions in `INSTALL.md`.

## Terminology

|**Relational Database Term**|**MongoDB Term**|
|:-------|:------|
| database | database |
| table | collection |
| row | document |
| column | field |

## Creating a MongoDB database and a collection

First we start the mongo shell:

```
$ mongo
MongoDB shell version: 3.0.3
connecting to: test
>
```

The command to list databases is `show databases`

```
> show databases
local  0.078GB
>
```

The command to connect to a database is `use <database name>`:

```
> use crud
switched to db crud
> show databases
local  0.078GB
>
```

MongoDB lets us select a database that hasn't been created.  When we add a collection, the database will be created.

Our first collection will be called `contacts`. It has no entries.

```
> db.contacts.count();
0
```

This is a common pattern in MongoDB: you can refer to things that don't yet exist, and it will cooperate.  MongoDB won't create them until you give it something to remember.

## Creating data

We're going to start keeping a contacts collection.

Our first contact is Joe Recruiter, with Staffing Inc.  We can create his record this way:

### Demonstration

```js
db.contacts.insert({
    name: 'Joe Recruiter',
    company: 'Staffing Inc.',
    phone: {
        office: '617-555-1991 ext. 311',
        cell: '508-555-9215'
    },
    email: 'joe.recruiter@staffinginc.com'
});
```

MongoDB uses JSON natively, which makes it convenient for JavaScript web applications.  Conveniently, MongoDB let's us specify the JSON as a JavaScript object.

Now that we've inserted data into it, the `crud` database exists:

```
>  show databases;
contacts  0.078GB
local     0.078GB
>
```

### Code along

Let's add these people to the contacts database:

Ann Placement-Manager, Staffing Inc.,
office phone 617-555-1991 ext. 315,
cell phone 718-555-9151,
email ann.placementmanager@staffinginc.com

Martine H. R. Manager, TechCorp LLC,
title Director of Human Resources,
office phone 617-555-7123,
cell phone 617-555-9918,
home phone 617-555-1122,
work email martine.h.r.manager@techcorpllc.com,
home email martinemanager@gmail.com

We'll create a script to run using the MongoDB shell.  We'll use `var db = new Mongo().getDB('crud');` at the top of the script to ensure we connect to the correct database.

<!--

db.contacts.insert({
    name: 'Ann Placement-Manager',
    company: 'Staffing Inc.',
    phone: {
        office: '617-555-1991 ext. 315',
        cell: '718-555-9151'
    },
    email: 'ann.placementmanager@staffinginc.com'
});

db.contacts.insert({
    name: 'Martine H. R. Manager',
    title: 'Director of Human Resources',
    company: 'TechCorp LLC',
    phone: {
        office: '617-555-7123',
        cell: '617-555-9918',
        home: '617-555-1122'
    },
    email: {
        work: 'martine.h.r.manager@techcorpllc.com',
        home: 'martinemanager@gmail.com'
    }
});

-->

## Retrieving and Reading Data

### Demonstration

Let's start by looking at the entire database so far.

```
> db.contacts.find();
{ "_id" : ObjectId("5579a06aaa2cdce4a1f15f21"), "name" : "Joe Recruiter", "company" : "Staffing Inc.", "phone" : { "office" : "617-555-1991 ext. 311", "cell" : "508-555-9215" }, "email" : "joe.recruiter@staffinginc.com" }
{ "_id" : ObjectId("5579a202aa2cdce4a1f15f22"), "name" : "Ann Placement-Manager", "company" : "Staffing Inc.", "phone" : { "office" : "617-555-1991 ext. 315", "cell" : "718-555-9151" }, "email" : "ann.placementmanager@staffinginc.com" }
{ "_id" : ObjectId("5579a20aaa2cdce4a1f15f23"), "name" : "Martine H. R. Manager", "title" : "Director of Human Resources", "company" : "TechCorp LLC", "phone" : { "office" : "617-555-7123", "cell" : "617-555-9918", "home" : "617-555-1122" }, "email" : { "work" : "martine.h.r.manager@techcorpllc.com", "home" : "martinemanager@gmail.com" } }
>
```

That's kind of tough to read, so we can filter it through `.pretty()`

```
> db.contacts.find().pretty();
{
    "_id" : ObjectId("5579a06aaa2cdce4a1f15f21"),
    "name" : "Joe Recruiter",
    "company" : "Staffing Inc.",
    "phone" : {
        "office" : "617-555-1991 ext. 311",
        "cell" : "508-555-9215"
    },
    "email" : "joe.recruiter@staffinginc.com"
}
{
    "_id" : ObjectId("5579a202aa2cdce4a1f15f22"),
    "name" : "Ann Placement-Manager",
    "company" : "Staffing Inc.",
    "phone" : {
        "office" : "617-555-1991 ext. 315",
        "cell" : "718-555-9151"
    },
    "email" : "ann.placementmanager@staffinginc.com"
}
{
    "_id" : ObjectId("5579a20aaa2cdce4a1f15f23"),
    "name" : "Martine H. R. Manager",
    "title" : "Director of Human Resources",
    "company" : "TechCorp LLC",
    "phone" : {
        "office" : "617-555-7123",
        "cell" : "617-555-9918",
        "home" : "617-555-1122"
    },
    "email" : {
        "work" : "martine.h.r.manager@techcorpllc.com",
        "home" : "martinemanager@gmail.com"
    }
}
```

What do we see?

* MongoDB gave each of our documents a unique ID field, called _id.

* MongoDB doesn't care that Joe and Ann only have one email, while Martine has two emails.  It also doesn't care that Martine has a job title, while Joe and Ann do not.

**Note:**   In a MongoDB shell script use `.forEach(printjson)` to display the results of your query.

### Searching for particular things

We can pass arguments to `find`, and MongoDB will give us all matching records:

```
> db.contacts.find({ _id: ObjectId("5579a20aaa2cdce4a1f15f23") }).pretty();
{
    "_id" : ObjectId("5579a20aaa2cdce4a1f15f23"),
    "name" : "Martine H. R. Manager",
    "title" : "Director of Human Resources",
    "company" : "TechCorp LLC",
    "phone" : {
        "office" : "617-555-7123",
        "cell" : "617-555-9918",
        "home" : "617-555-1122"
    },
    "email" : {
        "work" : "martine.h.r.manager@techcorpllc.com",
        "home" : "martinemanager@gmail.com"
    }
}
> db.contacts.find({ company: "Staffing Inc." }).pretty();
{
    "_id" : ObjectId("5579a06aaa2cdce4a1f15f21"),
    "name" : "Joe Recruiter",
    "company" : "Staffing Inc.",
    "phone" : {
        "office" : "617-555-1991 ext. 311",
        "cell" : "508-555-9215"
    },
    "email" : "joe.recruiter@staffinginc.com"
}
{
    "_id" : ObjectId("5579a202aa2cdce4a1f15f22"),
    "name" : "Ann Placement-Manager",
    "company" : "Staffing Inc.",
    "phone" : {
        "office" : "617-555-1991 ext. 315",
        "cell" : "718-555-9151"
    },
    "email" : "ann.placementmanager@staffinginc.com"
}
>
```

We got a call from 617-555-1122.  Who is it?

```
db.contacts.find({ $or: [
    { phone: '617-555-1122'},
    { 'phone.office': '617-555-1122' },
    { 'phone.cell': '617-555-1122' },
    { 'phone.home': '617-555-1122' }
]});
```

Let's look at the [SQL to MongoDB Mapping Chart](http://docs.mongodb.org/manual/reference/sql-comparison/).

## Code along

Working with your groups so that you can assist each other.

* Make up five fictional people and add them to your contacts collection.

* For now, keep things in the formats we have used with Joe Recruiter, Ann Placement-Manager, and Martine H. R. Director.

* Make sure at least one of your people works for Staffing Inc. or TechCorp LLC.

* Search for your people and make sure you find them in the database.

## Update

### Demonstration

Suppose that Joe Recruiter has founded his own firm.  We start with finding him in the database:

```
> db.contacts.find({name: "Joe Recruiter"}).pretty();
{
    "_id" : ObjectId("5579a06aaa2cdce4a1f15f21"),
    "name" : "Joe Recruiter",
    "company" : "Staffing Inc.",
    "phone" : {
        "office" : "617-555-1991 ext. 311",
        "cell" : "508-555-9215"
    },
    "email" : "joe.recruiter@staffinginc.com"
}
>
```

With the same searh clause, we can update that document:

```
db.contacts.update({
    name: "Joe Recruiter"
},{ $set: {
    company: 'Recruiter Recruitment LLC',
    'phone.office': '508-555-1111'
}});

db.contacts.update({
    name: "Joe Recruiter"
}, {
    $set: { email: 'joe@recruiterrecruitment.com' }
});
```

The $set key expects a dictionary of key-value pairs to update.

## Code along

* One of the contacts we added got a job at Staffing Inc.  Change his or her company, office phone number, and email.

* One of our contacts has a new job title.  Update it.

## Keeping a record of communications

MongoDB makes it easy to add an array of items to a document.

```
db.contacts.update({
    name: "Joe Recruiter"
}, {
    $push: { communications: {
        from: 'Bob',
        date: '20150914',
        summary: "Discussed entry level dev opportunity" }
    }
});

db.contacts.update({
    name: "Joe Recruiter"
}, {
    $push: { communications: {
        from: 'Bob',
        date: '20150916',
        summary: "Discussed entry level dev opportunity details" }
    }
});
```

## Code along

Let's create a list of something attached to one of our contacts.  Maybe she collects classic cars?

## Deleting a field

### Demonstration

We've secured a position and decide to remove our communications with Joe Recruiter:

```js
db.contacts.update({
    name: "Joe Recruiter"
}, { $unset: { communications: 1 }});
})
```

## Deleting a document

Joe Recruiter has retired and moved to Costa Rica so we remove him as a contact.

```
db.contacts.remove({ name: "Joe Recruiter"});
```

# Lab: Veterinary Cat-astrophe

We're starting a veterinary practice to take care of all the cats we know.

Start with `var db = new Mongo().getDB('crud');` at the top of your script, then add these cats:

* Tiger, male, age 7, black short hair, adopted from NYSPCA
* Reggie, male, age 7, half-Siamese striped tabby, adopted from NYSPCA
* Ting, seal point Siamese, age 8, male, Siamese rescue
* Boris, male, Russian blue, age 5, brother to Natasha, adopted from NYSPCA
* Natasha, female, Russian blue, age 5, sister to Boris, adopted from NYSPCA
* Bond, female, black and white tuxedo cat, age 4, found in Harvard Yard
* Sacco, male, half-Siamese, age 3, adopted from MSPCA, brother to Vanzetti
* Vanzetti, male, half-Siamese, age 3, adopted from MSPCA, brother to Sacco
* M, female, grey tuxedo cat, age 3, adopted from MSPCA
* Gilbert, male, 3/4-Siamese, age 3, adopted from MSPCA
* Sullivan, male 3/4-Siamese, age 3, adopted from MSPCA
* Domino, age 1, black and white tuxedo cat, rescued from Alabama
* Ann, female, age 8, grey leopard tabby, found under a barn, sister to Julian
* Julian, female, age 8, grey leopard tabby, found under a barn, sister to Ann

Some cats have favorite pastimes:

* Tiger likes sitting in the sun.
* Reggie likes complaining at the top of his voice.
* Boris likes echo-locating in ventilation systems.
* Sacco and Vanzetti like making mischief.
* Bond likes ordering people around.
* Domino likes harassing other cats.

Now, we're a veterinary practice.   Make up at least fifteen vet visits and use the update + $push method to record them.  Do not distribute them evenly: some cats should have no vet visits on record, others will have several.

If we want to clean up, `db.dropDatabase();` drops the current database.

## Review Objectives

We haven't discussed the first objective.  Based on what you've seen, what *are* the trade-offs involved in using a NoSQL database like MongoDB instead of a relational database like PostgreSQL?
