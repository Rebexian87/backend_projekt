const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const authenticateToken=require("../middelware/authenticateToken.js")


//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);

//Skapa ny dryck (POST)
router.post ("/softDrink", async (req, res) => {  //authenticateToken,
    try {const {softDrinkName, softDrinkPrice, softDrinkDescription} = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!softDrinkName|| !softDrinkPrice ||!softDrinkDescription){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till kaffesort till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO softDrinks (softDrinkName, softDrinkPrice, softDrinkDescription) VALUES(?,?,?)`;
        
        db.run (sql, [softDrinkName, softDrinkPrice, softDrinkDescription],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let softDrink = {  
           softDrinkName:softDrinkName,
           softDrinkPrice:softDrinkPrice,
           softDrinkDescription:softDrinkDescription
          
     
         }
     
     
         res.status(201).json({message: "Soda added", softDrink}); 
    }})
        }catch {
            res.status(500).json ({error:"fel på coffeeserver"})
        }
    });

                //Hämta alla sodas (GET)
router.get ("/softDrink",async (req, res) => {  //authenticateToken,
    try {
    
     db.all("SELECT * FROM softDrinks ORDER BY softDrinkName;", (error,results)=> {
    if(error) {
        res.status(500).json({error: "Something went wrong"+error});
        return;
    }
    // console.log(results);
    if(results.length ===0) {
        res.status(404).json({message: "No sodas found"})
    } else {
        res.json(results);
    }
    
})
   
}catch{
    res.status(500).json ({error:"fel på starterserver"})
}
});




module.exports=router;