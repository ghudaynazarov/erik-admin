const {
    check,
    body
} = require("express-validator");
const {
validationResult
} = require("express-validator");

const express = require("express");
const router = express();

const mainController = require('../controllers/main');

router.post('/book-reservation', [
    body("name")
    .isLength({
      min: 1,
    })
    .withMessage("name"),
    body("email")
    .isEmail()
    .withMessage("email"),
    body("message")
    .isLength({
      min: 3,
    })
    .withMessage("message"),
], mainController.postReservation
);

router.post('/comment', [
    body("name")
    .isLength({ min: 2})
    .withMessage("Please enter a name"),
    body("email")
    .isEmail(),
    body("message")
    .isLength({min: 3})
    .withMessage('Please enter a message!')
], mainController.postReview );

router.post('/book', [
    body("checkIn")
    .isDate()
    .withMessage("Please enter a check in date."),
    body("checkOut")
    .isDate()
    .withMessage("Please enter a check out date."),
    body("room")
    .isInt({min: 1})
    .withMessage('Please select one room.'),
    body("phonenumber")
    .isLength({min: 3})
    .withMessage("Please enter phone number.")
], mainController.postBook );

module.exports = router;
