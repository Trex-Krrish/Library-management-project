const BookRequest = require('../models/bookRequest.model');
const Book = require('../models/book.model');

// Create a new book request
exports.createBookRequest = async (req, res) => {
    const { bookId } = req.body;
    try {
        const bookRequest = new BookRequest({
            user: req.user._id,
            book: bookId
        });
        await bookRequest.save();
        res.status(201).json({ message: 'Book request created successfully', bookRequest });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all book requests (admin only)
exports.getAllBookRequests = async (req, res) => {
    try {
        const bookRequests = await BookRequest.find().populate('user', '-password').populate('book');
        res.json(bookRequests);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get a single book request by ID
exports.getBookRequestById = async (req, res) => {
    try {
        const bookRequest = await BookRequest.findById(req.params.id).populate('user').populate('book');
        if (!bookRequest) {
            return res.status(404).json({ message: 'Book request not found' });
        }
        res.json(bookRequest);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update the status of a book request (admin only)
exports.updateBookRequestStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const bookRequest = await BookRequest.findById(req.params.id);
        if (!bookRequest) {
            return res.status(404).json({ message: 'Book request not found' });
        }

        // Update the status of the book request
        bookRequest.status = status;
        await bookRequest.save();

        if (status === 'accepted') {
            const book = await Book.findById(bookRequest.book);
            if (book.stocks > 0) {
                book.stocks -= 1;
                await book.save();
            } else {
                return res.status(400).json({ message: 'No stocks available for this book' });
            }
        }

        if (status === 'returned') {
            const book = await Book.findById(bookRequest.book);
            book.stocks += 1;
            bookRequest.returned = true;
            await book.save();
            await bookRequest.save();
        }
        
        res.json({ message: 'Book request status updated successfully', bookRequest });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete a book request (admin only)
exports.deleteBookRequest = async (req, res) => {
    try {
        const bookRequest = await BookRequest.findByIdAndDelete(req.params.id);
        if (!bookRequest) {
            return res.status(404).json({ message: 'Book request not found' });
        }
        res.json({ message: 'Book request deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};