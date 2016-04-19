---
layout: post
title:  "mongodb nodejs driver"
---

### install

1. 安装node package

```bash
npm install mongodb
```

2. client

```js
var MongoClient  = require('mongodb').MongoClient;
```

3. connect

```js
MongoClient.connet(url, (err, db) => {
  console.log('db connected.');
  db.close();
})
```

### insert

- ``db.collection(COLLECTION_NAME).insertOne(doc, (err, rst) => {})``
- ``db.collection(COLLECTION_NAME).insertMany(docs, (err, rst) => {})``

```js
var docs = [{name:'John', age:18}, {name:'Jack', age:19}]

// insert one
db.collection('testCollection').insertOne(docs[0], (err, rst) => {
  console.log(rst.insertedId);
  db.close();
})

// insert many
db.collection('testCollection').insertMany(docs, (err, rst) => {
  console.log(rst.insertedIds);
  db.close();
})
```

### find

``db.collection(COLL_NAME).find(<query>).sort(<sort>)``

```js
var rst = db.collection('testCollection').find({
  age : {$gt:18}
}).sort({age:1}) // 1 升序, -1降序
rst.each((err, doc) => {
  if(doc){
    console.log(doc)
  }else{
    db.close();
  }
})
```

### update

- ``db.collection(COLL_NAME).updateOne(<query>, <update>, (err, rst) => {})``
- ``db.collection(COLL_NAME).updateMany(<query>, <update>,  (err, rst) => {})``

```js
db.collection('testCollection').updateOne({name:'John'}, {
  $set : {name : 22}
}, (err, rst) => {
  console.log(rst.updatedId);
  db.close();
})
```

### remove

``db.collection(COLL_NAME).deleteMany(<query>, (err, rst) => {})``

```js
db.collection('testCollection').deleteMany({age : 18}, (err, rst) => {
  console.log(rst.deletedCount)
})
```

### drop collection

```js
db.collection(COLL_NAME).drop((err, response) => {})
```

### aggregate

``db.collection(COLL_NAME).aggregate(<aggregate>)``
