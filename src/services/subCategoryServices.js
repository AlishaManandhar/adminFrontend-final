import http from "./httpService";



const apiEndpoint = "http://localhost:5000/api/sub-category/";

http.setToken(localStorage.getItem("token"));
export  function createSubCategory(request_data) {

  let result =  http.post(apiEndpoint,request_data)
  return result
}

export  function getSubCategories() {
  let result =  http.get(apiEndpoint)
  return result
}

export  function getCategory(id) {
    let result =  http.get(apiEndpoint + id)
    return result
  }
export  function getSubCategoryByParent(id) {
  let result = http.get(apiEndpoint + "parent/" +id)
  return result
}

export  function editSubCategory(request_data, id) {
  let result = http.put(apiEndpoint + id,request_data)
  return result
}



export  function deleteCategory(id) {
    let result = http.delete(apiEndpoint + id)
    return result
  }
  
