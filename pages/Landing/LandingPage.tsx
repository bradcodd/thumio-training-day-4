
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbioLogo, SparklesIcon, ChatIcon, FolderIcon } from '../../components/common/Icons';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const handleStartEditing = () => {
        navigate('/studio');
    };

    return (
        <div className="bg-black text-slate-200 font-sans min-h-screen">
            {/* Header */}
            <header className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <ThumbioLogo />
                    <h1 className="text-xl font-bold text-slate-50">YouTube Thumbnail Editor</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-500 transition-colors"
                    >
                        Sign up
                    </button>
                </div>
            </header>

            <main>
                {/* Top Fold / Hero Section */}
                <section className="text-center py-20 md:py-32 px-6 bg-gray-950/20 border-b border-gray-800">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-50 mb-4 tracking-tight">
                            Create Stunning YouTube Thumbnails in Seconds
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-8">
                            Use our AI-powered, chat-based editor to bring your ideas to life. No design skills needed.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <button
                                onClick={handleStartEditing}
                                className="px-8 py-4 text-lg font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition-transform hover:scale-105 w-full sm:w-auto"
                            >
                                Start Editing for Free
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-8 py-4 text-lg font-semibold text-sky-200 border border-sky-700 rounded-lg hover:bg-sky-950/40 transition-colors w-full sm:w-auto"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </section>

                {/* Content / Features Section */}
                <section className="py-20 md:py-24 px-6 md:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl font-bold text-slate-100">A Radically Simple Workflow</h3>
                            <p className="text-slate-400 mt-2">Just upload, chat, and download.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 flex flex-col items-center">
                                <div className="bg-gray-800 p-4 rounded-full mb-4">
                                    <ChatIcon className="w-8 h-8 text-sky-400" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2 text-slate-100">Chat-Based Editing</h4>
                                <p className="text-slate-400">
                                    Describe your edits in plain English. Our AI understands and applies them instantly.
                                </p>
                            </div>
                            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 flex flex-col items-center">
                                <div className="bg-gray-800 p-4 rounded-full mb-4">
                                    <SparklesIcon className="w-8 h-8 text-sky-400" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2 text-slate-100">AI-Powered Tools</h4>
                                <p className="text-slate-400">
                                    From background removal to adding glows and filters, complex edits are a message away.
                                </p>
                            </div>
                            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 flex flex-col items-center">
                                <div className="bg-gray-800 p-4 rounded-full mb-4">
                                    <FolderIcon className="w-8 h-8 text-sky-400" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2 text-slate-100">Project Management</h4>
                                <p className="text-slate-400">
                                    Save your work in your browser, load previous projects, and stay organized.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 px-6 md:px-12 border-t border-gray-800">
                <div className="max-w-5xl mx-auto text-center text-slate-500 text-sm">
                    <div className="flex justify-center gap-6 mb-4">
                        <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Thumbio. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;