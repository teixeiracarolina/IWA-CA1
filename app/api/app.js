var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

const CONNECTION_STRING = `mongodb://localhost:27017/books`;
mongoose.connect(CONNECTION_STRING);

var Book = require('./models/book');


//get all book data from db
app.get('/api/books', function (req, res) {
    // use mongoose to get all books in the database
    Book.find(function (err, books) {
        // if there is an error retrieving, send the error otherwise send data
        if (err)
            res.send(err)
        res.json(books); // return all books in JSON format
    });
});

// get a book with ID of 1
app.get('/api/books/:book_id', function (req, res) {
    // get the ID parameter from params
    let id = req.params.book_id;
    // use model to find a book by its ID
    Book.findById(id, function (err, book) {
        if (err)
            res.send(err)

        // return the found book to app
        res.json(book);
    });

});


// create book and send back all books after creation
app.post('/api/books', function (req, res) {

    // create mongose method to create a new record into collection
    Book.create(req.body, function (err, book) {
        if (err)
            res.send(err);

        // return the created book to app
        res.json(book);
    });

});


// create book and send back all books after creation
app.put('/api/books/:book_id', function (req, res) {

    // create mongose method to update an existing record into collection
    let id = req.params.book_id;

    // update the book data
    Book.findByIdAndUpdate(id, req.body, function (err, book) {
        if (err) throw err;

        // return the book to app
        res.json(book);
    });
});

// delete a book by id
app.delete('/api/books/:book_id', function (req, res) {

    // get the ID parameter from params
    let id = req.params.book_id;
    // find the book by ID and delete it
    Book.findByIdAndDelete(id, function (err) {
        if (err)
            res.send(err);
        
        // return response to app
        res.json({status: true});
    });
});

// start the ExpressJS server
app.listen(port);
console.log("App listening on port : " + port);