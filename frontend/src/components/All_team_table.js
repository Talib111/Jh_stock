import React, { useMemo, useState, useEffect } from 'react'
import {useTable, useRowSelect,useSortBy,useGlobalFilter} from 'react-table'
import MOCk_DATA from './MOCK_DATA.json'
import {COLUMNS} from './Columns'
import { Checkbox } from './Checkbox'
// import { GlobalFilter } from './GolbalFilter'
import '../Styles/table.css'


function All_team_table() {
  const [product_json, setproduct_json] = useState({"good": "yes"});
  const [all_p_data, setall_p_data] = useState({"empty": "null"})
  const [loading, setloading] = useState(true)

  var p_j;
  
  
  useEffect(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status==200){
        console.log(this.responseText);
        setall_p_data(JSON.parse(this.responseText));
        p_j = JSON.parse(this.responseText);
        // var p_j_keys = p_j.keys
        setproduct_json(p_j.all_Products);
      }
    }
    xhttp.open("POST","http://localhost:3000/products/get",true);
    xhttp.setRequestHeader('Content-Type',"application/json");
    xhttp.send(JSON.stringify({_id: "mark11"}));
},[])

    const columns = useMemo(()=>COLUMNS, [])
    const data = useMemo(()=>MOCk_DATA, [])
    // const data = useMemo(()=>all_p_data.History, [])

     

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
    useRowSelect,
    (hooks) =>  {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <Checkbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
        
          ...columns,
        ])
      }
    )

    // const { globalFilter} = state

    return (
        <>
        {/* <GlobalFilter filter ={globalFilter} setFilter={setGlobalFilter}/> */}
        <table class="table mt-2" {...getTableProps()}>
  <thead class="thead-dark">
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
{/* to show checkbox selected row */}
<pre>
        <code>
          {JSON.stringify(
            {
            //   selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
        </>
    )
}

export default All_team_table
