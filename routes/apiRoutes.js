const express = require("express");
const db = require("../models/index");
const session = require("express-session");
const cookieParser = require("cookie-parser");
let router = express.Router();

router.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
router.use(
  session({
    key: "rid",
    secret: "secretSauce",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000
    }
  })
);

router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  db.Restaurant.findOne({ where: { email: email } }).then(rest => {
    if (!rest) {
      res
        .status(404)
        .json({ error: "we couldn't find a user with that email." });
    }

    if (password !== rest.password) {
      res.status(404).json({
        error: "we couldn't find a user with that email and password."
      });
    }

    req.session.rid = rest.id;
    req.session.save();

    console.log("DEBUG session", req.session.rid);
    res.json(req.session.rid);
  });
});

router.use(function timeLog(req, res, next) {
  console.log("INSIDE API ROUTES");
  next();
});

router.get("/", (req, res) => {
  console.log("inside api routes");
});
//display all the restaurants
router.get("/restaurants", (req, res) => {
  db.Restaurant.findAll({
    include: [
      {
        model: db.Table,
        include: [
          {
            model: db.Order
          }
        ]
      }
    ]
  }).then(results => {
    res.json(results);
  });
});

//add a new restaurant
router.post("/restaurants", (req, res) => {
  db.Restaurant.create({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password
  }).then(results => {
    res.json(results);
  });
});

//get all the tables
router.get("/tables", (req, res) => {
  db.Table.findAll({
    include: [
      {
        model: db.Order
      }
    ]
  }).then(results => {
    res.json(results);
  });
});

//add a new table
router.post("/tables", (req, res) => {
  db.Table.create(
    {
      tableNumber: parseInt(req.body.tableNumber),
      guestQty: req.body.guestQty,
      RestaurantId: req.session.rid
    },
    { include: [db.Restaurant] }
  ).then(results => {
    res.json(results);
  });
});

router.get("/menu", (req, res) => {
  db.Menu.findAll({
    where: {
      restaurantId: req.session.rid
    }
  }).then(results => {
    res.json(results);
  });
});

router.post("/menu", (req, res) => {
  db.Menu.create({
    name: req.body.name,
    wholesalePrice: req.body.wholesalePrice,
    retailPrice: req.body.retailPrice,
    stockQty: req.body.stockQty,
    restaurantId: req.session.rid
  }).then(results => {
    res.json(results);
  });
});

//display all orders
router.get("/orders", (req, res) => {
  db.Order.findAll({}).then(results => {
    res.json(results);
  });
});

//display all orders
router.get("/orders/:tableId", (req, res) => {
  db.Order.findAll({
    where: {
      TableId: req.params.tableId
    }
  }).then(results => {
    res.json(results);
  });
});

//update an order
router.post("/orders", (req, res) => {
  db.Order.create(
    {
      item: req.body.item,
      itemQty: parseInt(req.body.itemQty),
      price: parseFloat(req.body.price),
      TableId: parseInt(req.body.TableId)
    },
    {
      include: [db.Table]
    }
  ).then(results => {
    res.json(results);
  });
});

router.delete("/orders/:id", (req, res) => {
  db.Order.destroy({
    where: {
      TableId: req.params.id
    }
  }).then(results => {
    res.json(results);
  });
});

//display all the employees
router.get("/employees", (req, res) => {
  db.Waiter.findAll().then(results => {
    res.json(results);
  });
});

//add a new employee to the system
router.post("/employees", (req, res) => {
  db.Waiter.create({
    name: req.body.name,
    password: req.body.password
  }).then(results => {
    res.json(results);
  });
});

//display all categories
router.get("/categories", (req, res) => {
  db.Category.findAll().then(results => {
    res.json(results);
  });
});

//add a new Category
router.post("/categories", (req, res) => {
  db.Category.create({
    name: req.body.name,
    password: req.body.password
  }).then(results => {
    res.json(results);
  });
});

//get all the food items
router.get("/food", (req, res) => {
  db.FoodMenu.findAll({}).then(results => {
    res.json(results);
  });
});

//add a new food item
router.post("/food", (req, res) => {
  db.FoodMenu.create(
    {
      name: req.body.name,
      wholesalePrice: parseFloat(req.body.wholesalePrice),
      retailPrice: parseFloat(req.body.retailPrice),
      stockQty: parseInt(req.body.stockQty),
      allergies: req.body.allergies,
      modifications: req.body.modifications
    }
    // restaurant_id: req.session.rid
    // },
    // { include: [db.Restaurant] }
  ).then(results => {
    res.json(results);
  });
});

//get all the drinks
router.get("/drinks", (req, res) => {
  db.DrinkMenu.findAll({
    include: [db.Category]
  }).then(results => {
    res.json(results);
  });
});

//add a new drink item
router.post("/drinks", (req, res) => {
  db.DrinkMenu.create({
    name: req.body.name,
    wholesalePrice: parseFloat(req.body.wholesalePrice),
    retailPrice: parseFloat(req.body.retailPrice)
  }).then(results => {
    res.json(results);
  });
});

router.get("/sales", (req, res) => {
  db.Sale.findAll({
    where: {
      restaurantID: req.session.rid
    }
  }).then(results => {
    res.json(results);
  });
});

router.post("/sales", (req, res) => {
  db.Sale.create({
    expenses: req.body.expenses,
    sales: req.body.sales,
    restaurantID: req.session.rid
  }).then(results => {
    res.json(results);
  });
});

module.exports = router;
