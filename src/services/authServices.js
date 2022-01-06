import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/auth/login";

export  function login(request_data) {

    let result =  http.post(apiEndpoint,request_data)
    return result
  
  }


