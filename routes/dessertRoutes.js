const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const authenticateToken=require("../middelware/authenticateToken.js")


//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);


//Skapa ny kaffesort (POST)
router.post ("/dessert", async (req, res) => {  //authenticateToken,
    try {const {dessertName, dessertPrice, dessertDescription} = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!dessertName|| ! dessertPrice ||!dessertDescription){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till kaffesort till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO dessert (dessertName, dessertPrice, dessertDescription) VALUES(?,?,?)`;
        
        db.run (sql, [dessertName, dessertPrice, dessertDescription],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let dessert= {  
           dessertName:dessertName,
           dessertPrice:dessertPrice,
           dessertDescription:dessertDescription
          
     
         }
     
     
         res.status(201).json({message: "Dessert added", dessert}); 
    }})
        }catch {
            res.status(500).json ({error:"fel på coffeeserver"})
        }
    });



module.exports=router;