import React from 'react'
import '../css/header.css'

function Header() {

    const buy_products = ()=>{
       window.location.href="/form";
     }
     const add_products = ()=>{
        window.location.href="/add";
     }
     const show_history = ()=>{
        window.location.href="/history";
     }
     const logout = ()=>{
        localStorage.removeItem('@auth_token')
       window.location.href="/signin";
     }
    return (
        <>
            {/* <div className="header"><h5>Jharkhand Aushadhalaya</h5></div> */}
            <div className="container">
                <div className="row">
                    <div className="col-3 bg-dark border text-white" onClick={buy_products}>Buy</div>
                    <div className="col-3 bg-dark border text-white" onClick={add_products}>Add</div>
                    <div className="col-3 bg-dark border text-white" onClick={show_history}>History</div>
                    <div className="col-3 bg-dark border text-white" onClick={logout}>Logout</div>
                </div>
            </div>
        </>
    )
}

export default Header
