const express = require('express');
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getReviews);
router.post('/', protect, admin, addReview);
router.put('/:id', protect, admin, updateReview);
router.delete('/:id', protect, admin, deleteReview);

module.exports = router;
