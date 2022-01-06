import React, {useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams, useNavigate } from 'react-router-dom';
import { editBlog, getBlog } from '../services/blogService';
import {toast} from "react-toastify"
function EditBlog() {

    const [content, setContent] = useState(null)
    const [title, setTitle] = useState()
    const id = useParams().id
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {
          const {data} = await getBlog(id)
          setTitle(data.title)
          setContent(data.content)
        }
        fetchData();
        
      },[]); 

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try
        {
            await editBlog({title,content},id)
            navigate("/blogs/"+ id)
        }
        catch(err)
        {
            const error  = err.response.data;
            toast.error(error.error)
        }
        
    }
    return (
        content &&
        <div>
        <h2>Editing Blog</h2>
        <form name="blog-form" onSubmit={(e) => handleOnSubmit(e)}>
            <div className="form-group mb-3">
                <label htmlFor='blog-title' className='mb-2'>Blog Title</label>
                <input type="text" className="form-control" id="blog-title" name="blog-title" placeholder="Title Of Blog" value={title} onChange={(e) => handleTitleChange(e)} />
            </div>


            <div className="form-group mb-3">
                <label className='mb-2'>Blog Content</label>
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData() || " ";
                       
                        setContent(data)
                     

                    }}
                    onBlur={(event, editor) => {
                        // console.log( 'Blur.', editor );
                    }}
                    onFocus={(event, editor) => {
                        // console.log( 'Focus.', editor );
                    }}
                />
            </div>

           

            <div className="form-group row mt-2">
                <div className="col-sm-10 col-md-2">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
            </div>
         

        </form>

    </div>
            
    )
}

export default EditBlog