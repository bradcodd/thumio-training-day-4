
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResetIcon, ThumbioLogo, UserAvatarIcon, ChevronDownIcon } from '../common/Icons';

interface HeaderProps {
    onReset: () => void;
    hasImage: boolean;
}

const Header: React.FC<HeaderProps> = ({ onReset, hasImage }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex-shrink-0 flex items-center justify-between p-4 bg-black border-b border-gray-800 shadow-md">
      <div className="flex items-center gap-3">
        <ThumbioLogo />
        <h1 className="text-xl font-bold text-slate-50">
          YouTube Thumbnail Editor
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {hasImage && (
          <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-gray-900 rounded-md border border-gray-700 hover:bg-red-900/50 hover:border-red-700 hover:text-red-300 transition-colors"
              title="Start over with a new image"
          >
              <ResetIcon />
              Start Over
          </button>
        )}
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
                <UserAvatarIcon />
                <ChevronDownIcon />
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                    <ul className="py-1">
                        <li>
                            <button 
                              onClick={() => navigate('/settings')}
                              className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-gray-800"
                            >
                                Settings
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;