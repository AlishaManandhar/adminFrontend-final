
import React from 'react'
import {Link} from "react-router-dom"

function TableHead(props){
    const renderHead = props.header.map(el => <th scope="col" key={el}>{el}</th>)
    return (
        <thead>
            <tr key="table-head">
                {renderHead}
            </tr>
        </thead>
    )
}

export default TableHead