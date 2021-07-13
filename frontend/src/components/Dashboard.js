import React from 'react'
import '../css/dashboard.css'

function Dashboard() {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-4"><div className="bg-success stock_round py-4">255</div><div>Stock</div></div>
                    <div className="col-4"><div className="bg-success stock_round py-4">55</div><div>Last Purchase</div></div>
                    <div className="col-4"><div className="bg-success date_round py-4">12-10-2021</div><div>Last Updated</div></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
