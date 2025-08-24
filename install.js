require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

// Connect to database

const db = new sqlite3.Database(process.env.DATABASE);

// Create tables users


/*
db.serialize(() => {
//Drop table 

db.run("DROP TABLE IF EXISTS users");

db.run("DROP TABLE IF EXISTS starters");

db.run("DROP TABLE IF EXISTS mainCourse");

db.run("DROP TABLE IF EXISTS dessert");


db.run("DROP TABLE IF EXISTS drinkAlkohol");

db.run("DROP TABLE IF EXISTS wine");
db.run("DROP TABLE IF EXISTS softDrinks");


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
db.run(`CREATE TABLE wine(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wineName VARCHAR(255) NOT NULL,
    winePrice INTEGER NOT NULL,
    winePrice2 INTEGER NOT NULL,
    wineDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("5");

db.run(`CREATE TABLE drinkAlkohol(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    drinkAlkoholName VARCHAR(255) NOT NULL,
    drinkAlkoholPrice INTEGER NOT NULL,
    drinkAlkoholDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("6");

db.run(`CREATE TABLE softDrinks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    softDrinkName VARCHAR(255) NOT NULL,
    softDrinkPrice INTEGER NOT NULL,
   softDrinkDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("7");
db.run(`CREATE TABLE coffee(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coffeeName VARCHAR(255) NOT NULL,
    coffeePrice INTEGER NOT NULL,
    coffeeDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("8");

db.run(`CREATE TABLE reviews(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reviewName VARCHAR(255) NOT NULL,
    reviewDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("9");

db.run(`CREATE TABLE contactUs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contactUsName VARCHAR(255) NOT NULL,
    contactUsEmail VARCHAR(255) NOT NULL,
    contactUsDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);


console.log("10");
});  */


// ´Veckans/dagens/kopckens rekommendation ??


//db.run (`INSERT INTO starters(sName, sPrice, sDescription) VALUES ("skagen", 179, "fgwkjha")`)

db.run("DROP TABLE IF EXISTS contactUs");

db.run(`CREATE TABLE contactUs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contactUsName VARCHAR(255) NOT NULL,
    contactUsEmail VARCHAR(255) NOT NULL,
    contactUsDescription VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("10");