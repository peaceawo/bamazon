# bamazon

This application is identical to an Amazon-like storefront with MySQL database. The app will take in orders from customers and deplete stock from the store's inventory. It include two major aspeccts:

### Customer View

- Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
- The app then prompt users with two messages:

  - The first - ask them the ID of the product they would like to buy.
  - The second - ask how many units of the product they would like to buy.
    Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

- If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

However, if your store does have enough of the product, it will fulfill the customer's order.

- Once the update goes through, the total cost of their purchase is displayed to the customer

<img width="456" alt="Screen Shot 2019-09-08 at 1 02 36 PM" src="https://user-images.githubusercontent.com/51039590/64493209-71c23580-d23a-11e9-970a-a935c60ae300.png">

### Manager View

- List a set of menu options:
- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product

<img width="320" alt="Screen Shot 2019-09-08 at 1 04 24 PM" src="https://user-images.githubusercontent.com/51039590/64493223-99190280-d23a-11e9-878d-013531db1cb4.png">


- If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
- If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
- If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
- If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

## Technology Used

- MySql
- Node js
- javascript.
