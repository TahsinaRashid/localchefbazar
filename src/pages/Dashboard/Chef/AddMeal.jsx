import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";

// Imgbb API Key (.env.local এ রাখা ভালো)
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY || "তোর_imgbb_api_key";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMeal = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            // ১. ইমেজ হোস্ট করা এবং ডিরেক্ট ইউআরএল নেওয়া
            const imageFile = { image: data.image[0] };
            const imageRes = await axios.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (imageRes.data.success) {
                const imageUrl = imageRes.data.data.url;

                // ২. ফাইনাল অবজেক্ট তৈরি করা
                const newMeal = {
                    title: data.title,
                    price: parseFloat(data.price),
                    deliveryArea: data.deliveryArea,
                    description: data.description,
                    image: imageUrl,
                    chefName: user?.displayName,
                    chefEmail: user?.email,
                    rating: 4.8, // Default rating entry
                    date: new Date().toLocaleDateString()
                };

                // ৩. ব্যাকএন্ডে ডেটা পাঠানো
                const res = await axiosSecure.post('/add-meal', newMeal);
                if (res.data.insertedId) {
                    toast.success("Meal added successfully into bazaar!");
                    reset();
                }
            }
        } catch (error) {
            toast.error("Something went wrong while adding meal.");
        }
    };

    return (
        <div className="max-w-2xl bg-white p-8 rounded-2xl border shadow-sm">
            <h2 className="text-2xl font-black text-gray-800 mb-6">Add a New Fresh Meal</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Meal Title</label>
                        <input {...register("title", { required: true })} className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm" placeholder="e.g., Kacchi Biryani" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Price (৳)</label>
                        <input type="number" {...register("price", { required: true })} className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm" placeholder="e.g., 200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Delivery Area</label>
                        <input {...register("deliveryArea", { required: true })} className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm" placeholder="e.g., Dhanmondi" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Meal Image File</label>
                        <input type="file" {...register("image", { required: true })} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Description / Ingredients</label>
                    <textarea {...register("description", { required: true })} rows="4" className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm" placeholder="Mention ingredients, weight or taste info..."></textarea>
                </div>

                <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-orange-700 transition">
                    Publish to Marketplace
                </button>
            </form>
        </div>
    );
};

export default AddMeal;