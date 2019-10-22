DROP DATABASE IF EXISTS great_bayDB;

CREATE DATABASE great_bayDB;

USE great_bayDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NULL,
  description VARCHAR(45) NULL,
  price INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (name, description)
VALUES ("phone", "iphone");


INSERT INTO products (name, description)
VALUES ("car", "tesla");


INSERT INTO products (name, description)
VALUES ("videogame", "ps4");