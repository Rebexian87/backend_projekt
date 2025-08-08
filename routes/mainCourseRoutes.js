
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();



//Skapa ny flagga (POST)
router.post ("/mainCourses", async (req, res) => {  //authenticateToken,
    try {const {mainCourseName, mainCoursePrice, mainCourseDescription} = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!mainCourseName|| !mainCoursePrice ||!mainCourseDescription){
        errors.message = "Country and colors not included";
        errors.detail= "You must include colors and countrys in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till flagga till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO mainCourse(mainCourseName, mainCoursePrice, mainCourseDescription) VALUES(?,?,?)`;
        
        db.run (sql, [mainCourseName, mainCoursePrice, mainCourseDescription],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let mainCourse = {  
            mainCourseName: mainCourseName,
            mainCoursePrice: mainCoursePrice,
            mainCourseDescription: mainCourseDescription,
          
     
         }
     
     
         res.status(200).json({message: "Flag added"+mainCourse}); //flag
    }})
        }catch {
            res.status(500).json ({error:"fel på flaggserver"})
        }
    });






module.exports=router;