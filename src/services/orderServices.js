import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/order/";

http.setToken(localStorage.getItem("token"));


export  function getOrders() {

  let result =  http.get(apiEndpoint)
  return result

}

export  function getOrder(id) {
  let result = http.get(apiEndpoint + "order-products/"+id)
  return result
}

export  function processOrder(id) {
    let result = http.put(apiEndpoint + "process/"+id)
    return result
}export  function deliverOrder(id) {
    let result = http.put(apiEndpoint + "deliver/"+id)
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
  
