const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5000;
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hello WorLd');
});
app.post('/payment',(req,res)=>{
    Stripe.charges.create({
        amount:req.body.amount,
        currency:'usd',
        source:req.body.token.id,
        description:"Essential's payment"
    },(err,charge)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            res.status(200).send(charge);
        }
    })
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})