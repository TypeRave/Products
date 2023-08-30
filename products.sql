Create database products;





Create table overview (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  category VARCHAR(20),
  slogan VARCHAR(100),
  default_price DECIMAL(5,2),
  description VARCHAR(100)
);
Create table styles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT FOREIGN KEY (product_id) REFERENCES overview(id),
  sku_id INT FOREIGN KEY (sku_id) REFERENCES skus(id),
  image_id INT FOREIGN KEY (image_id) REFERENCES images(id)
  style VARCHAR (50),
  qty INT,
  sale_price DECIMAL (5,2),
  current_price DECIMAL (5,2),
  default TINYINT,
);
Create table skus ( -- will be repeated multiple times throughout all products
  id INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR (5),
  size VARCHAR (5)
);
Create table images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  style_id INT FOREIGN KEY (style_id) REFERENCES styles(id),
  thumbnail VARCHAR(2083),
  url VARCHAR(2083),
);
create table features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  feature VARCHAR (50),
  value VARCHAR (50)
);
create table associativeProductFeatures (
  id int AUTO_INCREMENT PRIMARY KEY,
  product_id INT FOREIGN KEY(product_id) REFERENCES overview(id),
  feature_id INT FOREIGN KEY(feature_id) REFERENCES features(id)
)
create table related_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT FOREIGN KEY(product_id) REFERENCES overview(id),
  related_product INT FOREIGN KEY(related_products) REFERENCES overview(id)
)