import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createBlog } from '../services/blogService';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function CreateBlog() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("")
    const [frontImage, setFrontImage] = useState("")
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        // console.log(e.target.value)
        setTitle(e.target.value)
    }

    const handleTagsChange = (e) => {
        setTags(e.target.value)
    }

    const handleOnFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFrontImage(file)
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        formData.append("frontImage", frontImage)
        formData.append("tags", tags.split(","))

        try
        {
            await createBlog(formData)
            navigate('/');
        }
        catch(err)
        {
            const error  = err.response.data;
            toast.error(error.error)
        }
        

    }
    return (
        <div>
            <h2>Create Blog</h2>
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
                        placeholder="Enter Blog ContentHere"

                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // console.log( { event, editor, data } );
                            setContent(data)
                            // console.log(content)

                        }}
                        onBlur={(event, editor) => {
                            // console.log( 'Blur.', editor );
                        }}
                        onFocus={(event, editor) => {
                            // console.log( 'Focus.', editor );
                        }}
                    />
                </div>

                <div className="input-group mb-3 pt-3">
                    <input type="file" className="form-control" id="frontImage" accept="image/x-png,image/gif,image/jpeg" onChange={handleOnFileChange} />
                    <label className="input-group-text" htmlFor="frontImage">Upload</label>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor='blog-tags' className='mb-2'>Blog Tags</label>

                    <input type="text" className="form-control" id="blog-tags" name="tags" placeholder="Enter tags seperated by commas" value={tags} onChange={(e) => handleTagsChange(e)} />
                </div>

                <div className="form-group row mt-2 mb-2">
                    <div className="col-sm-10 col-md-2">
                        <button type="submit" className="btn btn-primary">Create Blog </button>
                    </div>
                </div>
            </form >

        </div >
    )
}

export default CreateBlog