import React, {useState,useEffect} from 'react'
import TableHead from '../components/TableHead'
import TableBody from '../components/TableBody'
import {getSubCategoryByParent, deleteCategory} from "../services/subCategoryServices"

import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom';


function SubCategory() {

    const [categories, setCategories] = useState(null)
    const id = useParams().id
    const navigate = useNavigate()
    async function fetchData(){
        const {data} = await getSubCategoryByParent(id)
        setCategories(data)
    }
    useEffect(() => {
        fetchData()
    },[])

 

    const header = ["Sub-Category Name","Actions"]

    const body = 
        ["subCategoryName"]
    
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
            <h2 className="text-center pb-3">Sub Category </h2>
            <div className="table-responsive">
                <table className='table table-striped'>
                    <TableHead header={header} />
                    <TableBody param={body} content = {categories} editLink="/sub-category/edit"   onDelete={handleOnDelete} title="Delete Category" msg="Are you sure to delete this category" confirm="Delete"/>
                </table>
            </div>
           
        </div>)
}

export default SubCategory