

import React, { useState } from 'react';

export const EvidenceUpload: React.FC = () => {
  const [files, setFiles] = useState<{name: string, url: string}[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Added explicit File type to ensure the compiler recognizes file properties like .name
      const newFiles = Array.from(e.target.files).map((file: File) => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
      <h3 className="text-xl font-extrabold text-slate-800 mb-2">Registrar Provas</h3>
      <p className="text-sm text-slate-500 mb-4">Fotos de painéis, bilhetes e vouchers são fundamentais.</p>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {files.map((f, i) => (
          <div key={i} className="aspect-square rounded-xl overflow-hidden relative border border-slate-200">
             <img src={f.url} alt="Evidence" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                <span className="text-[8px] text-white truncate font-bold">{f.name}</span>
             </div>
          </div>
        ))}
        <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 transition-colors">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[10px] font-bold text-slate-400 mt-2">ANEXAR FOTO</span>
          <input type="file" className="hidden" multiple accept="image/*" capture="environment" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};