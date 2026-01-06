import React from 'react';
import {
  ChevronDown,
  Send,
  Download,
  Upload,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Undo2,
  Redo2,
  Type,
  SlidersHorizontal,
  Crop,
  Filter,
  Trash2,
  Grid3x3,
  MessageCircle,
  Folder,
  MessageSquare,
  X,
  Tag,
  FileText,
  Copy,
  Zap,
} from 'lucide-react';

// Keep the custom ThumbioLogo
export const ThumbioLogo: React.FC = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="url(#paint0_linear_1_2)"/>
        <path d="M10 10H22V13H17V22H14V13H10V10Z" fill="white"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0EA5E9"/>
                <stop offset="1" stopColor="#22D3EE"/>
            </linearGradient>
        </defs>
    </svg>
);

// Re-export Lucide icons with custom wrapper names for backward compatibility
export const UserAvatarIcon: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
    <User className="w-5 h-5 text-gray-400" />
  </div>
);

export const ChevronDownIcon: React.FC = () => <ChevronDown className="w-4 h-4" />;
export const SendIcon: React.FC = () => <Send className="w-5 h-5" />;
export const DownloadIcon: React.FC = () => <Download className="w-6 h-6" />;
export const UploadIcon: React.FC = () => <Upload className="w-8 h-8 text-slate-400" strokeWidth={1.5} />;
export const BotIcon: React.FC = () => <Bot className="w-5 h-5 text-slate-900" />;
export const UserIcon: React.FC = () => <User className="w-5 h-5 text-slate-200" />;

export const SparklesIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-sky-400" }) => (
  <Sparkles className={className} />
);

export const ResetIcon: React.FC = () => <RotateCcw className="w-4 h-4" />;
export const UndoIcon: React.FC = () => <Undo2 className="w-6 h-6" />;
export const RedoIcon: React.FC = () => <Redo2 className="w-6 h-6" />;
export const TextIcon: React.FC = () => <Type className="w-6 h-6" />;
export const AdjustmentsIcon: React.FC = () => <SlidersHorizontal className="w-6 h-6" />;
export const CropIcon: React.FC = () => <Crop className="w-6 h-6" />;
export const FilterIcon: React.FC = () => <Filter className="w-6 h-6" />;
export const DeleteIcon: React.FC = () => <Trash2 className="w-[18px] h-[18px]" />;
export const GridIcon: React.FC = () => <Grid3x3 className="w-6 h-6" />;

export const ChatIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <MessageCircle className={className} />
);

export const FolderIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <Folder className={className} />
);

export const FeedbackIcon: React.FC = () => <MessageSquare className="w-6 h-6" />;
export const CloseIcon: React.FC = () => <X className="w-6 h-6" />;
export const PersonIcon: React.FC = () => <User className="w-[18px] h-[18px]" />;
export const TagIcon: React.FC = () => <Tag className="w-[18px] h-[18px]" />;
export const DocumentIcon: React.FC = () => <FileText className="w-[18px] h-[18px]" />;
export const CopyIcon: React.FC = () => <Copy className="w-4 h-4" />;

// Smart crop icon with Lucide as a combination
export const SmartCropIcon: React.FC = () => (
  <div className="relative w-6 h-6">
    <Crop className="w-6 h-6" />
    <Zap className="w-3 h-3 absolute -top-1 -right-1 text-sky-400" />
  </div>
);

// Additional commonly used Lucide icons for blur/glow effects - using closest matches
export const BlurIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M3 7c0-2.2 1.8-4 4-4" />
    <path d="M21 7c0-2.2-1.8-4-4-4" />
    <path d="M3 17c0 2.2 1.8 4 4 4" />
    <path d="M21 17c0 2.2-1.8 4-4 4" />
  </svg>
);

export const OuterGlowIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="8" strokeDasharray="2 3" />
  </svg>
);
