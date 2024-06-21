const express=require('express');
const app=express();
const cors=require('cors');
const connectToDb=require('./db');
const login=require('./Routes/login');
const employee=require("./Routes/employee");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectToDb();
app.use('/',login)
app.use('/employee',employee)
app.listen(5000,()=>{
    console.log("listening to port 5000");
});