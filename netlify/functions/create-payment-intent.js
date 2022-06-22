require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRECT_KEY);

// 'require' is an old-school vanilla js 'import'
// essentially, we're importing a 'dotenv' library and running 'config()' which will
// attach all of the secret variables from the .env file onto our process environment

// old school way of saying 'export'
exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    // stripe.paymentIntent is from the Stripe library:
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    };

  } catch (error) {
    console.log({ error });
    
    return {
      statusCode: 400,
      body: JSON.stringify({ error })
    }
  }
}