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

    
    router.get ("/coffee",async (req, res) => {  //authenticateToken,
    try {
    
     db.all("SELECT * FROM coffee ORDER BY coffeeName;", (error,results)=> {
    if(error) {
        res.status(500).json({error: "Something went wrong"+error});
        return;
    }
    // console.log(results);
    if(results.length ===0) {
        res.status(404).json({message: "No coffee found"})
    } else {
        res.json(results);
    }
    
})
   
}catch{
    res.status(500).json ({error:"fel på coffeeserver"})
}
});


router.delete ("/coffee/:id", (req, res) => {
    let id= req.params.id;

    db.run(`DELETE FROM coffee WHERE id=${id};`, 
        (error, results) =>{
            if(error) {
                res.status(500).json({error: "coffee not deleted"+error});
                return;
            }
            console.log("Fråga delatad: " + results);
          
     
     
         res.json({message: "coffee deleted:"+req.params.id});
        })
    
});

//Uppdatera coffee för ett specifikt id (PUT)
router.put ("/coffee/:id", (req, res) => {

        const {coffeeName, coffeePrice, coffeeDescription} = req.body;
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

    if (!coffeeName || !coffeePrice || !coffeeDescription ){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        res.status(400).json(errors);
        
        
        
        return;    
    
    } else {



    //UPDATE coffee;

    const sql = `UPDATE coffee SET coffeeName=?, coffeePrice=?, coffeeDescription=? WHERE id=${id}` ;
       
               db.run (sql, [coffeeName, coffeePrice, coffeeDescription],  
           function(error){ 
            if (error) {
                res.status(500).json({error: "Something went wrong"+error});
                return;
            } else if (this.changes == 0) {
                res.status(404).json("product not found") 
            } 
            
            else{

            console.log("Fråga skapad: " ) 
    
                
           let coffee = {  
            coffeeName: coffeeName,
            coffeePrice: coffeePrice,
            coffeeDescription:coffeeDescription,
     
         }
     
       res.status(200).json({message: "Drink updated", coffee});
        
        }}
) }
})



module.exports=router;