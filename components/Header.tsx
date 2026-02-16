
import React from 'react';

interface HeaderProps {
  onGoHome: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, title = 'Passageiro Anticaos' }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={onGoHome}>
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-slate-800 uppercase leading-none">{title}</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
              Priscyla Oliveira - Advogada do Direito Aéreo
            </p>
          </div>
        </div>
        <button 
          onClick={onGoHome}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </div>
    </header>
  );
};
