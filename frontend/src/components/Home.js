import React,{ useState} from 'react'
import Dashboard from './Dashboard'
import Products from './Products'
import { Redirect } from 'react-router'

function Home(props) {

    const [pro_json, setpro_json] = useState({"Hepat Nectar": 45,"Breno Nectar": 50,"Tulsi": 49});
    const [demo, setdemo] = useState(["Hepta Nectar","Breno Nectar","Tulsi"]);

    const logout_me = ()=>{
        localStorage.removeItem('@auth_token')
       window.location.href="/signin";

    }
    
    const Edit_value = ()=>{
       
       window.location.href="/form";

    }

    if (!props.isAuthenticated) {
		console.log('unauthenticated.............');
		return <Redirect to='/signin' />;
	}
    else{
        return (
            <>
            <Dashboard/>
            <div className="container mt-5">
                <div className="row">
            {demo.map((val)=>(
                <div className="col-sm-4 mt-2"> <Products name={val}/></div>
           

            ))}
            </div>
            </div>
           
            <button className="btn btn-danger mt-5" onClick={logout_me}>Logout</button>
            <button className="btn btn-danger mt-5" onClick={Edit_value}>Edit</button>
            </>
        )
    }
    
}

export default Home
