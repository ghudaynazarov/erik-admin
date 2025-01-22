const path = require('path');
const express = require('express');
const mainController = require('../controllers/main');
const router = express.Router();

router.get('/',mainController.getIndex);
router.get('/single-room', mainController.getSingleRoom);
router.get('/gallery', mainController.getGallery);
router.get('/history', mainController.getHistory);
router.get('/comment', mainController.getComment);

module.exports = router;
