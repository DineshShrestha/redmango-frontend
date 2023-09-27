import React, { useState } from 'react'
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { toastNotify } from '../../../Helper';
function PaymentForm() {
        const stripe = useStripe();
        const elements = useElements();
        const [isProcessing, setIsProcessing] = useState(false);
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
          // We don't want to let default form submission happen here,
          // which would refresh the page.
          event.preventDefault();
      
          if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
          }
          setIsProcessing(true);
          const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
              return_url: "https://example.com/order/123/complete",
            },
          });
      
          if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            toastNotify("An unexpected error occured.", "error");
            setIsProcessing(false);
          } else {
           console.log(result);
          }
        };
  return (
    <form  onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100">Submit</button>
    </form>
  )
}

export default PaymentForm
