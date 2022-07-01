
    // Importing the packages required for the project.  
      
    const mysql = require('mysql');  
    const express = require('express');  
    var app = express();  
    const bodyparser = require('body-parser');  
    //cors on selleks...
    var cors = require('cors')

    // Used for sending the Json Data to Node API  
    app.use(bodyparser.json());  
      //CORS-enabled for all origins. Uurin hiljem mis see cors on täpsemalt
    app.use(cors())

    //Siin hakkan yhendust looma
    // Connection String to Database  
    var mysqlConnection = mysql.createConnection({  
        host: 'localhost',  
        user : 'root',  
        password : '',   
        database : 'lotto',  
        multipleStatements : true  
    });  
      
    // To check whether the connection is succeed for Failed while running the project in console.  
    mysqlConnection.connect((err) => {  
        if(!err) {  
            console.log("Db Connection Succeed");  
        }  
        else{  
            console.log("Db connect Failed \n Error :" + JSON.stringify(err,undefined,2));  
        }  
    });  
      
    // To Run the server with Port Number  
    app.listen(3000,()=> console.log("Express server is running at port no : 3000"));  
      
    // CRUD Methods  

    //Create new user 
    app.post('/users',(req,res)=>{  //This is link where I start making queryes... see on nagu link kuhu hakkan päringuid tegema 
        mysqlConnection.query('INSERT INTO users (email, password) VALUES (?, ?)',[req.body.email, req.body.password],(err,rows,fields)=>{  
        if(!err)   
        res.send(rows);  
        else  
            console.log(err);  
          
    })  
    });  
      
    //Get the Employee Data based on Id  
    app.get('/employees/:id',(req,res)=>{  
        mysqlConnection.query('SELECT * FROM Employee WHERE id = ?',[req.params.id],(err,rows,fields)=>{  
        if(!err)   
        res.send(rows);  
        else  
            console.log(err);  
          
    })  
    });  
      
    //Delete the Employee Data based on Id  
    app.delete('/employees/:id',(req,res)=>{  
        mysqlConnection.query('DELETE FROM Employee WHERE id = ?',[req.params.id],(err,rows,fields)=>{  
        if(!err)   
        res.send("Data Deletion Successful");  
        else  
            console.log(err);  
          
    })  
    });  
      
      
  