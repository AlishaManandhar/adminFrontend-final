import React, {useState,useEffect} from 'react'
import TableHead from '../components/TableHead'
import TableBody from '../components/TableBody'
import {getCategories, deleteCategory} from "../services/categoryServices"
import { toast } from 'react-toastify'
function Category() {

    const [categories, setCategories] = useState(null)

    async function fetchData(){
        const {data} = await getCategories()
        setCategories(data)
    }
    useEffect(() => {
        fetchData()
    },[])

 

    const header = ["Category Name","Actions"]

    const body = 
        ["categoryName"]
    
    const handleOnDelete = async (id) => {
           
            try{
                await deleteCategory(id)
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
        categories &&
        <div className="row">
            <div className="table-responsive">
                <table className='table table-striped'>
                    <TableHead header={header} />
                    <TableBody param={body} content = {categories} editLink="/category/edit" viewLink="/sub-category/"   onDelete={handleOnDelete} title="Delete Category" msg="Are you sure to delete this category" confirm="Delete"/>
                </table>
            </div>
           
        </div>)
}

export default Category