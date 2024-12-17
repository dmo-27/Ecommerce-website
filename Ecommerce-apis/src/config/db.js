const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://dhachamaotari:ecommerce@cluster.itdv7qq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

const connectDb = () =>{
    return mongoose.connect(mongoURL);
}

module.exports ={connectDb}