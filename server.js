const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const bodyParser = require('body-parser');


const application = express();


// Connection URL
var url = 'mongodb://localhost:27017/data';


application.engine('mustache', mustacheExpress());
application.set('view engine', 'mustache');
application.set('views', './views');

application.use(express.static('public'));

application.get('/', function(request,response){

    MongoClient.connect(url, async function(err,db){
        var robotos = await db.collection('newrobots').find().toArray();
        response.render('index', { user: robotos });
        db.close;
    });
});

application.get('/lookingForWork', function(request,response){

    MongoClient.connect(url, async function(err,db){
        var robotos = await db.collection('newrobots').find({job: null}).toArray();
        response.render('lookingForWork', { user: robotos });
        db.close;
    });
});


application.get('/employed', function(request,response){

    MongoClient.connect(url, async function(err,db){
        var robotos = await db.collection('newrobots').find({job: { $ne: null }}).toArray();
        response.render('employed', { user: robotos });
        db.close;
    });
});

application.get('/:id', function(request,response){

    MongoClient.connect(url, async function(err,db){
        var robotos = await db.collection('newrobots').find({ id: parseInt(request.params.id)}).toArray();
        response.render('robot', { user: robotos });
        db.close;
    });
});




// find({job: null})  // ({job: { $ne: null }) find ({ id: parseInt(request.params.id)}toArray
// application.get('/lookingForWork', function(request, response){
// MongoClient.connect(url, async function(err,db){
//         var robotos = await db.collection('newrobots').find().toArray();

//         response.send('hey');
//   response.render('lookingForWork', { user: robotos });
//   db.close;
// })
// });




  










application.listen(3000, function () {
  console.log('Successfully started express application!');
});