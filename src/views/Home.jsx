import React, {useState,useEffect} from 'react'
import CardComponent from "../components/CardComponent"
import { getBlogs } from '../services/blogService'
function Home() {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function fetchData(){
                const {data} = await getBlogs()
                setBlogs(data)
        }
        fetchData()
    },[])

    const renderBlogs = () => {
        return blogs.map(blog=> {
        return (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-2"  key = {blog._id}>
                <CardComponent  id= {blog._id} title={blog.title} image={`http://localhost:5000/${blog.frontImage}`} time={blog.createdAt} />
            </div>
        )
    })
}
     
    return (
        blogs.length > 0 &&
        <div className="row">
            {renderBlogs()}
            {renderBlogs()}
            {renderBlogs()}
            {renderBlogs()}
        </div>)
}

export default Home