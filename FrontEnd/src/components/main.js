import React from 'react';
import '../styles/main.css';
import ProductCard from './ProductCard';
import { Link} from 'react-router-dom';
import API from "../utils/api";
import { connect } from 'react-redux'



//import logo from '../images/logo.jpeg';



class Main extends React.Component
{

   constructor(props) 
  { 
      super(props); 
      this.state = { 
          products :[],
          CartnoOfItems:null,
          WLnoOfItems:null,
          user:null,
          productdetails:[],
         // images:[dress1,dress2,dress3,dress4,dress5,dress6,dress7,dress8]
          images:props.images
        }; 

        this.componentDidMount = this.componentDidMount.bind(this)
  } 

    updatestate(a,b,c,d)
    {
        
        this.setState({products: a,CartnoOfItems:b,user:c,WLnoOfItems:d}, () => {
            console.log("UPDATED STATEEEEEEEEEEEEEEEEEE " +this.state.products);
            console.log(this.state.user);
        }); 
        var productdetails=[];
        for (var i=0;i<this.state.products.length;i++)
        {
            let details = this.state.products[i];
            //console.log(details);
            var pd= <ProductCard  collectionName = {details.collectionName}  name ={details.name} price= {details.price}  id = {details.id} img = {this.state.images[i]} />
            //console.log(pd);
            productdetails.push(pd);
            //console.log(productdetails);
        }
        console.log(productdetails);
        this.setState({productdetails});
        
    }


  async componentDidMount()
  {
    
      var a,b,c,d;
    //var abc = axios.get('http://localhost:8000/',{params: {jwt}})
    let userData = await API.get('/')
    .then(function (response) 
    {
        a = response.data.prodet;
        b = response.data.CartnoOfItems;
        c = response.data.user;
        d= response.data.WLnoOfItems;
        console.log(b,d);
        this.updatestate(a,b,c,d);

    }.bind(this))
    .catch(function (error) 
    {
        console.log(error);
        alert("error");
    })
   
  }


  cartButtonHandler = e => {
      e.preventDefault();
      let user = localStorage.getItem('jwt')
      if(user==null)
      {
          window.location.href='/login';
      }
      else{
        window.location.href='/cart';
      }
  }

  
  WLButtonHandler = e => {
    e.preventDefault();
    let user = localStorage.getItem('jwt')
    if(user==null)
    {
        window.location.href='/login';
    }
    else{
    window.location.href='/wishlist';
    }
  }

  OrdersButtonHandler = e => {
    e.preventDefault();
    let user = localStorage.getItem('jwt')
    if(user==null)
    {
        window.location.href='/login';
    }
    else{
    window.location.href='/order/tracking';
    }
  }




  logoutHandler()
  {
      localStorage.removeItem('jwt');
  }


  renderUserButton()
  {

    console.log("user state : " + this.state.user);
    if(this.state.user===false) 
    {
        
    return (
        
        <a href="">
            <form action="/login" method="GET">
                <button type="submit">Log In</button>
            </form>
        </a>);
        
    } else { 
    return(
        <a href="">
            <form>
            <button type="submit" onClick={this.logoutHandler}>Log Out</button>
            </form>
        </a> );
    }
  }



  render()
  {
    return (
      <>

        
        <nav>
            <div>
                <h3 className="main-logo-heading"> ShopStop</h3>
            </div>
            <div >
                <input type="text" placeholder="Search.." name="search"/>
                <button className="searchButton" type="submit"><i className="fa fa-search" style={{color:"purple"}}></i></button>
            </div>
            <div>   
                <div className="dropdown">
                    <form>
                        <button className="profile">
                            <i className='fas fa-user-alt'></i> <h6>Profile</h6>
                        </button>
                    </form>
               
                    <div className="dropdown-content">
                        <a href=""><button>Profile Info</button></a>
                        <a href="">
                            <form>
                                <button onClick={this.OrdersButtonHandler}>Orders</button>
                            </form>
                        </a>

                        {this.renderUserButton()}

                    </div>
                </div> 
            </div>

            <div>
                <form action="/wishlist" method="GET">
                    <button className="profile" onClick={this.WLButtonHandler}>
                        <i className="fas fa-heart cart-icon"  ></i>
                        <h6>WishList {this.state.WLnoOfItems}</h6>
                    </button>
                </form>
            </div>
            <div> 
                <form>
                <button className="profile" onClick={this.cartButtonHandler}>
                    <i className="fa fa-shopping-cart  cart-icon"></i>
                    <h6>Cart {this.state.CartnoOfItems}</h6>
                </button>
                </form>
            </div>

        </nav>
        <br/>
        <br/>


        <center><h3 class="collectionHeading">Check Out Our New Summer Collection</h3></center>

        <div class="product-card">
            {this.state.productdetails}
        </div>

        <div class="promises-box">
              <div class="promises-item">
                  <center>
                    <i class='fas fa-truck'></i>
                      <h5>FREE SHIPPING</h5>
                      <h6>On orders over 400</h6>
                  </center>
              </div>
              <div class="promises-item">
                <center>
                    <i class="fa fa-money" ></i>
                      <h5>MONEY BACK 100%</h5>
                      <h6>30 Day money back guaranty.</h6>
                  </center>
              </div>
              <div class="promises-item">
                <center>
                    <i class="fa fa-lock" ></i>
                      <h5>PAYMENT SECURED</h5>
                      <h6>Powerful Payment protection You Can Trust.</h6>
                  </center>
              </div>
          </div>

          <br/><br/>

         
          
        <h3 class="logo-heading">ShopStop</h3>
        <footer class="footer">
            <div class="footer-items">
                <h6>Policy Information</h6>
                <ul>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Terms of Use</a></li>
                <li><a href="">Terms of Sale</a></li>
                <li><a href="">Report Abuse & Takedown Policy</a></li>
                </ul>
            </div>
            <div class="footer-items">
                <h6>Company</h6>
                <ul>
                <li><a href="">About Us</a></li>
                <li><a href="">Core Values</a></li>
                <li><a href="">Blog</a></li>
                <li><a href="">Site Map</a></li>
                </ul>
            </div>
            <div class="footer-items">
                <h6>Need Help ?</h6>
                <ul>
                <li><a href="">FAQ</a></li>
                <li><a href="">Contact Us</a></li>
                <li><a href="">Online Shopping</a></li>
                </ul>
            </div>
            <div class="footer-items">
                <h6>Our Services</h6>
                <ul>
                <li><a href="">Shopping and returns</a></li>
                <li><a href="">Secure Shopping</a></li>
                <li><a href="">International Shipping</a></li>
                <li><a href="">Affiliates</a></li>
                </ul>
            </div>
        </footer>

        <div class="copyrights">Copyright © 2020, ShopStop Private Limited. All Rights Reserved</div>


      </>
    );
  }
}


const mapStateToProps = (state) => {
    return {
      images: state.images
    }
  }
  
export default connect(mapStateToProps)(Main)

