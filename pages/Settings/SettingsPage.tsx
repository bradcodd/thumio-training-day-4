import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbioLogo } from '../../components/common/Icons';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [email] = useState('user@example.com');
  const [plan] = useState('Free - Basic features with limited AI analysis');
  const [aiAnalysisOnUpload, setAiAnalysisOnUpload] = useState(true);
  const [showModalOnUpload, setShowModalOnUpload] = useState(true);
  const [defaultChatMode, setDefaultChatMode] = useState('agent');
  const [defaultFormat, setDefaultFormat] = useState('jpeg');
  const [jpegQuality, setJpegQuality] = useState(90);
  const [autoSaveProjects, setAutoSaveProjects] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-200">
      {/* Header */}
      <header className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <ThumbioLogo />
          <h1 className="text-xl font-bold text-slate-50">YouTube Thumbnail Editor</h1>
        </div>
        <button
          onClick={() => navigate('/studio')}
          className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Back to Studio
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Settings</h2>

        {/* Account Section */}
        <section className="mb-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Account</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2.5 text-slate-300 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-slate-500">This is dummy data for demonstration</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Subscription Plan</label>
              <select
                value={plan}
                disabled
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2.5 text-slate-300 cursor-not-allowed"
              >
                <option>{plan}</option>
              </select>
              <p className="mt-1 text-xs text-slate-500">This is dummy data for demonstration</p>
            </div>
          </div>
        </section>

        {/* Branding Section */}
        <section className="mb-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Branding</h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Brand Logo</label>
            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded-md transition-colors">
              Upload Logo
            </button>
            <p className="mt-2 text-xs text-slate-500">Upload your brand logo for watermarking feature coming soon</p>
          </div>
        </section>

        {/* AI Preferences Section */}
        <section className="mb-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">AI Preferences</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-white mb-1">AI Analysis on Upload</label>
                <p className="text-xs text-slate-400">Automatically analyze images with AI when uploaded</p>
              </div>
              <button
                onClick={() => setAiAnalysisOnUpload(!aiAnalysisOnUpload)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  aiAnalysisOnUpload ? 'bg-emerald-500' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    aiAnalysisOnUpload ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Show Title Modal on Upload</label>
                <p className="text-xs text-slate-400">Prompt for video context when uploading new images</p>
              </div>
              <button
                onClick={() => setShowModalOnUpload(!showModalOnUpload)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showModalOnUpload ? 'bg-emerald-500' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showModalOnUpload ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Default Chat Mode</label>
              <select
                value={defaultChatMode}
                onChange={(e) => setDefaultChatMode(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="agent">Agent Mode (AI makes changes directly)</option>
                <option value="assistant">Assistant Mode (AI suggests changes)</option>
              </select>
              <p className="mt-1 text-xs text-slate-500">Choose how AI interacts with your projects by default</p>
            </div>
          </div>
        </section>

        {/* Export Preferences Section */}
        <section className="mb-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Export Preferences</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Default Download Format</label>
              <select
                value={defaultFormat}
                onChange={(e) => setDefaultFormat(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2.5 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="jpeg">JPEG (Smaller file size)</option>
                <option value="png">PNG (Higher quality)</option>
              </select>
            </div>

            {defaultFormat === 'jpeg' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-white">JPEG Quality: {jpegQuality}%</label>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span>Smaller file</span>
                    <span>Higher quality</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={jpegQuality}
                  onChange={(e) => setJpegQuality(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
            )}
          </div>
        </section>

        {/* Studio Preferences Section */}
        <section className="mb-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Studio Preferences</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Auto-Save Projects</label>
                <p className="text-xs text-slate-400">Automatically save your work when downloading</p>
              </div>
              <button
                onClick={() => setAutoSaveProjects(!autoSaveProjects)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoSaveProjects ? 'bg-emerald-500' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoSaveProjects ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Show Grid by Default</label>
                <p className="text-xs text-slate-400">Display rule of thirds grid when editing</p>
              </div>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showGrid ? 'bg-emerald-500' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showGrid ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="mb-8 bg-red-900/10 border border-red-900/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Clear All Projects</p>
                <p className="text-xs text-slate-500">Delete all saved projects from local storage</p>
              </div>
              <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 font-medium rounded-md transition-colors">
                Clear Projects
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;

