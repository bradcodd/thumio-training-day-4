import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbioLogo } from '../../components/common/Icons';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-slate-200 flex flex-col items-center justify-center px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <ThumbioLogo />
        <h1 className="text-xl font-bold text-slate-50">YouTube Thumbnail Editor</h1>
      </div>
      <div className="text-center max-w-lg space-y-4">
        <p className="text-6xl font-extrabold text-white">404</p>
        <p className="text-lg text-slate-400">The page you’re looking for doesn’t exist.</p>
        <Link
          to="/Studio"
          className="inline-flex items-center justify-center px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg transition-colors"
        >
          Go back to Studio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

