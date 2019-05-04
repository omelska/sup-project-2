const express = require("express");
const db = require("../models/index");
const path = require("path");
let router = express.Router();
const session = require("express-session");
const cookieParser = require("cookie-parser");

router.use(function timeLog(req, res, next) {
  console.log("INSIDE HTML ROUTES");
  next();
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/restaurants.html"));
});

router.get("/add-menu", (req, res) => {
  res.render("add-menu");
});

router.get("/order", (req, res) => {
  // db.Order.findAll({
  //   where: {
  //     TableId: req.params.id
  //   }
  // }).then(results => {
  //   res.render("display-order", { orderedItems: results });
  // });
  res.sendFile(path.join(__dirname, "../public/menu.html"));
});

router.get("/menu/:table", (req, res) => {
  db.Order.findAll({
    where: {
      table: req.params.table
    }
  }).then(results => {
    res.render("display-order", {
      orderedItems: results
    });
  });
});

router.get("/categories", (req, res) => {
  db.Category.findAll({}).then(results => {
    res.render("display-categories", { categories: results });
  });
});

router.get("/add-categories", (req, res) => {
  res.render("categories", {});
});

router.get("/employees", (req, res) => {
  db.Waiter.findAll({}).then(results => {
    res.render("display-employees", { employees: results });
  });
});

router.get("/add-employees", (req, res) => {
  res.render("employees");
});

router.get("/food", (req, res) => {
  res.render("food", {});
});

router.get("/food-menu", (req, res) => {
  db.FoodMenu.findAll({}).then(results => {
    res.render("display-food", { foodMenu: results });
  });
});

router.get("/drinks", (req, res) => {
  res.render("drinks", {});
});

router.get("/drink-menu", (req, res) => {
  db.DrinkMenu.findAll({}).then(results => {
    res.render("display-drink", { drinkMenu: results });
  });
});

router.get("/add-tables", (req, res) => {
  res.render("tables", {});
});

router.get("/tables", (req, res) => {
  console.log("session ", req.session.rid);
  db.Table.findAll(
    {
      where: {
        restaurantId: req.session.rid
      }
    },
    {
      include: [db.Restaurant]
    }
  ).then(results => {
    res.render("display-tables", { tables: results });
  });
});

router.get("/system", (req, res) => {
  res.render("system", {});
});

router.get("/report", (req, res) => {
  db.Sale.findAll({
    where: {
      restaurantID: req.session.rid
    }
  }).then(results => {
    res.render("report", { reports: results });
  });
});

// route for user logout
router.get("/logout", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/restaurants.html"));
});

module.exports = router;
