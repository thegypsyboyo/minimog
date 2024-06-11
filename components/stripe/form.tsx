/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import axios from "axios"
import { useState } from "react";

const CARD_OPTIONS: StripeCardElementOptions = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#000",
            color: "#000",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#000" },
            "::placeholder": { color: "#000" },
        },
        invalid: {
            iconColor: "#fd010169",
            color: "#fd010169",
        },
    },
};

export default function Form({ total, order_id }: any) {
    const [error, setError] = useState("");
    const stripe: any = useStripe();
    const elements: any = useElements();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe?.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        if (!error) {
            try {
                const { id } = paymentMethod;
                const res = await axios.post(`/api/order/${order_id}/payWithStripe`, {
                    amount: total,
                    id,
                });
                console.log(res);
                if (res.data.success) {
                    window.location.reload();
                }
            } catch (error: any) {
                setError(error);
            }
        } else {
            setError(error.message);
        }
    };
    return (
        <div className={"w-[400px] my-10"}>
            <p className="uppercase text-lg">Pay with Stripe</p>
            <form onSubmit={handleSubmit}>
                <CardElement options={CARD_OPTIONS} />
                <button type="submit" className="mt-[1em] h-[45px] w-full bg-black  cursor-pointer border border-solid border-transparent text-white font-medium transition-all duration-200 ease-in hover:bg-transparent rounded-[4px] hover:border-[#222] hover:text-black">PAY</button>
                {error && <span className={"text-red-600"}>{error}</span>}
            </form>
        </div>
    );
}