// const productFunction = async () => {
//     const session = await stripe.checkout.sessions.create({
//     customer: 'cus_JII822O6GmfAgf',
//     payment_method_types: ['card'],
//         line_items: [
//             {
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: 'T-shirt',
//                     },
//                     unit_amount: 2000,
//                 },
//
//
//                 quantity: 1,
//             },
//         ],
//         mode: 'payment',
//     success_url: 'https://example.com/success',
//     cancel_url: 'https://example.com/cancel',
// });
//     console.log(session);
// }


// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require(

    'express')

;
const app = express();
const path = require('path');

const stripe = require('stripe')('sk_test_51IaFWMHlASHs5y6L1umdBqkvs63efYNDyOsuRjf6RnNwjt0ym5NdesANBjWSjx5MY9nSQaiaZ8ISnO6N6KP2AHv900RJbpWelv')

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        customer: 'cus_JKb9i0SrkGa8HL',
        //  id: 'prod_JIVJamPbWIqUgM',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:63342/cancel.html',
    });

    res.json({ session: session });
});

app.get('/success', async (req, res) => {
    res.sendFile(path.join(__dirname, 'success.html'));
})

app.listen(4242, () => console.log(`Listening on port ${4242}!`));