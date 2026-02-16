
import React, { useState } from 'react';
import { CalculationResult } from '../types';

export const Calculator: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [pernoite, setPernoite] = useState(false);
  const [missedEvent, setMissedEvent] = useState(false);
  const [vulnerable, setVulnerable] = useState(false);
  const [extravio, setExtravio] = useState(false);
  const [internacional, setInternacional] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateScore = () => {
    let score = 0;

    // Atraso points
    if (hours >= 1 && hours <= 3) score += 1;
    else if (hours >= 4 && hours <= 6) score += 2;
    else if (hours >= 7 && hours <= 12) score += 3;
    else if (hours > 12) score += 4;

    // Multipliers
    if (pernoite) score += 2;
    if (missedEvent) score += 2;
    if (vulnerable) score += 1;
    if (extravio) score += 2;
    if (internacional) score += 1;

    let level: 'Baixa' | 'Moderada' | 'Forte' | 'Robusto' = 'Baixa';
    let message = "Baixa probabilidade de dano moral relevante.";

    if (score >= 9) {
      level = 'Robusto';
      message = "Caso potencialmente robusto. Indicativo fortíssimo de indenização elevada.";
    } else if (score >= 6) {
      level = 'Forte';
      message = "Forte indicativo de indenização. O dano é considerado significativo.";
    } else if (score >= 3) {
      level = 'Moderada';
      message = "Probabilidade moderada. Recomenda-se organização rigorosa das provas.";
    }

    setResult({ score, level, message });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Robusto': return 'bg-emerald-600 text-white';
      case 'Forte': return 'bg-orange-600 text-white';
      case 'Moderada': return 'bg-amber-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-xl font-extrabold text-slate-800 mb-1">Simulador de Indenização</h3>
      <p className="text-xs text-slate-500 mb-6">Baseado na jurisprudência do Direito Aeronáutico.</p>
      
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-xs font-black text-slate-500 uppercase mb-1">Horas de atraso no destino</label>
          <select 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none appearance-none"
            onChange={(e) => setHours(Number(e.target.value))}
          >
            <option value="0">Selecione...</option>
            <option value="2">1 a 3 horas</option>
            <option value="5">4 a 6 horas</option>
            <option value="10">7 a 12 horas</option>
            <option value="15">+ de 12 horas</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-2">
            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer border border-transparent active:border-orange-500 transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded accent-orange-600" onChange={(e) => setPernoite(e.target.checked)} />
            <span className="text-sm font-bold text-slate-700">Houve Pernoite?</span>
            </label>

            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer border border-transparent active:border-orange-500 transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded accent-orange-600" onChange={(e) => setMissedEvent(e.target.checked)} />
            <span className="text-sm font-bold text-slate-700">Perdeu compromisso relevante?</span>
            </label>

            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer border border-transparent active:border-orange-500 transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded accent-orange-600" onChange={(e) => setVulnerable(e.target.checked)} />
            <span className="text-sm font-bold text-slate-700">Criança, Idoso ou PCD?</span>
            </label>

            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer border border-transparent active:border-orange-500 transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded accent-orange-600" onChange={(e) => setExtravio(e.target.checked)} />
            <span className="text-sm font-bold text-slate-700">Extravio de bagagem?</span>
            </label>

            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer border border-transparent active:border-orange-500 transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded accent-orange-600" onChange={(e) => setInternacional(e.target.checked)} />
            <span className="text-sm font-bold text-slate-700">Voo Internacional?</span>
            </label>
        </div>
      </div>

      <button 
        onClick={calculateScore}
        className="w-full py-5 bg-slate-900 text-white font-black text-lg rounded-2xl hover:bg-slate-800 transition-all mb-4 shadow-lg active:scale-95"
      >
        SIMULAR RESULTADO
      </button>

      {result && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Análise do Perfil</span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getLevelColor(result.level)}`}>
               {result.level}
            </span>
          </div>
          
          <p className="text-lg font-black text-slate-800 leading-tight mb-2">
            {result.message}
          </p>
          
          <p className="text-xs text-slate-500 leading-relaxed italic mb-6">
            Essa estimativa é meramente indicativa. O resultado final depende de análise individual e provas.
          </p>

          <button 
             className="w-full py-4 bg-orange-600 text-white rounded-xl font-black text-sm shadow-xl shadow-orange-100 flex items-center justify-center gap-2"
             onClick={() => alert("Encaminhando para análise estratégica detalhada...")}
          >
            QUERO ANÁLISE ESTRATÉGICA DO MEU CASO
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};
