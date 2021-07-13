import React, { useState, useEffect } from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import "../css/form.css";
// //for redux
// import { connect } from "react-redux";

function Form(props) {
  const [item_no, setitemno] = useState([1]);
  //product array
  const [select_pro_input, setSelect_pro_input] = useState([""]);
  //value array
  const [select_val_input, setSelect_val_input] = useState([""]);
  //final json variable
  const [final_json, setfinal_json] = useState({});
 const [image,setImage] = useState(null);
 const [test, settest] = useState(1);
const [pr_obj, setpr_obj] = useState({"bbj": "yes"})
const [merge_complete, setmerge_complete] = useState(0);
const [update_json, setupdate_json] = useState({});



useEffect(() => {
  if(merge_complete>=1){
  console.log("final array ",pr_obj);

  }
  // console.log(pr_obj.Tulsi_2);
  //removing all elements from object
  // setpr_obj({});
  
}, [merge_complete])


  const add_item = () => {
    // item_no.map for total no of inputs
    var last_em = item_no[item_no.length - 1];
    setitemno((prev_item) => [...prev_item, last_em + 1]);
  };
  //receingng select product value
  const select_change_pro = (e) => {
    var s_id = e.target.id;
    var s_val = e.target.value;
 
      //no need to update cause json key update its value automatically
    setSelect_pro_input((prev)=>({...prev,[s_id]:s_val}));
    
    console.log(select_pro_input,item_no.length-1);
  };
  const select_change_val = (e) => {
    var s_id = e.target.id;
    var s_val = e.target.value;
    
    setSelect_val_input((prev)=>({...prev,[s_id]:s_val}));
    console.log(select_val_input,item_no.length-1);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //called by useeffect
  const bad = () => {
    // console.log("inside bad "+test)
    console.log(pr_obj);
  };
  const demo_test = () => {
    settest(4);
  };
  // merging the both select value array
  const merge_array = (e) => {
    e.preventDefault(true);
  
    var pro_array = Object.values(select_pro_input);
    var val_array = Object.values(select_val_input);

    for(var i=0;i<=item_no.length-1;i++){
      setfinal_json((prev)=>({...prev,[pro_array[i]]:val_array[i]}));
    }
  console.log(final_json);

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
  //     console.log(props.user_id);
  //     // send_to_backend(values);
  //   },
  //   //    validate
  //   validationSchema,
  // });

  // const send_to_backend=(values)=>{
  //   console.log("calling node",values)
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function(){
  //     if(this.readyState == 4 && this.status==200){
  //       if(this.responseText=="success"){
  //         props.buyCake(13);

  //       }
  //     }
  //   }
  //   xhttp.open("POST","http://localhost:3000/update-all-data",true);
  //   xhttp.setRequestHeader('Content-Type',"application/json");
  //   xhttp.send(JSON.stringify({_id: props.user_id,bank_Details: values}));

  // }

  // console.log("value ", formik.touched);
  return (
    <React.Fragment>
      {/* <form
          
            className="container personal_info_form_container p-4 shadow-lg mt-5"
            action=""
            onSubmit={formik.handleSubmit} style={{width: '90%'}}
          >
            
             
            <div className="form_container_inner">
              <h3 className="pb-5">Bank Account Details</h3>
              <div className="row">
            <div className="col-sm-4">  <div className="form_container_sub">
                <input
                  type="text"
                  placeholder="account_Holder"
                  id="account_Holder"
                  name="account_Holder"
               
                {...formik.getFieldProps('account_Holder')}
                />
                {formik.touched.account_Holder && formik.errors.account_Holder ? (
                  <div className="form_error">{formik.errors.account_Holder}</div>
                ) : null}
              </div></div>
              
             <div className="col-sm-4"> <div className="form_container_sub">
                <input
                  className=""
                  type="text"
                  placeholder="account_no"
                  id="account_no"
                  name="account_no"
                 
                  {...formik.getFieldProps('account_no')}
                />
                {formik.touched.account_no && formik.errors.account_no ? (
                  <div className="form_error">{formik.errors.account_no}</div>
                ) : null}
              </div></div>
              <div className="col-sm-4"> <div className="form_container_sub">
                <input
                  className=""
                  type="text"
                  placeholder="ifsc_Code"
                  id="ifsc_Code"
                  name="ifsc_Code"
                 
                  {...formik.getFieldProps('ifsc_Code')}
                />
                {formik.touched.ifsc_Code && formik.errors.ifsc_Code ? (
                  <div className="form_error">{formik.errors.ifsc_Code}</div>
                ) : null}
              </div></div>

            
              
             
              
              </div>
              
              <button className="btn btn-primary add_client_next_btn mt-5" type="submit">
                Next
              </button>{" "}
            </div>
           
          </form> */}

      <form>
        {/* product selectbox */}

      
        <input type="text" list="city"  />
        <datalist id="city">
          <option value="boston"/>
          <option value="ranchi"/>
          <option value="jharkhadn"/>
          <option value="mumbai"/>
          <option value="singapore"/>
          <option value="goa"/>
          <option value="manali"/>
          <option value="england"/>
          <option value="usa"/>
          <option value="new york"/>
        </datalist>

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
                <select
                  name="products"
                  id={"product_" + etm}
                  style={{ width: "90%", height: "40px" }}
                  onChange={select_change_pro}
                >
                  <option value="000">Select product</option>
                  <option value="Hepta_1">hepta</option>
                  <option value="Tusli_2">tulsi</option>
                  <option value="Breno_3">breno</option>
                  <option value="multi_4">multi</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <select
                  name="products"
                  id={"value_" + etm}
                  style={{ width: "90%", height: "40px" }}
                  onChange={select_change_val}
                >
                  <option value="0">no of products</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
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
            onClick={merge_array}
            style={{ display: "block" }}
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
