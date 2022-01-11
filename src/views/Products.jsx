import React, { useState, useEffect } from 'react'
import TableHead from '../components/TableHead'
import TableBody from '../components/TableBody'
import { getProducts, deleteProduct } from "../services/productServices"
import { toast } from 'react-toastify'
import { paginate } from "../utils/paginate"
import Pagination from '../components/common/Paginate'

function Product() {

    const [products, setProducts] = useState(null)

    async function fetchData() {
        const { data } = await getProducts()
        setProducts(data)
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

    const header = ["Product Name", "Price", "Discount", "Actions"]

    const body =
        ["name", "regularPrice", "discountPercentage"]

    const handleOnDelete = async (id) => {

        try {
            await deleteProduct(id)
            fetchData()
        }
        catch (err) {
            if (err) {
                const error = err.response.data
                toast.error(error.error)
            }
        }
    }
    const getPagedData = () => {
        const { pageSize, currentPage } = page
        const allProduct = products

        return paginate(allProduct, currentPage, pageSize);
    };
    return (
        products &&
        <div className="row">
            <h2 className="text-center pb-3">All Products</h2>
            <div className="table-responsive">
                <table className='table table-striped'>
                    <TableHead header={header} />
                    <TableBody param={body} content={getPagedData()} editLink="/product/edit" onDelete={handleOnDelete} title="Delete Product" msg="Are you sure to delete this product" confirm="Delete" />
                </table>
            </div>
            <Pagination
                pageSize={page.pageSize}
                currentPage={page.currentPage}
                itemsCount={products.length}
                onPageChange={handlePageChange}
            />

        </div>)
}

export default Product