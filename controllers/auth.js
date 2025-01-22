const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

const Admin = require("../models/adminModel");

exports.AdminAdd = async () => {
  const data = {
    email: "admin",
    password: "admin"
  };
  const admin =await Admin.findOne({
    where: data
  });
  if (!admin) {
    await Admin.create(data)
  }
};

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMassage: message,
    oldInput: {
      email: "",
      password: ""
    },
    validationErrors: []
  });
};

exports.postAdmin = (req, res, next) => {
  const { email, password } = req.body;

  Admin.findOne({
    where: {
      email
    }
  })
    .then((admin) => {
      if (!admin) {
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMassage: "Invalid email or password.",
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
      }

      bcrypt
        .compare(password, admin.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isAdmin = true;
            return req.session.save((err) => {
              console.log(err);
              return res.redirect("/admin/admin-product");
            });
          }
          return res.status(422).render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            errorMassage: "Invalid email or password.",
            oldInput: {
              email: email,
              password: password
            },
            validationErrors: []
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login");
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

// exports.postLogin = (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     bcrypt.hash(password, 12)
//         .then(hashedPassword => {
//             const admin = new Admin({
//                 email: email,
//                 password: hashedPassword,

//             });
//             return admin.save();
//         })
//         // })
//         .then(result => {
//             res.redirect('/login');
//             // let mailOptions = {
//             //     from: 'ghudaynazarow5@gmail.com',
//             //     to: email,
//             //     subject: 'Signup successed!',
//             //     // text: 'fldjlkaslkjlajfkl'
//             //     html: '<h1>You successfully signed up!<h1>'
//             // }
//             // transporter.sendMail(mailOptions, (err, data) => {
//             //     if (err) {
//             //         console.log(err);
//             //     }
//             // })
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             return next(error);
//         })
// }
