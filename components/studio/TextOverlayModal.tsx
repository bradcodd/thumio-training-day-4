
import React, { useState, useEffect } from 'react';

interface TextOverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
}

const FONTS = ["Impact", "Arial Black", "Comic Sans MS", "Montserrat", "Bebas Neue", "Lobster"];
const POSITIONS = [
    "Bottom Center", "Top Center", "Center", "Top Left", 
    "Top Right", "Bottom Left", "Bottom Right"
];

const TextOverlayModal: React.FC<TextOverlayModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');
  const [font, setFont] = useState(FONTS[0]);
  const [size, setSize] = useState(72);
  const [color, setColor] = useState('#FFFFFF');
  const [position, setPosition] = useState(POSITIONS[0]);
  const [outline, setOutline] = useState(true);

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
    if (!text.trim()) return;

    let prompt = `Add the text "${text}" to the image.`;
    prompt += ` Use a font that looks like ${font}.`;
    prompt += ` The font size should be large and impactful, around ${size}px relative to a 1920x1080 image.`;
    prompt += ` The text color must be ${color}.`;
    if (outline) {
      prompt += ` Add a thick black outline or a drop shadow to the text to ensure it is highly readable against any background.`;
    }
    prompt += ` Place the text in the "${position}" area of the image.`;
    prompt += ` The text should be a main focus, so make it bold and eye-catching.`;
    
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
        <h2 className="text-xl font-bold text-slate-100 mb-4">Add Text Overlay</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="text-content" className="block text-sm font-medium text-slate-300 mb-1">Text</label>
            <input
              id="text-content"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Your awesome text..."
              className="w-full bg-gray-800 text-slate-200 placeholder-slate-400 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="font-family" className="block text-sm font-medium text-slate-300 mb-1">Font Style</label>
                <select id="font-family" value={font} onChange={(e) => setFont(e.target.value)} className="w-full bg-gray-800 text-slate-200 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
            </div>
             <div>
                <label htmlFor="font-size" className="block text-sm font-medium text-slate-300 mb-1">Size ({size}px)</label>
                <input id="font-size" type="range" min="24" max="144" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="text-color" className="block text-sm font-medium text-slate-300 mb-1">Color</label>
              <input
                id="text-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 p-1 bg-gray-800 border border-gray-700 rounded-md cursor-pointer"
              />
            </div>
            <div>
                <label htmlFor="position" className="block text-sm font-medium text-slate-300 mb-1">Position</label>
                <select id="position" value={position} onChange={(e) => setPosition(e.target.value)} className="w-full bg-gray-800 text-slate-200 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
          </div>

           <div>
              <div className="flex items-center">
                <input
                    id="outline"
                    type="checkbox"
                    checked={outline}
                    onChange={(e) => setOutline(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="outline" className="ml-2 block text-sm text-slate-300">Add black outline/shadow</label>
              </div>
           </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-500 transition-colors">Add Text</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextOverlayModal;
