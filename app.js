const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const sequelizeStore = require("connect-session-sequelize")(session.Store);
// const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require("multer");

const Admin = require('./models/adminModel');
const errorController = require('./controllers/error');
const sequelize = require('./util/db');
const Product = require('./models/productModel');
const Book = require("./models/bookModel");

const app = express();

const store = new sequelizeStore({
  db: sequelize,
  collection: 'sessions'
});
// const csrfProtection = csrf();

const flStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const flFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(() => {
      console.log(file);
    }, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');
const route = require('./routes/router');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(multer({
  storage: flStorage,
  fileFilter: flFilter
}).single("image"))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/image", express.static(path.join(__dirname, 'image')));
app.use(express.static(path.join(__dirname, 'frontJS')));
app.use(express.static(path.join(__dirname, 'photos')));
app.use(cookieParser());
app.use(session({
  secret: 'my secret',
  store: store,
  resave: false,
  saveUninitialized: false
}));

// app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin;
  // res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(mainRoutes);
app.use(authRoutes);
app.use(route);

app.get('/500', errorController.get500);
app.use(errorController.get404);


Product.belongsTo(Admin, {
  constraints: true,
  onDelete: 'CASCADE'
});

const PORT = 5000;

sequelize
  // .sync()
  .sync({alter:true})
  // .sync({
  //   force: true
  // })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });