const Authors = require("../models/AuthorModel.js");
const Categories = require("../models/CategoryModel.js");
const Editorials = require("../models/EditorialModel.js");
const Books = require("../models/BookModel.js");

exports.GetBooksList = (req, res, next) => {
    Books.findAll({include:[{model: Authors && Categories && Editorials}]})
      .then((result) => {
        const books = result.map((result) => result.dataValues);     
  
        res.render("books/list-books", {
          pageTitle: "Books",
          homeActive: true,
          books: books,
          hasBooks: books.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.GetCreateBooks = (req, res, next) => {
    Authors.findAll()
    .then((result) => {
      const authors = result.map((result) => result.dataValues);

      Categories.findAll()
        .then((result) => {
            const categories = result.map((result) => result.dataValues);

            Editorials.findAll()
            .then((result) => {
                const editorials = result.map((result) => result.dataValues);

                res.render("books/sv-up-books", {
                pageTitle: "Create books",
                homeActive: true,
                editMode: false,
                authors: authors,
                hasAuthors: authors.length > 0,
                categories: categories,
                hasCategories: categories.length > 0,
                editorials: editorials,
                hasEditorials: editorials.length > 0,
                });
            })
            .catch((err) => {
                console.log(err);
            });


        })
        .catch((err) => {
        console.log(err);
        })

    })
    .catch((err) => {
    console.log(err);
    })
        
  };
  
  exports.PostCreateBooks = (req, res, next) => {
    const title = req.body.Title;
    const bookImage = req.file;
    const publication = req.body.Publication;
    const author = req.body.Author;
    const category = req.body.Category;
    const editorial = req.body.Editorial;
  
    Books.create({
      title: title,
      imagePath: "/" + bookImage.path,
      publication: publication,
      authorId: author,
      categoryId: category,
      editorialId: editorial,
    })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetEditBooks = (req, res, next) => {
    const edit = req.query.edit;
    const booksId = req.params.booksId;
  
    if (!edit) {
      return res.redirect("/");
    }
  
    Books.findOne({ where: { id: booksId } })
      .then((result) => {
        const book = result.dataValues;   
  
        if (!book) {
          return res.redirect("/");
        }
  
        console.log(book);
        
        Authors.findAll()
    .then((result) => {
      const authors = result.map((result) => result.dataValues);

      Categories.findAll()
        .then((result) => {
            const categories = result.map((result) => result.dataValues);

            Editorials.findAll()
            .then((result) => {
                const editorials = result.map((result) => result.dataValues);

                res.render("books/sv-up-books", {
                pageTitle: "Edit books",
                homeActive: true,
                editMode: edit,
                book: book,
                authors: authors,
                hasAuthors: authors.length > 0,
                categories: categories,
                hasCategories: categories.length > 0,
                editorials: editorials,
                hasEditorials: editorials.length > 0,
                });
            })
            .catch((err) => {
                console.log(err);
            });


        })
        .catch((err) => {
        console.log(err);
        })

    })
    .catch((err) => {
    console.log(err);
    })

      .catch((err) => {
        console.log(err);
      });
  });
};
  
  exports.PostEditBooks = (req, res, next) => {
    const title = req.body.Title;
    const bookImage = req.file;
    const publication = req.body.Publication;
    const author = req.body.Author;
    const category = req.body.Category;
    const editorial = req.body.Editorial;
    const booksId = req.body.booksId;
  
    Books.findOne({ where: { id: booksId } })
    .then((result) => {
      const book = result.dataValues;

      if (!book) {
        return res.redirect("/");
      }

      const imagePath = bookImage ? "/" + bookImage.path : book.imagePath;

      Books.update(
        {
          title: title,
          imagePath: imagePath,
          publication: publication,
          authorId: author,
          categoryId: category,
          editorialId: editorial,
        },
        { where: { id: booksId } }
      )
        .then((result) => {
          return res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  };
  
  exports.PostDeleteBooks = (req, res, next) => {
    const booksId = req.body.booksId;
  
    Books.destroy({ where: { id: booksId } })
      .then((result) => {
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };