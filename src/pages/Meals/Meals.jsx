import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";

const Meals = () => {
    useTitle("All Meals");
    
    // States for Pagination and Sorting
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState(""); // "" | "asc" | "desc"
    const itemsPerPage = 10;

    // React Query diye data fetch
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['meals', currentPage, sortOrder],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals?page=${currentPage}&limit=${itemsPerPage}&sort=${sortOrder}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-20 font-bold text-xl text-orange-500">Loading meals...</div>;
    if (isError) return <div className="text-center py-20 text-red-500">Error loading data!</div>;

    const { meals = [], totalPages = 1 } = data || {};

    // Pagination dynamic buttons layout arrays
    const pagesArray = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
            
            {/* Header and Sorting Controls */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b pb-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Explore Delicious Meals</h1>
                    <p className="text-gray-500">Find fresh and healthy food made by local experts.</p>
                </div>
                
                {/* Sorting Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-600">Sort by Price:</span>
                    <select 
                        value={sortOrder} 
                        onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }}
                        className="border rounded-lg px-4 py-2 text-sm bg-white font-medium focus:outline-orange-500"
                    >
                        <option value="">Default</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>
            </div>

            {/* Meals Grid System */}
            {meals.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-lg">No meals found on this page!</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {meals.map((meal) => (
                        <div key={meal._id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between">
                            <div className="relative">
                                <img src={meal.image} alt={meal.title} className="w-full h-44 object-cover" />
                                <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                    {meal.deliveryArea || "Local"}
                                </span>
                            </div>
                            
                            <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{meal.title || meal.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1">By Chef: {meal.chefName || "Verified Chef"}</p>
                                    <div className="flex items-center gap-1 mt-2 text-sm">
                                        <span className="text-yellow-500">★</span>
                                        <span className="font-semibold text-gray-600">{meal.rating || "4.8"}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                    <span className="text-xl font-black text-orange-600">৳{meal.price}</span>
                                    {/* Link dynamic view details-e niye jabe (Step 5-e routing hobe) */}
                                    <Link to={`/meal/${meal._id}`} className="bg-orange-50 text-orange-600 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-orange-600 hover:text-white transition">
                                        See Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls Section */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-10">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-700 transition"
                    >
                        Prev
                    </button>
                    
                    {pagesArray.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${currentPage === page ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-orange-200'}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-700 transition"
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    );
};

export default Meals;