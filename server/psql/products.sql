-- Create database products;


\c products

--if query for all products, will return entire overview table
--using small int for data type of prices since prices appear to be whole numbers
CREATE TABLE IF NOT EXISTS overview (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  name VARCHAR(50),
  category VARCHAR(500),
  slogan VARCHAR(1000),
  default_price INTEGER,
  description VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS relatedProducts (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  current_product_id INTEGER REFERENCES overview(id),
  related_product_id INTEGER
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_id INTEGER REFERENCES overview(id),
  feature VARCHAR (500),
  value VARCHAR (500)
);

CREATE TABLE IF NOT EXISTS styles (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_id INTEGER REFERENCES overview(id),
  name VARCHAR(50),
  sale_price INTEGER,
  original_price INTEGER,
  isDefault BOOLEAN
);

CREATE TABLE IF NOT EXISTS skus ( -- will be repeated multiple times throughout all products
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  style_id INTEGER REFERENCES styles(id),
  size VARCHAR (50),
  quantity INTEGER
);

CREATE TABLE IF NOT EXISTS images (
  sku_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  style_id INTEGER REFERENCES styles(id),
  thumbnail_url TEXT,
  url TEXT
);



COPY overview(id, name, slogan, description, category, default_price)
FROM '/home/frankasoto/hackreactor/TypeRave/Products/data/product.csv'
DELIMITER ','
CSV HEADER;

COPY relatedProducts(id, current_product_id, related_product_id)
FROM '/home/frankasoto/hackreactor/TypeRave/Products/data/related.csv'
DELIMITER ','
CSV HEADER;

COPY features (id, product_id, feature, value)
FROM '/home/frankasoto/hackreactor/TypeRave/Products/data/features.csv'
DELIMITER ','
CSV HEADER;

COPY styles(id, product_id, name, sale_price, original_price, isDefault)
FROM '/home/frankasoto/hackreactor/TypeRave/Products/data/styles.csv'
DELIMITER ','
CSV NULL'null';



COPY skus(sku_id, style_id, size, quantity)
FROM '/home/frankasoto/hackreactor/TypeRave/Products/data/skus.csv'
DELIMITER ','
CSV HEADER;


COPY images(id, style_id, thumbnail_url, url)
FROM '/home/frankasoto/hackreactor/TypeRave/Products/data/photos.csv'
DELIMITER ','
CSV HEADER;

