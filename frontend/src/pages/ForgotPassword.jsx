import { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 text-center">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Agave ERP" className="h-16 w-auto" />
                </div>

                {!submitted ? (
                    <>
                        <h2 className="text-2xl font-bold text-dark mb-2">Reset Password</h2>
                        <p className="text-gray-500 mb-8">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-gray-900"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/30"
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Send Reset Link <Send className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-dark">Check your inbox</h2>
                        <p className="text-gray-500">
                            We've sent a password reset link to <strong>{email}</strong>.
                        </p>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link to="/login" className="flex items-center justify-center text-gray-600 hover:text-dark font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
