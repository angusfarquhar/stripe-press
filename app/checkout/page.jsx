"use client";

// import CheckoutForm from '../components/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
    const searchParams = useSearchParams()
    const productId = searchParams.get('productId');

    const [clientSecret, setClientSecret] = useState(null)

    useEffect(() => {
        const createPaymentIntent = async () => {
            const productRes = await fetch(`http://localhost:3000/api/products/${productId}`)
            const product = await productRes.json()

            const res = await fetch(`http://localhost:3000/api/create-payment-intent`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({product: product})
            });
            const data = await res.json();
            setClientSecret(data.clientSecret);
        }
        if (productId) createPaymentIntent();
    }, [productId]);

    if (!clientSecret) return <div>Loading...</div>

    return (
        <Elements stripe={stripePromise} options={clientSecret}>
            {/* <CheckoutForm clientSecret={clientSecret} /> */}
            <p>hello world</p>
        </Elements>
    )
}