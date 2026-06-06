import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PlatformStats = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-20 font-bold text-orange-500">Calculating stats...</div>;

    // Recharts এর জন্য ডেটা ফরম্যাট করা
    const chartData = [
        { name: 'Total Users', count: stats?.totalUsers || 0 },
        { name: 'Pending Orders', count: stats?.pendingOrders || 0 },
        { name: 'Delivered Meals', count: stats?.deliveredOrders || 0 },
    ];

    const colors = ['#3182CE', '#DD6B20', '#38A169'];

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-gray-800">Platform Analytics</h1>
                <p className="text-gray-500">Live monitoring metrics of LocalChefBazaar.</p>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase">Total Revenue</p>
                    <h3 className="text-2xl font-black text-orange-600 mt-1">৳{stats?.totalRevenue || 0}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase">Registered Users</p>
                    <h3 className="text-2xl font-black text-blue-600 mt-1">{stats?.totalUsers || 0}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase">Pending Orders</p>
                    <h3 className="text-2xl font-black text-red-500 mt-1">{stats?.pendingOrders || 0}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase">Delivered Orders</p>
                    <h3 className="text-2xl font-black text-green-600 mt-1">{stats?.deliveredOrders || 0}</h3>
                </div>
            </div>

            {/* Recharts Visual Section */}
            <div className="bg-white p-6 rounded-2xl border h-[350px]">
                <h2 className="text-sm font-bold text-gray-700 mb-6">User & Order Distribution Graph</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#718096" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                        <YAxis stroke="#718096" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3182CE" barSize={50} radius={[5, 5, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PlatformStats;