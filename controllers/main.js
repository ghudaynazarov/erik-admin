const {
    check,
    body
} = require("express-validator");
const {
    validationResult
} = require("express-validator");

const Product = require('../models/productModel');
const Room = require('../models/roomModel');
const Address = require("../models/addressModel");
const Reservation = require("../models/reservationModel");
const Review = require("../models/review");
const Book = require("../models/bookModel");

exports.getIndex = async (req, res, next) => {
    const room = await Room.findAll();
    const address = await Address.findAll();
    const comments = await Review.findAll();
    Product.findAll()
        .then((product) => {                     
            res.render('main/index', {
                prods: product,
                rooms: room,
                address: address,
                comments,
                pageTitle: 'Shop',
                path: '/',
                // csrfToken: res.locals.csrfToken
            });
        })

};
    
exports.getSingleRoom = async (req, res, next) => {
    const address = await Address.findAll();
    Room.findAll()
        .then((rooms) => {
            res.render('main/single-room', {
                rooms: rooms,
                address,
                pageTitle: 'Single room',
                path: '/single-room',
                // csrfToken: res.locals.csrfToken
            });
        })

};

exports.getGallery = async (req, res, next) => {
    const address = await Address.findAll();
    Product.findAll()
        .then((products) => {
            res.render('main/guests-gallery', {
                prods: products,
                address,
                pageTitle: 'Gallery',
                path: '/gallery',
                // csrfToken: res.locals.csrfToken
            });
        })

};

exports.getHistory = async (req, res, next) => {
    const address = await Address.findAll();
    Product.findAll()
        .then((products) => {
            res.render('main/hotel-gallery', {
                prods: products,
                address,
                pageTitle: 'History of Dashoguz',
                path: '/history',
                // csrfToken: res.locals.csrfToken
            });
        })

};

exports.getComment = async (req, res, next) => {
    const address = await Address.findAll();
    Product.findAll()
        .then((products) => {
            res.render('main/comments-gallery', {
                prods: products,
                address,
                pageTitle: 'Comments',
                path: '/comment',
                // csrfToken: res.locals.csrfToken
            });
        })

};
    
exports.postReservation = async (req, res, next) => {
    const error = validationResult(req);
    const {
        name,
        email,
        message
    } = req.body;

    Reservation.create({
        name,
        email,
        message
    })
    .then(() => {
        res.status(201).json('Sended successfully!');
    })
    .catch(err => {
        console.log(err);
    })
};

exports.postReview = async (req, res, next) => {
    const {
        name,
        message
    } = req.body;

    Review.create({
        name,
        message
    })
    .then(() => {
        res.status(201).json('Your review was sended!');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postBook = async (req, res, next) => {
    const {
        checkIn,
        checkOut,
        room,
        phonenumber,
        guests
    } = req.body;

    Book.create({
        checkIn,
        checkOut,
        room,
        phonenumber,
        guests
    })
    .then(() => {
        res.status(201).json('Your room was booked!');
    })
    .catch(err => {
        console.log(err);
    });
}