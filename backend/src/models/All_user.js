const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  Sponser_username: {
    type: String,
    required: true,
  },
  Position: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  First_name: {
    type: String,
    required: true,
  },
  Last_name: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Father_name_Husband_name: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Date_of_birth: {
    type: String,
    required: true,
  },
  Profile_image: {
    type: String,
    required: true,
  },
  Pan: {
    type: String
  },
  Nominee: {
    type: String
  }
//  address form
,
country: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  address: {
    type: String
  },
  landmark: {
    type: String
  },
  postal_Code: {
    type: String
  }

// bank account details
,
account_Holder: {
    type: String
  },
  account_no: {
    type: String
  },
  ifsc_Code: {
    type: String
  }
//upload kyc form
,
id_Proof: {
    type: String
  },
  pan_Card: {
    type: String
  },
  bank_Statement: {
    type: String
  },
  dr_Licence: {
    type: String
  }
  // status
  ,
  status: {
    type: String
  },
  business_Type: {
    type: String
  },
  left_Team: {
    type: Array
  },
  right_Team: {
    type: Array
  }

});

const All_User = new mongoose.model("All_User", userSchema);
module.exports = All_User;
