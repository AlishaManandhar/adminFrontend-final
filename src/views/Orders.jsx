import React, { useState, useEffect } from 'react'


import { toast } from 'react-toastify'
import { paginate } from "../utils/paginate"
import Pagination from '../components/common/Paginate'
import { getOrders } from '../services/orderServices'
import moment from 'moment'
import { Link } from 'react-router-dom'
import PendingOrders from './PendingOrders'
import ProcessedOrders from '../components/ProcessedOrders'
import ShippedOrders from '../components/ShippedOrders'

function Order() {

    const [orders, setOrders] = useState(null)
    const [status,setStatus] = useState("Pending")
    async function fetchData() {
        const { data } = await getOrders()
        setOrders(data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    const [page, setPage] = useState({
        pageSize: 6,
        currentPage: 1
    })

    const handlePageChange = (pageNo) => {
        const data = { ...page }
        data.currentPage = pageNo
        setPage(data)
    };

    const  handleOrder = (id) => {
            setStatus(id)
    }
      
    const getPagedData = () => {
        const { pageSize, currentPage } = page
        const allOrders = orders.filter(el => el.orderStatus === status)

        return paginate(allOrders, currentPage, pageSize);
    };
    return (
        <>
        <div className="text-center">
<button type="button" class="btn btn-primary pe-3 me-3" onClick = {() => handleOrder("Pending")}>Pending Orders</button>
        <button type="button" class="btn btn-info pe-3 me-3" onClick={() => handleOrder("Processing")}>Processing  Orders</button>
        <button type="button" class="btn btn-success pe-3 me-3" onClick={() => handleOrder("Shipped")}>Shipped  Orders</button>
        </div>
        <div className="orders">
            {orders && status === "Pending" && <PendingOrders data={getPagedData()} />}
        {orders && status === "Processing" && <ProcessedOrders data={getPagedData()} />}
        {orders && status === "Shipped" && <ShippedOrders data={getPagedData()} />}
        </div>
        
        
       </>
        )
}

export default Order