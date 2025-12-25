import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const {
        keyword,
        category,
        author,
        publisher,
        minPrice,
        maxPrice,
        binding,
        sortBy
    } = req.query;

    let query = {};

    // Keyword search (Name or Author)
    if (keyword) {
        query.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { author: { $regex: keyword, $options: 'i' } }
        ];
    }

    // Direct filters
    if (category) query.category = category;
    if (author && !keyword) query.author = author;
    if (publisher) query.publisher = publisher;
    if (binding) query.binding = binding;

    // Price range filter
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sort = {};
    if (sortBy === 'price-low') sort = { price: 1 };
    else if (sortBy === 'price-high') sort = { price: -1 };
    else if (sortBy === 'top-rated') sort = { rating: -1 };
    else sort = { createdAt: -1 };

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
        .sort(sort)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        author: 'Sample Author',
        publisher: 'Sample Publisher',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        isbn: '000-0000000000',
        pages: 0,
        language: 'Bangla',
        binding: 'Paperback',
        previewUrl: '/previews/sample.pdf'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        author,
        publisher,
        isbn,
        pages,
        language,
        binding,
        publicationYear,
        previewUrl,
        category,
        countInStock,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.author = author;
        product.publisher = publisher;
        product.isbn = isbn;
        product.pages = pages;
        product.language = language;
        product.binding = binding;
        product.publicationYear = publicationYear;
        product.previewUrl = previewUrl;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a review
// @route   DELETE /api/products/:id/reviews/:reviewId
// @access  Private/Admin
const deleteProductReview = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        const review = product.reviews.find(
            (r) => r._id.toString() === req.params.reviewId.toString()
        );

        if (review) {
            product.reviews = product.reviews.filter(
                (r) => r._id.toString() !== req.params.reviewId.toString()
            );

            product.numReviews = product.reviews.length;

            if (product.numReviews > 0) {
                product.rating =
                    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                    product.reviews.length;
            } else {
                product.rating = 0;
            }

            await product.save();
            res.json({ message: 'Review removed' });
        } else {
            res.status(404);
            throw new Error('Review not found');
        }
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
});

// @desc    Get unique filter values (Authors, Publishers, Categories)
// @route   GET /api/products/filters
// @access  Public
const getFilterValues = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category');
    const authors = await Product.distinct('author');
    const publishers = await Product.distinct('publisher');
    const bindings = await Product.distinct('binding');

    res.json({ categories, authors, publishers, bindings });
});

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    deleteProductReview,
    getTopProducts,
    getFilterValues,
};
