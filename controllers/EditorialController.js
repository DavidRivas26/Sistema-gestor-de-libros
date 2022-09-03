const Editorials = require("../models/EditorialModel.js");

exports.GetEditorialsList = (req, res, next) => {
    Editorials.findAll()
      .then((result) => {
        const editorials = result.map((result) => result.dataValues);     
  
        res.render("editorials/editorials-list", {
          pageTitle: "Editorials",
          editorialsActive: true,
          editorials: editorials,
          hasEditorials: editorials.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.GetCreateEditorials = (req, res, next) => {
    Editorials.findAll()
      .then((result) => {
        const editorials = result.map((result) => result.dataValues);
  
        res.render("editorials/sv-up-editorials", {
          pageTitle: "Create editorials",
          editorialsActive: true,
          editMode: false,
          editorials: editorials,
          hasEditorials: editorials.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.PostCreateEditorials = (req, res, next) => {
    const name = req.body.Name;
    const phone = req.body.Phone;
    const country = req.body.Country;
  
    Editorials.create({
      name: name,
      phone: phone,
      country: country
    })
      .then((result) => {
        res.redirect("/editorials");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetEditEditorials = (req, res, next) => {
    const edit = req.query.edit;
    const editorialsId = req.params.editorialsId;
  
    if (!edit) {
      return res.redirect("/editorials");
    }
  
    Editorials.findOne({ where: { id: editorialsId } })
      .then((result) => {
        const editorial = result.dataValues;
  
        if (!editorial) {
          return res.redirect("/editorials");
        }
        res.render("editorials/sv-up-editorials", {
          pageTitle: "Edit editorials",
          editorialsActive: true,
          editMode: edit,
          editorial: editorial,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.PostEditEditorials = (req, res, next) => {
    const name = req.body.Name;
    const phone = req.body.Phone;
    const country = req.body.Country;
    const editorialsId = req.body.editorialsId;
  
    Editorials.update(
      { name: name, phone: phone, country: country},
      { where: { id: editorialsId } }
    )
      .then((result) => {
        return res.redirect("/editorials");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.PostDeleteEditorials = (req, res, next) => {
    const editorialsId = req.body.editorialsId;
  
    Editorials.destroy({ where: { id: editorialsId } })
      .then((result) => {
        return res.redirect("/editorials");
      })
      .catch((err) => {
        console.log(err);
      });
  };