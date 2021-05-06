// Set up Stripe.js and Elements to use in checkout form
var style = {
    base: {
        color: "#32325d",
    }
};

var card = elements.create("card", { style: style });
card.mount("#card-element");

stripe.confirmCardPayment('pi_1IifdaHlASHs5y6Lt2FNqrfI_secret_DOzRh4uwq9SmpJEaubd6Vk6ZC', {
    payment_method: {
        card: card,
        billing_details: {
            name: 'Jenny Rosen'
        }
    },
    setup_future_usage: 'off_session'
}).then(function(result) {
    if (result.error) {
        // Show error to your customer
        console.log(result.error.message);
    } else {
        if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback execution
            // Set up a webhook or plugin to listen for the payment_intent.succeeded event
            // to save the card to a Customer

            // The PaymentMethod ID can be found on result.paymentIntent.payment_method
        }
    }
});