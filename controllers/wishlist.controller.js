const Wishlist = require('../models/wishlist.model');
const Book = require('../models/book.model');

exports.addToWishlist = async (req, res) => {
    try {
        const book = await Book.findById(req.body.bookId);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            })
        }

        const existingWishlistItem = await Wishlist.findOne({ user: req.user._id, book: req.body.bookId });
        if (existingWishlistItem) {
            return res.status(400).json({
                message: 'Book already in wishlist'
            })
        }

        const wishlistItem = new Wishlist({
            user: req.user._id,
            book: req.body.bookId
        })
        await wishlistItem.save();

        res.status(201).json({ message: "Book added to wishlist", wishlistItem: wishlistItem });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.removefromWishlist = async (req, res) => {
    try {
        const wishlistItem = await Wishlist.findOneAndDelete({ user: req.user._id, book: req.body.bookId })
        if (!wishlistItem) {
            return res.status(404).json({
                message: 'Book not found in wishlist'
            })
        }

        res.status(200).json({ message: "Book removed from wishlist", wishlistItem: wishlistItem });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ user: req.user._id }).populate('book');
        res.status(200).json({ wishlist: wishlist });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}