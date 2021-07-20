import React from 'react'
import '../css/dashboard.css'

function Dashboard(props) {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-4"><div className="stock_round py-4" style={{backgroundColor: '#44B9E5'}}>{props.total_Stock}</div><div>Stock</div></div>
                    <div className="col-4"><div className="stock_round py-4" style={{backgroundColor: '#44B9E5'}}>{props.last_Purchased}</div><div>Last Purchased</div></div>
                    <div className="col-4"><div className="date_round py-4" style={{backgroundColor: '#44B9E5'}}>{props.last_Updated_Date}</div><div>Last Updated</div></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
