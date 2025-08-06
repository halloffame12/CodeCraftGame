
import React from 'react';
import DownloadIcon from './icons/DownloadIcon';
import SparklesIcon from './icons/SparklesIcon';
import LogoutIcon from './icons/LogoutIcon';

interface HeaderProps {
  onExport: () => void;
  isExportDisabled: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onExport, isExportDisabled, onLogout }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 p-3 flex justify-between items-center shadow-md shrink-0">
      <div className="flex items-center gap-3">
        <SparklesIcon className="w-7 h-7 text-indigo-400" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-50 tracking-wider">CodeCraft AI</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={onExport}
          disabled={isExportDisabled}
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          <DownloadIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Export</span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-700 text-white font-semibold rounded-md shadow-sm hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
          aria-label="Logout"
        >
          <LogoutIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;