const Product = require('../models/productModel');
const Address = require('../models/addressModel');
const Room = require('../models/roomModel');
const fsDelete = require("../util/fsDelete");
const Book = require('../models/bookModel');
const Review = require('../models/review');
const Reservation = require('../models/reservationModel');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ghudaynazarov52@gmail.com',
        pass: 'lxkn uqmw crnv vxmo '
    },
});

exports.getAddProduct = (req, res, next) => {
    res.render('admin/addProduct', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        // csrfToken: res.locals.csrfToken
    });
};

exports.getAddAddress = (req, res, next) => {
    res.render('admin/addAddress', {
        pageTitle: 'Add Product',
        path: '/admin/add-address',
        editing: false,
        // csrfToken: res.locals.csrfToken
    });
};

exports.getAddRoom = (req, res, next) => {
    res.render('admin/addRoom', {
        pageTitle: 'Add Product',
        path: '/admin/add-room',
        editing: false,
        // csrfToken: res.locals.csrfToken
    });
};

exports.getProducts = async (req, res, next) => {
    const address = await Address.findAll();
    const rooms = await Room.findAll();
    Product.findAll()
        .then(products => {
            res.render('admin/index', {
                prods: products,
                address: address,
                rooms: rooms,
                pageTitle: 'Admin Products',
                path: '/admin/admin-product',
                // csrfToken: res.locals.csrfToken
            });
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/admin-product');
    }
    const prodId = req.params.productId;
    Product.findAll({
            where: {
                id: prodId
            }
        })
        .then(products => {
            const product = products[0];
            if (!product) {
                return res.redirect('/admin-product');
            }
            res.render('admin/addProduct', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                // csrfToken: res.locals.csrfToken
            });
        })
        .catch(err => console.log(err));;
}

exports.getEditAddress = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/admin-product');
    }
    const prodId = req.params.productId;
    Address.findAll({
            where: {
                id: prodId
            }
        })
        .then(products => {
            const product = products[0];
            if (!product) {
                return res.redirect('/admin-product');
            }
            res.render('admin/addProduct', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product-address',
                editing: editMode,
                product: product,
                // csrfToken: res.locals.csrfToken
            });
        })
        .catch(err => console.log(err));;
}

exports.getEditRoom = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/admin-product');
    }
    const prodId = req.params.productId;
    Room.findAll({
            where: {
                id: prodId
            }
        })
        .then(products => {
            const product = products[0];
            
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/addRoom', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-room',
                editing: editMode,
                product: product,
                // csrfToken: res.locals.csrfToken
            });
        })
        .catch(err => console.log(err));;
};

exports.getBook = async (req, res, next) => {
    Book.findAll()
        .then(products => {
            res.render('admin/book', {
                prods: products,
                pageTitle: 'Admin Book',
                path: '/admin/book',
                // csrfToken: res.locals.csrfToken
            });
        })
        .catch(err => console.log(err));
};

exports.getReview = async (req, res, next) => {
    Review.findAll()
        .then(products => {
            res.render('admin/review', {
                prods: products,
                pageTitle: 'Admin Reviews',
                path: '/admin/review',
                // csrfToken: res.locals.csrfToken
            });
        })
        .catch(err => console.log(err));
};

exports.getReserv = async (req, res, next) => {
    Reservation.findAll()
        .then(products => {
            res.render('admin/reserv', {
                prods: products,
                pageTitle: 'Admin Reservations',
                path: '/admin/reserv',
                // csrfToken: res.locals.csrfToken
            });
        })
        .catch(err => console.log(err));
};


exports.postAddProduct = (req, res, next) => {
    const {
        option,
        lang,
        title,
        description
    } = req.body;
    const image = req.file;
    if (!image) {
        console.log(image);
        return res.status(400).json({
            error: "Attached file is not image"
        });
    }
    Product.create({
            lang,
            title,
            image: image.path,
            option,
            description,
        })
        .then((prod) => {
            res.redirect('/admin/admin-product');
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

exports.postAddProductAddress = (req, res, next) => {
    const {
        address,
        lang,
        phone_number,
        email
    } = req.body;
    Address.create({
            lang,
            address,
            phone_number,
            email,
        })
        .then((prod) => {
            res.redirect('/admin/admin-product');
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

exports.postAddProductRoom = (req, res, next) => {
    const {
        lang,
        title,
        price,
        guestNum,
        bedNum,
        description
    } = req.body;
    const image = req.file;
    if (!image) {
        console.log(image);
        return res.status(400).json({
            error: "Attached file is not image"
        });
    }
    Room.create({
            lang,
            title,
            price,
            guestNum,
            bedNum,
            image: image.path,
            description,
        })
        .then((prod) => {
            res.redirect('/admin/admin-product');
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedLang = req.body.lang;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.image;
    const updatedOption = req.body.option;
    const updatedDesc = req.body.description;
    Product.findByPk(prodId)
        .then(product => {
            product.lang = updatedLang;
            product.title = updatedTitle;
            product.image = updatedImage;
            product.option = updatedOption;
            product.description = updatedDesc;
            return product.save();

        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/admin-product');
        })
        .catch(err => {
            console.log(err), next(err)
        });

}

exports.postEditProductAddress = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedLang = req.body.lang;
    const updatedAddress = req.body.address;
    const updatedPhone_number = req.body.phone_number;
    const updatedEmail = req.body.email;
    Address.findByPk(prodId)
        .then(product => {
            product.lang = updatedLang;
            product.address = updatedAddress;
            product.phone_number = updatedPhone_number;
            product.email = updatedEmail;
            return product.save();

        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/admin-product');
        })
        .catch(err => {
            console.log(err), next(err)
        });

}

exports.postEditProductRoom = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedLang = req.body.lang;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.image;
    const updatedPrice = req.body.price;
    const updatedBednum = req.body.bedNum;
    const updatedGuestnum = req.body.guestNum;
    const updatedDesc = req.body.description;
    Room.findByPk(prodId)
        .then(product => {
            product.lang = updatedLang;
            product.title = updatedTitle;
            product.image = updatedImage;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.bedNum = updatedBednum;
            product.guestNum = updatedGuestnum;
            return product.save();

        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/admin-product');
        })
        .catch(err => {
            console.log(err), next(err)
        });

}


exports.postRefuseReserve = (req, res, next) => {
    const {email, prodId} = req.body;
    let mailOptions = {
        from: 'ghudaynazarov52@gmail.com',
        to: email,
        subject: 'Refused reservation!',
        text: "We are really sorry but we don't have free room for you."
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        }
    });

    Reservation.findByPk(prodId)
    .then((reserv) => {
        return reserv.destroy();
    })
    .then(() => {
        res.redirect('/admin/reserv');
    })
}

exports.postAcceptReserve = (req, res, next) => {
    const {email, prodId} = req.body;
    let mailOptions = {
        from: 'ghudaynazarov52@gmail.com',
        to: email,
        subject: 'Accepted reservation!',
        text: "Your reservation was accepted you can come when you want."
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        }
    });

    Reservation.findByPk(prodId)
    .then((reserv) => {
        return reserv.destroy();
    })
    .then(() => {
        res.redirect('/admin/reserv');
    })
}

exports.postAcceptRoom = (req, res, next) => {
    const {email, prodId} = req.body;
    let mailOptions = {
        from: 'ghudaynazarov52@gmail.com',
        to: email,
        subject: 'Accepted book!',
        text: "Your book was accepted! Thank you for choosing our hotel."
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        }
    });

    Book.findByPk(prodId)
    .then((book) => {
        return book.destroy();
    })
    .then(() => {
        res.redirect('/admin/book');
    })
}

exports.postRefuseRoom = (req, res, next) => {
    const {email, prodId} = req.body;
    let mailOptions = {
        from: 'ghudaynazarov52@gmail.com',
        to: email,
        subject: 'Refuse book!',
        text: "We are really sorry but Your book was refused. We don't have enough rooms, all rooms was already booked. Thank you for choosing our hotel."
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        }
    });

    Book.findByPk(prodId)
    .then((book) => {
        return book.destroy();
    })
    .then(() => {
        res.redirect('/admin/book');
    })
}


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(async (product) => {
            await fsDelete(product.image);
            return product.destroy();
        })
        .then(result => {
                res.redirect('/admin/admin-product');
            }
        )
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

exports.postDeleteAddress = (req, res, next) => {
    const prodId = req.body.productId;
    Address.findByPk(prodId)
        .then(async (product) => {
            return product.destroy();
        })
        .then(result => {
                res.redirect('/admin/admin-product');
            }
        )
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

exports.postDeleteRoom = (req, res, next) => {
    const prodId = req.body.productId;
    Room.findByPk(prodId)
        .then(async (product) => {
            await fsDelete(product.image);
            return product.destroy();
        })
        .then(result => {
                res.redirect('/admin/admin-product');
            }
        )
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

exports.postDeleteReview = (req, res, next) => {
    const prodId = req.body.productId;
    Review.findByPk(prodId)
        .then(async (product) => {
            return product.destroy();
        })
        .then(result => {
                res.redirect('/admin/review');
            }
        )
        .catch((err) => {
            console.log(err);
            next(err);
        });
};