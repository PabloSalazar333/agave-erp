import React, { useState } from 'react';
import { Leaf, Lock, Mail, ArrowRight } from 'lucide-react';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password });
        // TODO: Connect to Backend API
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10 border border-gray-100">

                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-lg transform rotate-3 hover:rotate-6 transition-all duration-300">
                        <Leaf className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-dark tracking-tight">Agave ERP</h1>
                    <p className="text-gray-500 mt-2 text-sm">Welcome back, please login to your account.</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3 group-focus-within:text-primary transition-colors" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3 group-focus-within:text-primary transition-colors" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-gray-600 cursor-pointer hover:text-dark">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/25 mr-2" />
                            Remember me
                        </label>
                        <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-[#155A75] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 focus:ring-4 focus:ring-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        Sign In <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <a href="#" className="font-semibold text-primary hover:underline">Contact Support</a>
                </p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 text-center w-full text-xs text-gray-400">
                &copy; 2026 Agave Solutions. All rights reserved.
            </div>
        </div>
    );
}

export default App;
