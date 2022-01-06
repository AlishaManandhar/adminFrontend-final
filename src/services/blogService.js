import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/blog/";

http.setToken(localStorage.getItem("token"));
export  function createBlog(request_data) {

  let result =  http.post(apiEndpoint,request_data)
  return result

}

export  function getBlogs() {

  let result =  http.get(apiEndpoint)
  return result

}

export  function getBlog(id) {
  let result = http.get(apiEndpoint + id)
  return result
}

export  function editBlog(request_data, id) {
  let result = http.put(apiEndpoint + id,request_data)
  return result
}



export  function deleteBlog(id) {
    let result = http.delete(apiEndpoint + id)
    return result
  }
  
