import React, { useMemo, useState, useEffect } from 'react'
import {useTable, useRowSelect,useSortBy,useGlobalFilter} from 'react-table'
import MOCk_DATA from './MOCK_DATA.json'
import {COLUMNS} from './Columns'
import { Checkbox } from './Checkbox'
// import { GlobalFilter } from './GolbalFilter'
import '../Styles/table.css'
import {RiChatHistoryFill} from 'react-icons/ri'
import { Redirect } from 'react-router'




function All_team_table(props) {
  const [product_json, setproduct_json] = useState({"good": "yes"});
  const [all_p_data, setall_p_data] = useState({"empty": "null"})
  const [his, sethis] = useState([{},{}])
  const [loading, setloading] = useState(true)
  const [controler, setcontroler] = useState(0)

  var p_j;
  var p_dt;
  
  
  useEffect(() => {
   
      var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status==200){
        console.log(this.responseText);
        setall_p_data(JSON.parse(this.responseText));
        p_j = JSON.parse(this.responseText);
        sethis(p_j.History);
        console.log("history ",p_j.History)
        // var p_j_keys = p_j.keys
        setproduct_json(p_j.all_Products);
        setloading(false);
      }
    }
    xhttp.open("POST","http://localhost:3000/products/get",true);
    xhttp.setRequestHeader('Content-Type',"application/json");
    xhttp.send(JSON.stringify({_id: "mark11"}));
   
},[])




    const columns = useMemo(()=>COLUMNS, [])
    // const data = useMemo(()=>MOCk_DATA, [])

    
    const data = useMemo(()=>his, [his])

     

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        //for checkbox
        state,
        selectedFlatRows,
        // setGlobalFilter
    } = useTable({
        columns,
        data
        
    }, 
    
    //for checkbox
   
    // useGlobalFilter,
    useSortBy,
    // useRowSelect,
    // (hooks) =>  {
    //     hooks.visibleColumns.push(columns => [
    //       // Let's make a column for selection
    //       {
    //         id: 'selection',
    //         // The header can use the table's getToggleAllRowsSelectedProps method
    //         // to render a checkbox
    //         Header: ({ getToggleAllRowsSelectedProps }) => (
    //           <div>
    //             <Checkbox {...getToggleAllRowsSelectedProps()} />
    //           </div>
    //         ),
    //         // The cell can use the individual row's getToggleRowSelectedProps method
    //         // to the render a checkbox
    //         Cell: ({ row }) => (
    //           <div>
    //             <Checkbox {...row.getToggleRowSelectedProps()} />
    //           </div>
    //         ),
    //       },
        
    //       ...columns,
    //     ])
    //   }
    )

    // const { globalFilter} = state

    if (!props.isAuthenticated) {
      console.log('unauthenticated.............');
      return <Redirect to='/signin' />;
    }

    else if(loading){
      return(
        <h1>loading....</h1>
      )
    } 

    else{
       return (
        <>
        {/* <GlobalFilter filter ={globalFilter} setFilter={setGlobalFilter}/> */}
  <h4 className="mt-3 px-1" style={{"textAlign": "left"}}><RiChatHistoryFill/> History</h4>

        <table className="table mt-3" {...getTableProps()}>
  <thead className="thead-dark text-white">
    {headerGroups.map((headerGroups) => (
        <tr {...headerGroups.getHeaderGroupProps()} className="bg-success text-white">
            {headerGroups.headers.map((column)=> (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽': ' 🔼'): ''}</span></th>
            ))}
        </tr>
    ))}
  </thead>
  <tbody {...getTableBodyProps}>
   {rows.map((row) => {
       prepareRow(row)
       return(
           <tr {...row.getRowProps()}>
               {row.cells.map((cell) => {
                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
               })}
           </tr>
       )
   })}
  </tbody>
</table>

        </>
    )
    }

   
}

export default All_team_table
