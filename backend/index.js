const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

app.get( "/" , (res, req)=> {
    req.send("Hello world!!!");
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "repo"
})

app.listen(port, () => {
    console.log(`Listening in the port ${port}`);
})

app.post("/create", (req, res) => {
    const {fullname, email, phone, location, hobby} = req.body;

    db.query("INSERT INTO users(fullname, email, phone, location, hobby, date_created) VALUES (?,?,?,?,?, NOW())", 
    [fullname, email, phone, location, hobby], 
    (err, result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({
                message: "Error inserting user"
            })
        }

        console.log(result)
        return res.status(201).json({message : "user inserted successfully"})
    })
})

app.put("/update", (req, res) => {
    const {id, fullname, email, phone, location, hobby} = req.body;

    db.query("UPDATE users SET fullname = ? , email = ? , phone = ? , location = ? , hobby = ? WHERE id_user = ?", 
    [fullname, email, phone, location, hobby, id], 
    (err, result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({
                message: "Error updating user"
            })
        }

        console.log(result)
        return res.status(201).json({message : "user updated successfully"})
    })
})

app.get("/list", (req, res) => {
    db.query("SELECT * FROM users ORDER BY id_user ASC",  
    (err, result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({
                message: "Error displaying data"
            })
        }

        return res.status(200).json(result)
    })
})


app.delete("/delete/:id", (req, res) => {

    const id = req.params.id

    db.query("DELETE FROM users WHERE id_user = ?", id , 
    (err, result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({
                message: "Error deleting user..."
            })
        }

        return res.status(200).json(result)
    })
})

