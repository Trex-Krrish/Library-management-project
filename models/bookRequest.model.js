const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'returned'],
        default: 'pending'
    },
    returned: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updatedAt field on save
bookRequestSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const BookRequest = mongoose.model('BookRequest', bookRequestSchema);

module.exports = BookRequest;