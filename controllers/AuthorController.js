const Authors = require("../models/AuthorModel.js");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: "20211153@itla.edu.do",
    pass: "Rafaeldavidrivasabreu@1307",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.GetAuthorsList = (req, res, next) => {
    Authors.findAll()
      .then((result) => {
        const authors = result.map((result) => result.dataValues);     
  
        res.render("authors/authors-list", {
          pageTitle: "Authors",
          authorsActive: true,
          authors: authors,
          hasAuthors: authors.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.GetCreateAuthors = (req, res, next) => {
    Authors.findAll()
      .then((result) => {
        const authors = result.map((result) => result.dataValues);
  
        res.render("authors/sv-up-authors", {
          pageTitle: "Create authors",
          authorsActive: true,
          editMode: false,
          authors: authors,
          hasAuthors: authors.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.PostCreateAuthors = (req, res, next) => {
    const name = req.body.Name;
    const mail = req.body.Mail;
  
    Authors.create({
      name: name,
      mail: mail
    })
      .then((result) => {
        res.redirect("/authors");
        return transporter.sendMail(
          {
            from: "Books App notifications",
            to: mail,
            subject: `Bienvenido ${name}`,
            html: "Gracias por ser uno de nuestros autores preferidos",
          })
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetEditAuthors = (req, res, next) => {
    const edit = req.query.edit;
    const authorsId = req.params.authorsId;
  
    if (!edit) {
      return res.redirect("/authors");
    }
  
    Authors.findOne({ where: { id: authorsId } })
      .then((result) => {
        const author = result.dataValues;
  
        if (!author) {
          return res.redirect("/authors");
        }
        res.render("authors/sv-up-authors", {
          pageTitle: "Edit authors",
          authorsActive: true,
          editMode: edit,
          author: author,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.PostEditAuthors = (req, res, next) => {
    const name = req.body.Name;
    const mail = req.body.Mail;
    const authorsId = req.body.authorsId;
  
    Authors.update(
      { name: name, mail: mail},
      { where: { id: authorsId } }
    )
      .then((result) => {
        return res.redirect("/authors");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.PostDeleteAuthors = (req, res, next) => {
    const authorsId = req.body.authorsId;
  
    Authors.destroy({ where: { id: authorsId } })
      .then((result) => {
        return res.redirect("/authors");
      })
      .catch((err) => {
        console.log(err);
      });
  };