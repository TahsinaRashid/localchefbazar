import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const Home = () => {
    useTitle("Home");

    // Static Dummy Data for 6 Meals (Step 4-e backend theke real data fetch hobe)
    const dummyMeals = [
        { id: 1, name: "Homemade Beef Bhuna", price: 250, rating: 4.9, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
        { id: 2, name: "Chicken Biryani (Premium)", price: 180, rating: 4.8, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500" },
        { id: 3, name: "Traditional Rui Fish Curry", price: 150, rating: 4.7, image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500" },
        { id: 4, name: "Shahi Morog Polao", price: 220, rating: 4.9, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500" },
        { id: 5, name: "Special Vorta & Khichuri Platter", price: 120, rating: 4.6, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
        { id: 6, name: "Healthy Vegetable & Daal", price: 90, rating: 4.5, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500" },
    ];

    return (
        <div className="space-y-24">
            
            {/* 1. HERO / BANNER SECTION (With Framer Motion Animation) */}
            <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl space-y-6 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                        Freshly Cooked <span className="text-orange-600">Home Meals</span> Delivered To You.
                    </h1>
                    <p className="text-lg text-gray-600">
                        Enjoy the taste of love and health. Discover local home chefs in your neighborhood making amazing meals just for you.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <Link to="/meals" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition shadow-md">
                            Explore Meals
                        </Link>
                        <button className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
                            Become a Chef
                        </button>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-10 md:mt-0 max-w-lg"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" 
                        alt="Delicious Home Food" 
                        className="rounded-2xl shadow-2xl object-cover w-full h-[350px]"
                    />
                </motion.div>
            </section>

            {/* 2. DAILY MEALS SECTION (Limit: 6 Cards) */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="text-center space-y-2 mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Today's Special Menus</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Freshly made, high-quality local dishes crafted by verified home chefs.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {dummyMeals.map((meal) => (
                        <div key={meal.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
                            <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
                            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{meal.name}</h3>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-yellow-500 font-bold">★</span>
                                        <span className="text-sm font-semibold text-gray-600">{meal.rating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-2xl font-black text-orange-600">৳{meal.price}</span>
                                    <Link to={`/meals`} className="bg-orange-100 text-orange-700 font-bold px-4 py-2 rounded-lg text-sm hover:bg-orange-600 hover:text-white transition">
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. EXTRA CREATIVE SECTION 1: HOW IT WORKS */}
            <section className="bg-gray-50 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-2 mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">How LocalChefBazaar Works</h2>
                        <p className="text-gray-500">Getting fresh, authentic food is now easier than ever.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto">1</div>
                            <h3 className="text-xl font-bold text-gray-800">Choose Your Meal</h3>
                            <p className="text-sm text-gray-500">Browse customized menus cooked near you by independent home chefs.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto">2</div>
                            <h3 className="text-xl font-bold text-gray-800">Secure Payment</h3>
                            <p className="text-sm text-gray-500">Order via easy and secure online payment options in just a click.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto">3</div>
                            <h3 className="text-xl font-bold text-gray-800">Enjoy Fresh Food</h3>
                            <p className="text-sm text-gray-500">Get healthy, hot, restaurant-quality kitchen-fresh meals at your door.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. EXTRA CREATIVE SECTION 2: WHY CHOOSE HOME FOOD */}
            <section className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Why Chose Kitchen-Fresh Food over Restaurants?</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-3 items-start">
                            <span className="text-green-500 font-bold text-lg">✔</span>
                            <p className="text-gray-600"><strong className="text-gray-800">100% Hygenic:</strong> Home kitchens don't use commercial artificial colors or harmful preservatives.</p>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-green-500 font-bold text-lg">✔</span>
                            <p className="text-gray-600"><strong className="text-gray-800">Support Local Empowering:</strong> Every time you order, you support an aspiring home cook or local housewife.</p>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-green-500 font-bold text-lg">✔</span>
                            <p className="text-gray-600"><strong className="text-gray-800">Affordable Pricing:</strong> No overhead commercial restaurant bills, meaning better food at actual costs.</p>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 w-full">
                    <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600" alt="Cooking with care" className="rounded-2xl shadow-lg object-cover w-full h-[300px]" />
                </div>
            </section>

        </div>
    );
};

export default Home;