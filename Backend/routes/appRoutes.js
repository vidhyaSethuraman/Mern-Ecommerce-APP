const { Router } = require('express');
const userController = require('../controller/userController.js');
const cartController = require('../controller/cartController.js');
const wishlistController = require('../controller/wishlistController.js');
const checkoutAddressController = require('../controller/checkoutAddressController.js');
const paymentController = require('../controller/paymentController.js');
const orderController = require('../controller/orderController.js');
const { authorize, checkUser } = require('../middleware/authorisation.js');
var cors = require('cors')

var bodyparser = require('body-parser');
const Product = require("../models/products");
const Cart = require('../models/cartItems');
const wishlist = require('../models/wishlist');
const Wishlist = require('../models/wishlist');

var urlep = bodyparser.urlencoded({extended : false});
const router = Router();

//main page route
router.get('/',checkUser,async (req,res) => {
    var userinfo = res.locals.user;
    var user = false;
    if(userinfo!=null)
    {
        user=true;
    }
    var prodet = await Product.find();
    var CartnoOfItems = null;
    var WLnoOfItems = null;
    if(userinfo!=null)
    {
        let usercart = await Cart.findOne({ customer_id : userinfo._id });
        let userWL = await Wishlist.findOne({customer_id : userinfo._id});

        if(usercart!=null)
        {
           
            var cartitems = usercart.product_id_list;
            if(cartitems!=null)
            {
                CartnoOfItems=0;
                for (let item of Object.keys(cartitems))
                {
                    CartnoOfItems++;
                }
                
            }
        }

        if(userWL!=null)
        {
            console.log("IN HEREEEEEEEE");
            var WLitems = userWL.product_id_list;
            if(cartitems!=null)
            {
                WLnoOfItems=0;
                for (let item of Object.keys(WLitems))
                {
                    WLnoOfItems++;
                }
                console.log("NOOOOO OFF ITEMS in wl:",WLnoOfItems);
            }
        }
    }

    //console.log(user,prodet,CartnoOfItems,WLnoOfItems);

    res.status(201).json({user,prodet,CartnoOfItems,WLnoOfItems});
    //res.render('home' ,{prodet,noOfItems});
    
});

//user routes
router.get('/login',userController.login_get);
router.get('/signup',userController.signup_get);
router.post('/login',urlep,userController.login_post);
router.post('/signup',urlep,userController.signup_post);
router.get('/logout', userController.logout);

//cart routes
router.get('/addtocart:id',[authorize,checkUser],cartController.addtocart_get);
router.get('/cart',[authorize,checkUser],cartController.cart_get);
router.get('/cartdelete:id',[authorize,checkUser],cartController.cart_delete);


//checkout address routes
router.get('/checkout',[authorize,checkUser],checkoutAddressController.checkout_get);
router.get('/checkout/address/conformation',[authorize,checkUser],checkoutAddressController.checkout_address_conformation);
router.get('/checkout/address/form',checkoutAddressController.checkout_address_form);
router.post('/checkout/address',urlep,[authorize,checkUser],checkoutAddressController.checkout_address_save);
router.post('/checkout/address/save',urlep,[authorize,checkUser],checkoutAddressController.address_store);

//checkout payment routes
router.get('/checkout/payment',urlep,[authorize,checkUser],paymentController.payment_get);
router.post('/checkout/payment/gateway',urlep,[authorize,checkUser],paymentController.payment_gateway);


//wishlist routes
router.get('/addtowishlist:id',[authorize,checkUser],wishlistController.addtowishlist_get);
router.get('/wishlist',[authorize,checkUser],wishlistController.wishlist_get);
router.get('/wishlistdelete:id',[authorize,checkUser],wishlistController.wishlist_delete);
router.get('/movetocart:id',[authorize,checkUser],wishlistController.wishlist_movetocart);


//order routes
router.get('/order/placed',[authorize,checkUser],orderController.order_placed_get);
//router.get('/myorders',[authorize,checkUser],orderController.order_get);
router.get('/order/tracking',[authorize,checkUser], orderController.order_track_get);
//router.post('/order/tracking', orderController.order_track_post);



module.exports = router;