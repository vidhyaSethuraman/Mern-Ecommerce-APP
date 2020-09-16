import React from 'react';
import '../styles/payment.css';
import API from '../utils/api';
const axios = require('axios').default;


class Payment extends React.Component
{


    constructor() 
    { 
      super(); 
       this.state = { 
        usercard:null,
        newcard:null,
        bank_name:'helo',
        card_holder_name:'',
        card_number:'',
        card_expiry_month:'',
        card_expiry_year:'',
        payment_method:'',
        savecard:null
        }; 

        this.ProceedHandler = this.ProceedHandler.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.DisplayCard = this.DisplayCard.bind(this);
        this.HandleInput = this.HandleInput.bind(this);
        this.placeOrderBtn = this.placeOrderBtn.bind(this);
        this.newcarddetails = this.newcarddetails.bind(this);
       

    } 
    
    ProceedHandler = async e => 
    {
        e.preventDefault();
        var payment_method = this.state.payment_method;
        var bank_name = this.state.bank_name;
        var card_holder_name = this.state.card_holder_name;
        var card_number = this.state.card_number;
        var card_expiry_month = this.state.card_expiry_month;
        var card_expiry_year = this.state.card_expiry_year;
        var savecard = this.state.savecard;
       
       /*axios.post('http://localhost:8000/checkout/payment/gateway?jwt=' +jwt, {
            payment_method, bank_name,card_holder_name,card_number,card_expiry_month,card_expiry_year,savecard
        })*/
        
        let userData = await API.post('/checkout/payment/gateway',{
            payment_method, bank_name,card_holder_name,card_number,card_expiry_month,card_expiry_year,savecard
        })
        .then(function (response) {
            console.log("payment process : " +response.data.action);
            window.location.href="/order/placed";
        })
        .catch(function (error) {
            console.log("SERVER ERRORRRRRR " + error);
        });

    }

    SignBtnHandler = () =>
    {
        window.location.href ='/login';
    }

    DisplayCard(a)
    {
        var usercard=[]
        if(a.length!=0)
        {
                for(var i=0 ; i<a.length;i++ )
                {
                    let cd = a[i];
                    let card = <div> <input type="radio" name="payment_method" value="card" /><span>{a.bank_name} ( xxxx xxxx {cd.card_number_last })</span><input type="text" placeholder="Enter CVV" /> </div> ;
                    usercard.push(card);
                }

                var cardDom = <div id="savedcard"><span>Saved Cards</span>{usercard}<br/><br/></div> ;
                this.setState({usercard:cardDom});

        }
    }

    async componentDidMount()
    {
        //var abc = axios.get('http://localhost:8000/checkout/payment',{params: {jwt}})

        let userData = await API.get('/checkout/payment')
        .then(function (response) 
        {
           console.log(response.data.usercard);
            //this.updatestate(a,b,c);
            if(response.data.usercard.length!=0)
            {
                this.DisplayCard(response.data.usercard);
            }

        }.bind(this))
        .catch(function (error) 
        {
            console.log(error);
            alert("error");
        })
    
    }

   newcarddetails()
   {
    var newcard = 
    <div class="payment-card">
        <div>
            <input type="text" name="bank_name" placeholder="Bank Name" />
            <input type="text" placeholder="Name on Card" name="card_holder_name" />
            <input type="text" placeholder="Card Number" name="card_number" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="savecard" /> <span>Save card</span> <br />
        </div>
        <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Expiry Date</span> <input type="text" placeholder="Month" name="card_expiry_month" />
            <input type="text" placeholder="Year" name="card_expiry_year" />
        </div>
    </div> ;
    

    this.setState({newcard});
   }

    HandleInput = async e =>
    {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var abc = await this.setState({[name]:value});
    }

    placeOrderBtn()
    {
        console.log(this.refs.savedcard.value);
    }

  render()
  {
    return (
        <>
            <center><h1 class="payment-header">Choose Payment Mode</h1></center>
            <form class="payment-box">
                
               {this.state.usercard}

                <div onChange={this.HandleInput.bind(this)}>
                <input type="radio" name="payment_method" onClick={this.newcarddetails} value="card" /> <span>Credit Cart / Debit Card</span>
                
                {this.state.newcard}
                    
                <br />
                <input type="radio" name="payment_method"  value="netbanking" /> <span>Net Banking </span><br />
                <input type="radio" name="payment_method" value="upi" /> <span>UPI Apps</span><br />
                <input type="radio" name="payment_method" value="POD" />  <span>Pay On delivary (Cash / Card /UPI )</span><br />
                </div>
                <br /><br />
                <center><button type="submit" onClick={this.ProceedHandler} >Place Order</button></center>
            </form>
        </>
    );
  }
}



export default  Payment;
