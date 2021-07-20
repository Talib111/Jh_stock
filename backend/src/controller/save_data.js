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
  // console.log(req.body.all_Products);
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
    $set: final_js
  };

  All_Products.updateOne({ _id: "mark11" }, newval1, { upsert: true })
    .then(() => {
      // I think upsert in 1st level only and second level is replacing
      res.send(final_js);
      final_js={};
    })
    .catch((e) => {
      res.send(e);
    });
};

const get_pro_data = async (req, res) => {
  All_Products.findOne({ _id: req.body._id }, function (err, result) {
    res.send(result);
  })
    .then(() => {
      res.send("value updated");
    })
    .catch((e) => {
      res.send(e);
    });
};

module.exports = { save_pro_data, update_pro_data, get_pro_data };
