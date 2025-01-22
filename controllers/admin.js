const Product = require("../models/productModel");
const Address = require("../models/addressModel");
const Room = require("../models/roomModel");
const fsDelete = require("../util/fsDelete");
const Book = require("../models/bookModel");
const Review = require("../models/review");
const Reservation = require("../models/reservationModel");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ghudaynazarov52@gmail.com",
    pass: "lxkn uqmw crnv vxmo "
  }
});

exports.getAddProduct = (req, res, next) => {
  res.render("admin/addProduct", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
    // csrfToken: res.locals.csrfToken
  });
};

exports.getAddAddress = (req, res, next) => {
  res.render("admin/addAddress", {
    pageTitle: "Add Product",
    path: "/admin/add-address",
    editing: false
    // csrfToken: res.locals.csrfToken
  });
};

exports.getAddRoom = (req, res, next) => {
  res.render("admin/addRoom", {
    pageTitle: "Add Product",
    path: "/admin/add-room",
    editing: false
    // csrfToken: res.locals.csrfToken
  });
};

exports.getProducts = async (req, res, next) => {
  const address = await Address.findAll();
  const rooms = await Room.findAll();
  Product.findAll()
    .then((products) => {
      res.render("admin/index", {
        prods: products,
        address: address,
        rooms: rooms,
        pageTitle: "Admin Products",
        path: "/admin/admin-product"
        // csrfToken: res.locals.csrfToken
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/admin/admin-product");
  }
  const prodId = req.params.productId;
  Product.findAll({
    where: {
      id: prodId
    }
  })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/admin-product");
      }
      res.render("admin/addProduct", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
        // csrfToken: res.locals.csrfToken
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.getEditAddress = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/admin-product");
  }
  const prodId = req.params.productId;
  Address.findAll({
    where: {
      id: prodId
    }
  })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/admin-product");
      }
      res.render("admin/addAddress", {
        pageTitle: "Edit Product",
        path: "/admin/edit-address",
        editing: editMode,
        product: product
        // csrfToken: res.locals.csrfToken
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.getEditRoom = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/admin-product");
  }
  const prodId = req.params.productId;
  Room.findAll({
    where: {
      id: prodId
    }
  })
    .then((products) => {
      const product = products[0];

      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/addRoom", {
        pageTitle: "Edit Product",
        path: "/admin/edit-room",
        editing: editMode,
        product: product
        // csrfToken: res.locals.csrfToken
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.getBook = async (req, res, next) => {
  Book.findAll()
    .then((products) => {
      res.render("admin/book", {
        prods: products,
        pageTitle: "Admin Book",
        path: "/admin/book"
        // csrfToken: res.locals.csrfToken
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.getReview = async (req, res, next) => {
  Review.findAll()
    .then((products) => {
      res.render("admin/review", {
        prods: products,
        pageTitle: "Admin Reviews",
        path: "/admin/review"
        // csrfToken: res.locals.csrfToken
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.getReserv = async (req, res, next) => {
  Reservation.findAll()
    .then((products) => {
      res.render("admin/reserv", {
        prods: products,
        pageTitle: "Admin Reservations",
        path: "/admin/reserv"
        // csrfToken: res.locals.csrfToken
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postAddProduct = (req, res, next) => {
  const { option, lang, title, description } = req.body;
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
    description
  })
    .then((prod) => {
      res.redirect("/admin/admin-product");
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postAddProductAddress = (req, res, next) => {
  const { address, lang, phone_number, email } = req.body;
  Address.create({
    lang,
    address,
    phone_number,
    email
  })
    .then((prod) => {
      res.redirect("/admin/admin-product");
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postAddProductRoom = (req, res, next) => {
  const { lang, title, price, guestNum, bedNum, description } = req.body;
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
    description
  })
    .then((prod) => {
      res.redirect("/admin/admin-product");
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const { productId, lang, title, option, description } = req.body;

  const image = req.file?.path
  try {
    const product = await Product.findByPk(prodId);

    product.update({
      productId,
      lang,
      title,
      option,
      description
    });    
    if (image) {
      product.update({
        image
      });
    }
    await product.save();

    console.log("UPDATED PRODUCT!");
    res.redirect("/admin/admin-product");
  } catch (err) {
    console.log(err);
    res.redirect('/500');
  }
};

exports.postEditProductAddress = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedLang = req.body.lang;
  const updatedAddress = req.body.address;
  const updatedPhone_number = req.body.phone_number;
  const updatedEmail = req.body.email;
  Address.findByPk(prodId)
    .then((product) => {
      product.lang = updatedLang;
      product.address = updatedAddress;
      product.phone_number = updatedPhone_number;
      product.email = updatedEmail;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/admin-product");
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postEditProductRoom = async (req, res, next) => {
  const { productId, lang, title, price,bedNum,guestNum,description } = req.body
  const image = req.file?.path;

  const product = await Room.findByPk(productId);
  try{
      product.update({
        productId,
        lang,
        title,
        price,
        bedNum,
        guestNum,
        description
      });
      if(image) {
        product.update({image});
      }
      await product.save();
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/admin-product");
    }
    catch(err) {
      console.log(err);
      res.redirect('/500');
    }


};

exports.postRefuseReserve = (req, res, next) => {
  const { email, prodId } = req.body;
  let mailOptions = {
    from: "ghudaynazarov52@gmail.com",
    to: email,
    subject: "Refused reservation!",
    text: "We are really sorry but we don't have free room for you."
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    }
  });

  Reservation.findByPk(prodId)
    .then((reserv) => {
      reserv.update({
        history: true,
        status: "cancel"
      });
      return reserv.save();
    })
    .then(() => {
      res.redirect("/admin/reserv");
    })
    .catch(err => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postAcceptReserve = (req, res, next) => {
  const { email, prodId } = req.body;
  let mailOptions = {
    from: "ghudaynazarov52@gmail.com",
    to: email,
    subject: "Accepted reservation!",
    text: "Your reservation was accepted you can come when you want."
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    }
  });

  Reservation.findByPk(prodId)
    .then((reserv) => {
      reserv.update({
        history: true,
        status: 'ok'
      });
      return reserv.save();
    })
    .then(() => {
      res.redirect("/admin/reserv");
    })
    .catch(err => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postAcceptRoom = (req, res, next) => {
  const { email, prodId } = req.body;
  let mailOptions = {
    from: "ghudaynazarov52@gmail.com",
    to: email,
    subject: "Accepted book!",
    text: "Your book was accepted! Thank you for choosing our hotel."
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    }
  });

  Book.findByPk(prodId)
    .then((book) => {
      book.update({
        history: true,
        status: "ok"
      });
      return book.save();
    })
    .then(() => {
      res.redirect("/admin/book");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/500");
    });
};

exports.postRefuseRoom = (req, res, next) => {
  const { email, prodId } = req.body;
  let mailOptions = {
    from: "ghudaynazarov52@gmail.com",
    to: email,
    subject: "Refuse book!",
    text: "We are really sorry but Your book was refused. We don't have enough rooms, all rooms was already booked. Thank you for choosing our hotel."
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    }
  });

  Book.findByPk(prodId)
    .then((book) => {
      book.update({
        history: true,
        status: "cancel"
      });
      return book.save();
    })
    .then(() => {
      res.redirect("/admin/book");
    })
    .catch(err => {
      console.log(err);
      res.redirect('/500');
    })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(async (product) => {
      await fsDelete(product.image);
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/admin-product");
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postDeleteAddress = (req, res, next) => {
  const prodId = req.body.productId;
  Address.findByPk(prodId)
    .then(async (product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/admin-product");
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postDeleteRoom = (req, res, next) => {
  const prodId = req.body.productId;
  Room.findByPk(prodId)
    .then(async (product) => {
      await fsDelete(product.image);
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/admin-product");
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};

exports.postDeleteReview = (req, res, next) => {
  const prodId = req.body.productId;
  Review.findByPk(prodId)
    .then(async (product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/review");
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/500');
    });
};
