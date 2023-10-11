# Products

## Overview
This is the backend for an e-commerce app. This component is responsible for supplying the front-end with information about the products currently stored in the database.

## Usage
### 1. Clone the [repo](https://github.com/TypeRave/Product)
```bash
git clone https://github.com/TypeRave/Products.git
```
### 2. CD into the file directory
```bash
cd TypeRave/Products
```
### 3. Run npm install to install all necessary dependencies
```bash
npm install
```

### 4 Create a copy of the example.env file and rename it .env
This is where you will be adding in the information about your postgres database

### 5. Start up the postgres database
On linux, this would be done through
```bash
sudo service postgresql start
```
### 6. Navigate the postgres client and then import the database schema
On Linux (if you have a port different from the default, then use -p <em>port number </em>)
```bash
sudo -u postgres psql
```
In the postgres shell, use \i <em>filePathToFile</em>

### 7. Run <em>npm start</em> to start the application
```bash
npm start
```



## Routes
### /products 
returns a list of 5 products unless otherwise specified through the page and count parameters
![product-list](https://github.com/TypeRave/Products/assets/129362652/7fab50d9-7a0f-44f7-8b1e-50372afba7c8)

### /products/:product_id 
returns information about a particular product
![product-info](https://github.com/TypeRave/Products/assets/129362652/7c8357c3-7fd8-47ce-91e4-990630c05b95)

### /products/:product_id/styles 
returns stlye information about a particular product and how many items of each style/size are available. 
![product-styles-part1](https://github.com/TypeRave/Products/assets/129362652/dcb15fff-8b79-46fc-92f4-0380b05bb924)
![product-styles-part2](https://github.com/TypeRave/Products/assets/129362652/8fff5bdf-e70e-4c8d-a2c6-3c37fa0e3b51)

### /products/:product_id/related 
returns a list of product ids that are related to the currently selected product.
![related-products](https://github.com/TypeRave/Products/assets/129362652/73333e4a-8a67-439a-8184-4945027bde10)

