import React from 'react';
import '../styles/addressform.css';



class AddressDetail extends React.Component
{    

  constructor()
  {
    super(); 
    this.SelectionHandler = this.SelectionHandler.bind(this);
  }
    
  SelectionHandler()
  {
    console.log(this.refs.address.value);
    var addr = this.refs.address.value;
    this.props.selectedAddr(addr);
  }


  render()
  {
    return (
        <>
            <div class="addr-checkout-items"> 
                <input type="radio" value={this.props.id} ref="address" name="addr" onChange={this.SelectionHandler} /> <span> { this.props.name} </span><br/><br/>
                <p>Contact No:  { this.props.mobileno} </p>
                <p> { this.props.details}</p>
                <p> { this.props.pincode} { this.props. city}  </p>
            </div>
        </>
    );
  }
  
}

export default AddressDetail;
