
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
router.post ("/contactUs", async (req, res) => {  //authenticateToken,
    try {const {contactUsName, contactUsEmail, contactUsDescription} = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!contactUsName|| !contactUsEmail||!contactUsDescription){
        errors.message = "name, email and description not included";
        errors.detail= "You must include name, email and description in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till omdöme till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO contactUs (contactUsName, contactUsEmail, contactUsDescription) VALUES(?,?,?)`;
        
        db.run (sql, [contactUsName,contactUsEmail, contactUsDescription],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let contactUs = {  
           contactUsName:contactUsName,
           contactUsEmail:contactUsEmail,
           contactUsDescription:contactUsDescription,
          
          
     
         }
     
     
         res.status(201).json({message: "Review added", contactUs}); 
    }})
        }catch {
            res.status(500).json ({error:"fel på contactUsserver"})
        }
    });


    router.get ("/contactUs",async (req, res) => { 
    try {
    
     db.all("SELECT * FROM contactUs;", (error,results)=> {
    if(error) {
        res.status(500).json({error: "Something went wrong"+error});
        return;
    }
    // console.log(results);
    if(results.length ===0) {
        res.status(404).json({message: "No contactUs found"})
    } else {
        res.json(results);
    }
    
})
   
}catch{
    res.status(500).json ({error:"fel på contactUsserver"})
}
});

router.delete ("/contactUs/:id", (req, res) => {
    let id= req.params.id;

    db.run(`DELETE FROM contactUs WHERE id=?;`, [id], 
        (error, results) =>{
            if(error) {
                res.status(500).json({error: "contactUs not deleted"+error});
                return;
            }
            console.log("Fråga delatad: " + results);
          
     
     
         res.json({message: "contactUs deleted:"+req.params.id});
        })
    
});




module.exports=router;
