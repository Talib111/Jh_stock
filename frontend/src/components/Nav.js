import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {FaCartArrowDown} from 'react-icons/fa'
import {AiOutlineAppstoreAdd} from 'react-icons/ai'
import {RiChatHistoryFill} from 'react-icons/ri'
import {CgLogOut} from 'react-icons/cg'
import {MdDeleteForever} from 'react-icons/md'


function Nav({type_user2}) {

  const [vis, setvis] = useState("block");
 
  useEffect(() => {
    if(type_user2!='mac52@gmail.com'){
      setvis("none");
    }
  }, [])

  const logout = ()=>{
    localStorage.removeItem('@auth_token');
    localStorage.removeItem('@type_user');
   window.location.href="/signin";
 }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light shadow" style={{"backgroundColor": "#089c66"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#" style={{"color": "white","fontWeight": "600"}}>Jh Stock</a>
    <button className="navbar-toggler" style={{"backgroundColor": "white"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link text-white" style={{"textAlign": "left"}} to="/"><FaHome/> Home</Link>

        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" style={{"textAlign": "left"}} to="/buy"><FaCartArrowDown/> Buy Product</Link>

        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" style={{"textAlign": "left","display": vis}} to="/add"><AiOutlineAppstoreAdd/> Add Product</Link>

        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" style={{"textAlign": "left"}} to="/history"><RiChatHistoryFill/>History</Link>

        </li>
        <li className="nav-item">
        <Link className="nav-link text-white" style={{"textAlign": "left","display": vis}} to="/reset"><MdDeleteForever/> Reset</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" style={{"textAlign": "left"}} onClick={logout}><CgLogOut/> Logout</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}

export default Nav
