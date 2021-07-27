import React, { useState, useEffect } from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import "../css/form.css";
import { string } from "yup/lib/locale";
import {FaCartArrowDown} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import ClipLoader from 'react-spinners/ClipLoader';


// //for redux
// import { connect } from "react-redux";

function Form(props) {
  const [p_error, setp_error] = useState('')
  const [v_error, setv_error] = useState('')
  const [loader2, setloader2] = useState(false);

  const [item_no, setitemno] = useState([1]);
  //product array
  const [select_pro_input, setSelect_pro_input] = useState([]);
  //value array
  const [select_val_input, setSelect_val_input] = useState([]);

  const [product_json, setproduct_json] = useState({"good": "yes"});
  const [all_p_data, setall_p_data] = useState({"empty": "null"})

  var p_j;
  var product_include = ["Pnr","Png"];


  useEffect(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status==200){
        console.log(this.responseText);
        setall_p_data(JSON.parse(this.responseText));
        p_j = JSON.parse(this.responseText);
        // var p_j_keys = p_j.keys
        setproduct_json(p_j.all_Products);
      }
    }
    xhttp.open("POST","http://localhost:3000/products/get",true);
    xhttp.setRequestHeader('Content-Type',"application/json");
    xhttp.send(JSON.stringify({_id: "mark11"}));
},[])

  const add_item = () => {
    //=================input validation=================
    var local_ppp = document.getElementById("product_"+item_no[item_no.length-1]).value;
    var local_vvv = document.getElementById("value_"+item_no[item_no.length-1]).value;
    console.log(local_ppp);
    
    if(local_ppp==""){
     setp_error('Enter products !')
   }
    //valid product entry
    else if(!product_include.includes(local_ppp)){
     setp_error("Noooooooo!");
   }
   else if(local_vvv==""){
     setp_error('');
     setv_error("Enter value !")
   }
  
   //=================input validation=================
  else{
     setp_error('');
     setv_error("");
    var last_em = item_no[item_no.length - 1];
    setitemno([...item_no, last_em + 1]);
   }
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
    //=================input validation=================
    var local_ppp = document.getElementById("product_"+item_no[item_no.length-1]).value;
    var local_vvv = document.getElementById("value_"+item_no[item_no.length-1]).value;
    
    if(local_ppp==""){
      alert("enter product name");
    }
    else if(local_vvv==""){
      alert("value enter");
    }
    //=================input validation==================

    else{
      setloader2(true);


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
  
      //====== 1 last updated date==========
      var full_time = `${hour}:${min}:${second} ${am_pm}  ${day}/${month}/${year}`;
      console.log(full_time);
      
      var total_buy = 0;
      for (var i = 0; i <= item_no.length - 1; i++) {
        //subtract value here
        //normal json is to set the default value;
        // normal_json = { ...normal_json, [pro_array[i]]: val_array[i] };
        //change to integer data type
        // console.log(product_json[pro_array[i]])
        //=========== 2 last purchased ==========
        total_buy = total_buy + parseInt(val_array[i]);
  
  
        // ===========getting total
        var db_int = parseInt(product_json[pro_array[i]]);
        var val_int = parseInt(val_array[i]);
        var sub_val = db_int - val_int;
        // final_json = {...final_json, ["all_Products."+pro_array[i]]: sub_val}
  
        //==== 3 all products
        final_json = {...final_json, [pro_array[i]]: sub_val}
        console.log(final_json);
      }
      // var final_total_stock = parseInt(setall_p_data.total_Stock) - total_stock;
      // console.log("befor",all_p_data.total_Stock);
      
      //==== 4 total stock =========
      var final_total_stock = parseInt(all_p_data.total_Stock) - total_buy;
      // console.log("after",final_total_stock);
      // console.log(" final json ",final_json);
      //==== 5 history record ================
      var History = {Time:full_time,Product_Added:0,Product_Purchased:total_buy,Changer:"admin",Stock_Remaining:final_total_stock}
      send_to_backend(final_json,full_time,final_total_stock,total_buy,History);
      // send_to_backend(normal_json);
    }
   

  };

  

  const send_to_backend=(values,full_time,final_total_stock,total_buy,History)=>{
    // const send_to_backend=(values)=>{
    console.log("final json",values);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status==200){
        if(this.responseText=="Success"){
    setloader2(false);

          toast.success('Product Purchased successfully!',{autoClose: false});
         }
      }
    }
    xhttp.open("POST","http://localhost:3000/products/update",true);
    xhttp.setRequestHeader('Content-Type',"application/json");
    xhttp.send(JSON.stringify({_id: "mark11",all_Products: values,last_Updated_Date:full_time,total_Stock: final_total_stock,last_Purchased:total_buy,History}));
    // xhttp.send(JSON.stringify({_id: "mark11",all_Products: values}));

  }

  return (
    <React.Fragment>
     <ToastContainer/>
     <div className="spin" style={{"position": "absolute","top":"50vh","left": "50vw"}}>
<ClipLoader color={"red"} loading={loader2}   />
  </div>
      <h4 className="mt-3 px-1" style={{"textAlign": "left"}}><FaCartArrowDown/> Buy Product</h4>
      <form className="mt-1 border shadow-sm py-5" >
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
              <h5>&nbsp;{etm}&nbsp;</h5>
              <div style={{ flex: 1 }}>
                <input
                  style={{width: "90%"}}
                  type="text"
                  list={"pro_name_in"+etm}
                  id={"product_" + etm}
                  name={"p_name"+etm}
                  onChange={select_change_pro}
                  placeholder="Enter Product"
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
                style={{width: "90%"}}
                  type="number"
                  list={"pro_val_in"+etm}
                  id={"value_" + etm}
                  name={"P_value"+etm}
                  onChange={select_change_val}
                  placeholder="Value"
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

          <div style={{"display": "flex",'width': "100%"}}><div style={{'flex': "1","width": "90%"}}><p style={{'color': "red"}}>{p_error}</p></div>
          <div style={{'flex': "1","width": "90%"}}><p style={{'color': "red"}}>{v_error}</p></div></div>
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
            className="btn btn-primary btn-md waves-effect waves-light shadow"
            type="submit"
            // onClick={merge_array}
            style={{ display: "block",margin: "auto",fontWeight: "700",color: "white" }}
            onClick={merge_array}
          >
            &nbsp;&nbsp;<FaCartArrowDown/> Buy Products&nbsp;&nbsp;
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
