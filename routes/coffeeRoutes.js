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
router.post ("/coffee", async (req, res) => {  //authenticateToken,
    try {const {coffeeName, coffeePrice, coffeeDescription} = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!coffeeName|| ! coffeePrice ||!coffeeDescription){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till kaffesort till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO coffee (coffeeName, coffeePrice, coffeeDescription) VALUES(?,?,?)`;
        
        db.run (sql, [coffeeName, coffeePrice, coffeeDescription],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let coffee = {  
           coffeeName:coffeeName,
           coffeePrice:coffeePrice,
           coffeeDescription:coffeeDescription
          
     
         }
     
     
         res.status(201).json({message: "Coffee added", coffee}); 
    }})
        }catch {
            res.status(500).json ({error:"fel på coffeeserver"})
        }
    });




module.exports=router;