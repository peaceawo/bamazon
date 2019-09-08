var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  display();
});

function display() {
  connection.query("SELECT * FROM products", function(error, result) {
    if (error) throw error;
    console.table(result);
    console.log("___________________________________________");
    promptUser();
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        message: "Enter the product id you would like to purchase.",
        type: "input",
        name: "item_id"
      },
      {
        message: "How many units of these product would you like to buy",
        type: "input",
        name: "quantity"
      }
    ])
    .then(function(answer) {
      var item = answer.item_id;
      var quantity = answer.quantity;
      var query = "SELECT * FROM products WHERE ?";

      connection.query(query, { item_id: item }, function(err, res) {
        if (err) throw error;
        //console.log(res.length);

        //Check User input
        if (res.length === 0) {
          console.log("Item ID not found. Please inter Item ID");
          display();
        } else {
          //console.log(res[0]);
          var customerChoice = res[0];
          // console.log(customerChoice.item_id);
          // console.log(customerChoice.stock_quantity);

          if (quantity <= customerChoice.stock_quantity) {
            console.log(
              `Item ID:${customerChoice.item_id} | ${customerChoice.product_name} is available for purchase`
            );
            updateData(customerChoice, item, quantity);
            connection.end();
          } else {
            console.log(
              `There is not enough ${customerChoice.product_name} available\nPlease Choose different quantity\n_______________________________`
            );
            display();
          }
        }
      });
    });
}

function updateData(customerChoice, item, quantity) {
  var update =
    "UPDATE products SET stock_quantity = " +
    (customerChoice.stock_quantity - quantity) +
    " WHERE item_id = " +
    item;
  connection.query(update, function(err, results) {
    if (err) throw err;
    console.log(`Order Total $${customerChoice.price * quantity}`);
    console.log("------------------------------------------");
  });
  //display();
}
