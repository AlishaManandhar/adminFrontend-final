import React, { useState, useEffect } from "react";

import { editCategory, getCategory } from "../services/categoryServices"
import { useParams, useNavigate } from 'react-router-dom';
import Input from "../components/common/Input";
import {toast} from "react-toastify"


function EditCategory() {

    const [category, setCategory] = useState({
        categoryName:""
    })

    const id = useParams().id
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
          const {data} = await getCategory(id)
          setCategory({
              categoryName: data.categoryName
          })
        }
        fetchData();
        
      },[]); 
  
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        try
        {
            await editCategory(category, id)
            navigate('/category');
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

                <Input type="text" title="Category Name" placeholder="Enter Category Name" name="categoryName" value={category.categoryName} onChange={handleOnChange} error="" />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={category.categoryName.length <=2 }
                >
                    <strong>Save Changes</strong>
                </button>
            </form>
        </div>
    </div>
    )
}

export default EditCategory