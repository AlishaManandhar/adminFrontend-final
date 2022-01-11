import http from "./httpService";



const apiEndpoint = "http://localhost:5000/api/category/";

http.setToken(localStorage.getItem("token"));
export  function createCategory(request_data) {

  let result =  http.post(apiEndpoint ,request_data)
}

export  function getCategories() {
  let result =  http.get(apiEndpoint)
  return result
}

export  function getCategory(id) {
  let result = http.get(apiEndpoint + id)
  return result
}

export  function editCategory(request_data, id) {
  let result = http.put(apiEndpoint + id,request_data)
  return result
}



export  function deleteCategory(id) {
    let result = http.delete(apiEndpoint + id)
    return result
  }
  
