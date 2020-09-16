import React from 'react';
import API from '../utils/api';
import '../styles/cart.css';




class CartItem extends React.Component
{

    DeleteItem =async  e =>
    {
        e.preventDefault();
        console.log("ITEM TO BE DELTED ID  : " +this.props.id);
        let userData = await API.get('http://localhost:8000/cartdelete' + this.props.id)
        .then(function (response) 
        {
            window.location.href="/cart";

        }.bind(this))
        .catch(function (error) 
        {
            // handle error
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
                        <button>Move to Wishlist</button>
                    </form>
                </div>
                    
            </div>
        </>
    );
  }
}



export default CartItem;
