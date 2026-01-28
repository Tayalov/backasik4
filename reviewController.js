const Review = require('../models/review');
const Product = require('../models/product');

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('productId', 'name');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const addReview = async (req, res, next) => {
  try {
    const { productId, text, rating } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    const review = await Review.create({ productId, text, rating });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }
    review.text = req.body.text || review.text;
    review.rating = req.body.rating || review.rating;
    const updated = await review.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }
    await review.remove();
    res.json({ message: 'Review removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getReviews, addReview, updateReview, deleteReview };
