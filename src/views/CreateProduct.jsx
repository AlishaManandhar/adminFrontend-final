import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Dataset from '../components/common/Dataset';
import Input from "../components/common/Input";
import Radio from '../components/common/Radio';
import {getSubCategories} from "../services/subCategoryServices"
import { createProduct} from "../services/productServices"

function CreateProduct() {

    const [basicData, setBasicData] = useState({
        name: "",
        regularPrice: 0,
        discountPercentage: 0,
        gender: "",
        isSale: "",
        description: "",
        material: "",
        warranty: "",
        categoryId: "",
        tags: ""
    })
    const [variation, setVariation] = useState({
        color: "",
        size: "",
        quantity: 1
    })

    const [frontImage, setFrontImage] = useState(null)
    const [images, setImages] = useState(null)
    const [dimensions, setDimensions] = useState([])
    const [categories, setCategories] = useState([])

    const colors = ["red", "blue", "green", "yellow", "black", "pink", "purple","sky","white","orange","grey","brown"]
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

    useEffect(() => {
        async function fetchData() {
          const {data} = await getSubCategories()
         setCategories(data)
        }
        fetchData();
        
      },[]); 
  
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        console.log(images)
        console.log(frontImage)
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
        if (frontImage === null)
        {
            return toast.error("Please upload front Image ")
        }
        if (images === null)
        {
            return toast.error("Please upload Images ")
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
        
        for (let key of Object.keys(images)) {
            formData.append('images', images[key])
        }

     
            formData.append(`dimensions`, JSON.stringify(data));
        
        for (const keys of Object.keys(frontImage)) {
                formData.append('frontImage', frontImage[keys])
        }
        await createProduct(formData)

        navigate("/product")
        
    }
    const handleOnFileChange = (e) => {
        const name = e.currentTarget.name
        const file = e.target.files
        if (file) {
            if (name === "frontImage")
                setFrontImage(file)
            else {
                setImages(file)
            }
        }
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
                                        <td> <i className="bi bi-pencil-square pe-3" onClick={() => handleEditVariation(index)}></i>  <button type="button" className="btn-close" aria-label="Close" onClick={() => handleRemoveVariation(index)}></button></td>
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
                        <Radio title="Gender" name="gender" selected = {basicData.gender} onChange={handleDataChange} data={genderData} />
                    </div>
                    <div className="col-sm-6">
                        <Radio title="For Sale" name="isSale" selected = {basicData.isSale} onChange={handleDataChange} data={saleData} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-6">
                        <label htmlFor="formFile" className="form-label">Front Image</label>
                        <input className="form-control" name="frontImage" type="file" id="formFile" onChange={handleOnFileChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="formFileMultiple" className="form-label">Images</label>
                        <input className="form-control" name="images" type="file" id="formFileMultiple" onChange={handleOnFileChange} multiple />
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

export default CreateProduct