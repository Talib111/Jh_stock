import logo from "./logo.svg";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap"
// import "bootstrap/dist/js/bootstrap.min.js"
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Form from "./components/Form";
import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import SignIn from "./components/SignIn";
import Add_pro from "./components/Add_pro"
import History from "./components/History";
import All_team_table from "./components/All_team_table";
import Reset from "./components/Reset";
import Nav from "./components/Nav";
import Footer from "./components/Footer";


function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [type_user2, settype_user2] = useState("some")
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = await JSON.parse(localStorage.getItem("@auth_token"));
    // const type_user =  JSON.parse(localStorage.getItem("@type_user"));
    console.log({ token });
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);

      return;
    }
    // settype_user2(type_user);
    console.log({ token: `Bearer ${token}` });
    var decoded = jwt_decode(token);
    var dateNow = new Date();

    console.log({
      decoded,
      dateNow: dateNow.getTime(),
    });

    if (decoded.exp * 1000 < dateNow.getTime()) {
      alert("Token expired, please signin  again");
      localStorage.removeItem("@auth_token");
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticated(true);
    setLoading(false);
  };
  if(loading){
    return(
      <h1>loading....</h1>
    )
  }
  else{
    return (
      <BrowserRouter>
        <div className="App">
          <Nav type_user={type_user2}/>
          
  
          
  
          <Switch>
          <Route exact path='/'>
          <Home isAuthenticated={isAuthenticated} />
          </Route>
  
            <Route path="/signin">
              <SignIn setIsAuthenticated={setIsAuthenticated} />
            </Route>
            <Route path="/buy">
              <Form/>
              </Route>
              <Route path="/add">
              <Add_pro/>
              </Route>
              <Route path="/history">
             <All_team_table/>
              </Route>
              <Route path="/reset">
             <Reset/>
              </Route>
          </Switch>
          {/* <Footer/> */}
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
