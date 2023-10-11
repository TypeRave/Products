# Products

## Overview
This is the backend for an e-commerce app. This component is responsible for supplying the front-end with information about the products currently stored in the database.


## Routes
/products returns a list of 5 products unless otherwise specified through the page and count parameters
/products/:product_id returns information about a particular product
/products/:product_id/styles returns stlye information about a particular product and how many items of each style/size are available. 
/products/:product_id/related returns a list of product ids that are related to the currently selected product.

