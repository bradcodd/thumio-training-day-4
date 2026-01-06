
import React, { useState, useEffect } from 'react';

interface AdjustmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
}

const AdjustmentsModal: React.FC<AdjustmentsModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);

  useEffect(() => {
    if (isOpen) {
        // Reset on open
        setBrightness(0);
        setContrast(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brightness === 0 && contrast === 0) {
        onClose();
        return;
    }

    let prompt = `Adjust the image to make it more vibrant.`;
    if (brightness !== 0) {
      prompt += ` Change the brightness by about ${brightness}%.`;
    }
    if (contrast !== 0) {
      prompt += ` Change the contrast by about ${contrast}%.`;
    }
    prompt += ` Keep the changes looking professional and suitable for a YouTube thumbnail.`;
    
    onSubmit(prompt);
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-md border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-slate-100 mb-6">Adjust Brightness & Contrast</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="brightness" className="block text-sm font-medium text-slate-300 mb-2 flex justify-between">
                <span>Brightness</span>
                <span className="font-bold text-sky-400">{brightness}%</span>
            </label>
            <input 
                id="brightness" 
                type="range" 
                min="-50" 
                max="50" 
                value={brightness} 
                onChange={(e) => setBrightness(Number(e.target.value))} 
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500" 
            />
          </div>

          <div>
            <label htmlFor="contrast" className="block text-sm font-medium text-slate-300 mb-2 flex justify-between">
                <span>Contrast</span>
                 <span className="font-bold text-sky-400">{contrast}%</span>
            </label>
            <input 
                id="contrast" 
                type="range" 
                min="-50" 
                max="50" 
                value={contrast} 
                onChange={(e) => setContrast(Number(e.target.value))} 
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500" 
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-500 transition-colors">Apply Adjustments</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdjustmentsModal;
