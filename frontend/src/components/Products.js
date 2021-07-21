import React from 'react'
import '../css/products.css'

function Products(props) {
    return (
        <>
            <div className="product_card">
                <div className="num">{props.num}</div>
                <h4 className="px-3 bg-info" style={{"backgroundColor": "yellow",color: "white"}}>{props.name}</h4>
                <div className="qty bg-info">{props.value}</div>
            </div>
        </>
    )
}

export default Products
