import React from 'react';
import API from '../utils/api';
import '../styles/cart.css';




class WishListItem extends React.Component
{

    DeleteItem = async e =>
    {
        e.preventDefault();
        
        //let abc =axios.get('http://localhost:8000/wishlistdelete' + this.props.id,{params:{jwt}})

        let userData = await API.get('/wishlistdelete'+ this.props.id)
        .then(function (response) 
        {
            console.log(response);
            
            window.location.href="/wishlist";

        }.bind(this))
        .catch(function (error) 
        {
            console.log(error);
            alert("bye");
        })
    }

    MoveToCartBtn= async e =>
    {
        e.preventDefault();
       
        //let abc =axios.get('http://localhost:8000/movetocart' + this.props.id,{params: {jwt}})

        let userData = await API.get('/movetocart'+ this.props.id)
        .then(function (response) 
        {
            console.log(response);
            
            window.location.href="/wishlist";

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
            <div class="cart-items">

                <div style={{flexGrow: 1}}><img class="productImage" src={this.props.img} height="200px"/></div>
                <div style={{flexGrow: 10}}>
                    <h5 >{this.props.collectionName} </h5>
                    <h6 > {this.props.name} </h6>
                    <p class="price">Price: &#8377; {this.props.price}</p>

                    <br/>
                    <form >
                        <button onClick={this.DeleteItem}>delete</button>
                    </form>
                    
                    <form>
                        <button onClick={this.MoveToCartBtn}>Move to Cart</button>
                    </form>
                </div>
                    
            </div>
        </>
    );
  }
}



export default WishListItem;
