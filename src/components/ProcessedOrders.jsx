import React, { useState, useEffect } from 'react'
import Pagination from '../components/common/Paginate'
import moment from 'moment'
import { Link } from 'react-router-dom'
import TableHead from '../components/TableHead'

function ProcessedOrders(props) {

    
    const header = ["Order Number", "Total", "Shipping Price", "Date Ordered", "Status","Actions"]
    return ( 
        <div className="row">
           <div className="alert alert-info text-center " role="alert">
                <b>Processed Orders</b>
            </div>
            <div className="table-responsive">
                <table className='table'>
                    <TableHead header={header} />
                    <tbody>
                        {props.data.map(el => {
                            return (
                                <tr>
                                    <td>{el._id}</td>
                                    <td>{el.total}</td>
                                    <td>{el.shippingPrice}</td>
                                    <td>{moment(el.createdAt).format("MMM Do YY")}</td>
                                    <td><h5><span class="badge rounded-pill bg-primary">{el.orderStatus}</span> </h5></td>
                                    <td><Link to={`/order/${el._id}`}  className="text-dark"><i className="bi bi-eye"></i></Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default ProcessedOrders