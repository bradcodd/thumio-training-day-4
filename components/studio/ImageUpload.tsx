
import React, { useCallback, useState } from 'react';
import { UploadIcon } from '../common/Icons';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, isLoading }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onImageUpload(file);
        }
    }, [onImageUpload]);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`relative block w-full rounded-lg border-2 border-dashed border-gray-700 p-12 transition-colors ${isDragging ? 'bg-gray-800/50' : ''}`}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="bg-gray-800 p-4 rounded-full">
                    <UploadIcon />
                </div>
                <span className="mt-2 block text-lg font-semibold text-slate-200">
                    Upload an image to start editing
                </span>
                <p className="text-slate-400">Drag & drop any image file or</p>
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-500 transition-colors">
                    <span>Choose File</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
                </label>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
