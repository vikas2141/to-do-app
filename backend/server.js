const express=require("express");
const bodyParser=require("body-parser");
const mysqlConnection=require("./connection");
const peopleRoutes=require("./routes/people");
const cors=require("cors");


var app=express();
app.use(bodyParser.json());
app.use(cors());

app.use("/",peopleRoutes);





app.listen(5555);


