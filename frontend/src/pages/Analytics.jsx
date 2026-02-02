import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const dataSales = [
    { name: 'Jan', sales: 4000, cost: 2400 },
    { name: 'Feb', sales: 3000, cost: 1398 },
    { name: 'Mar', sales: 2000, cost: 9800 },
    { name: 'Apr', sales: 2780, cost: 3908 },
    { name: 'May', sales: 1890, cost: 4800 },
    { name: 'Jun', sales: 2390, cost: 3800 },
];

const dataSource = [
    { name: 'Dine-in', value: 400 },
    { name: 'Takeout', value: 300 },
    { name: 'Delivery', value: 300 },
    { name: 'Events', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Business Intelligence</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-6">Revenue vs Cost</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataSales}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="var(--color-primary)" name="Revenue" />
                                <Bar dataKey="cost" fill="#82ca9d" name="Cost" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Source Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-6">Revenue Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dataSource}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dataSource.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
