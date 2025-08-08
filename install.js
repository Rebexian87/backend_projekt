require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

// Connect to database

const db = new sqlite3.Database(process.env.DATABASE);

// Create tables users

db.serialize(() => {
//Drop table 

db.run("DROP TABLE IF EXISTS users");

db.run("DROP TABLE IF EXISTS starters");

db.run("DROP TABLE IF EXISTS mainCourse");

db.run("DROP TABLE IF EXISTS dessert");


db.run("DROP TABLE IF EXISTS drinkWithAlkohol");


db.run("DROP TABLE IF EXISTS drinkWithoutAlkohol");


db.run("DROP TABLE IF EXISTS coffee");


//Create table, bra med id så man inte behöver använda användarnamnet när man pratar om sina användare
db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("1");

db.run(`CREATE TABLE starters(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sName VARCHAR(255) NOT NULL,
       sPrice INTEGER NOT NULL,
    sDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("2");

db.run(`CREATE TABLE mainCourse(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mainCourseName VARCHAR(255) NOT NULL,
    mainCoursePrice INTEGER NOT NULL,
    mainCourseDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("3");
db.run(`CREATE TABLE dessert(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dessertName VARCHAR(255) NOT NULL,
    dessertPrice INTEGER NOT NULL,
    dessertDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("4");
db.run(`CREATE TABLE drinkWithAlkohol(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    drinkWithAlkoholName VARCHAR(255) NOT NULL,
    drinkWithAlkoholPrice INTEGER NOT NULL,
    drinkWithAlkoholPrice2 INTEGER NOT NULL,
    drinkWithAlkoholDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("5");
db.run(`CREATE TABLE drinkWithoutAlkohol(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    drinkWithoutAlkoholName VARCHAR(255) NOT NULL,
    drinkWithoutAlkoholPrice INTEGER NOT NULL,
    drinkWithoutAlkoholDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("6");
db.run(`CREATE TABLE coffee(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coffeeName VARCHAR(255) NOT NULL,
    coffeePrice INTEGER NOT NULL,
    coffeeDescripton VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("7");
});


// ´Veckans/dagens/kopckens rekommendation ??


//db.run (`INSERT INTO starters(sName, sPrice, sDescription) VALUES ("skagen", 179, "fgwkjha")`)