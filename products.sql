Create database products;





Create table overview (
  id INTEGER PRIMARY KEY SERIAL,
  name VARCHAR(50),
  category VARCHAR(20),
  slogan VARCHAR(100),
  default_price SMALLINT,
  description VARCHAR(100)
);
Create table styles (
  id INTEGER PRIMARY KEY SERIAL,
  product_id INTEGER FOREIGN KEY (product_id) REFERENCES overview(id),
  sku_id INTEGER FOREIGN KEY (sku_id) REFERENCES skus(id),
  image_id INTEGER FOREIGN KEY (image_id) REFERENCES images(id)
  style_name VARCHAR(50),
  qty INTEGER,
  sale_price SMALLINT,
  original_price SMALLINT,
  default? BOOLEAN
  -- features_id INTEGER [] FOREIGN KEY(features_id) REFERENCES features(id WHERE product_id = styles.product_id) --need a trigger?
);
Create table skus ( -- will be repeated multiple times throughout all products
  id INTEGER PRIMARY KEY SERIAL,
  sku VARCHAR (5),
  size VARCHAR (5)
);
Create table images ( --allows me to create join table
  id INTEGER PRIMARY KEY SERIAL,
  style_id INTEGER FOREIGN KEY (style_id) REFERENCES styles(id),
  thumbnail_url VARCHAR(2083),
  url VARCHAR(2083),
);
create table features ( -- will be called multiple times. The same values for some feats appear multiple times
  id INTEGER PRIMARY KEY SERIAL,
  feature VARCHAR (50),
  value VARCHAR (50)
);
create table associativeProductFeatures ( --kept since I want to see which product has what feature. While I could possibly combine this with styles, I feel
-- that by creating a table with all of the product/ features stored, i would save on space (is this worth it???)
  id INTEGER PRIMARY KEY SERIAL,
  product_id INTEGER FOREIGN KEY(product_id) REFERENCES overview(id),
  features_id INTEGER FOREIGN KEY(features_id) REFERENCES features(id)
)
create table relatedProducts ( --kept since making a query for related products returns an array of product ids This makes it easier
  id INTEGER PRIMARY KEY SERIAL,
  product_id INTEGER FOREIGN KEY(product_id) REFERENCES overview(id),
  related_product INTEGER FOREIGN KEY(related_products) REFERENCES overview(id)
)