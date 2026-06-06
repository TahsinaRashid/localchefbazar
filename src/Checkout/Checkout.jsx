import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import useTitle from "../../hooks/useTitle";

// Stripe key inject mapping wrapper (replace with actual publishable key)
const stripePromise = loadStripe("pk_test_...tor_publishable_key");

const Checkout = () => {
    useTitle("Checkout");
    const location = useLocation();
    const meal = location.state?.meal; // Meal data parameter map route reference block theke ashbe
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [shippingInfo, setShippingInfo] = useState(null);

    const onShippingSubmit = (data) => {
        setShippingInfo(data); // Shipping set hoye gele payment open hobe
    };

    if (!meal) return <div className="text-center py-20 text-red-500">No meal details found to check out!</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side: Form Details standard tracking input layout */}
            <div className="space-y-4">
                <h2 className="text-xl font-black text-gray-800">Shipping Delivery Info</h2>
                <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-4 bg-gray-50 p-5 rounded-xl border">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Contact Phone</label>
                        <input 
                            {...register("phone", { required: "Phone number required" })}
                            placeholder="017XXXXXXXX"
                            className="w-full p-2.5 bg-white border rounded-lg text-sm"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Full Delivery Address</label>
                        <textarea 
                            {...register("address", { required: "Address details required" })}
                            placeholder="House, Road, Area details..."
                            rows="3"
                            className="w-full p-2.5 bg-white border rounded-lg text-sm"
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                    <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg font-bold text-xs uppercase hover:bg-orange-600 transition">
                        Confirm Shipping Details
                    </button>
                </form>
            </div>

            {/* Right Side: Stripe integration parameters logic execution code block layout */}
            <div className="space-y-6">
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                    <h3 className="font-bold text-gray-800 text-sm">Summary: {meal.title || meal.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Payable Total: <span className="text-orange-600 font-black text-base">৳{meal.price}</span></p>
                </div>

                {shippingInfo ? (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm meal={meal} shippingInfo={shippingInfo} />
                    </Elements>
                ) : (
                    <div className="text-center py-10 border border-dashed rounded-xl text-gray-400 text-sm">
                        Please fill out and submit shipping data to open payment portal.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;