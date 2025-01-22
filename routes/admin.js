const path = require('path');
const express = require('express');
const isAdmin = require('../midleware/is-admin');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-product', isAdmin, adminController.getAddProduct);
router.get('/add-address', isAdmin, adminController.getAddAddress);
router.get('/add-room', isAdmin, adminController.getAddRoom);
router.get('/admin-product', isAdmin, adminController.getProducts);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.get('/edit-address/:productId', adminController.getEditAddress);
router.get('/edit-room/:productId', adminController.getEditRoom);
router.get('/book', isAdmin, adminController.getBook);
router.get('/review', isAdmin, adminController.getReview);
router.get('/reserv', isAdmin, adminController.getReserv);

router.post('/add-product' ,adminController.postAddProduct);
router.post('/add-address', adminController.postAddProductAddress);
router.post('/add-room', adminController.postAddProductRoom);
router.post('/edit-product', adminController.postEditProduct);
router.post('/edit-address', adminController.postEditProductAddress);
router.post('/edit-room', adminController.postEditProductRoom);

router.post('/refuse-reserv', adminController.postRefuseReserve);
router.post('/accept-reserv', adminController.postAcceptReserve);
router.post('/accept-book', adminController.postAcceptRoom);
router.post('/refuse-book', adminController.postRefuseRoom);

router.post('/delete-product', adminController.postDeleteProduct);
router.post('/delete-address', adminController.postDeleteAddress);
router.post('/delete-room', adminController.postDeleteRoom);
router.post('/delete-review', adminController.postDeleteReview)

module.exports = router;