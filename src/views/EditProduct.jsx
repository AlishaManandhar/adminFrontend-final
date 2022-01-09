import React, { useState, useEffect } from 'react'

import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Dataset from '../components/common/Dataset';
import Input from "../components/common/Input";
import Radio from '../components/common/Radio';
import {getSubCategories} from "../services/subCategoryServices"
import { createProduct, getProduct,editProduct} from "../services/productServices"

function EditProduct() {

    const [basicData, setBasicData] = useState({
        name: "",
        regularPrice: 0,
        discountPercentage: 0,
        gender: "",
        isSale: "",
        description: "",
        material: "",
        warranty: "",
        categoryId: ""
    })
    const [variation, setVariation] = useState({
        color: "",
        size: "",
        quantity: 1
    })

    
    const [dimensions, setDimensions] = useState([])
    const [categories, setCategories] = useState([])


    const colors = ["red", "blue", "green", "yellow", "black", "pink", "purple","orange","brown"]
    const sizes = ["0-3 month", "4-6 month", "7-9 month", "10-12 month", "13-15 month", "16-18 month", "19-21 month", "21-24 month", "New Born", "Free Size"]
    const header = ["color", "size", "quantity", "action"]
    const warranty = ["None", "7days", "1month", "2 month", "6month", "1year"]
    const genderData = [{
        title: "Boys",
        value: "Boys"
    },
    {
        title: "Girls",
        value: "Girls"
    },
    {
        title: "Unisex",
        value: "Unisex"
    }
    ]

    const saleData = [{
        title: "Yes",
        value: "true"
    },
    {
        title: "No",
        value: "false"
    }]

    const findIndex = (array, size)=> {
        for(let i = 0;  i < array.length; i++)
        {
            if (array[i].size === size)
            {
                return i;
            }
        }
    }

    const id = useParams().id
    useEffect(() => {
        async function fetchData() {
          const {data} = await getSubCategories()
         setCategories(data)

         const {data: product} = await getProduct(id)
         
         const dim = []
         for (let i = 0; i < product.dimensions.length; i++)
         {
            
            
            for (let j = 0; j <product.dimensions[i].variations.length; j++)
            {
                
                dim.push({
                    size: product.dimensions[i].size,
                    color: product.dimensions[i].variations[j].color,
                    quantity: product.dimensions[i].variations[j].quantity,
                })
            }
        }
       
        setDimensions(dim)
        
         setBasicData({
             name:product.name,
             regularPrice: product.regularPrice,
             discountPercentage: product.discountPercentage,
             gender: product.gender,
             isSale: product.isSale === true ? "true" : "false",
             description: product.description,
             material: product.material,
             warranty: product.warranty,
             categoryId: product.categoryId.subCategoryName
         })
        }
        fetchData();
        
      },[]); 
  
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault()
      
        let  data = []
        let selectedSizes = []
        let index = -1; 
        for (let i = 0; i < dimensions.length; i++)
        {
            if (selectedSizes.includes(dimensions[i].size))
            {
                index = findIndex(data,dimensions[i].size )
                data[index].variations.push({
                    color: dimensions[i].color,
                        quantity: dimensions[i].quantity
                })
            }
            else
            {
                selectedSizes.push(dimensions[i].size)
                data.push({
                    size: dimensions[i].size,
                    variations: [{
                        color: dimensions[i].color,
                        quantity: dimensions[i].quantity
                    }]
                })
                
            }
        }
        if (basicData.name.length <= 5)
        {
            return toast.error("Product name must be at least 5 characters")
        }
        if (basicData.description <= 100)
        {
            return toast.error("Description must be at least 100 characters")
        }
        if (basicData.material <= 2)
        {
            return toast.error("Material must be at least 2 characters")
        }
        if (basicData.regularPrice <= 10)
        {
            return toast.error("Regular Price must be at least of Rs 10")
        }
        if (basicData.discountPercentage <= 0 || basicData.discountPercentage >75)
        {
            return toast.error("Discount Percentage must be positive and less than 75%")
        }
        if (basicData.gender === "")
        {
            return toast.error("Please Select  gender type")
        }
        if (basicData.isSale === "")
        {
            return toast.error("Please Select  isSale")
        }
        if (!warranty.includes(basicData.warranty))
        {
            return toast.error("Please Select valid warranty")
        }
        if (data.length === 0)
        {
            return toast.error("Please Select at least 1 variation")
        }
      

        index = -1
        for(let i = 0; i < categories.length; i++)
        {
            if (basicData.categoryId === categories[i].subCategoryName)
            {
                index =  i
                break
            }
        }
        if (index === -1)
        {
            toast.error("Please Select Available Categories")
            return null
        }

        const formData = new FormData()
        formData.append("name", basicData.name)
        formData.append("regularPrice", basicData.regularPrice)
        formData.append("discountPercentage", basicData.discountPercentage)
        formData.append("gender", basicData.gender)
        formData.append("isSale", basicData.isSale)
        formData.append("material", basicData.material)
        formData.append("warranty", basicData.warranty)
        formData.append("categoryId", categories[index]._id)
        formData.append("description", basicData.description)
        
       
        formData.append('dimensions', JSON.stringify(data))
    
  
        await editProduct(formData, id)

        navigate("/product")
        
    }
   

    const handlevariationChange = ({ currentTarget: input }) => {
        const data = { ...variation }
        data[input.name] = input.value
        setVariation(data)
    }

    const handleDataChange = ({ currentTarget: input }) => {
        const data = { ...basicData }
        data[input.name] = input.value
        setBasicData(data)
    }

    const handleAddVariation = () => {
        const { color, size } = variation
        const data = [...dimensions]

        if (colors.includes(color) && sizes.includes(size)) {
            const index = data.findIndex(el => el.color === color && el.size === size)
            if (index !== -1) {
                data[index].quantity = variation.quantity
            }
            else {
                data.push(variation)
            }
            setDimensions(data)
            setVariation({
                color: "",
                size: "",
                quantity: 0
            })
        }
        else {
            toast.error("Please select correct color or size")
        }
    }

    const handleRemoveVariation = (id) => {
        let data = [...dimensions]

        data = data.filter((el, index) => {
            return index !== id;
        })

        setDimensions(data)
    }

    const handleEditVariation = (id) => {
        
        setVariation({
            size: dimensions[id].size,
            color:dimensions[id].color,
            quantity: dimensions[id].quantity
        })
    }

    const renderdimensionss = () => {
        return (
            <>

            <div class="alert alert-secondary" role="alert">
                    Information about dimensionss
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {header.map(el => <th scope="col" key={el}>{el}</th>)}
                            </tr>
                        </thead>

                        <tbody>
                            {dimensions.map((el, index) => {
                                return (
                                    <tr>
                                        <td key={el.color + index}>{el.color}</td>
                                        <td key={el.size + index}>{el.size}</td>
                                        <td key={el.quantity + index}>{el.quantity}</td>
                                        <td> <i className="bi bi-pencil-square pe-3" onClick={() => handleEditVariation(index)}></i> <button type="button" className="btn-close" aria-label="Close" onClick={() => handleRemoveVariation(index)}></button></td>
                                    </tr>
                                )
                            })}
                        </tbody>


                    </table>
                </div>

            </>
        )
    }


    const renderVariation = () => {

        const { color, size, quantity } = variation
        return (
            <div className="row mb-3">
                <div className="col-sm-3">
                    <Dataset title="Color:" name="color" value={color} onChange={handlevariationChange} data={colors} />
                </div>

                <div className="col-sm-3">
                    <Dataset title="Size:" name="size" value={size} onChange={handlevariationChange} data={sizes} />
                </div>

                <div className="col-sm-3">
                    <Input type="number" title="Quantity:" placeholder="Quantity:" name="quantity" value={quantity} onChange={handlevariationChange} error="" />
                </div>
                <div className="col-sm-3">
                    <label htmlFor="action" className="form-label"> Action</label>
                    <br />
                    <button type="button" className="btn-success" onClick={handleAddVariation}>Add Variation</button>
                </div>
            </div>
        )
    }


    return (
        <div>
            <h2> Add Product</h2>
            <form name="product-form" onSubmit={(e) => handleOnSubmit(e)}>

                <Input type="text" title="Product name:" placeholder="Product name:" name="name" value={basicData.name} onChange={handleDataChange} error="" />

                <div className="mb-3 row">
                    <div className="col-sm-6">
                        <Input type="number" title="Regular Price:" placeholder="Regular Price:" name="regularPrice" value={basicData.regularPrice} onChange={handleDataChange} error="" />                        </div>
                    <div className="col-sm-6">

                        <label htmlFor="discountPercentage" className="form-label">Discount Percentage:</label>
                        <input type="number" className="form-control" name="discountPercentage" id="discountPercentage" value={basicData.discountPercentage} onChange={handleDataChange}
                            aria-describedby="discountHelp" />
                        <div id="discountHelp" className="form-text">Please enter dicount in percentage</div>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-6">
                        <Radio title="Gender" name="gender" onChange={handleDataChange}  selected = {basicData.gender} data={genderData} />
                    </div>
                    <div className="col-sm-6">
                        <Radio title="For Sale" name="isSale" onChange={handleDataChange}  selected = {basicData.isSale} data={saleData} />
                    </div>
                </div>

                
                <div className="mb-3 row">
                    <div className="col-sm-6">
                        <Input type="text" title="Material:" placeholder="Material:" name="material" value={basicData.material} onChange={handleDataChange} error="" />
                    </div>
                    <div className="col-sm-6">
                        <Dataset title="Warranty:" name="warranty" value={basicData.warranty} onChange={handleDataChange} error="" data={warranty} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-6">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" rows="3" name="description" value={basicData.description} onChange={handleDataChange}></textarea>
                    </div>
                    <div className="col-sm-6">
                        <Dataset title="Category:" name="categoryId" value={basicData.categoryId} onChange={handleDataChange} error="" data={categories} path="subCategoryName" />
                    </div>
                </div>

                <div className="row">
                <div className="col-sm-12 col-md-6">
                    {dimensions.length === 0 && (
                         <div className="alert alert-danger" role="alert">
                                You have not added any variations yet.
                        </div>
                    )}
               
                    {dimensions.length > 0 && renderdimensionss()}
                   </div>
                    <div className="col-sm-12 col-md-6">
                        {renderVariation()}

                    </div>
                    

                </div>


                <div className="form-group row mt-2 mb-2 justify-content-between">
                    <div className="col-sm-10 col-md-2">
                        <button type="submit" className="btn btn-primary">Add Product </button>
                    </div>
                </div>

            </form >

        </div >
    )
}

export default EditProduct