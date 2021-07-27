import React,{useState,useEffect} from 'react'
import '../css/products.css'

function Products(props) {
    const [color, setcolor] = useState("black")
    useEffect(() => {
      if(props.value=='0'){
          setcolor('red')
      }
      if(parseInt(props.value)>0 && parseInt(props.value)<10){
          setcolor('yellow');
      }
    }, [])

    return (
        <>
            <div className="product_card">
                <div className="num">{props.num}</div>
                <h4 className="px-3 bg-info" style={{"backgroundColor": "yellow",color: "white"}}>{props.name}</h4>
                <div className="qty bg-info" style={{'color': color}}>{props.value}</div>
            </div>
        </>
    )
}

export default Products
