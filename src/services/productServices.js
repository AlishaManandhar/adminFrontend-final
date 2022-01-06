import http from "./httpService";



const apiEndpoint = "http://localhost:5000/api/product/";

http.setToken(localStorage.getItem("token"));
export  function createProduct(request_data) {

  let result =  http.post(apiEndpoint,request_data)
}

export  function getProducts() {
  let result =  http.get(apiEndpoint)
  return result
}

export  function getProduct(id) {
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
  
