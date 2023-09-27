import React from 'react'
import { useLocation } from 'react-router'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PaymentForm } from '../Components/Page/Payment';

function Payment() {
    const {
        state: {apiResult, userInput}
    } = useLocation();
    const stripePromise = loadStripe('pk_test_51MG6xmDU3OjDrP4GJV8avgtFNNGxikOffHWtYgncDFkahat38KLX3foPPgFbk0JHNG2FmYhIpSNl2lqbnR3uEfRM00Bv0LptTW');
    const options = {
        // passing the client secret obtained from the server
        clientSecret: apiResult.clientSecret,
      };
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />   
    </Elements>
  )
}

export default Payment