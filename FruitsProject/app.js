const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

// Define a schema for the DB
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  // Data validation
  rating: {
    type: Number,
    min: [1, "Minimum rating from 0"],
    max: [10, "Maximum rating up to 10"]
  },
  review: String
});

// Create a new collection in DB with the given schema
const Fruit = mongoose.model("Fruit", fruitSchema);

const peach = new Fruit({
  name: "Peach",
  rating: 7,
  review: "Yummy"
});

// peach.save();

const apple = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit"
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Too sour for me!"
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture!"
});

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });

    mongoose.connection.close();
  }
});

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

// Attributes: query, document, callback function
// Fruit.updateOne({name: "Peach"}, {review: "This is so yummy!"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document.");
//   }
// });

// Fruit.deleteOne({name: "Peach"}, function(err) {
//   if(err) {
//       console.log(err);
//     } else {
//       console.log("Successfully deleted the document.");
//     }
// });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const john = new Person({
  name: "John",
  age: 37
});

// Practice

const pipeapple = new Fruit({
  name: "Pineapple",
  rating: 8,
  review: "Great fruit."
})

// pipeapple.save();

const amy = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pipeapple
});

// Practice 2

const mango = new Fruit({
  name: "Mango",
  rating: 6,
  review: "Descent fruit."
})

mango.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err) {
    if(err) {
        console.log(err);
      } else {
        console.log("Successfully updated the document.");
      }
});

// amy.save();

// Person.deleteMany({name: "Bob"}, function(err) {
//   if(err) {
//       console.log(err);
//     } else {
//       console.log("Successfully deleted the document.");
//     }
// });

//=============================================================================

// Using Native Mongo Driver
//
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url, {
//   useUnifiedTopology: true
// });
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.strictEqual(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   /*
//   insertDocuments(db, function() {
//     client.close();
//   });
//   */
//
//
//   findDocuments(db, function() {
//     client.close();
//   });
// });
//
// const insertDocuments = function(db, callback) {
//   //Get the Document collection
//   const collection = db.collection('fruits');
//   //Insert some documents
//   collection.insertMany([
//     {
//       dbName: "Apple",
//       score: 8,
//       review: "Great Fruit"
//     },
//     {
//       dbName: "Orange",
//       score: 6,
//       review: "Kind Sour"
//     },
//     {
//       dbName: "Banana",
//       score: 9,
//       review: "Great Stuff"
//     }
//   ], function(err, result) {
//     assert.strictEqual(err, null);
//     assert.strictEqual(3, result.result.n);
//     assert.strictEqual(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }
//
// const findDocuments = function(db, callback) {
//   //Get the Document collection
//   const collection = db.collection('fruits');
//   //Find some documents
//   collection.find({}).toArray(function(err, fruits) {
//     assert.strictEqual(err, null);
//     console.log("Found the following records");
//     console.log(fruits);
//     callback(fruits);
//   });
// }
