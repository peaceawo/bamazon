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
  managerAction();
});
function managerAction() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          displayAllProducts();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addNewProduct();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

function displayAllProducts() {
  connection.query("SELECT * FROM products", function(error, result) {
    if (error) throw error;
    console.log("_____________________________________________________");
    console.table(result);
  });
}

function lowInventory() {
  var queryLow = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(queryLow, function(error, result) {
    if (error) throw error;
    console.table(result);
    console.log("___________________________________________");
  });
}

function addInventory() {
  inquirer
    .prompt([
      {
        message: "Enter the product id you would like to update stock_quatity",
        type: "input",
        name: "product_id"
      },
      {
        message: "How many units would you like to add?",
        type: "input",
        name: "quantity"
      }
    ])
    .then(function(answer) {
      var itemName = answer.product_id;
      var addedquantity = answer.quantity;
      var queryadd = "SELECT * FROM products WHERE ?";

      connection.query(queryadd, { item_id: itemName }, function(err, res) {
        if (err) throw error;
        //console.log(res.length);
        if (res.length === 0) {
          console.log("Item ID not found. Please inter Item ID");
        } else {
          var productChosen = res[0];
          console.log("Updating Inventory for " + productChosen);

          var update =
            "UPDATE products SET stock_quantity = " +
            (productChosen.stock_quantity + parseInt(addedquantity)) +
            " WHERE item_id = " +
            itemName;

          connection.query(update, function(err, result) {
            if (err) throw err;
            console.log(
              `Updated stock_quatity for ${
                productChosen.product_name
              } to ${productChosen.stock_quantity + parseInt(addedquantity)}`
            );
            console.log("------------------------------------------");
            connection.end();
          });
        }
      });
    });
}

function addNewProduct() {
  inquirer
    .prompt([
      {
        message: "Enter the name of new product",
        type: "input",
        name: "product_name"
      },
      {
        message: "What is the department name?",
        type: "input",
        name: "department_name"
      },
      {
        message: "What is the price of each item",
        type: "input",
        name: "price"
      },
      {
        message: "What is stock_quantity",
        type: "input",
        name: "quantity"
      }
    ])
    .then(function(answer) {
      var productName = answer.product_name;
      var departmentName = answer.department_name;
      var productPrice = parseFloat(answer.price);
      var quantity = parseInt(answer.quantity);
      var query = "INSERT INTO products SET ?";
      var values = {
        product_name: productName,
        department_name: departmentName,
        price: productPrice,
        stock_quantity: quantity
      };

      connection.query(query, [values], function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " product inserted!\n");
        //console.log(res);
      });
    });
}
