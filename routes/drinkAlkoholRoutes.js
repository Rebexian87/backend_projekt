const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const authenticateToken=require("../middelware/authenticateToken.js")


//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);


//Skapa ny drink (POST)
router.post ("/drinkAlkohol", async (req, res) => {  //authenticateToken,
    try {const {drinkAlkoholName, drinkAlkoholPrice, drinkAlkoholDescription} = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!drinkAlkoholName|| ! drinkAlkoholPrice ||!drinkAlkoholDescription){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till drink till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO drinkAlkohol (drinkAlkoholName, drinkAlkoholPrice, drinkAlkoholDescription) VALUES(?,?,?)`;
        
        db.run (sql, [drinkAlkoholName, drinkAlkoholPrice, drinkAlkoholDescription],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let drink= {  
           drinkAlkoholName:drinkAlkoholName,
           drinkAlkoholPrice:drinkAlkoholPrice,
           drinkAlkoholDescription:drinkAlkoholDescription
          
     
         }
     
     
         res.status(201).json({message: "Drink added", drink}); 
    }})
        }catch {
            res.status(500).json ({error:"fel på coffeeserver"})
        }
    });
                    //Hämta alla drinkAlkohol (GET)
router.get ("/drinkAlkohol",async (req, res) => {  //authenticateToken,
    try {
    
     db.all("SELECT * FROM drinkAlkohol ORDER BY drinkAlkoholName;", (error,results)=> {
    if(error) {
        res.status(500).json({error: "Something went wrong"+error});
        return;
    }
    // console.log(results);
    if(results.length ===0) {
        res.status(404).json({message: "No drinks found"})
    } else {
        res.json(results);
    }
    
})
   
}catch{
    res.status(500).json ({error:"fel på starterserver"})
}
});



module.exports=router;