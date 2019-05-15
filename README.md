# Project-2

Simplified version of POS for different restaurants. It’s a full-stack application where you can register a new restaurant, create a custom menu and tables (floor plan) for that specific restaurant. Program allows to place, send and pay orders, and creates total sales report for the day.

TOOLS: • MySQL • Sequelize • Node.js • Express.js • JavaScript • Handlebars • HTML • CSS • jQuery • Bootstrap

The flow of the app:
- press sign in button in order to register a new restaurant in the system - POST request to the mySQL db
- press login button if you already created the account - Express session keeps the restaurant ID in order to know which restaurant's menu and tables to display.
- go to the system tab in order to set up the POS
    a) tables tab allows you to create the tables at the restaurant and will generate them with Flex-Wrap layout on the floor plan (in the future - graphic implementation to each specific restaurant would be provided)
    b) menu tab allows you to create all the menu items, POST request (for now food and drinks together)
    c) categories, food, drinks, employees are in a developing stage for now - in order to design custom categories for each restaurant and provide access to the servers (epmloyees) to place orders and do the payments
- tables tab displays the tables under your restaurant - One restaurant has may tables relationship in mySQL db. When clicked on the table it takes you to the order page - you can select menu items and add them to your order. When pressed send button it keeps the items in the DB, but when then Pay button is pressed - DELETE request on the orders API and POST request to the sales API -in other words - we add the order to the sales db table and and display it on the Report tab, while removing it from Orders table.
- log out - brings you back to the main page and ends the express session.

https://frozen-shelf-32870.herokuapp.com/
