const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const { resolve } = require("path");
// Replace if using a different env file or config
const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

nunjucks.configure('views', { noCache: true });


app.get('/stripe-form', function (req,res,next) {
    res.render('stripeForm', {title:'Stripe Form Title'});
})

app.post('/stripe-information', async function (req, res, next) {
    console.log('Stripe token received: ', req.body.stripeToken)
    let customer = await stripe.customers.create({
        description: 'My new customer',
        source: req.body.stripeToken,
    })
    return res.status(200).json({cus: customer});
})

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));





// app.get("/", (req, res) => {
//     // Display checkout page
//     const path = resolve('../client' + "/stripeForm.html");
//     res.sendFile(path);
// });
//
// const calculateOrderAmount = _ => {
//     // Replace this constant with a calculation of the order's amount
//     // Calculate the order total on the server to prevent
//     // people from directly manipulating the amount on the client
//     return 1400;
// };
//
// // An endpoint to charge a saved card
// // In your application you may want a cron job / other internal process
// app.post("/charge-card-off-session", async (req, res) => {
//     let paymentIntent, customer;
//     try {
//         // You need to attach the PaymentMethod to a Customer in order to reuse
//         // Since we are using test cards, create a new Customer here
//         // You would do this in your payment flow that saves cards
//         customer = await stripe.customers.create({
//             payment_method: req.body.paymentMethod
//         });
//
//         // List the customer's payment methods to find one to charge
//         const paymentMethods = await stripe.paymentMethods.list({
//             customer: customer.id,
//             type: "card"
//         });
//
//         // Create and confirm a PaymentIntent with the order amount, currency,
//         // Customer and PaymentMethod ID
//         paymentIntent = await stripe.paymentIntents.create({
//             amount: calculateOrderAmount(),
//             currency: "usd",
//             payment_method: paymentMethods.data[0].id,
//             customer: customer.id,
//             off_session: true,
//             confirm: true
//         });
//
//         res.send({
//             succeeded: true,
//             clientSecret: paymentIntent.client_secret,
//             publicKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx'
//         });
//     } catch (err) {
//         if (err.code === "authentication_required") {
//             // Bring the customer back on-session to authenticate the purchase
//             // You can do this by sending an email or app notification to let them know
//             // the off-session purchase failed
//             // Use the PM ID and client_secret to authenticate the purchase
//             // without asking your customers to re-enter their details
//             res.send({
//                 error: "authentication_required",
//                 paymentMethod: err.raw.payment_method.id,
//                 clientSecret: err.raw.payment_intent.client_secret,
//                 publicKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
//                 amount: calculateOrderAmount(),
//                 card: {
//                     brand: err.raw.payment_method.card.brand,
//                     last4: err.raw.payment_method.card.last4
//                 }
//             });
//         } else if (err.code) {
//             // The card was declined for other reasons (e.g. insufficient funds)
//             // Bring the customer back on-session to ask them for a new payment method
//             res.send({
//                 error: err.code,
//                 clientSecret: err.raw.payment_intent.client_secret,
//                 publicKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
//             });
//         } else {
//             console.log("Unknown error occurred", err);
//         }
//     }
// });