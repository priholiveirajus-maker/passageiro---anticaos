
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IssueButton } from './components/IssueButton';
import { Timer } from './components/Timer';
import { Calculator } from './components/Calculator';
import { EvidenceUpload } from './components/EvidenceUpload';
import { Login } from './components/Login';
import { IssueType, UserSession, AccessReport } from './types';
import { ISSUES } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IssueType | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isReporting, setIsReporting] = useState(false);

  const sendReport = async (action: string, issue?: IssueType) => {
    if (!user) return;
    
    setIsReporting(true);
    const report: AccessReport = {
      userEmail: user.email,
      userPhone: user.phone,
      timestamp: new Date().toLocaleString('pt-BR'),
      issueType: issue,
      action: action
    };

    console.log("Relatório enviado para Priscyla Oliveira:", report);
    
    // Simulating API call to owner
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsReporting(false);
  };

  const handleIssueClick = (type: IssueType) => {
    setSelectedIssue(type);
    setActiveSection(null); // Reset section visibility
    sendReport("Acesso a orientação detalhada", type);
    window.scrollTo(0, 0);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    sendReport("Copiou modelo de texto", selectedIssue || undefined);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleLogin = (email: string, phone: string) => {
    const newUser = { email, phone, isLoggedIn: true };
    setUser(newUser);
    // Auto-report login
    console.log("Novo acesso registrado para Priscyla Oliveira:", newUser);
  };

  const renderHome = () => (
    <div className="p-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 leading-tight">Olá,<br /><span className="text-orange-600">o que houve?</span></h2>
        <p className="text-slate-500 mt-2 font-medium text-sm">Priscyla Oliveira preparou orientações estratégicas para você agora.</p>
      </div>

      <div className="space-y-1">
        <IssueButton 
          type={IssueType.DELAY} 
          label="Meu voo atrasou" 
          color="border-orange-500" 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          onClick={handleIssueClick} 
        />
        <IssueButton 
          type={IssueType.CANCELLED} 
          label="Meu voo foi cancelado" 
          color="border-red-600" 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>}
          onClick={handleIssueClick} 
        />
        <IssueButton 
          type={IssueType.CONNECTION} 
          label="Perdi minha conexão" 
          color="border-amber-500" 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}
          onClick={handleIssueClick} 
        />
        <IssueButton 
          type={IssueType.OVERBOOKING} 
          label="Impedido de embarcar" 
          color="border-rose-500" 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
          onClick={handleIssueClick} 
        />
        <IssueButton 
          type={IssueType.LUGGAGE} 
          label="Bagagem extraviada" 
          color="border-slate-800" 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6M9 11V9m3 9h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6M9 11V9" /></svg>}
          onClick={handleIssueClick} 
        />
      </div>

      <div className="mt-8 p-6 bg-slate-800 rounded-3xl text-white shadow-xl shadow-slate-200">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center font-black text-xl">P</div>
           <div>
              <p className="font-black text-sm uppercase tracking-tighter">Priscyla Oliveira</p>
              <p className="text-[10px] text-orange-400 font-bold uppercase leading-none">Especialista em Direito Aéreo</p>
           </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-6 italic">
          "Meu objetivo é garantir que nenhum passageiro seja prejudicado pelo descaso das companhias. Utilize as ferramentas abaixo para fortalecer suas provas."
        </p>
        
        <button 
          onClick={() => { setShowCalculator(true); sendReport("Acesso simulador"); }}
          className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
        >
          <div className="flex items-center gap-3">
             <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
             <span className="font-bold text-sm">Simulador de Indenização</span>
          </div>
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      
      <div className="mt-8 mb-20 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Passageiro Anticaos</p>
        <p className="text-slate-300 text-[9px] font-medium leading-tight">Este aplicativo não substitui consulta jurídica individualizada.<br />Desenvolvido para apoio imediato no aeroporto.</p>
      </div>
    </div>
  );

  const renderIssueDetail = (type: IssueType) => {
    const content = ISSUES[type];
    
    const toggleSection = (section: string) => {
      setActiveSection(activeSection === section ? null : section);
      if (activeSection !== section) {
        sendReport(`Abriu seção: ${section}`, type);
      }
    };

    return (
      <div className="p-4 pb-24 animate-in fade-in duration-500">
        <button 
          onClick={() => { setSelectedIssue(null); setActiveSection(null); }}
          className="flex items-center gap-2 text-slate-500 font-bold mb-4 active:translate-x-[-4px] transition-transform text-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          VOLTAR À HOME
        </button>

        <h2 className="text-3xl font-black text-slate-800 mb-6 leading-tight">{content.title}</h2>

        {type === IssueType.DELAY && <Timer />}

        <div className="space-y-4 mb-8">
          {/* Section 1 Button */}
          <div>
            <button 
              onClick={() => toggleSection('now')}
              className={`w-full p-4 flex items-center justify-between rounded-2xl border-2 transition-all font-bold ${activeSection === 'now' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-slate-100 text-slate-700 shadow-sm'}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-sm">1</span>
                <span>O que fazer AGORA</span>
              </div>
              <svg className={`w-5 h-5 transition-transform ${activeSection === 'now' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {activeSection === 'now' && (
              <div className="mt-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4 animate-in slide-in-from-top-2 duration-200">
                {content.now.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="min-w-[20px] h-5 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 mt-0.5">{i+1}</div>
                    <p className="text-sm font-semibold text-slate-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2 Button */}
          <div>
            <button 
              onClick={() => toggleSection('rights')}
              className={`w-full p-4 flex items-center justify-between rounded-2xl border-2 transition-all font-bold ${activeSection === 'rights' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-white border-slate-100 text-slate-700 shadow-sm'}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black text-sm">2</span>
                <span>O que exigir</span>
              </div>
              <svg className={`w-5 h-5 transition-transform ${activeSection === 'rights' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {activeSection === 'rights' && (
              <div className="mt-2 grid gap-3 animate-in slide-in-from-top-2 duration-200">
                {content.rights.map((right, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
                    <span className="text-[10px] font-black text-orange-600 uppercase mb-1 tracking-wider">{right.label}</span>
                    <span className="text-sm font-bold text-slate-700 leading-tight">{right.desc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3 Button */}
          <div>
            <button 
              onClick={() => toggleSection('evidence')}
              className={`w-full p-4 flex items-center justify-between rounded-2xl border-2 transition-all font-bold ${activeSection === 'evidence' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-700 shadow-sm'}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${activeSection === 'evidence' ? 'bg-white text-slate-800' : 'bg-slate-800 text-white'}`}>3</span>
                <span>O que registrar</span>
              </div>
              <svg className={`w-5 h-5 transition-transform ${activeSection === 'evidence' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {activeSection === 'evidence' && (
              <div className="mt-2 space-y-4 animate-in slide-in-from-top-2 duration-200">
                <div className="bg-slate-800 rounded-2xl p-5 text-white">
                  <ul className="space-y-3">
                    {content.evidence.map((ev, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {ev}
                      </li>
                    ))}
                  </ul>
                </div>
                <div onClick={() => sendReport("Tentativa de upload de prova", type)}>
                  <EvidenceUpload />
                </div>
              </div>
            )}
          </div>

          {/* Section 4 Button */}
          <div>
            <button 
              onClick={() => toggleSection('templates')}
              className={`w-full p-4 flex items-center justify-between rounded-2xl border-2 transition-all font-bold ${activeSection === 'templates' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-100 text-slate-700 shadow-sm'}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-sm">4</span>
                <span>Modelos de textos prontos</span>
              </div>
              <svg className={`w-5 h-5 transition-transform ${activeSection === 'templates' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {activeSection === 'templates' && (
              <div className="mt-2 animate-in slide-in-from-top-2 duration-200">
                {content.templates.map((tpl, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">{tpl.label}</span>
                      <button 
                        onClick={() => copyToClipboard(tpl.text, i)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black transition-all ${copiedIndex === i ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {copiedIndex === i ? 'COPIADO!' : 'COPIAR'}
                      </button>
                    </div>
                    <p className="text-sm font-medium text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed border border-slate-100 italic">
                      "{tpl.text}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-4 left-0 right-0 z-40 px-4">
          <button 
             className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-200 active:scale-95 transition-all flex items-center justify-center gap-3"
             disabled={isReporting}
             onClick={() => {
               sendReport("Solicitou análise de caso completa", type);
               alert("Sua solicitação de análise foi registrada e enviada para a Dra. Priscyla Oliveira. Entraremos em contato via WhatsApp.");
             }}
          >
            {isReporting ? 'ENVIANDO RELATÓRIO...' : 'QUERO ANÁLISE DO MEU CASO'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderCalculatorOverlay = () => (
    <div className="fixed inset-0 z-[60] bg-slate-50 overflow-y-auto p-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-50 py-2">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Simulador</h2>
          <p className="text-[10px] font-black text-orange-600 uppercase">Por Priscyla Oliveira</p>
        </div>
        <button 
          onClick={() => setShowCalculator(false)}
          className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <Calculator />
      <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 mb-20">
         <h4 className="font-bold text-blue-800 mb-2">Orientações Finais</h4>
         <p className="text-xs text-blue-700 leading-relaxed italic">"Dano moral no Direito Aéreo vai além do atraso; é sobre a dignidade do passageiro e o cumprimento dos deveres da companhia." - Dra. Priscyla.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen max-w-md mx-auto bg-slate-50 relative">
      {!user && <Login onLogin={handleLogin} />}
      
      <Header onGoHome={() => { setSelectedIssue(null); setShowCalculator(false); setActiveSection(null); }} />
      
      <main className="safe-bottom">
        {selectedIssue ? renderIssueDetail(selectedIssue) : renderHome()}
      </main>

      {showCalculator && renderCalculatorOverlay()}

      {/* Nav bar for easier access when scrolled */}
      {!selectedIssue && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-slate-200 px-6 py-4 flex justify-around max-w-md mx-auto rounded-t-3xl shadow-2xl">
          <button className="flex flex-col items-center gap-1 text-orange-600" onClick={() => setSelectedIssue(null)}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400" onClick={() => { setShowCalculator(true); sendReport("Nav: Calculadora"); }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <span className="text-[10px] font-black uppercase tracking-tighter">Simulador</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400" onClick={() => sendReport("Nav: Perfil")}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px] font-black uppercase tracking-tighter">Perfil</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
