const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));
const stripe = require("stripe")("sk_test_51NTNZBD7MblCQnUpNgCct1zsd7QMxOPgbKvgmZNKSOODW7xAk6VJm8trHx9ledkEj4nZ5CqzZuDoZslvYLcAmuuw00isSEHR10");
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      bodyparser.json()(req, res, next);
    }
  });
app.post("/checkout", async (req, res, next) => {
    try {
       
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'ideal'], 
            shipping_address_collection: {
                allowed_countries: ['NL'],
                },
                    shipping_options: [
                    {
                        shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'eur',
                        },
                        display_name: 'Free shipping',
                        // Delivers between 5-7 business days
                        delivery_estimate: {
                            minimum: {
                            unit: 'business_day',
                            value: 5,
                            },
                            maximum: {
                            unit: 'business_day',
                            value: 7,
                            },
                        }
                        }
                    },
                    {
                        shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1000,
                            currency: 'eur',
                        },
                        display_name: 'Next day air',
                        // Delivers in exactly 1 business day
                        delivery_estimate: {
                            minimum: {
                            unit: 'business_day',
                            value: 1,
                            },
                            maximum: {
                            unit: 'business_day',
                            value: 1,
                            },
                        }
                        }
                    },
                    ],
           line_items:  req.body.items.map((item) => ({
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.name,
                images: [item.imageUrl]
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          })),
           mode: "payment",
           success_url: "http://localhost:4242/success.html",
           cancel_url: "http://localhost:4242/cancel.html",
        });

        res.status(200).json(session);
    } catch (error) {
        next(error);
    }

});
app.post('/webhook', bodyparser.raw({type: 'application/json'}), (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];
    const endpointSecret = 'whsec_e0b277601cf11f1a539bf0be090a11455fed7feb64d40bef2817f12e9856f208';
    console.log('sig:', sig);
    console.log('raw body:', request.body);
    
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);;
    } catch (err) {
      console.log(`Error when verifying webhook signature: ${err.message}`);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
  
      // Retrieve the session
      stripe.checkout.sessions.retrieve(session.id)
        .then(session => {
          // Extract customer data
          const customerEmail = session.customer_details.email;
          const customerName = session.customer_details.name;
          
          // Log customer data
          console.log(`Customer Email: ${customerEmail}`);
          console.log(`Customer Name: ${customerName}`);
          
          // Here you can save the data to your database
  
          // Respond to Stripe that the event was handled correctly
          response.json({received: true});
        })
        .catch(err => {
          console.log(err);
          response.status(500).end();
        });
    } else {
      // Unexpected event type
      response.status(400).end();
    }
  });

    


app.listen(4242, () => console.log('app is running on 4242'));