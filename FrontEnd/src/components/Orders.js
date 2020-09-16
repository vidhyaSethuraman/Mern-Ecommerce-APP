import React from 'react';
import API from '../utils/api';
import '../styles/orders.css';
import { Link} from 'react-router-dom';


const axios = require('axios').default;


class Orders extends React.Component
{
    
   constructor() 
    { 
        super(); 
        this.state = { 
            productDetails:[] ,
            order_date:null,
            total_amt:null ,
            shipping_status_time:null,
            shipping_status:null ,
            _id:null
            }; 
    
        this.componentDidMount = this.componentDidMount.bind(this)
        this.OrderProductDetails = this.OrderProductDetails.bind(this)
    } 


   
  async componentDidMount()
  {
    //var abc = axios.get('http://localhost:8000/order/tracking',{params: {jwt}})
    let userData = await API.get('/order/tracking')
    .then(async function (response) 
    {
        var orderdetails = response.data.orderdetails;
        var {total_amt , shipping_status_time, shipping_status ,_id} =  orderdetails;
        var productDetails = response.data.prodet;
        console.log("Product details" + productDetails);
        var order_date = response.data.order_date;
        var ab =await this.setState({total_amt , shipping_status_time, shipping_status ,_id,order_date});
        this.OrderProductDetails(productDetails);
        
    }.bind(this))
    .catch(function (error) 
    {
        console.log(error);
        alert("error");
    })
   
  }

  OrderProductDetails(pdss)
  {
    console.log("IN ORDER PRODUCT DETAILSSS");
    var prodDetails=[]
    var pds = pdss;
    console.log("PDS" +pds);
    for(var i=0 ;i<pds.length;i++)
    {
        let product = pds[i];
         let pd = <li> 
            <h5>{product.name }</h5>
            <h6>Price:&#8377; { product.price }</h6>
            <button>Buy Again</button>
            <br/><br/>
        </li>;
        prodDetails.push(pd);
        //console.log(product)
     }

     this.setState({productDetails:prodDetails});
  }   


  render()
  {
    return (
        <>
           <center><h2 class="order-page-heading">Your Orders</h2></center>
                <div class="container-order-box">
                    <div class="order-details">
                        <div>
                            <h5>Order placed</h5>
                            <h6> {this.state.order_date} </h6>
                        </div>
                        <div>
                            <h5>Total</h5>
                            <h6>&#8377; {this.state.total_amt} </h6>
                        </div>
                        <div>
                            <h5>Status</h5>
                            <h6>{this.state.shipping_status_time} : {this.state.shipping_status} </h6>
                        </div>
                        <div>
                            <h5>Order #</h5>
                            <h6>{this.state._id}</h6>
                        </div>
                        
                    </div>
                    <div class="order-product-details">
                        <div>
                            <ol>
                            {this.state.productDetails}
                            </ol>
                        </div>
                        <div >
                            <button class="order-box-btn">Cancel Order</button>
                            <button class="order-box-btn">Review order</button>
                        </div>
                    </div>
                </div> 
        </>
    );
  }
}



export default Orders;
