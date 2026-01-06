
import React, { useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import { DownloadIcon, RedoIcon, UndoIcon, AdjustmentsIcon, CropIcon, GridIcon, FeedbackIcon, SmartCropIcon } from '../common/Icons';

interface ImagePreviewProps {
  imgRef: React.RefObject<HTMLImageElement>;
  imageUrl: string | null;
  isLoading: boolean;
  isCropping: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onOpenAdjustments: () => void;
  onDownloadRequest: () => void;
  onToggleCrop: () => void;
  onSmartCrop: () => void;
  crop: Crop | undefined;
  onCropChange: (crop: Crop, percentCrop: Crop) => void;
  onCropComplete: (crop: PixelCrop) => void;
  onApplyCrop: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  onOpenFeedback: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imgRef, 
  imageUrl, 
  isLoading, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo, 
  onOpenAdjustments,
  onDownloadRequest,
  isCropping,
  onToggleCrop,
  onSmartCrop,
  crop,
  onCropChange,
  onCropComplete,
  onApplyCrop,
  showGrid,
  onToggleGrid,
  onOpenFeedback
}) => {

  const GridOverlay = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/50"></div>
      <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/50"></div>
      <div className="absolute left-0 right-0 top-1/3 h-px bg-white/50"></div>
      <div className="absolute left-0 right-0 top-2/3 h-px bg-white/50"></div>
    </div>
  );

  return (
    <div className="w-full aspect-video bg-black rounded-lg shadow-2xl relative overflow-hidden flex items-center justify-center">
      {imageUrl ? (
        isCropping ? (
          <ReactCrop
            crop={crop}
            onChange={onCropChange}
            onComplete={c => onCropComplete(c)}
            aspect={16 / 9}
            className="w-full h-full"
          >
            <img ref={imgRef} src={imageUrl} alt="Crop Preview" className="object-contain w-full h-full" />
          </ReactCrop>
        ) : (
          <img ref={imgRef} src={imageUrl} alt="Generated Thumbnail" className="object-contain w-full h-full" />
        )
      ) : (
        <div className="text-slate-500">Image preview will appear here</div>
      )}

      {imageUrl && !isLoading && !isCropping && showGrid && <GridOverlay />}

      {isLoading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin h-10 w-10 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-slate-300 font-medium">Generating...</span>
          </div>
        </div>
      )}
      
      {imageUrl && !isLoading && !isCropping && (
        <>
            <button
                onClick={onOpenFeedback}
                className="absolute top-4 right-4 bg-gray-800/80 text-white rounded-full p-3 flex items-center justify-center hover:bg-gray-700/80 transition-colors shadow-lg z-10"
                aria-label="Share Feedback"
                title="Share Feedback"
            >
                <FeedbackIcon />
            </button>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                    onClick={onToggleGrid}
                    className={`${showGrid ? 'bg-sky-600' : 'bg-gray-800/80'} text-white rounded-full p-3 flex items-center justify-center hover:bg-sky-500 transition-colors shadow-lg`}
                    aria-label="Toggle Rule of Thirds Grid"
                    title="Toggle Rule of Thirds Grid"
                >
                    <GridIcon />
                </button>
                <button
                    onClick={onSmartCrop}
                    className="bg-gray-800/80 text-white rounded-full p-3 flex items-center justify-center hover:bg-gray-700/80 transition-colors shadow-lg"
                    aria-label="Smart Crop Image"
                    title="Smart Crop Image"
                >
                    <SmartCropIcon />
                </button>
                <button
                    onClick={onToggleCrop}
                    className="bg-gray-800/80 text-white rounded-full p-3 flex items-center justify-center hover:bg-gray-700/80 transition-colors shadow-lg"
                    aria-label="Crop Image"
                    title="Crop Image"
                >
                    <CropIcon />
                </button>
                <button
                    onClick={onOpenAdjustments}
                    className="bg-gray-800/80 text-white rounded-full p-3 flex items-center justify-center hover:bg-gray-700/80 transition-colors shadow-lg"
                    aria-label="Adjust Image"
                    title="Adjust Image"
                >
                    <AdjustmentsIcon />
                </button>
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className="bg-gray-800/80 text-white rounded-full p-3 flex items-center justify-center hover:bg-gray-700/80 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Undo"
                    title="Undo"
                >
                    <UndoIcon />
                </button>
                <button
                    onClick={onRedo}
                    disabled={!canRedo}
                    className="bg-gray-800/80 text-white rounded-full p-3 flex items-center justify-center hover:bg-gray-700/80 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Redo"
                    title="Redo"
                >
                    <RedoIcon />
                </button>
                <button
                onClick={onDownloadRequest}
                className="bg-sky-600 text-white rounded-full p-3 flex items-center justify-center gap-2 hover:bg-sky-500 transition-colors shadow-lg"
                aria-label="Download Image"
                title="Download Image"
                >
                    <DownloadIcon />
                </button>
            </div>
        </>
      )}
      {imageUrl && !isLoading && isCropping && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button onClick={onToggleCrop} className="px-4 py-2 text-sm font-medium text-slate-300 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
              <button onClick={onApplyCrop} className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-500 transition-colors">Apply Crop</button>
          </div>
      )}
    </div>
  );
};

export default ImagePreview;
