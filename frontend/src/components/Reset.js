import React, { useState, useEffect } from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import "../css/form.css";
import { string } from "yup/lib/locale";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import ClipLoader from 'react-spinners/ClipLoader';
import {MdDeleteForever} from 'react-icons/md'



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
      <h4 className="mt-5">Your Entire data will be deleted</h4>
      <button className="btn btn-danger mt-2 shadow" onClick={send_to_backend}><MdDeleteForever/> Reset Data</button>
    </React.Fragment>
  );
}

export default Reset;
