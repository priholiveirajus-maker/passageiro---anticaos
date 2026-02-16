
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, phone: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = () => {
    if (!email || !phone) {
      alert("Por favor, preencha e-mail e celular.");
      return;
    }
    onLogin(email, phone);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col p-8 items-center justify-center overflow-y-auto">
      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-orange-100">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
      </div>
      <h2 className="text-3xl font-black text-slate-800 mb-1">Passageiro Anticaos</h2>
      <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-4">
        Priscyla Oliveira - Advogada
      </p>
      <p className="text-slate-500 text-center mb-8 max-w-xs text-sm">
        Sua central de emergência jurídica para problemas em voos e bagagens.
      </p>
      
      <div className="w-full max-w-sm space-y-3">
        <input 
          type="email" 
          placeholder="E-mail"
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="tel" 
          placeholder="Celular (WhatsApp)"
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Crie uma senha"
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button 
          onClick={handleSubmit}
          className="w-full py-4 bg-orange-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-100 active:scale-[0.98] transition-all"
        >
          Acessar Central
        </button>
        <p className="text-center text-[10px] text-slate-400 px-4 leading-tight">
          Ao entrar, você aceita que seus dados sejam processados para fins de suporte jurídico emergencial.
        </p>
      </div>
    </div>
  );
};
