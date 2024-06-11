/* eslint-disable camelcase */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Form from "./form"


export default function StripePayment({ total, order_id, stripe_public_key }: any) {
    const stripePromise = loadStripe(stripe_public_key);
    return (
        <Elements stripe={stripePromise}>
            <Form total={total} order_id={order_id} />
        </Elements>
    );
}
