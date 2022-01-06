import React, { useState, useEffect } from "react";

import { editSubCategory,getCategory } from "../services/subCategoryServices"
import {getCategories} from "../services/categoryServices"

import { useParams, useNavigate } from 'react-router-dom';
import Input from "../components/common/Input";
import Dataset from "../components/common/Dataset";
import {toast} from "react-toastify"


function EditSubCategory() {

    const [category, setCategory] = useState({
        subCategoryName:"",
        parentCategoryId: ""
    })
    const [categories,SetCategories] = useState(null)


    const id = useParams().id
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
          let {data} = await getCategory(id)
          setCategory({
              subCategoryName: data.subCategoryName,
              parentCategoryId: data.parentCategoryId.categoryName
          })

          const {data: result} = await getCategories()
          SetCategories(result)

        }
        fetchData();
        
      },[]); 

  
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
       try {
            
        let request_data = { ...category}
        let index = -1
        for(let i = 0; i < categories.length; i++)
        {
            if (request_data.parentCategoryId === categories[i].categoryName)
            {
                index =  i
                request_data.parentCategoryId = categories[i]._id
                break
            }
        }
        if (index === -1)
        {
         
            toast.error("Please Select Available Categories")
            return null
        }

            const link = `/sub-category/${request_data.parentCategoryId}`
            const result =  await editSubCategory(request_data, id)
            navigate(link)
               
        }
        catch(err)
        {
            const error  = err.response.data;
            toast.error(error.error)
        }

    };

    const handleOnChange = ({ currentTarget: input }) => {
        
        const data = {...category}
        data[input.name] = input.value;

        setCategory(data)

    };

    

   


    return (
        <div className="row justify-content-center">
        <div className="col-sm-12 col-md-4">
            <form onSubmit={handleOnSubmit} >

            <Input type="text" title="Sub Category Name" placeholder="Sub - Category Name" name="subCategoryName" value={category.subCategoryName} onChange={handleOnChange} error="" />
                        {categories && <Dataset  title="Parent Category"  name="parentCategoryId" value={category.parentCategoryId} onChange={handleOnChange} error="" data={categories} path="categoryName" /> }
                        <button
                            type="submit"
                            className="btn btn-primary  col-12"
                        >
                            <strong>Save Changes</strong>
                        </button>
            </form>
        </div>
    </div>
    )
}

export default EditSubCategory