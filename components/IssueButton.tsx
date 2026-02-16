
import React from 'react';
import { IssueType } from '../types';

interface IssueButtonProps {
  type: IssueType;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: (type: IssueType) => void;
}

export const IssueButton: React.FC<IssueButtonProps> = ({ type, label, icon, color, onClick }) => {
  return (
    <button
      onClick={() => onClick(type)}
      className={`w-full flex items-center p-5 rounded-2xl shadow-md active:scale-95 transition-all mb-4 text-left border-l-8 ${color} bg-white`}
    >
      <div className="mr-4 text-slate-700">
        {icon}
      </div>
      <span className="font-bold text-slate-800 text-lg leading-tight flex-1">
        {label}
      </span>
      <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};
