const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dbpass = "Computer-4";
const uri = `mongodb+srv://studymodule:${dbpass}@cluster0.brnmkmi.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "Study_Modules";

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let db = client.db(dbName);
const prd_collection = db.collection("lessons");
const ord_collection = db.collection("orders");

app.get('/', function (req, res, next) {
  res.send('select a collection, e.g., /products')
});

app.get('/lessons', async (req, res, next) => {
  await client.connect();
  const connect = await prd_collection.find({}).toArray(function (err, results) {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
  res.json(connect);
});
app.get('/orders', async (req, res, next) => {
  await client.connect();
  const connect = await ord_collection.find({}).toArray(function (err, results) {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
  res.json(connect);
});
app.post('/orders', async (req, res, next) => {
  await client.connect();
  const OrdersToInsert = req.body;
  const connect = await ord_collection.insertOne(OrdersToInsert, function (err, results) {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
  res.json(connect);
});
app.get('/Images/:imageName', (req, res, next) => {
  const imagePath = path.join(__dirname, './Images', req.params.imageName);

  // Check if the file exists
  fs.access(imagePath, fs.constants.F_OK, (error) => {
    if (error) {
      res.status(404).send('not found');
    } else {
      res.sendFile(imagePath);
    }
  });
});

app.use((req, res, next) => {
  const { method, originalUrl, protocol } = req;
  console.log(`${method} ${originalUrl} - ${protocol}://${req.get('host')}${req.originalUrl}]\n`);
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is listening on " + port);
});