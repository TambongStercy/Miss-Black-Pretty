require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');


const uri = 'mongodb://127.0.0.1:27017/MBAP';
// const uri = process.env.MONGODB_URI;

const app = express();

// app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

mongoose.set('strictQuery', false);

// mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/SGBCA', { useNewUrlParser: true });
mongoose.connect(uri, { useNewUrlParser: true });


const userRoute = require("./routes/user_routes");
const adminRoute = require("./routes/admin_routes");
const payRoute = require("./routes/payment_routes");

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/pay", payRoute);

app.use("/*", (req,res)=>res.redirect("/user"))


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running on port ' + port); 
});



