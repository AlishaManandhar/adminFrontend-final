import React, {useState,useEffect} from 'react'
import TableHead from '../components/TableHead'
import TableBody from '../components/TableBody'
import {deleteBlog, getBlogs} from "../services/blogService"
function AdminHome() {

    const [blogs, setBlogs] = useState(null)

    async function fetchData(){
        const {data} = await getBlogs()
        setBlogs(data)
}
    useEffect(() => {
        fetchData()
    },[])

 

    const header = ["Title","Actions"]

    const body = 
        ["title"]
    
    const handleOnDelete = async (id) => {
           
            await deleteBlog(id)
            fetchData()
            
        }
    
    return (
        blogs &&
        <div className="row">
            <div className="table-responsive">
                <table className='table table-striped'>
                    <TableHead header={header} />
                    <TableBody param={body} content = {blogs} editLink="/blogs/edit-blog" viewLink="/blogs/"  onDelete={handleOnDelete} title="Delete Blog" msg="Are you sure to delete this blog" confirm="Delete"/>
                </table>
            </div>
           
        </div>)
}

export default AdminHome