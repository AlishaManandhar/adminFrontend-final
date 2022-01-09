
import Joi from "joi";
import { login } from "../services/authServices"

import Form from "../components/common/Form";
import Input from "../components/common/Input";



class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).required(),
  };

  doSubmit = async () => {

    let request_data = { ...this.state.data }
    try {
      const result = await login(request_data)
      // console.log(result)
      const token = result.token
    //   const username = result.data.firstname + " " + result.data.lastname
      localStorage.setItem('token', token)
      localStorage.setItem('userId', result.data._id)
    
  
      window.location = "/"

    }
    catch (e) {

      const error  = e.response.data;
      const errors = {}
      if (error) {
        errors['password'] = error.password
        this.setState({
          errors
        })
      }

    }
  };

  async componentDidMount(){
    if (localStorage.getItem("token"))
    {
        window.location = "/"
    }
  
  }

  render() {
    return (
     
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-4">
            <form onSubmit={this.handleOnSubmit} >
                
                <Input type="email" title="Email" placeholder="Enter Email Here" name="email" value={this.state.data.email}   onChange={this.handleOnChange} error={this.state.errors["email"]}/>
                <Input type="password" title="Password" placeholder="Enter Password Here" name="password" value={this.state.data.password} error="Wrong Password"  onChange={this.handleOnChange} error={this.state.errors["password"]} />
                <button
              type="submit"
              className="btn btn-primary  col-12"
              disabled={this.validate()}
            >
              <strong>Login</strong>
            </button>
</form>
            </div>
        </div>
    </div>
    );
  }
}

export default Login;