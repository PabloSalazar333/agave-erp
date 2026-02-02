import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BarChart, Activity, Users, DollarSign } from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
    // Default layout
    const defaultLayout = [
        { i: 'stats1', x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
        { i: 'stats2', x: 3, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
        { i: 'stats3', x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
        { i: 'stats4', x: 9, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
        { i: 'chart1', x: 0, y: 2, w: 8, h: 8 },
        { i: 'recent', x: 8, y: 2, w: 4, h: 8 },
    ];

    const [layout, setLayout] = useState(() => {
        const saved = localStorage.getItem('dashboard_layout');
        return saved ? JSON.parse(saved) : defaultLayout;
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onLayoutChange = (currentLayout) => {
        setLayout(currentLayout);
        localStorage.setItem('dashboard_layout', JSON.stringify(currentLayout));
    };

    if (!mounted) return <div className="p-8">Loading dashboard...</div>;

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="h-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-2 text-gray-800">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
                <Activity className="w-4 h-4 mr-1" />
                <span>+12.5% from last month</span>
            </div>
        </div>
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
                    <p className="text-gray-500">Welcome back, here's what's happening today.</p>
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem('dashboard_layout');
                        setLayout(defaultLayout);
                    }}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                    Reset Layout
                </button>
            </div>

            <ResponsiveGridLayout
                className="layout"
                layouts={{ lg: layout }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={60}
                onLayoutChange={onLayoutChange}
                isDraggable={true}
                isResizable={true}
                margin={[16, 16]}
            >
                <div key="stats1">
                    <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} color="bg-blue-500" />
                </div>
                <div key="stats2">
                    <StatCard title="Active Users" value="+2350" icon={Users} color="bg-purple-500" />
                </div>
                <div key="stats3">
                    <StatCard title="Sales" value="+12,234" icon={BarChart} color="bg-orange-500" />
                </div>
                <div key="stats4">
                    <StatCard title="Active Now" value="+573" icon={Activity} color="bg-green-500" />
                </div>

                <div key="chart1" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                        Chart Placeholder (Waiting for Recharts)
                    </div>
                </div>

                <div key="recent" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-gray-100 mr-3"></div>
                                <div>
                                    <p className="text-sm font-medium">New order #12{i}4</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ResponsiveGridLayout>
        </div>
    );
};

export default Dashboard;
