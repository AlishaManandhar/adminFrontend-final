import React, {useState,useEffect} from 'react'
import TableHead from '../components/TableHead'
import TableBody from '../components/TableBody'
import {getProducts} from "../services/productServices"
import { toast } from 'react-toastify'
function Product() {

    const [products, setProducts] = useState(null)

    async function fetchData(){
        const {data} = await getProducts()
        setProducts(data)
    }
    useEffect(() => {
        fetchData()
    },[])

 

    const header = ["Product Name","Price","Discount","Actions"]

    const body = 
        ["name","regularPrice", "discountPercentage"]
    
    const handleOnDelete = async (id) => {
           
            try{
            //     await deleteCategory(id)
                fetchData()
            }
            catch(err)
            {
                if (err)
                {
                    const error = err.response.data
                    toast.error(error.error)
                }
            }
            
            
            
        }
    
    return (
        products &&
        <div className="row">
            <div className="table-responsive">
                <table className='table table-striped'>
                    <TableHead header={header} />
                    <TableBody param={body} content = {products} editLink="/category/edit"    onDelete={handleOnDelete} title="Delete Category" msg="Are you sure to delete this category" confirm="Delete"/>
                </table>
            </div>
           
        </div>)
}

export default Product