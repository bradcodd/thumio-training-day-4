
import React, { useEffect } from 'react';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
  imageUrl: string | null;
}

const FILTERS = [
  { name: 'Vintage', css: 'sepia(0.6) contrast(1.1) brightness(0.9) saturate(1.2)', prompt: 'Apply a warm, vintage filter to the image, giving it a faded, old-fashioned look suitable for a dramatic thumbnail.' },
  { name: 'Grayscale', css: 'grayscale(1)', prompt: 'Convert the image to black and white. Make it high-contrast and dramatic.' },
  { name: 'Sepia', css: 'sepia(1)', prompt: 'Apply a strong sepia filter to the image, giving it a classic, brownish tone.' },
  { name: 'Technicolor', css: 'contrast(1.5) saturate(1.5)', prompt: 'Apply a technicolor-like effect to the image. Greatly boost the contrast and saturation to make the colors extremely vibrant and pop off the screen.' },
  { name: 'Solarize', css: 'invert(0.8) contrast(1.2)', prompt: 'Apply a solarize effect to the image, inverting the colors partially to create a surreal, artistic look.' },
  { name: 'Cool', css: 'contrast(1.1) brightness(1.05)', prompt: 'Give the image a cool, cinematic color grade. Enhance the blues and teals while slightly desaturating warmer tones.' },
];

const FiltersModal: React.FC<FiltersModalProps> = ({ isOpen, onClose, onSubmit, imageUrl }) => {
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

  const handleFilterClick = (prompt: string) => {
    onSubmit(prompt);
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-2xl border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-100">Apply a Filter</h2>
            <button onClick={onClose} className="px-3 py-1 text-sm font-medium text-slate-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">Close</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FILTERS.map((filter) => (
            <div 
              key={filter.name} 
              className="cursor-pointer group"
              onClick={() => handleFilterClick(filter.prompt)}
            >
              <div className="aspect-video bg-black rounded-md overflow-hidden border-2 border-gray-700 group-hover:border-sky-500 transition-all">
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt={filter.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    style={{ filter: filter.css }}
                  />
                )}
              </div>
              <p className="text-center text-sm font-medium text-slate-300 mt-2">{filter.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
