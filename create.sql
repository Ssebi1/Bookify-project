-- create database 
CREATE DATABASE IF NOT EXISTS bookify;
USE bookify;

-- create users table 
CREATE TABLE if not exists users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    user_email VARCHAR(20) NOT NULL,
    user_password VARCHAR(60) NOT NULL,
	user_type VARCHAR(20) NOT NULL
);

-- create books table
CREATE TABLE if not exists books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    book_title VARCHAR(1000),
    book_author VARCHAR(1000),
    book_category VARCHAR(1000),
    book_link VARCHAR(1000),
    book_notes VARCHAR(10000),
    book_progress INT,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
       ON DELETE CASCADE
       ON UPDATE CASCADE
);