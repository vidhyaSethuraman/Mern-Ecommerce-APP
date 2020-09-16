import React from 'react';
import '../styles/login.css';
import API from '../utils/api';



class Login extends React.Component
{


    constructor() 
    { 
      super(); 
      this.state = { 
         emailError : null,
         passwordError: null,
         email:null,
         password:null
      }; 

        this.LoginHandler = this.LoginHandler.bind(this)
    } 
    


    updateError(emailError,passwordError)
    {
        console.log("inside update error");
        this.setState({emailError,passwordError});
    }

    LoginHandler =async  e => 
    {
        e.preventDefault();
        var a = this.state.email;
        var b = this.state.password;
        var results =await API.post('/login', {
            email: a,
            password: b
        })
        .then(function (response) {
            console.log("Login handlerrrr" +response.data);
            localStorage.setItem('jwt',response.data.jwt);
            window.location.href="/";
        })
        .catch((err) => {
            let error =err.response.data.errors;
            this.updateError(error.email,error.password);
        });

    }

    SignBtnHandler = () =>
    {
        window.location.href ='/signup';
    }
    HandleInput = async e =>
    {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var abc = await this.setState({[name]:value});
    }


  render()
  {
    return (
        <>
            <div class="container">

                <form onChange={this.HandleInput.bind(this)}>
                    <h3>Login</h3>
                    
                    <input type="text" name="email" placeholder="Email" />
                    <div>{this.state.emailError}</div>
                    
                    <input type="password" name="password" placeholder="Password" />
                    <div>{this.state.passwordError}</div>

                    <button onClick={this.LoginHandler}>login</button>
                </form>

                <h3>New here?</h3>
                <button type="submit" onClick={this.SignBtnHandler} >Create Account</button>
                

            </div>
        </>
    );
  }
}



export default Login;
