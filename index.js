const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT||5000;

app.use(express.json());

require("./config/dataBase").connectDB();

//mounting 
const user = require("./routes/user");
app.use("/api/v1",user);

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});
