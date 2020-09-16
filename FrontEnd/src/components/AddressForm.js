import React from 'react';
import '../styles/addressform.css';
import API from '../utils/api';




class AddressForm extends React.Component
{    

  constructor() 
    { 
      super(); 
      this.state = { 
        name:null, mobileno:null,pincode:null,details:null,landmark:null,city:null,state:null,addrHome:null,addrOffice:null,defaulta:null
      }; 

        this.NewAddressHandler = this.NewAddressHandler.bind(this)
    } 

   NewAddressHandler =async  e => 
    {
       
        e.preventDefault();
        var mobileno = this.state.mobileno;
        var pincode =this.state.pincode;
        var details =this.state.details;
        var landmark =this.state.landmark;
        var city = this.state.city;
        var name = this.state.name;
        var state =this.state.state;
        var defaulta =this.state.defaulta;
        var addrHome =this.state.addrHome;
        var addrOffice =this.state.addrOffice;
       
       /*axios.post('http://localhost:8000/checkout/address?jwt=' +jwt, {
           name, mobileno,pincode,details,landmark,city,state,addrHome,addrOffice,defaulta,jwt
        })*/
        
        console.log(name, mobileno,pincode,details,landmark,city,state,addrHome,addrOffice,defaulta);

        let userData = await API.post('/checkout/address',{
          name, mobileno,pincode,details,landmark,city,state,addrHome,addrOffice,defaulta
        })
        .then(function (response) {
            console.log(response.data);
            window.location.href="/checkout/address/conformation";
            
        })
        .catch(function (error) {
            console.log(error);
        });

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
          <form  class="container-address" onChange={this.HandleInput.bind(this)}>
            <center>
                <h1>Contact Details</h1>
                <input type="text" name="name" placeholder="Name" required />
                <input type="text" name="mobileno" placeholder="Mobile No" required />
                <h1>Address</h1>           
                <input type="text" name="pincode" placeholder="Pincode" required />
                <input type="text" name="details" placeholder="Address (House No, Building, Street, Area)*" required />
                <input type="text" name="landmark" placeholder="Landmark" />
                <input type="text" name="city" placeholder="City / District" required />
                <input type="text" name="state" placeholder="State" required />
                <br />
                <span>Save address  </span>
                &nbsp;<input type="radio" name="addrHome" /> Home
                &nbsp;<input type="radio" name="addrOffice" /> Office
                <br /><br/>
                <input type="checkbox" name="defaulta" /> <span> &nbsp;Make this my Default Address</span>  <br /><br />
                <button type="submit" onClick={this.NewAddressHandler}>Proceed</button> 
            </center>
        </form>  
        </>
    );
  }
}



export default AddressForm;
