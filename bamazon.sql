DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Night Light","Baby", 14.24, 70), ("pacifier","Baby", 14.95, 95), ("teething toy", "Baby",10.70, 45),
("Veggie Straws","Grocery", 11.34, 36), ("Terra Chips","Grocery", 15.52, 90), ("Keurig Coffee","Grocery", 19.58, 65),
("Macha Collagen","Grocery", 23.50, 50), ("Tea pack","Grocery", 34.99, 79), ("Coconut Oil","Grocery", 12.59, 38),
;