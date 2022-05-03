
// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let schema = new Schema({
    book_title: String,
    author_last_name: String,
    author_first_name: String,
    genre: String
});

schema.virtual('author').get(function() {
    return `${this.author_first_name} ${this.author_last_name}`;
});

module.exports = mongoose.model('Book', schema);