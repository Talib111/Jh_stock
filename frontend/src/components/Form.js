import React, { useState, useEffect } from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import "../css/form.css";
import { string } from "yup/lib/locale";
// //for redux
// import { connect } from "react-redux";

function Form(props) {
  const [item_no, setitemno] = useState([1]);
  //product array
  const [select_pro_input, setSelect_pro_input] = useState([]);
  //value array
  const [select_val_input, setSelect_val_input] = useState([]);

  const [product_json, setproduct_json] = useState({"good": "yes"});
  const [all_p_data, setall_p_data] = useState({"empty": "null"})

  useEffect(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status==200){
        console.log(this.responseText);
        setall_p_data(JSON.parse(this.responseText));
        var p_j = JSON.parse(this.responseText);
        // var p_j_keys = p_j.keys
        setproduct_json(p_j.all_Products);
      }
    }
    xhttp.open("POST","http://localhost:3000/products/get",true);
    xhttp.setRequestHeader('Content-Type',"application/json");
    xhttp.send(JSON.stringify({_id: "mark11"}));
},[])

  const add_item = () => {
    // item_no.map for total no of inputs
    var last_em = item_no[item_no.length - 1];
    setitemno([...item_no, last_em + 1]);
  };
  //receingng select product value
  const select_change_pro = (e) => {
    var s_id = e.target.id;
    var s_val = e.target.value;

    //no need to update cause json key update its value automatically
    setSelect_pro_input({ ...select_pro_input, [s_id]: s_val });

    // console.log(select_pro_input,item_no.length-1);
  };
  const select_change_val = (e) => {
    var s_id = e.target.id;
    var s_val = e.target.value;

    setSelect_val_input({ ...select_val_input, [s_id]: s_val });
    // console.log(select_val_input,item_no.length-1);
  };

  // merging the both select value array
  const merge_array = (e) => {
    e.preventDefault(true);

    var pro_array = Object.values(select_pro_input);
    var val_array = Object.values(select_val_input);
    console.log("pro_array ", JSON.stringify(pro_array));
    console.log("val array ", JSON.stringify(val_array));

    var normal_json = {};
    var final_json = {};
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var min = date.getMinutes();
    var second = date.getSeconds();
    var hour = date.getHours();
    var am_pm='am'
    if(hour>12){
      hour = hour - 12;
      am_pm = 'pm';
    }
    
    var full_time = `${hour}:${min}:${second} ${am_pm}  ${day}/${month}/${year}`;
    console.log(full_time);
    
    var total_stock = 0;
    for (var i = 0; i <= item_no.length - 1; i++) {
      //subtract value here
      //normal json is to set the default value;
      normal_json = { ...normal_json, ["all_Products."+pro_array[i]]: val_array[i] };
      //change to integer data type
      // console.log(product_json[pro_array[i]])
      //===========getting total of all products
      total_stock = total_stock + parseInt(pro_array[i]);


      //===========getting total
      // var db_int = parseInt(product_json[pro_array[i]]);
      // var val_int = parseInt(val_array[i]);
      // var sub_val = db_int - val_int;
      // // final_json = {...final_json, ["all_Products."+pro_array[i]]: sub_val}
      // final_json = {...final_json, [pro_array[i]]: sub_val}
      // console.log(final_json);
    }
    // var final_total_stock = parseInt(setall_p_data.total_Stock) - total_stock;
    var final_total_stock = 20;
    // console.log(" final json ",final_json);
    send_to_backend(normal_json,full_time,final_total_stock,total_stock);
    // send_to_backend(normal_json);

  };

  // const validationSchema = Yup.object({
  //   // password: Yup.string().required('Required').email('invalid email format')
  //   account_Holder: Yup.string().required("Required"),
  //   account_no: Yup.string().required("Required"),
  //   ifsc_Code: Yup.string().required("Required"),
  // });
  // const formik = useFormik({
  //   initialValues: {
  //     account_Holder: "",
  //     account_no: "",
  //     ifsc_Code: "",
  //   },
  //   onSubmit: (values) => {
  //     // console.log("submited values ", values.account_Holder," ",values.account_no);
  //     console.log("onsubmit");
  //     merge_array();
  //     // send_to_backend(values);
  //   }
  //   //    validate
  //   // validationSchema,
  // });

  const send_to_backend=(values,full_time,final_total_stock,total_stock)=>{
    // const send_to_backend=(values)=>{
    console.log("final json",values);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status==200){
        console.log(this.responseText);
      }
    }
    xhttp.open("POST","http://localhost:3000/products/update",true);
    xhttp.setRequestHeader('Content-Type',"application/json");
    xhttp.send(JSON.stringify({_id: "mark11",all_Products: values,last_Updated_Date:full_time,total_Stock: final_total_stock,last_Purchased:total_stock}));
    // xhttp.send(JSON.stringify({_id: "mark11",all_Products: values}));

  }

  return (
    <React.Fragment>
     

      <form className="mt-5" >
        {/* product selectbox */}

        <div id="all_selectbox">
          {item_no.map((etm) => (
            <div
              className="pro_select"
              id={"select_" + etm}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <h5>{etm}&nbsp;</h5>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  list={"pro_name_in"+etm}
                  id={"product_" + etm}
                  name={"p_name"+etm}
                  onChange={select_change_pro}
                  // {...formik.getFieldProps("account_Holder")}
                />
                <datalist id={"pro_name_in"+etm}>
                  <option value="Png">Png</option>
                  <option value="Pnr">Pnr</option>
                  <option value="Aj100">Aj100</option>
                  <option value="NBP">NBP</option>
                  <option value="HC">HC</option>
                  <option value="NGT">NGT</option>
                  <option value="JKN">JKN</option>
                  <option value="ANANDAM">ANANDAM</option>
                  <option value="MASIHI_P">MASIHI(P)</option>
                  <option value="SUGAR_P">SUGAR(P)</option>
                  <option value="MSG_P">MSG(P)</option>
                  <option value="MSG_G">MSG(G)</option>
                  <option value="DAMA_P">DAMA(P)</option>
                  <option value="KB100">KB100</option>
                 
                </datalist>
               
              </div>

              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  list={"pro_val_in"+etm}
                  id={"value_" + etm}
                  name={"P_value"+etm}
                  onChange={select_change_val}
                  // {...formik.getFieldProps("account_Holder")}
                />
                <datalist id={"pro_val_in"+etm}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="8">9</option>
                  <option value="8">10</option>
                  <option value="8">11</option>
                </datalist>
               
              </div>
            </div>
          ))}
        </div>

        <div
          onClick={add_item}
          className="add_item"
          style={{
            display: "block",
            margin: "auto",
            float: "right",
            fontSize: "40px",
            color: "green",
            cursor: "pointer",
          }}
        >
          +
        </div>

        <br />

        <div className="text-center mt-4">
          <button
            className="btn btn-info btn-md waves-effect waves-light"
            type="submit"
            // onClick={merge_array}
            style={{ display: "block" }}
            onClick={merge_array}
          >
            &nbsp;&nbsp;Save&nbsp;&nbsp;
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

//  //for redux
//   //getting the num of cakes here
//   const mapStateToProps = (state) => {
//     return {
//       numofCakes: state.numofCakes,
//       user_id: state.user_id
//     };
//   };

//   const mapDispatchToProps = (dispatch) => {
//     return {
//       // buyCake: () => dispatch(buyCake())
//       buyCake: (form_dt) => dispatch({ type: "SELL_CAKE",form_dt2: form_dt }),
//     };
//   };
//   ///for reudux

export default Form;
// export default connect(mapStateToProps,mapDispatchToProps)(Bank_account_details_form)
