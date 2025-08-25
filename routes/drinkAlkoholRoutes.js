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

router.delete ("/drinkAlkohol/:id", authenticateToken,(req, res) => {
    let id= req.params.id;

    db.run(`DELETE FROM drinkAlkohol WHERE id=${id};`, 
        (error, results) =>{
            if(error) {
                res.status(500).json({error: "Drink not deleted"+error});
                return;
            }
            console.log("Fråga delatad: " + results);
          
     
     
         res.json({message: "Drink deleted:"+req.params.id});
        })
    
});

//Uppdatera drinkAlkohol för ett specifikt id (PUT)
router.put ("/drinkAlkohol/:id", authenticateToken,(req, res) => {

        const {drinkAlkoholName, drinkAlkoholPrice, drinkAlkoholDescription} = req.body;
        const id= req.params.id;
          
    
    // let sName = req.body.sName;
    // let sPrice = req.body.sPrice;
    // let sDescription = req.body.sDescription;

       let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!drinkAlkoholName || !drinkAlkoholPrice || !drinkAlkoholDescription ){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        res.status(400).json(errors);
        
        
        
        return;    
    
    } else {



    //UPDATE drinkAlkohol;

    const sql = `UPDATE drinkAlkohol SET drinkAlkoholName=?, drinkAlkoholPrice=?, drinkAlkoholDescription=? WHERE id=${id}` ;
       
               db.run (sql, [drinkAlkoholName, drinkAlkoholPrice, drinkAlkoholDescription],  
           function(error){ 
            if (error) {
                res.status(500).json({error: "Something went wrong"+error});
                return;
            } else if (this.changes == 0) {
                res.status(404).json("product not found") 
            } 
            
            else{

            console.log("Fråga skapad: " ) 
    
                
           let drinkAlkohol = {  
            drinkAlkoholName: drinkAlkoholName,
            drinkAlkoholPrice: drinkAlkoholPrice,
            drinkAlkoholDescription:drinkAlkoholDescription,
     
         }
     
       res.status(200).json({message: "Drink updated", drinkAlkohol});
        
        }}
) }
})






module.exports=router;