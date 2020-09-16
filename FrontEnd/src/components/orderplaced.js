import React from 'react';
import '../styles/orderplaced.css';
import API from '../utils/api';
import { Link} from 'react-router-dom';



class OrderPlaced extends React.Component
{
    
   constructor() 
    { 
        super(); 
        this.state = { 
            delivary_date:null
        }; 
    
        this.componentDidMount = this.componentDidMount.bind(this)
    } 


   
  async componentDidMount()
  {
    //var abc = axios.get('http://localhost:8000/order/placed',{params: {jwt}})
    
    let userData = await API.get('/order/placed')
    .then(function (response) 
    {
        this.setState({delivary_date: response.data.delivary_date});

    }.bind(this))
    .catch(function (error) 
    {
        console.log(error);
        alert("error");
    })
   
  }

   


  render()
  {
    return (
        <>
           <div class="order-placed">
                <h2>Payment Successfull</h2>
                <h3>Order Placed</h3>
                <h4>Expected Delivary Date : {this.state.delivary_date}</h4>
                <p>Hope You Enjoyed the Shopping Expirience! :)</p>
                <Link to='/'><button>Home Page</button></Link>    
            </div> 
        </>
    );
  }
}



export default OrderPlaced;
