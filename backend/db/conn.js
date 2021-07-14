var mongoose = require("mongoose");



mongoose.connect('mongodb://localhost:27017/jh_stock', {useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true});
// .then(()=>console.log("mognodb is running and node js is running with nodemon"))
// .catch((err)=> console.log(err));