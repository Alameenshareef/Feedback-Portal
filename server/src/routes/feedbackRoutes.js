const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig');
const auth = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');
const {
  createFeedback,
  getAllFeedback,
  addComment
} = require('../controllers/feedbackController');

// Client: submit feedback
router.post('/', auth, upload.single('image'), createFeedback);

// Admin: view all feedback
router.get('/', auth, allowRoles('admin'), getAllFeedback);

// Admin comment on feedback
router.patch('/:id/comment', auth, allowRoles('admin'), addComment);

module.exports = router;
