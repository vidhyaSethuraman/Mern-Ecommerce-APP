import React from 'react';
import '../styles/cart.css';
import CartItem from './CartItem';
import API from '../utils/api';
import { connect } from 'react-redux'


class Cart extends React.Component
{

    constructor(props) 
    { 
      super(props); 
      this.state = { 
         productdetails:[],
         products:[],
         totalamt:null,
         noOfItems:null,
         //images:[dress1,dress2,dress3,dress4,dress5,dress6,dress7,dress8],
         images:props.images,
         user:null
        }; 

        this.componentDidMount = this.componentDidMount.bind(this)
    } 


    updatestate(a,b,c,d)
    {
        this.setState({products: a,noOfItems:c,totalamt:b,user:d}, () => {
            console.log(this.state.products);
        }); 
        var productdetails=[];
        for (var i=0;i<this.state.products.length;i++)
        {
            let details = this.state.products[i];
            let idp = details.id-1;
           
            var pd= <CartItem  collectionName = {details.collectionName}  name ={details.name} price= {details.price}  id = {details.id} img = {this.state.images[idp]} />
           
            productdetails.push(pd);
        }

        this.setState({productdetails});
        
    }

    
        
    async componentDidMount()
    {
        var a,b,c,d;
        //var abc = axios.get('http://localhost:8000/cart',{params: {jwt}})

        let userData = await API.get('/cart')
        .then(function (response) 
        {
            a = response.data.prodet;
            b = response.data.totalamt;
            c = response.data.items; //no of items
            d = response.data.user;
            this.updatestate(a,b,c,d);

            console.log(a);

            if(d===false)
            {
                window.localation.href="/login";
            }

        }.bind(this))
        .catch(function (error) 
        {
            console.log(error);
            alert("bye");
        })
    
    }


    proceedbtn = async e => 
    {
        let jwt =localStorage.getItem('jwt');
        let userData = await API.get('http://localhost:8000/checkout')
        .then(function (response) {
           
            console.log(response.data.addr);
            if(response.data.addr===false)
            {
                window.location.href="/checkout/address/form"
            }
            else
            {
                console.log("Address present ppau");
                window.location.href="/checkout/address/conformation";
            }
            
        })
        .catch(function (error) {
            console.log("SERVER ERRORRRRRR " + error);
        });

    }


  render()
  {
    return (
        <>
            <div class="cart-box">
                <center>
                    <div class="cart-header">
                        <div>My Shopping Cart ({this.state.noOfItems})</div>
                        <div>Total Price:&#8377; {this.state.totalamt}</div>
                    </div>

                    <br/>
                
                    {this.state.productdetails}
        
                    
                    <button onClick={this.proceedbtn} class="buy-btn">Proceed to Buy</button>
                    
                </center>
            </div>

        </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      images: state.images
    }
  }
  
export default connect(mapStateToProps)(Cart)


