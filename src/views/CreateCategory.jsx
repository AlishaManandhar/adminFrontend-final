import React from "react";
import Joi from "joi";
import { createCategory } from "../services/categoryServices"

import Form from "../components/common/Form";
import Input from "../components/common/Input";



class CreateCategory extends Form {
    state = {
        data: {
            categoryName: "",
        },
        errors: {},
    };

    schema = {
        categoryName: Joi.string().min(2).required(),
    };

    doSubmit = async () => {

        let request_data = { ...this.state.data }
        try {
            const result = await createCategory(request_data)
            window.location = "/category"
               
        }
        catch (err) {

            const error = err.response.data;
            const errors = {}
            if (error) {
                errors['categoryName'] = error.message
                this.setState({
                    errors
                })
            }

        }
    };


    render() {
        return (
            <div className="row justify-content-center">
                <h2 className="text-center pb-3">Create Category</h2>
                <div className="col-sm-12 col-md-4">
                    <form onSubmit={this.handleOnSubmit} >

                        <Input type="text" title="Category Name" placeholder="Enter Category Name" name="categoryName" value={this.state.data.categoryName} onChange={this.handleOnChange} error={this.state.errors["categoryName"]} />
                        <button
                            type="submit"
                            className="btn btn-primary  col-12"
                            disabled={this.validate()}
                        >
                            <strong>Create Category</strong>
                        </button>
                    </form>
                </div>
            </div>

        );
    }
}

export default CreateCategory;