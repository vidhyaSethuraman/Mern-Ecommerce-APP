const Customer = require("../models/customers");
const Address = require('../models/address');
const jwt = require('jsonwebtoken');


// renders ejs address form
module.exports.checkout_address_form = (req,res) => {
  res.render('addressform');
}


// redirection to form or address conformation page
module.exports.checkout_get = async(req,res) => {
  var userinfo= res.locals.user;
  try
  {
    var useraddr = await Address.findOne({customer_id : userinfo._id});
    if(useraddr==null)
    {
      //res.redirect('/checkout/address/form');
      res.status(201).json({addr:false})
    }
    else
    {
      //res.redirect('checkout/address/conformation');
      res.status(201).json({addr:true})
    }

  }
  catch(err)
  {
    console.log(err);
  }
  
}


// saves data to address model and then redirects to address conformation page
module.exports.checkout_address_save = async (req,res) => {
  console.log("IN SAVE NEW ADDRESSSSSSSSSSSS");
  var {name ,mobileno ,pincode ,details, landmark, city, state ,addrHome,addrOffice,defaulta } = req.body;
  console.log(name);
  console.log(defaulta);

  defaulta= defaulta=="on" ?true: false;
  addrHome = addrHome =="on" ?true:false;
  addrOffice = addrOffice =="on" ?true:false;

  var userinfo= res.locals.user;

  try
  {
    const addr = await Address.create({customer_id: userinfo._id,name,mobileno,pincode,details,landmark,city,state,defaulta,home_address : addrHome,office_adress :addrOffice});
    console.log(addr);
  }
  catch(err)
  {
    console.log("adress prob" +err);
  }
  try
  {
      const user = await Customer.findByIdAndUpdate(userinfo._id, {name,mobileno});
  }
  catch(err)
  {
    console.log("user updation prob");
  }

  //res.redirect('/checkout/address/conformation');
  res.status(201).json({addr:true})
}

// displays address conformation page
module.exports.checkout_address_conformation = async(req,res) => {
  
  var userinfo= res.locals.user;

  try
  {
    var useraddress =await  Address.find({customer_id: userinfo._id});
  }
  catch(err)
  {
    console.log(err);
  }

  //res.render('checkoutaddress',{useraddress});
  res.status(201).json({useraddress});
}


module.exports.address_store = async (req,res) => {
  var {selectedaddr} =req.body;

  try
  {
    const orderdetails = await Order.findOneAndUpdate({customer_id : userinfo._id},{delivary_address:selectedaddr});
  }
  catch(err)
  {
    console.log(err);
  }

  res.status(201).json({action:true});

}
