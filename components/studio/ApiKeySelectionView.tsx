
import React from 'react';
import { SparklesIcon, ThumbioLogo } from '../common/Icons';

interface ApiKeySelectionViewProps {
  onKeySelected: () => void;
}

const ApiKeySelectionView: React.FC<ApiKeySelectionViewProps> = ({ onKeySelected }) => {

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
    }
    // Per guidelines, assume success and proceed immediately.
    onKeySelected();
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4 bg-black text-slate-200">
      <div className="w-full max-w-lg text-center bg-gray-950 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <div className="flex justify-center mb-4">
          <ThumbioLogo />
        </div>
        <h2 className="text-2xl font-bold text-slate-50 mb-3">Welcome to YouTube Thumbnail Editor</h2>
        <p className="text-slate-400 mb-6">
          To get started and resolve potential quota issues, please select your Google AI Studio API key.
          This ensures you're using your own paid plan.
        </p>
        <button
          onClick={handleSelectKey}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition-colors focus:outline-none focus:ring-4 focus:ring-sky-500/50"
        >
          <SparklesIcon className="w-6 h-6" />
          Select Your API Key
        </button>
        <p className="text-xs text-slate-500 mt-4">
          Need help? Learn more about billing at{' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-sky-400"
          >
            ai.google.dev/gemini-api/docs/billing
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeySelectionView;