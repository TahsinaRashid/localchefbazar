import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";
import { toast } from "react-toastify";

const MealDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    useTitle("Meal Details");

    // React hook form initialize
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch Single Meal Data
    const { data: meal, isLoading: mealLoading } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal/${id}`);
            return res.data;
        }
    });

    // Fetch Reviews Data
    const { data: reviews = [], refetch: refetchReviews } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${id}`);
            return res.data;
        }
    });

    if (mealLoading) return <div className="text-center py-20 font-bold text-orange-500">Loading details...</div>;

    // Handle Review Submit via react-hook-form
    const onSubmitReview = async (formData) => {
        const reviewData = {
            mealId: id,
            mealTitle: meal.title || meal.name,
            userEmail: user?.email,
            userName: user?.displayName,
            userPhoto: user?.photoURL,
            reviewText: formData.reviewText,
            rating: parseInt(formData.rating),
            date: new Date().toLocaleDateString()
        };

        try {
            const res = await axiosSecure.post('/reviews', reviewData);
            if (res.data.insertedId) {
                toast.success("Review added successfully!");
                reset();
                refetchReviews(); // Live feed sync korbe
            }
        } catch (error) {
            toast.error("Failed to add review.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
            {/* Meal Main Info UI */}
            <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-sm border">
                <img src={meal.image} alt={meal.title} className="w-full md:w-1/2 h-72 object-cover rounded-xl" />
                <div className="flex flex-col justify-between space-y-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-800">{meal.title || meal.name}</h1>
                        <p className="text-sm text-gray-500 mt-1">Chef: {meal.chefName} | Experience: {meal.chefExperience || "3 Years"}</p>
                        <p className="text-gray-600 mt-4 text-sm leading-relaxed">{meal.description || "Freshly cooked hygienic home-made meal with pure organic spices."}</p>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-3xl font-black text-orange-600">৳{meal.price}</span>
                        <button className="bg-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition shadow-md">
                            Order Meal
                        </button>
                    </div>
                </div>
            </div>

            {/* Review Section Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Side: Review Form */}
                <div className="bg-gray-50 p-6 rounded-xl border space-y-4 h-fit">
                    <h2 className="text-xl font-bold text-gray-800">Give Your Feedback</h2>
                    <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Rating</label>
                            <select 
                                {...register("rating", { required: true })}
                                className="w-full p-2.5 bg-white border rounded-lg focus:outline-orange-500 text-sm font-medium"
                            >
                                <option value="5">5 Star (Excellent)</option>
                                <option value="4">4 Star (Good)</option>
                                <option value="3">3 Star (Average)</option>
                                <option value="2">2 Star (Bad)</option>
                                <option value="1">1 Star (Terrible)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Your Review</label>
                            <textarea 
                                {...register("reviewText", { required: "Review text is required", minLength: { value: 10, message: "Minimum 10 characters required" } })}
                                placeholder="Write your honest opinion about ingredients, taste, or delivery..."
                                rows="4"
                                className="w-full p-3 bg-white border rounded-lg focus:outline-orange-500 text-sm"
                            />
                            {errors.reviewText && <p className="text-red-500 text-xs mt-1">{errors.reviewText.message}</p>}
                        </div>
                        <button type="submit" className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-bold hover:bg-orange-600 transition text-sm">
                            Submit Review
                        </button>
                    </form>
                </div>

                {/* Right Side: Reviews Display */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">Reviews ({reviews.length})</h2>
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                        {reviews.length === 0 ? (
                            <p className="text-gray-400 text-sm italic">No reviews yet. Be the first to review!</p>
                        ) : (
                            reviews.map((rev) => (
                                <div key={rev._id} className="bg-white p-4 rounded-xl border space-y-2 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <img src={rev.userPhoto} alt="" className="w-8 h-8 rounded-full object-cover border" />
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800">{rev.userName}</h4>
                                            <span className="text-[10px] text-gray-400">{rev.date}</span>
                                        </div>
                                        <span className="ml-auto text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded">
                                            ★ {rev.rating}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed pl-1">{rev.reviewText}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MealDetails;