import React from 'react';
import '../styles/cart.css';
import API from '../utils/api';
import WishListItem from './wishlistItems';
import { connect } from 'react-redux'


class Wishlist extends React.Component
{

    constructor(props) 
    { 
      super(props); 
      this.state = { 
         productdetails:[],
         products:[],
         noOfItems:null,
         //images:[dress1,dress2,dress3,dress4,dress5,dress6,dress7,dress8],
         images:props.images,
         user:null
        }; 

        this.componentDidMount = this.componentDidMount.bind(this)
    } 


    updatestate(a,c,d)
    {
       
        this.setState({products: a,noOfItems:c,user:d}, () => {
            console.log("UPDATED STATEEEEEEEEEEEEEEEEEE " +this.state.products);
        }); 
        var productdetails=[];
        for (var i=0;i<this.state.products.length;i++)
        {
            let details = this.state.products[i];
            let idp = details.id-1;
           
            var pd= <WishListItem  collectionName = {details.collectionName}  name ={details.name} price= {details.price}  id = {details.id} img = {this.state.images[idp]} />
           
            productdetails.push(pd);
          
        }

        this.setState({productdetails});
        
    }

    
        
    async componentDidMount()
    {
        var a,c,d;
        //var abc = axios.get('http://localhost:8000/wishlist',{params: {jwt}})

        let userData = await API.get('/wishlist')
        .then(function (response) 
        {
            a = response.data.prodet;
            c = response.data.items; //no of items
            d = response.data.user;
            
            this.updatestate(a,c,d);

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


  

  render()
  {
    return (
        <>
            <div class="cart-box">
                <center>
                    <div class="cart-header">
                        <div>My Wishlist ({this.state.noOfItems})</div>
                    </div>

                    <br/>
                
                    {this.state.productdetails}
                    
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
  
export default connect(mapStateToProps)(Wishlist)