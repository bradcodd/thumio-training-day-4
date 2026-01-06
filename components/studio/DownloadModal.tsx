
import React, { useState, useEffect } from 'react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (filename: string, format: 'png' | 'jpeg', quality: number) => void;
  username: string;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, onSubmit, username }) => {
  const [filename, setFilename] = useState(`${username}-thumbnail`);
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [quality, setQuality] = useState(90);

  useEffect(() => {
    if (isOpen) {
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      setFilename(`${username}-thumbnail-${randomNumber}`);
      setFormat('png');
      setQuality(90);
    }
  }, [isOpen, username]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filename.trim()) return;
    onSubmit(filename, format, quality);
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-sm border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-slate-100 mb-4">Download Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="filename" className="block text-sm font-medium text-slate-300 mb-1">Filename</label>
            <div className="flex rounded-md shadow-sm">
              <input
                id="filename"
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="block w-full min-w-0 flex-1 rounded-none rounded-l-md bg-gray-800 text-slate-200 placeholder-slate-400 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-700 bg-gray-700 px-3 text-sm text-slate-400">.{format === 'jpeg' ? 'jpg' : 'png'}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Format</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="png"
                  checked={format === 'png'}
                  onChange={() => setFormat('png')}
                  className="h-4 w-4 border-gray-600 bg-gray-700 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-slate-200">PNG</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="jpeg"
                  checked={format === 'jpeg'}
                  onChange={() => setFormat('jpeg')}
                  className="h-4 w-4 border-gray-600 bg-gray-700 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-slate-200">JPG</span>
              </label>
            </div>
          </div>

          {format === 'jpeg' && (
            <div>
              <label htmlFor="quality" className="block text-sm font-medium text-slate-300 mb-2 flex justify-between">
                <span>Quality</span>
                <span className="font-bold text-sky-400">{quality}</span>
              </label>
              <input 
                  id="quality" 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => setQuality(Number(e.target.value))} 
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500" 
              />
            </div>
          )}

          <div className="text-center text-xs text-slate-400 bg-gray-800/50 p-2 rounded-md">
              All thumbnails are downloaded at <strong>1080p (1920x1080)</strong> resolution.
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-500 transition-colors">Download</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DownloadModal;
