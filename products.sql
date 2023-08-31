Create database products;




--if query for all products, will return entire overview table
CREATE TABLE IF NOT EXISTS overview (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  category VARCHAR(20),
  slogan VARCHAR(100),
  default_price SMALLINT, --using small int for data type of prices since prices appear to be whole numbers
  description VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS styles (
  id SERIAL PRIMARY KEY,
  product_id INTEGER FOREIGN KEY (product_id) REFERENCES overview(id),
  name VARCHAR(50),
  image_id INTEGER FOREIGN KEY (image_id) REFERENCES images(id),
  sale_price SMALLINT,
  original_price SMALLINT,
  isDefault BOOLEAN
);
CREATE TABLE IF NOT EXISTS skus ( -- will be repeated multiple times throughout all products
  id SERIAL PRIMARY KEY,
  style_id INTEGER FOREIGN KEY(style_id) REFERENCES styles(id)
  sku VARCHAR (5),
  size VARCHAR (5),
  quantity SMALLINT
);
CREATE TABLE IF NOT EXISTS images ( --allows me to create join table
  id SERIAL PRIMARY KEY,
  style_id INTEGER FOREIGN KEY (style_id) REFERENCES styles(id),
  thumbnail_url VARCHAR(2083), --this is limit of chrome browser so no url can exceed
  url VARCHAR(2083),
);
CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  product_id FOREIGN KEY(product_id) REFERENCES overview(id),
  feature VARCHAR (50),
  value VARCHAR (50)
);
CREATE TABLE IF NOT EXISTS relatedProducts ( --kept since making a query for related products returns an array of product ids This makes it easier
  id SERIAL PRIMARY KEY,
  product_id INTEGER FOREIGN KEY(product_id) REFERENCES overview(id),
  related_product INTEGER FOREIGN KEY(related_products) REFERENCES overview(id)
)