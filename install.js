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

//Create table, bra med id så man inte behöver använda användarnamnet när man pratar om sina användare
db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("Table created");

db.run(`CREATE TABLE starters(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    starterName VARCHAR(255) NOT NULL,
    starterPrice INTERGER NOT NULL,
    starterDescripton VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);


db.run(`CREATE TABLE mainCourse(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mainCourseName VARCHAR(255) NOT NULL,
    mainCoursePrice INTERGER NOT NULL,
    mainCourseDescripton VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);

db.run(`CREATE TABLE dessert(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dessertName VARCHAR(255) NOT NULL,
    dessertPrice INTERGER NOT NULL,
    dessertDescripton VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);

db.run(`CREATE TABLE drinkWithAlkohol(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    drinkWithAlkoholName VARCHAR(255) NOT NULL,
    drinkWithAlkoholPrice INTERGER NOT NULL,
    drinkWithAlkoholPrice2 INTERGER NOT NULL,
    drinkWithAlkoholDescripton VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);

db.run(`CREATE TABLE drinkWithoutAlkohol(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    drinkWithoutAlkoholName VARCHAR(255) NOT NULL,
    drinkWithoutAlkoholPrice INTERGER NOT NULL,
    drinkWithoutAlkoholDescripton VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);

db.run(`CREATE TABLE coffee(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coffeeName VARCHAR(255) NOT NULL,
    coffeePrice INTERGER NOT NULL,
    coffeeDescripton VARCHAR(355) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);

});


// ´Veckans/dagens/kopckens rekommendation ??
