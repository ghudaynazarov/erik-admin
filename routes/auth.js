const express = require('express');

const {
    check,
    body
} = require('express-validator');

const authController = require('../controllers/auth');
const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login',
    [
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),
        body('password', 'Password has to be valid.')
        .isLength({
            min: 3
        })
        .isAlphanumeric()
        .trim()
    ],
    authController.postAdmin
);

router.post('/logout', authController.postLogout);

// router.post('/post-admin', authController.postLogin);

module.exports = router;