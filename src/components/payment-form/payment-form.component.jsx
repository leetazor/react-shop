import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './payment-form.styles.scss';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
    
    if(!stripe || !elements) {
      return;
    }

    // typically, this where a request to the backend is about to happen
    // instead, we are using serverless functions with Netlify here
    // Netlify works with functions as if they are API endpoints

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ amount: 10000 })
    }).then(res => res.json());

    console.log(response);
  };

  return (
    <div className='stripePaymentFormContainer'>
       <form className='stripeFormContainer' onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
          Pay now
        </Button>
       </form>
    </div>
  )
}

export default PaymentForm;