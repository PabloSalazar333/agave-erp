import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AgaveCopilot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Agave Copilot. I can help you navigate or answer questions. Try 'Go to Users' or 'Show Sales'.", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        // User message
        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Process Mock AI Response
        setTimeout(() => {
            const response = processCommand(input);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }]);
        }, 600);
    };

    const processCommand = (cmd) => {
        const lower = cmd.toLowerCase();

        if (lower.includes('user') || lower.includes('usuario')) {
            navigate('/users');
            return "Navigating to User Management...";
        }
        if (lower.includes('dashboard') || lower.includes('home') || lower.includes('inicio')) {
            navigate('/');
            return "Taking you back to the Dashboard.";
        }
        if (lower.includes('setting') || lower.includes('config')) {
            navigate('/settings');
            return "Opening Settings.";
        }
        if (lower.includes('sale') || lower.includes('ventas')) {
            // Mock data interpretation
            return "Sales look good! You're up 12% today. (Mock Data)";
        }
        if (lower.includes('hello') || lower.includes('hola')) {
            return "Hello! How can I assist you with your ERP today?";
        }

        return "I'm still learning! I can help you navigate to 'Users', 'Settings', or 'Dashboard'.";
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
                    <div className="bg-gradient-to-r from-primary to-blue-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                            <span className="font-semibold">Agave Copilot</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 text-sm rounded-2xl ${msg.sender === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <button
                            onClick={handleSend}
                            className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform group"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Bot className="w-7 h-7 group-hover:animate-bounce" />
                )}
            </button>
        </div>
    );
};

export default AgaveCopilot;
