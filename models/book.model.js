const mongoose = require('mongoose');

const generateShortId = () => {
    return Math.random().toString(36).substr(2, 8);
};

const bookSchema = new mongoose.Schema({
    book_id: {
        type: String,
        default: generateShortId,
        unique: true
    },
    book_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stocks: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    author: {
        type: String,
        required: false,
        trim: true
    },
    published_date: {
        type: Date,
        required: false,
        default: Date.now
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;