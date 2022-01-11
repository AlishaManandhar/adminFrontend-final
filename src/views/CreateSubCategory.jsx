import React from "react";
import Joi from "joi";
import { createSubCategory } from "../services/subCategoryServices"
import {getCategories} from "../services/categoryServices"

import Form from "../components/common/Form";
import Input from "../components/common/Input";
import Dataset from "../components/common/Dataset";


class CreateSubCategory extends Form {
    state = {
        data: {
            subCategoryName:"",
            parentCategoryId: ""
        },
        categories : null,
        errors: {},
    };



    schema = {
        subCategoryName: Joi.string().min(2).required(),
        parentCategoryId: Joi.string().min(2).required(),
    };

    async componentDidMount()
    {
        const {data} = await getCategories()
        this.setState({ categories :data })
        console.log(data)
    }

    doSubmit = async () => {

        try {
            
        let request_data = { ...this.state.data }
        let index = -1
        let errors = {}
        for(let i = 0; i < this.state.categories.length; i++)
        {
            if (request_data.parentCategoryId === this.state.categories[i].categoryName)
            {
                index =  i
                request_data.parentCategoryId = this.state.categories[i]._id
                break
            }
        }
        if (index === -1)
        {
            errors = {}
            errors['parentCategoryId'] = "Please Select Available Categories"
            this.setState({
                errors
            })
            return null
        }

            const link = `/sub-category/${request_data.parentCategoryId}`
            const result =  await createSubCategory(request_data)
            window.location = link
               
        }
        catch (err) {
           
                const error = err.response.data;
                const errors = {}
                if (error) {
                    errors['subCategoryName'] = error.message
                    this.setState({
                        errors
                    })
                }
            
            

        }
    };


    render() {
        return (
            <div className="row justify-content-center">
                <h2 className="text-center pb-3">Create Sub Category</h2>
                <div className="col-sm-12 col-md-4">
                    <form onSubmit={this.handleOnSubmit} >

                        <Input type="text" title="Sub Category Name" placeholder="Sub - Category Name" name="subCategoryName" value={this.state.data.subCategoryName} onChange={this.handleOnChange} error={this.state.errors["subCategoryName"]} />
                        {this.state.categories && <Dataset  title="Parent Category"  name="parentCategoryId" value={this.state.data.parentCategoryId} onChange={this.handleOnChange} error={this.state.errors["parentCategoryId"]}  data={this.state.categories} path="categoryName" />}
                        <button
                            type="submit"
                            className="btn btn-primary  col-12"
                            disabled={this.validate()}
                        >
                            <strong>Create Sub Category</strong>
                        </button>
                    </form>
                </div>
            </div>

        );
    }
}

export default CreateSubCategory;