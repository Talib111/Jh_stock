const mongoose = require("mongoose");
const validator = require("validator");

const All_productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  total_Stock: {
    type: String
  },
  last_Updated_Date: {
    type: String
  },
  last_Purchased: {
    type: String
  },
  all_Products: {
  
    Png :{
    type: String
   },
   Pnr :{
     type: String
  },Aj100 :{
     type: String
  }
  ,NBP :{
     type: String
  }
  ,HC :{
     type: String
  },
  NGT :{
    type: String
 },JKN :{
    type: String
 }
 ,ANANDAM :{
    type: String
 }
 ,MASIHI_P :{
    type: String
 },
 SUGAR_P :{
   type: String
},MSG_P :{
   type: String
}
,MSG_G :{
   type: String
}
,DAMA_P :{
   type: String
},
KB100 :{
  type: String
},"9B100" :{
  type: String
}
    
  }
  
});

const All_products = new mongoose.model("All_products", All_productSchema);
module.exports = All_products;
