# An Introduction to MongoDB

Relational databases like PostgreSQL are good at modeling data that fits nicely into tables.  What do you do if your data doesn't fit that mold?

## Objectives

By the end of the lesson, students will be able to do the following:

* Describe and explain the tradeoffs involved in using a NoSQL database like MongoDB instead of a relational database like PostgreSQL 
* Select a MongoDB database and collection to work with using the Mongo shell
* Create, Read, Update, and Destroy documents in a MongoDB collection using the Mongo shell

## Before we begin: installation

If you don't have MongoDB installed on your computer, you can follow the instructions in INSTALL.md to install it.

## Vocabulary

MongoDB uses its own particular vocabulary:

|**Relational Database Term**|**MongoDB Term**|
|:-------|:------|
| database | database |
| table | collection | 
| row | document | 
| column | field | 

## Creating a MongoDB database and a collection

We're going to start with practical matters and then move to theoretical ones.  
Start the mongo shell by typing 'mongo' and see:

```
Tiresias:wdi_8_mongo_intro cwilbur$ mongo
MongoDB shell version: 3.0.3
connecting to: test
> 
```

The command to switch a new database is `use` -- and if you don't yet have a database named that, it will still let you switch to that database.  When you add data, it will create it.

(Our example today will be building a contacts database, using the database `contacts`.)

The command to list databases is `show databases`

For example:

```
> show databases
local  0.078GB
> use contacts
switched to db contacts
> show databases
local  0.078GB
> 
```

Note that I have switched to the `contacts` database, but because I haven't put any data into it yet, it doesn't show up in the database list.

Our collection will also be called `contacts`. It has no entries in it yet, which you can see by saying `db.contacts.count()`

```
> db.contacts.count()
0
```

This is a common pattern in Mongo: you can refer to anything you like, and Mongo will cooperate, but things are not actually created until you give Mongo something to remember.

## Creating data

We're going to start keeping a contacts database for our job search.  (All these people are fictional.)

Our first contact is Joe Recruiter, with Staffing Inc.  So we create his record this way:

```
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

MongoDB uses JSON natively, which makes it convenient for Javascript web applications.

Also, the `contacts` database exists now that we have inserted data into it:

```
>  show databases;
contacts  0.078GB
local     0.078GB
> 
```

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

Consider the JSON representation first: think before you type!

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

What do we see in this?

* MongoDB gave each of our documents a unique ID field, called ID.

* MongoDB doesn't care that Joe and Ann only have one email, while Martine has two emails.  It also doesn't care that Martine has a job title, while Joe and Ann do not.  

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

We got a call from 617-555-1122 called us!  Who could it be?

```
db.contacts.find({ $or: [
    { phone: '617-555-1122'},
    { 'phone.office': '617-555-1122' },
    { 'phone.cell': '617-555-1122' },
    { 'phone.home': '617-555-1122' }   
]});
```

There is an incredibly useful table that translates from SQL to MongoDB syntax at [http://docs.mongodb.org/manual/reference/sql-comparison/](http://docs.mongodb.org/manual/reference/sql-comparison/).

## Try it yourself

I recommend working within your groups so that you can assist each other.

* Make up five fictional people and add them to your contacts database.  

* For now, keep things in the formats we have used with Joe Recruiter, Ann Placement-Manager, and Martine H. R. Director.

* Make sure at least one of your people works for Staffing Inc. or TechCorp LLC.

* Search for your people and make sure you find them in the database!

## Update

Suppose that Joe Recruiter has spun off his own firm.  We start with finding him in the database:

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

With the same clause, we can update:

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

(Yes, we could have done both of those in one statement.)

Notice the $set key: the value is a dictionary of key-value pairs to update.

## You try it

* One of the contacts you added got a job at Staffing Inc.  Change his or her company, office phone number, and email.

* One of your contacts has a new job title.  Update it.

## Keeping a record of communications

We're using this database to support a job hunt, right?

```
db.contacts.update({ 
    name: "Joe Recruiter" 
}, { 
    $push: { communications: { 
        date: '20150611', 
        summary: "Discussed General Assembly teaching job" }
    }
});

db.contacts.update({ 
    name: "Joe Recruiter" 
}, { 
    $push: { communications: { 
        date: '20150612', 
        summary: "Discussed General Assembly teaching job further" }
    }
});
```

## You try it

Create a list of something attached to one of your contacts.  Maybe he collects clssica cars -- or ex-partners?

## Deleting a field

Joe Recruiter has been indicted for nefarious something-or-other, so we want to remove our contact record:

```
db.contacts.update({
    name: "Joe Recruiter"
}, { $unset: { communications: 1 }});
})
```

## Deleting a document
 
Joe Recruiter went to jail.  No point in keeping him as a contact!

```
db.contacts.remove({ name: "Joe Recruiter"});
```

# Lab: Veterinary Cat-astrophe

We're starting a veterinary practice to take care of all the cats we know!

Start with `use cats` in your MongoDB shell, then add these cats:

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
* Boris likes echolocating in ventilation systems.
* Sacco and Vanzetti like making mischief.
* Bond likes ordering people around.
* Domino likes harassing other cats.

(These are all real cats.  At this point, we can add more cats suggested by people in class: we'll make a list on the whiteboard.)

Now, we're a veterinary practice.   Make up at least fifteen vet visits and use the update + $push method to record them.  Do not distribute them evenly: some cats should have no vet visits on record, others will have several.

## Review Objectives

We haven't discussed the first objective!  Based on what you've seen, what *are* the tradeoffs involved in using a NoSQL database like MongoDB instead of a relational database like PostgreSQL?









