const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const authenticateToken=require("../middelware/authenticateToken.js")

//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);



//Skapa ny review (POST)
router.post ("/review", async (req, res) => {  //authenticateToken,
    try {const {reviewName, reviewDescription} = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!reviewName|| !reviewDescription){
        errors.message = "name and description not included";
        errors.detail= "You must include name and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till omdöme till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO reviews (reviewName, reviewDescription) VALUES(?,?)`;
        
        db.run (sql, [reviewName,reviewDescription],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let review = {  
           reviewName:reviewName,
           reviewDescription:reviewDescription,
          
          
     
         }
     
     
         res.status(201).json({message: "Review added", review}); 
    }})
        }catch {
            res.status(500).json ({error:"fel på reviewserver"})
        }
    });


router.get ("/reviews",async (req, res) => { 
    try {
    
     db.all("SELECT * FROM reviews;", (error,results)=> {
    if(error) {
        res.status(500).json({error: "Something went wrong"+error});
        return;
    }
    // console.log(results);
    if(results.length ===0) {
        res.status(404).json({message: "No reviews found"})
    } else {
        res.json(results);
    }
    
})
   
}catch{
    res.status(500).json ({error:"fel på reviewserver"})
}
});





module.exports=router;