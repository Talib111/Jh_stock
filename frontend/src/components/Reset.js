import React, { useState, useEffect } from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import "../css/form.css";
import { string } from "yup/lib/locale";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import ClipLoader from 'react-spinners/ClipLoader';


function Reset(props) {
  const [loader2, setloader2] = useState(false);






  const send_to_backend=()=>{
    setloader2(true);


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status==200){
        if(this.responseText=="Success"){
    setloader2(false);

          toast.success('Stock Reset successfully!',{autoClose: false});
         }
      }
    }
    xhttp.open("POST","http://localhost:3000/products/reset",true);
    xhttp.setRequestHeader('Content-Type',"application/json");
    xhttp.send();

  }

  return (
    <React.Fragment>
      <ToastContainer/>
      <div className="spin" style={{"position": "absolute","top":"50vh","left": "50vw"}}>
<ClipLoader color={"red"} loading={loader2}   />
  </div>      

      <button className="btn btn-warning" onClick={send_to_backend}>Reset Data</button>
    </React.Fragment>
  );
}

export default Reset;
