const Categories = require("../models/CategoryModel.js");

exports.GetCategoriesList = (req, res, next) => {
    Categories.findAll()
      .then((result) => {
        const categories = result.map((result) => result.dataValues);     
  
        res.render("categories/categories-list", {
          pageTitle: "Categories",
          categoriesActive: true,
          categories: categories,
          hasCategories: categories.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.GetCreateCategories = (req, res, next) => {
    Categories.findAll()
      .then((result) => {
        const categories = result.map((result) => result.dataValues);
  
        res.render("categories/sv-up-categories", {
          pageTitle: "Create categories",
          categoriesActive: true,
          editMode: false,
          categories: categories,
          hasCategories: categories.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.PostCreateCategories = (req, res, next) => {
    const name = req.body.Name;
    const description = req.body.Description;
  
    Categories.create({
      name: name,
      description: description
    })
      .then((result) => {
        res.redirect("/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetEditCategories = (req, res, next) => {
    const edit = req.query.edit;
    const categoriesId = req.params.categoriesId;
  
    if (!edit) {
      return res.redirect("/categories");
    }
  
    Categories.findOne({ where: { id: categoriesId } })
      .then((result) => {
        const category = result.dataValues;
  
        if (!category) {
          return res.redirect("/categories");
        }
        res.render("categories/sv-up-categories", {
          pageTitle: "Edit categories",
          categoriesActive: true,
          editMode: edit,
          category: category,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.PostEditCategories = (req, res, next) => {
    const name = req.body.Name;
    const description = req.body.Description;
    const categoriesId = req.body.categoriesId;
  
    Categories.update(
      { name: name, description: description},
      { where: { id: categoriesId } }
    )
      .then((result) => {
        return res.redirect("/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.PostDeleteCategories = (req, res, next) => {
    const categoriesId = req.body.categoriesId;
  
    Categories.destroy({ where: { id: categoriesId } })
      .then((result) => {
        return res.redirect("/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };