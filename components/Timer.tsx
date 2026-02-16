
import React, { useState, useEffect, useCallback } from 'react';

export const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 mb-6">
      <p className="text-xs uppercase font-bold text-slate-400 mb-2 tracking-widest text-center">Tempo de Atraso Registrado</p>
      <div className="text-4xl font-mono font-bold text-center mb-6 tabular-nums">
        {formatTime(seconds)}
      </div>
      <div className="flex gap-3">
        <button 
          onClick={toggle}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
        >
          {isActive ? 'Pausar' : 'Iniciar Timer'}
        </button>
        <button 
          onClick={reset}
          className="px-6 py-3 bg-slate-700 rounded-xl font-bold hover:bg-slate-600 transition-all"
        >
          Reset
        </button>
      </div>
      <p className="mt-4 text-[10px] text-slate-500 text-center italic">
        Dica: Comece o timer assim que o voo for dado como atrasado. Tire prints do tempo.
      </p>
    </div>
  );
};
