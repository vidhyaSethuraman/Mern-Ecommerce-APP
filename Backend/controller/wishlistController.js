const Product = require("../models/products");
const Wishlist = require('../models/wishlist');
const Cart = require('../models/cartItems');



module.exports.wishlist_delete = async (req,res) => {
  
  var id = req.params.id;
  var userinfo = res.locals.user;

  try
  {
    let userwl = await Wishlist.findOne({customer_id : userinfo._id});
    let wlitems = userwl.product_id_list;
    
    delete wlitems[id]
    
    let userwlupdated = await Wishlist.findOneAndUpdate({customer_id : userinfo._id}, {product_id_list: wlitems});
    console.log("AFter removinggg " + userwlupdated);
  }
  catch(err)
  {
    console.log("Delete wishlist item request "+ err);
  }
    //res.redirect('/wishlist');
    res.status(201).json({action:true});
}


module.exports.addtowishlist_get =async (req,res) => {
  console.log("In addtowishlist items");

  var productId =req.params.id;
  console.log(productId);
  var userinfo=res.locals.user;
  if(userinfo == null)
  {
    res.status(201).json({user:false});
  }
  try
  {
      let wlcart = await Wishlist.findOne({ customer_id : userinfo._id });
      if(wlcart == null)
      {
          let wlitems = {};
          wlitems[productId]= 1;
          let wlp = await Wishlist.create({customer_id : userinfo._id , product_id_list: wlitems });
          console.log(wlp);
      }
      else
      {
        console.log("User has a wishlist ");
          let wlcart = await Wishlist.findOne({customer_id : userinfo._id});
          let wlitems = wlcart.product_id_list;
          wlitems[productId]= 1;
          let userwlupdated = await Wishlist.findOneAndUpdate({customer_id : userinfo._id}, {product_id_list: wlitems});
          console.log(userwlupdated);
        }
  }
  catch(err)
  {
    console.log('error');
  }
  //res.redirect('/');
  res.status(201).json({user:true,cart:true});
}



module.exports.wishlist_get = async (req,res) => {
  var userinfo=res.locals.user;
  var user ;
  if(userinfo!=null)
  {
    user=true;
  }
  else 
  {
    user=false;
  }
  try
  {
    let userwl = await Wishlist.findOne({ customer_id : userinfo._id });
    if(userwl == null)
    {
      var wl =null;
      res.send("Your wl is empty");
    }
    else
    {
      var wlProductDetails =[];
      let wlitems = userwl.product_id_list;
      console.log(wlitems);
      var totalamt=0;
      for (let item of Object.keys(wlitems))
      {
        let productDetails =await Product.findOne({id:item});
        //totalamt+= parseInt(productDetails.price);
        wlProductDetails.push(productDetails); 
      }

      var noOfItems = wlProductDetails.length;
    }
  }
  catch(err)
  {
    console.log(err);
  }

  //res.render('wishlist',{prodet:wlProductDetails,items:noOfItems,user});
  res.status(201).json({prodet:wlProductDetails,items:noOfItems,user});
}


module.exports.wishlist_movetocart = async (req,res) =>{

  var id = req.params.id;
  var productId =id;
  var userinfo = res.locals.user;
  
  try
  {
    let userwl = await Wishlist.findOne({customer_id : userinfo._id});
    let wlitems = userwl.product_id_list;
    
    delete wlitems[id]
    
    let userwlupdated = await Wishlist.findOneAndUpdate({customer_id : userinfo._id}, {product_id_list: wlitems});
    console.log("AFter removinggg " + userwlupdated);
  }
  catch(err)
  {
    console.log(err);
  }
   
  try
  {
      let usercart = await Cart.findOne({ customer_id : userinfo._id });
      if(usercart == null)
      {
          let cartitems = {};
          cartitems[productId]= 1;
          let cp = await Cart.create({customer_id : userinfo._id , product_id_list: cartitems });
          //console.log(cp);
      }
      else
      {
        console.log("User has a cart ");
          let usercart = await Cart.findOne({customer_id : userinfo._id});
          let cartitems = usercart.product_id_list;
          cartitems[productId]= 1;
          let usercartupdated = await Cart.findOneAndUpdate({customer_id : userinfo._id}, {product_id_list: cartitems});
          //console.log(usercartupdated);
        }
  }
  catch(err)
  {
    console.log(err);
  }

  res.status(201).json({action:true});
}

