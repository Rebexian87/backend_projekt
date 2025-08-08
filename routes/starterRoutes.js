const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const authenticateToken=require("../middelware/authenticateToken.js")


//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);




//Skapa ny starter (POST)
router.post ("/starters", async (req, res) => {  //authenticateToken,
    try {const {sName, sPrice, sDescription} = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!sName|| ! sPrice ||!sDescription){
        errors.message = "name, price and description not included";
        errors.detail= "You must include name, price and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till flagga till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO starters (sName, sPrice, sDescription) VALUES(?,?,?)`;
        
        db.run (sql, [sName, sPrice, sDescription],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let starter = {  
            sName: sName, 
            sPrice: sPrice, 
            sDescription: sDescription
          
     
         }
     
     
         res.status(201).json({message: "Starter added", starter} ); //flag
    }})
        }catch {
            res.status(500).json ({error:"fel på starterserver"})
        }
    });

//Uppdatera användare för ett specifikt id (PUT)
router.put ("/starters/:id", (req, res) => {
    
    let sName = req.body.sName;
    let sPrice = req.body.sPrice;
    let sDescription = req.body.sDescription;

       let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!sName || !sPrice || !sDescription ){
        errors.message = "Companyname, jobtitle and location not included";
        errors.detail= "You must include companyname, jobtitle and location in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        res.status(400).json(errors);
        
        
        
        return;    
    
    }



    //UPDATE workexperience;

    const sql = (`UPDATE starters SET sName=?, sPrice=?, sDescription=? WHERE id=${req.params.id}` ,  [sName, sPrice, sDescription], 
       
               db.run (sql, [sName, sPrice, sDescription],  
           function(error){ 
            if (error) {
                res.status(500).json({error: "Something went wrong"+error});
                return;
            } else {

            console.log("Fråga skapad: " + results), 
    
                
        //    let starter = {  
        //     sName: sName,
        //     sPrice: sPrice,
        //     sDescription:sDescription,
     
        //  }
     
       res.json({message: "Starter updated"});
        
        }})
)
})

    // res.json({message: "Workexperience updated:"+req.params.id});



    
        //Hämta alla flaggor (GET)
router.get ("/starters",async (req, res) => {  //authenticateToken,
    try {
    
     db.all("SELECT * FROM starters ORDER BY sName;", (error,results)=> {
    if(error) {
        res.status(500).json({error: "Something went wrong"+error});
        return;
    }
    // console.log(results);
    if(results.length ===0) {
        res.status(404).json({message: "No starters found"})
    } else {
        res.json(results);
    }
    
})
   
}catch{
    res.status(500).json ({error:"fel på starterserver"})
}
});

router.delete ("/starters/:id", (req, res) => {
    let id= req.params.id;

    db.run(`DELETE FROM starters WHERE id=${id};`, 
        (error, results) =>{
            if(error) {
                res.status(500).json({error: "Starter not deleted"+error});
                return;
            }
            console.log("Fråga delatad: " + results);
          
     
     
         res.json({message: "Starter deleted:"+req.params.id});
        })
    
});




module.exports=router;





