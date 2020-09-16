import React from 'react';
import '../styles/login.css';
import M from 'materialize-css';
import API from '../utils/api';


class SignUp extends React.Component
{


    constructor() 
    {
        super();
        this.state = { 
            emailError:null,
            passwordError:null,
            email:null,
            password:null
          }; 
        this.SignUpHandler = this.SignUpHandler.bind(this)
    } 


    updateError(emailError,passwordError)
    {
        console.log("inside update error");
        this.setState({emailError,passwordError});
    }

    SignUpHandler = async e => 
    {
        e.preventDefault();
        var a = this.state.email;
        var b = this.state.password;
        console.log(a,b);
       /*var results =axios.post('http://localhost:8000/signup', {
            email: a,
            password: b
        })*/

        var results = await API.post('/signup',{
            email: a,
            password: b
        })
        .then(function (response) {
            localStorage.setItem('jwt',response.data.jwt);
            window.location.href="/";
            
        })
        .catch((err) => {
            let error =err.response.data.errors;
            this.updateError(error.email,error.password);
        });

    }

    HandleInput = async e =>
    {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var abc = await this.setState({[name]:value});
    }

    LoginBtnHandler = () =>
    {
        window.location.href ='/login';
    }


  render()
  {
    return (
        <>
            <div class="container">

                <form onChange={this.HandleInput.bind(this)}>
                    <h2>Sign Up</h2>
                    
                    <input type="text" name="email" placeholder="Email"  />
                    <div>{this.state.emailError}</div>
                    <input type="password" name="password" placeholder="Password" />
                    <div>{this.state.passwordError}</div>
                    <button onClick={this.SignUpHandler}>Sign Up</button>
                </form>

                <h2>One Of Us?</h2>
                <button type="submit" onClick={this.LoginBtnHandler} >Log In</button>

            </div>

            <br/>
            <br/>
            
        </>
    );
  }
}



export default SignUp;
