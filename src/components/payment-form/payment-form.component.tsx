import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';

import {selectCartTotal} from '../../store/cart/cart.selector';
import {selectCurrentUser} from '../../store/user/user.selector';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// this one is for ensuring the Type of the StipeCardElement
import { StripeCardElement } from '@stripe/stripe-js';

import Button from '../button/button.component';

import './payment-form.styles.scss';

// Type Guard or Type Predicate Function
// to ensure that Stripe card (elements.getElement(CardElement)) is definitely not null
// the below is saying: card is StripeCardElement, if it returns 'True'
// if card is not equal to 'null', it can only be a Stripe Card Element
const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentFeedback, setPaymentFeedback] = useState('');

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    // typically, this where a request to the backend is about to happen
    // instead, we are using serverless functions with Netlify here
    // Netlify works with functions as if they are API endpoints

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then(res => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    // the above can also be done like this:
    // const clientSecret = response.paymentIntent.client_secret;

    // elements.getElement(CardElement) can potentially return us 'null'
    // Type 'null' is not assignable to type 'StripeCardElement | StripeCardNumberElement | { token: string; }'
    // to deal with this, we need to perform a check and make sure that elements.getElement(CardElement) is not null
    const cardDetails = elements.getElement(CardElement);
    if(!ifValidCardElement(cardDetails)) return;
    
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest'
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      setPaymentFeedback(`Payment failed: ${paymentResult.error.message}`);
      console.log(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        setPaymentFeedback('Payment successful. Thank you!');
      }
    } 
  };

  return (
    <div className='stripePaymentFormContainer'>
       <form className='stripeFormContainer' onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button isLoading={isProcessingPayment} className="button-container payment inverted"  >
          Pay now
        </Button>
        <div className="payment-feedback"><p>{paymentFeedback.length ? paymentFeedback : '' }</p></div>
       </form>
    </div>
  )
}

export default PaymentForm;