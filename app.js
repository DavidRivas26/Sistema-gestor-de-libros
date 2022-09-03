const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const sequelize = require("./context/appContext.js");
const errorController = require("./controllers/ErrorController.js");
const compareHelpers = require('./utils/helpers/compare.js');
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Models

const Authors = require("./models/AuthorModel.js");
const Books = require("./models/BookModel.js");
const Categories = require("./models/CategoryModel.js");
const Editorials = require("./models/EditorialModel.js");

// Routers

const AuthorsRouter = require('./routes/AuthorRouter.js');
const BooksRouter = require('./routes/BookRouter.js');
const CategoriesRouter = require('./routes/CategoryRouter.js');
const EditorialsRouter = require('./routes/EditorialRouter.js');

const app = express();

app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
      isEqual: compareHelpers.IsEqual,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"public")));
app.use("/images",express.static(path.join(__dirname, "images")));

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null,`${uuidv4()}-${file.originalname}`);
  },
});

app.use(multer({ storage: imageStorage }).single("Image"));

app.use(AuthorsRouter);
app.use(BooksRouter);
app.use(CategoriesRouter);
app.use(EditorialsRouter);
app.use(errorController.Get404);

Books.belongsTo(Authors && Categories && Editorials,{constraint: true,onDelete:"CASCADE"});
Authors.hasMany(Books);
Categories.hasMany(Books);
Editorials.hasMany(Books);

sequelize.sync().then(result=>{
  app.listen(5000);

}).catch(err =>{
    console.log(err);
})