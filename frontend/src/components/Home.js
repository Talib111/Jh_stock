import React,{ useState, useEffect} from 'react'
import Dashboard from './Dashboard'
import Products from './Products'
import { Redirect } from 'react-router'

function Home(props) {

    const [pro_json, setpro_json] = useState({"Hepat Nectar": 45,"Breno Nectar": 50,"Tulsi": 49});
    const [product_json, setproduct_json] = useState({"good": "yes"});
    const [all_p_data, setall_p_data] = useState({"empty": "null"})

    const logout_me = ()=>{
        localStorage.removeItem('@auth_token')
       window.location.href="/signin";

    }
    
    const buy_product = ()=>{
       
       window.location.href="/form";

    }
    const add_product = ()=>{
       
        window.location.href="/form";
 
     }

    //getting data
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

    if (!props.isAuthenticated) {
		console.log('unauthenticated.............');
		return <Redirect to='/signin' />;
	}
    else{
        return (
            <>
            <Dashboard last_Updated_Date={all_p_data.last_Updated_Date} total_Stock={all_p_data.total_Stock} last_Purchased={all_p_data.last_Purchased}/>
            <div className="container mt-5">
                <div className="row">
            {Object.keys(product_json).map((val)=>(
                <div className="col-sm-4 mt-2"> <Products name={val}/></div>
           

            ))}
            </div>
            </div>
           
            <button className="btn btn-info mt-5 mx-2" onClick={logout_me}>Logout</button>
            <button className="btn btn-danger mt-5 mx-2 px-3" onClick={buy_product}>Buy</button>
            <button className="btn btn-success mt-5 mx-2 px-3" onClick={add_product}>Add</button>
            </>
        )
    }
    
}

export default Home
