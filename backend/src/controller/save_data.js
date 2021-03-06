const All_Products = require("../models/All_products");
const All_admin = require("../models/All_data");

//this signup is normal signup and not specifically related to passport

const save_pro_data = async (req, res) => {
  const admin = await new All_Products(req.body);
  admin.save();
  return res.send("value saved successfully");
};

const update_pro_data = async (req, res) => {
  // var newval = {$set: req.body};
  // var newval = {$set: {"all_Products.Hepta":50,"all_Products.Tulsi": 59,"all_Products.Breno": 100}};
  console.log(req.body);
//   res.send('reached');
  //destructing 2nd level object as array to upsert since upsert is not working in second level via adding all_products

var final_js={};
var pro_array = Object.keys(req.body.all_Products);
var val_array = Object.values(req.body.all_Products);
// res.send(pro_array," ",val_array);

//adding extra all_Products. to upsert in second level
for(let i = 0;i<=pro_array.length - 1;i++){
   final_js={...final_js,["all_Products."+pro_array[i]]: val_array[i]}//wrapping with upper curly bracket
}

//addding other value in final_js
final_js={...final_js, total_Stock: req.body.total_Stock,last_Purchased: req.body.last_Purchased, last_Updated_Date: req.body.last_Updated_Date}
  var newval1 = {//all of these destructuring is equall to req.body
    $set: final_js,
    $push: {History:req.body.History}
  };

  All_Products.updateOne({ _id: "mark11" }, newval1, { upsert: true,multi:true })
  //if updateone gives success then will be executed otherwise - if any error then catch will be executed
    .then(() => {
      res.send("Success");
      // res.send(final_js);
    })
    .catch((e) => {
      console.log(e);
    });
     
};

//adding data
const update_add_pro_data = async (req, res) => {
  
  console.log(req.body);


var final_js={};
var pro_array = Object.keys(req.body.all_Products);
var val_array = Object.values(req.body.all_Products);

for(let i = 0;i<=pro_array.length - 1;i++){
   final_js={...final_js,["all_Products."+pro_array[i]]: val_array[i]}//wrapping with upper curly bracket
}

//addding other value in final_js
final_js={...final_js, total_Stock: req.body.total_Stock}
  var newval1 = {//all of these destructuring is equall to req.body
    $set: final_js,
    $push: {History:req.body.History}
  };

  All_Products.updateOne({ _id: "mark11" }, newval1, { upsert: true,multi:true })
    .then(() => {
      // I think upsert in 1st level only and second level is replacing
      res.send("Success");
    //   final_js={};
    })
    .catch((e) => {
      console.log(e);
    });
     
};


//Reset data
const reset_pro_data = async (req, res) => {
  
  console.log(req.body);


var final_js={};


//addding other value in final_js
final_js={
    "all_Products": {
        "NBP": "0",
        "HC": "0",
        "NGT": "0",
        "JKN": "0",
        "ANANDAM": "0",
        "Png": "0",
        "Pnr": "0",
        "Aj100": "0",
        "MASIHI_P": "0",
        "SUGAR_P": "0",
        "MSG_P": "0",
        "MSG_G": "0",
        "DAMA_P": "0",
        "KB100": "0"
    },
    "total_Stock": "0",
    "last_Updated_Date": "00:00",
    "last_Purchased": "0",
    "History": {event: "value reset"}

}
  var newval1 = {//all of these destructuring is equall to req.body
    $set: final_js
  };

  All_Products.updateOne({ _id: "mark11" }, newval1, { upsert: false })
    .then(() => {
      // I think upsert in 1st level only and second level is replacing
      res.send("Success");
      // res.send("value reset successfully");
    //   final_js={};
    })
    .catch((e) => {
      console.log(e);
    });
     
};

const get_pro_data = async (req, res) => {
  All_Products.findOne({ _id: req.body._id }, function (err, result) {
    res.send(result);
  })
    .then(() => {
      // res.send("value updated");
      console.log("successfully got the data");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = { save_pro_data, update_pro_data, get_pro_data, update_add_pro_data,reset_pro_data};
