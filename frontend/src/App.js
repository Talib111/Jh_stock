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
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import SignIn from "./components/SignIn";
import Add_pro from "./components/Add_pro";
import History from "./components/History";
import All_team_table from "./components/All_team_table";
import Reset from "./components/Reset";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [type_user2, settype_user2] = useState("");
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = await JSON.parse(localStorage.getItem("@auth_token"));
    const type_user = await JSON.parse(localStorage.getItem("@type_user"));
    // const type_user_st = JSON.parse(type_user);
    // console.log({ token });
    console.log("local ", type_user);
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);

      return;
    }
    settype_user2(type_user);

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
  if (loading) {
    return <h1>loading....</h1>;
  } else {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Nav type_user2={type_user2}/> */}

          {/* user text is showing in app.js not form singin */}
          {/* <div style={{'width': "100vw",height: "50px"}}>
          <span className="px-2 mt-1" style={{'display': "block",float: "right",backgroundColor: 'black',color: "white",borderTopLeftRadius: "10px",borderBottomLeftRadius: "10px"}}>{type_user2}</span>      
          </div>     */}

          <Switch>
            <Route exact path="/">
              <Nav type_user2={type_user2} />
              <div style={{ width: "100vw", height: "50px" }}>
                <span
                  className="px-2 mt-1"
                  style={{
                    display: "block",
                    float: "right",
                    backgroundColor: "black",
                    color: "white",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  {type_user2}
                </span>
              </div>
              <Home isAuthenticated={isAuthenticated} />
            </Route>

            <Route path="/signin">
              <SignIn
                settype_user2={settype_user2}
                setIsAuthenticated={setIsAuthenticated}
              />
            </Route>
            <Route path="/buy">
              <Nav type_user2={type_user2} />
              <div style={{ width: "100vw", height: "50px" }}>
                <span
                  className="px-2 mt-1"
                  style={{
                    display: "block",
                    float: "right",
                    backgroundColor: "black",
                    color: "white",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  {type_user2}
                </span>
              </div>
              <Form isAuthenticated={isAuthenticated} />
            </Route>
            <Route path="/add">
              <Nav type_user2={type_user2} />
              <div style={{ width: "100vw", height: "50px" }}>
                <span
                  className="px-2 mt-1"
                  style={{
                    display: "block",
                    float: "right",
                    backgroundColor: "black",
                    color: "white",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  {type_user2}
                </span>
              </div>
              <Add_pro isAuthenticated={isAuthenticated} />
            </Route>
            <Route path="/history">
              <Nav type_user2={type_user2} />
              <div style={{ width: "100vw", height: "50px" }}>
                <span
                  className="px-2 mt-1"
                  style={{
                    display: "block",
                    float: "right",
                    backgroundColor: "black",
                    color: "white",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  {type_user2}
                </span>
              </div>
              <All_team_table isAuthenticated={isAuthenticated} />
            </Route>
            <Route path="/reset">
              <Nav type_user2={type_user2} />
              <div style={{ width: "100vw", height: "50px" }}>
                <span
                  className="px-2 mt-1"
                  style={{
                    display: "block",
                    float: "right",
                    backgroundColor: "black",
                    color: "white",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  {type_user2}
                </span>
              </div>
              <Reset isAuthenticated={isAuthenticated} />
            </Route>
          </Switch>
          {/* <Footer/> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
