import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CheckoutForm = ({ meal, shippingInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (meal?.price > 0) {
            axiosSecure.post('/create-payment-intent', { price: meal.price })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [meal]);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || processing) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card
        });

        if (error) {
            toast.error(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: { email: user?.email, name: user?.displayName }
                }
            }
        );

        if (confirmError) {
            toast.error(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            const finalOrder = {
                mealId: meal._id,
                mealTitle: meal.title || meal.name,
                price: meal.price,
                transactionId: paymentIntent.id,
                userEmail: user?.email,
                userName: user?.displayName,
                shippingAddress: shippingInfo.address,
                phone: shippingInfo.phone,
                status: "pending", // Default entry requirement logic
                date: new Date().toLocaleDateString()
            };

            const res = await axiosSecure.post('/orders', finalOrder);
            if (res.data.insertedId) {
                toast.success(`Payment successful! TxID: ${paymentIntent.id}`);
                // Clear state or redirect
            }
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handlePaymentSubmit} className="space-y-6 bg-white p-6 rounded-xl border">
            <div className="p-3 border rounded-lg bg-gray-50">
                <CardElement options={{ style: { base: { fontSize: '16px', color: '#424770' } } }} />
            </div>
            <button 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
                className="w-full bg-orange-600 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-orange-700 disabled:opacity-50 transition"
            >
                {processing ? "Processing..." : `Pay ৳${meal?.price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;