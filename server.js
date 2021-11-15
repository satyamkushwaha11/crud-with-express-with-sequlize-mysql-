const express = require('express');

require('dotenv').config()
const app = express();
const sequelize = require("./connection/db");


app.use(express.json());


app.use('/', require('./routes/auth'))

// app.get("/",(req,res)=>{
//     console.log("server connect ");
//     res.send("server connect")
// })

sequelize.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

sequelize.sync().then(() => {
    app.listen(process.env.port, (err) => {
        if (err) {
            throw err
        } else {
            console.log(`your app is running on PORT : ${process.env.port}`);
           
        }
    })
}).catch(err => console.log("Error: " + err));
