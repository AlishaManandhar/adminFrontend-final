
import React from 'react'
import {Link} from "react-router-dom"
import Actions from './Action'
function TableBody(props){
    const renderLink = (id, key) => {
        if (props.viewLink)
        {
            return <Link to={`${props.viewLink}${id}`}>{key}</Link>
        }
        else
        {
            return key
        }
    }
    const renderBody = props.content.map(el => {
        return(
            <tr key={el._id}> 
            {props.param.map(key => <td key={el._id + key}> {renderLink(el._id, el[key])}</td>) }
            <Actions editLink={`${props.editLink}/${el._id}`} onDelete={props.onDelete}  id={el._id}  title={props.title} content={props.msg} confirm={props.confirm}/>
            </tr>
        )
    }
    )
    return (
        <tbody>
    
                {renderBody}
            
        </tbody>
    )
}

export default TableBody