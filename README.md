# Products

## Overview
This is the backend for an e-commerce app. This component is responsible for supplying the front-end with information about the products currently stored in the database.


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

