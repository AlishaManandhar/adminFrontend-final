import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getBlog } from '../services/blogService';
const HtmlToReactParser = require('html-to-react').Parser;
const renderHTML = new HtmlToReactParser();
const moment = require("moment")
function SingleBlog() {

    const [data, setData] = useState(null)
    const id = useParams().id
    useEffect(() => {

        async function fetchData() {
            const {data} = await getBlog(id)
            setData(data)
        
        }
        fetchData();
        return "Completed"
    },[]);

    const renderTags = () => {
        const blogTags = data.tags
        return blogTags.map(tag => {
            return (
                <span className="badge bg-light text-dark  me-3" key={tag}>{tag}</span>

            )
        })
    }


    return (
        data && (
            <div className="pt-3">
                
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <h1 className='text-center text-capitalize'>{data.title}</h1>
                    </div>

                </div>
                <section className="row justify-content-md-center">


                    <div className="col-sm-12 col-md-8 background-white py-3">
                        <div className="date-time mb-3">
                            <small className="text-muted">On {moment(data.updatedAt).format("MMM Do YY")}</small>
                        </div>
                        <div className="clearfix">
                            <img src={"http://localhost:5000/" + data.frontImage} className="col-sm-12 col-md-6 mb-3 me-3 rounded float-sm-start blog-image" width="100%" alt="..." />
                            <section className='blog-content'>
                                {renderHTML.parse(data.content)}
                            </section>
                            <div className="blog-tags mt-3">
                                <i className="bi bi-tags-fill">Tags</i>
                                {renderTags()}
                            </div>


                        </div>
                    </div>
                </section>
            </div>
        )
    )
}

export default SingleBlog