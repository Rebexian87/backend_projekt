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

router.delete ("/softDrink/:id", (req, res) => {
    let id= req.params.id;

    db.run(`DELETE FROM softDrinks WHERE id=${id};`, 
        (error, results) =>{
            if(error) {
                res.status(500).json({error: "Soda not deleted"+error});
                return;
            }
            console.log("Fråga delatad: " + results);
          
     
     
         res.json({message: "Soda deleted:"+req.params.id});
        })
    
});


//Uppdatera softDrink för ett specifikt id (PUT)
router.put ("/softDrink/:id", (req, res) => {

        const {softDrinkName, softDrinkPrice, softDrinkDescription} = req.body;
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

    if (!softDrinkName || !softDrinkPrice || !softDrinkDescription ){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        res.status(400).json(errors);
        
        
        
        return;    
    
    } else {



    //UPDATE softDrink;

    const sql = `UPDATE softDrinks SET softDrinkName=?, softDrinkPrice=?, softDrinkDescription=? WHERE id=${id}` ;
       
               db.run (sql, [softDrinkName, softDrinkPrice, softDrinkDescription],  
           function(error){ 
            if (error) {
                res.status(500).json({error: "Something went wrong"+error});
                return;
            } else if (this.changes == 0) {
                res.status(404).json("product not found") 
            } 
            
            else{

            console.log("Fråga skapad: " ) 
    
                
           let soda = {  
            softDrinkName: softDrinkName,
            softDrinkPrice: softDrinkPrice,
            softDrinkDescription:softDrinkDescription,
     
         }
     
       res.status(200).json({message: "Soda updated", soda});
        
        }}
) }
})






module.exports=router;