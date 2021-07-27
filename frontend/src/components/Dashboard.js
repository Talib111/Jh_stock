import React from 'react'
import '../css/dashboard.css'
import {AiOutlineFieldTime} from 'react-icons/ai'
import {RiNumbersFill} from 'react-icons/ri'
import {FaCartArrowDown} from 'react-icons/fa'

function Dashboard(props) {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-4"><div className="stock_round py-4" style={{backgroundColor: '#44B9E5'}}>{props.total_Stock}</div><div><RiNumbersFill/> Total Product</div></div>
                    <div className="col-4"><div className="stock_round py-4" style={{backgroundColor: '#44B9E5'}}>{props.last_Purchased}</div><div><FaCartArrowDown/> Last Purchased</div></div>
                    <div className="col-4"><div className="date_round py-4" style={{backgroundColor: '#44B9E5'}}>{props.last_Updated_Date}</div><div><AiOutlineFieldTime color={"black"}/> Last Pur. Date</div></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
