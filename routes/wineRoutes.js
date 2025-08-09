const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const authenticateToken=require("../middelware/authenticateToken.js")


//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);


//Skapa nytt vin (POST)
router.post ("/wine", async (req, res) => {  //authenticateToken,
    try {const {wineName, winePrice, winePrice2, wineDescription } = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!wineName|| !winePrice||!winePrice2||!wineDescription){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till vin till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO wine (wineName, winePrice, winePrice2, wineDescription) VALUES(?,?,?,?)`;
        
        db.run (sql, [wineName, winePrice, winePrice2, wineDescription],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let wine = {  
           wineName:wineName,
           winePrice:winePrice,
           winePrice2:winePrice2,
           wineDescription:wineDescription
          
     
         }
     
     
         res.status(201).json({message: "Soda added", wine}); 
    }})
        }catch {
            res.status(500).json ({error:"fel på coffeeserver"})
        }
    });


            //Hämta alla vin (GET)
router.get ("/wine",async (req, res) => {  //authenticateToken,
    try {
    
     db.all("SELECT * FROM wine ORDER BY wineName;", (error,results)=> {
    if(error) {
        res.status(500).json({error: "Something went wrong"+error});
        return;
    }
    // console.log(results);
    if(results.length ===0) {
        res.status(404).json({message: "No wine found"})
    } else {
        res.json(results);
    }
    
})
   
}catch{
    res.status(500).json ({error:"fel på starterserver"})
}
});



router.delete ("/wine/:id", (req, res) => {
    let id= req.params.id;

    db.run(`DELETE FROM wine WHERE id=${id};`, 
        (error, results) =>{
            if(error) {
                res.status(500).json({error: "Wine not deleted"+error});
                return;
            }
            console.log("Fråga delatad: " + results);
          
     
     
         res.json({message: "Wine deleted:"+req.params.id});
        })
    
});

//Uppdatera wine för ett specifikt id (PUT)
router.put ("/wine/:id", (req, res) => {

        const {wineName,winePrice, winePrice2, wineDescription} = req.body;
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

    if (!wineName || !winePrice || !winePrice2 ||!wineDescription){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        res.status(400).json(errors);
        
        
        
        return;    
    
    } else {



    //UPDATE wine;

    const sql = `UPDATE wine SET wineName=?, winePrice=?, winePrice2=?, wineDescription=? WHERE id=${id}` ;
       
               db.run (sql, [wineName, winePrice, winePrice2, wineDescription],  
           function(error){ 
            if (error) {
                res.status(500).json({error: "Something went wrong"+error});
                return;
            } else if (this.changes == 0) {
                res.status(404).json("product not found") 
            } 
            
            else{

            console.log("Fråga skapad: " ) 
    
                
           let wine = {  
            wineName: wineName,
            winePrice: winePrice,
            winePrice2:winePrice2,
            wineDescription:wineDescription,
     
         }
     
       res.status(200).json({message: "Wine updated", wine});
        
        }}
) }
})

module.exports=router;