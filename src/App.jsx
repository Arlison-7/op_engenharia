import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  HardHat, 
  Calendar, 
  Terminal, 
  Layers, 
  Check, 
  Building2, 
  Activity, 
  Maximize2,
  Clock,
  Compass,
  FileCode
} from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// PORTFÓLIO: BANCO DE DADOS DAS OBRAS (LOCAL)
// ==========================================
// Configure aqui os links das fotos de cada obra executada.
const dadosObras = {
  'areninha': {
    titulo: 'Areninha Esportiva - Bairro Alto da Colina',
    categoria: 'areninha',
    imagemCapa: 'https://i.postimg.cc/9XnNncxr/PRACINHA-COLINA-03.jpg',
    imagens: [
      'https://i.postimg.cc/BZVwVJht/PRACINHA-COLINA-04.jpg',
      'https://i.postimg.cc/PfRFRd6C/PRACINHA-COLINA-05.jpg',
      'https://i.postimg.cc/G35S5bMh/PRACINHA-COLINA-01.jpg'
    ]
  },
  'ete': {
    titulo: 'Estação de Tratamento de Esgoto (ETE) em execução - Abatedouro de Novo Oriente',
    categoria: 'ete',
    imagemCapa: 'https://i.postimg.cc/4yqL717T/ETE-02.jpg',
    imagens: [
      'https://i.postimg.cc/rs3n0902/ETE-01.jpg',
    ]
  },
  'revit-hidro': {
    titulo: 'Projetos Residenciais (Revit)',
    categoria: 'infra',
    imagemCapa: 'https://i.postimg.cc/Gmvjjygj/Projeto-residencial-3D.png',
    imagens: [
      'https://i.postimg.cc/63qRF2zt/Projeto-de-sobrado-pavimento-terreo.png',
      'https://i.postimg.cc/zDWSNW8Z/Projeto-sobrado-1-pavimento.png'
    ]
  }
};

const listaObras = Object.entries(dadosObras).map(([key, val]) => ({
  id: key,
  ...val
}));


export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [liveLog, setLiveLog] = useState('');
  const [logIndex, setLogIndex] = useState(0);
  const [logCharIndex, setLogCharIndex] = useState(0);
  const [schedulerActiveDay, setSchedulerActiveDay] = useState(null);
  const [schedulerSaved, setSchedulerSaved] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [selectedObra, setSelectedObra] = useState(null);

  // References for GSAP animations
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);
  const philosophyTextRef = useRef(null);
  const protocolContainerRef = useRef(null);
  const cursorRef = useRef(null);
  const gridContainerRef = useRef(null);
  const saveBtnRef = useRef(null);

  // 1. Navbar scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero elements entrance
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-title-sans',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.hero-title-serif',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      // ScrollTrigger for Philosophy section text reveal
      const words = philosophyTextRef.current.querySelectorAll('.reveal-word');
      gsap.fromTo(words,
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: true,
          }
        }
      );

      // ScrollTrigger for Stacking Cards in Protocol
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: cards[index + 1],
              start: 'top 80%',
              end: 'top 20%',
              scrub: true,
            },
            scale: 0.92,
            filter: 'blur(8px)',
            opacity: 0.45,
            transformOrigin: 'top center',
            ease: 'none'
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // 3. Shuffler logic (Fidelidade Arquitetônica Executiva)
  const [shuffleItems, setShuffleItems] = useState([
    { id: 'item-1', label: 'BIM 5D', title: 'Modelagem Paramétrica', desc: 'Prevenção de 100% de colisões geométricas entre arquitetura, estrutura e hidráulica.' },
    { id: 'item-2', label: 'Detalhamento', title: 'Precisão Executiva', desc: 'Detalhamento de acabamentos e juntas com especificações de escala 1:1.' },
    { id: 'item-3', label: 'Conformidade', title: 'Auditoria de Escopo', desc: 'Verificação contínua para garantir conformidade estética com o projeto autoral.' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffleItems(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 4. Typewriter telemetry feed (Controle Tecnológico de Cronograma)
  const telemetryLogs = [
    'SISTEMA: Conexão segura estabelecida com nuvem BIM 360.',
    'LOG: Cronograma físico-financeiro atualizado. Desvio médio: 0.00%.',
    'ANÁLISE: Caminho crítico monitorado via algoritmo preditivo.',
    'METRICA: Índice de Desempenho de Prazo (IDP) calibrado em 1.04.',
    'STATUS: Auditoria concluída para a concretagem do bloco estrutural B.',
    'DADO: Rastreamento térmico do concreto em tempo real: Estável (27.4°C).'
  ];

  useEffect(() => {
    const currentMessage = telemetryLogs[logIndex];
    if (logCharIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setLiveLog(prev => prev + currentMessage[logCharIndex]);
        setLogCharIndex(prev => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLiveLog('');
        setLogCharIndex(0);
        setLogIndex(prev => (prev + 1) % telemetryLogs.length);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [logIndex, logCharIndex]);

  // 5. Cursor Protocol Scheduler Animation (Planejamento de Suprimentos)
  useEffect(() => {
    const runSchedulerAnimation = () => {
      if (!cursorRef.current || !gridContainerRef.current || !saveBtnRef.current) return;

      const gridRect = gridContainerRef.current.getBoundingClientRect();
      const saveBtnRect = saveBtnRef.current.getBoundingClientRect();
      const cardRect = gridContainerRef.current.parentElement.getBoundingClientRect();

      // Find the Wednesday cell (index 3 in a 0-6 array)
      const dayCells = gridContainerRef.current.querySelectorAll('.day-cell');
      const targetCell = dayCells[3]; // Wednesday
      if (!targetCell) return;
      
      const targetRect = targetCell.getBoundingClientRect();

      // Target positions relative to card container
      const startX = cardRect.width * 0.85;
      const startY = cardRect.height * 0.85;

      const step1X = targetRect.left - cardRect.left + (targetRect.width / 2);
      const step1Y = targetRect.top - cardRect.top + (targetRect.height / 2);

      const step2X = saveBtnRect.left - cardRect.left + (saveBtnRect.width / 2);
      const step2Y = saveBtnRect.top - cardRect.top + (saveBtnRect.height / 2);

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      setSchedulerActiveDay(null);
      setSchedulerSaved(false);

      tl.set(cursorRef.current, { x: startX, y: startY, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        // Move to cell
        .to(cursorRef.current, { x: step1X, y: step1Y, duration: 1.2, ease: 'power2.inOut' })
        // Click action
        .to(cursorRef.current, { scale: 0.8, duration: 0.15, yoyo: true, repeat: 1 })
        .to(targetCell, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, '-=0.3')
        .call(() => setSchedulerActiveDay(3))
        // Move to Save Button
        .to(cursorRef.current, { x: step2X, y: step2Y, duration: 1.0, ease: 'power2.inOut', delay: 0.3 })
        // Click action
        .to(cursorRef.current, { scale: 0.8, duration: 0.15, yoyo: true, repeat: 1 })
        .to(saveBtnRef.current, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 }, '-=0.3')
        .call(() => setSchedulerSaved(true))
        // Fade out
        .to(cursorRef.current, { opacity: 0, duration: 0.4, delay: 0.6 })
        .delay(1.5);
    };

    const timeout = setTimeout(runSchedulerAnimation, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-screen bg-off-white text-black-dark font-sans select-none">
      {/* Dynamic noise overlay for premium cinematic texture */}
      <div className="noise-overlay" />

      {/* A. NAVBAR — "The Floating Island" */}
      <header 
        id="navbar" 
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full py-3 px-6 md:px-8 flex items-center justify-between
          ${isScrolled 
            ? 'top-4 w-[92%] max-w-5xl bg-off-white/80 backdrop-blur-xl border border-black-dark/10 shadow-lg text-black-dark' 
            : 'top-6 w-[95%] max-w-6xl bg-transparent text-paper'
          }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs uppercase tracking-widest text-signal-red font-bold">●</span>
          <span className="font-sans font-bold tracking-tighter text-base md:text-lg">
            O.P. ENGENHARIA
          </span>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-8 font-mono text-xs uppercase tracking-wider">
          <a href="#features" className="hover-lift hover:text-signal-red transition-colors duration-300">Soluções</a>
          <a href="#philosophy" className="hover-lift hover:text-signal-red transition-colors duration-300">Manifesto</a>
          <a href="#protocol" className="hover-lift hover:text-signal-red transition-colors duration-300">Método</a>
          <a href="#portfolio" className="hover-lift hover:text-signal-red transition-colors duration-300">Portfólio</a>
        </nav>

        {/* CTA Button */}
        <a 
          href="https://wa.me/5588996389702?text=Olá! Gostaria de solicitar um orçamento de projeto/execução com a O.P. Engenharia."
          target="_blank"
          rel="noopener noreferrer"
          id="nav-cta-btn"
          className={`magnetic-btn text-xs font-mono uppercase tracking-wider py-2.5 px-5 rounded-full border transition-all duration-300 flex items-center gap-2
            ${isScrolled 
              ? 'bg-signal-red border-signal-red text-off-white hover:bg-black-dark hover:border-black-dark' 
              : 'bg-paper/10 border-paper/30 text-paper hover:bg-paper hover:text-black-dark'
            }`}
        >
          <span className="btn-slide" />
          <span className="relative z-10 flex items-center gap-1.5">
            Contato <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </a>
      </header>

      {/* B. HERO SECTION — "The Opening Shot" */}
      <section 
        id="hero"
        ref={heroRef}
        className="relative h-[100dvh] w-full flex flex-col justify-end bg-black-dark overflow-hidden"
      >
        {/* Real construction project background image with object-cover center positioning and dark overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/foto-obra.jpeg" 
            alt="Obra real O.P. Engenharia"
            className="w-full h-full object-cover object-center opacity-60"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-dark via-black-dark/75 to-black-dark/30" />
        </div>

        {/* Centered content layout for enhanced visual balance and legibility */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-16 md:pb-24 flex flex-col items-center justify-center h-full text-center">
          <div className="space-y-6 max-w-4xl flex flex-col items-center">
            {/* Giant Typographical Contrast Headline */}
            <h1 className="flex flex-col items-center text-center leading-none tracking-tighter">
              <span className="hero-title-sans font-sans font-bold text-4xl sm:text-5xl md:text-7xl uppercase text-paper tracking-tighter">
                DESENVOLVA SEU
              </span>
              <span className="hero-title-serif font-serif italic text-5xl sm:text-7xl md:text-9xl text-paper text-shadow-lg leading-tight mt-2">
                Projeto Conosco!
              </span>
            </h1>

            {/* Sub-tagline */}
            <p className="hero-cta text-paper/80 font-sans text-sm md:text-lg max-w-2xl font-light leading-relaxed text-center mx-auto">
              Engenharia consultiva e gestão de obras. Desenvolvemos projetos personalizados e execuções sob medida para a sua necessidade.
            </p>

            {/* Magnetic Hero CTA Button */}
            <div className="hero-cta pt-4 flex justify-center w-full">
              <a 
                href="https://wa.me/5588996389702?text=Olá! Gostaria de solicitar um orçamento de projeto/execução com a O.P. Engenharia."
                target="_blank"
                rel="noopener noreferrer"
                id="hero-main-cta"
                className="magnetic-btn group bg-signal-red text-off-white font-mono text-xs uppercase tracking-wider py-4 px-8 rounded-full inline-flex items-center gap-3 border border-signal-red hover:bg-[#e8e4dd] hover:text-black-dark transition-all duration-300"
              >
                <span className="btn-slide bg-paper" />
                <span className="relative z-10 flex items-center gap-2">
                  SOLICITE SEU ORÇAMENTO.
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Grid Coordinates for Brutalist feel */}
        <div className="absolute bottom-6 right-6 hidden md:block z-10 text-paper/30 font-mono text-[10px] tracking-widest uppercase">
          SYS_LOC // 23°32'51.1"S 46°38'10.2"W
        </div>
      </section>

      {/* C. FEATURES SECTION — "Interactive Functional Artifacts" */}
      <section 
        id="features" 
        className="relative py-24 md:py-32 px-6 md:px-12 bg-off-white border-b border-black-dark/10"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black-dark/10 pb-8">
            <div>
              <span className="font-mono text-xs uppercase text-signal-red tracking-widest font-bold">// PILARES OPERACIONAIS</span>
              <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-tighter mt-2">
                Arquitetura do Controle
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm text-black-dark/70 leading-relaxed font-light">
              Deixamos de lado explicações teóricas. Visualize nossa engenharia em ação através dos nossos três principais sistemas de controle preditivo.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1 — "Diagnostic Shuffler" */}
            <div className="bg-paper p-8 rounded-brutalist border border-black-dark/10 flex flex-col justify-between h-[480px] hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-black-dark text-paper font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full uppercase">
                    PROTOCOLO 01
                  </span>
                  <Layers className="w-5 h-5 text-signal-red" />
                </div>
                <h3 className="font-sans font-bold text-xl uppercase tracking-tight">
                  Fidelidade Arquitetônica Executiva
                </h3>
                <p className="font-sans text-xs text-black-dark/70 leading-relaxed">
                  Monitoramento sistemático que garante que cada detalhe, dimensão e material idealizados no projeto original sejam executados na obra com exatidão matemática.
                </p>
              </div>

              {/* Shuffler UI Sandbox */}
              <div className="relative w-full h-44 flex items-center justify-center overflow-hidden bg-off-white/40 rounded-[1.5rem] border border-black-dark/5 p-4 mt-6">
                <div className="relative w-full h-full flex items-center justify-center">
                  {shuffleItems.map((item, idx) => {
                    // Position and layer styles based on shuffle stack
                    let positionClass = '';
                    let opacityClass = 'opacity-30';
                    let zIndex = 'z-0';
                    let scaleClass = 'scale-90';

                    if (idx === 0) {
                      positionClass = 'translate-y-0';
                      opacityClass = 'opacity-100';
                      zIndex = 'z-20';
                      scaleClass = 'scale-100';
                    } else if (idx === 1) {
                      positionClass = 'translate-y-4';
                      opacityClass = 'opacity-60';
                      zIndex = 'z-10';
                      scaleClass = 'scale-95';
                    } else {
                      positionClass = 'translate-y-8';
                      opacityClass = 'opacity-25';
                      zIndex = 'z-0';
                      scaleClass = 'scale-90';
                    }

                    return (
                      <div 
                        key={item.id}
                        className={`absolute w-[92%] bg-paper border border-black-dark/10 p-3.5 rounded-[1rem] shadow-sm transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${positionClass} ${opacityClass} ${zIndex} ${scaleClass}`}
                      >
                        <div className="flex justify-between items-center border-b border-black-dark/5 pb-1 mb-1.5">
                          <span className="font-mono text-[9px] text-signal-red uppercase font-bold tracking-wider">{item.label}</span>
                          <span className="w-1.5 h-1.5 bg-signal-red rounded-full"></span>
                        </div>
                        <h4 className="font-sans font-bold text-xs uppercase text-black-dark tracking-tight">{item.title}</h4>
                        <p className="font-mono text-[9px] text-black-dark/70 leading-normal mt-1">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Card 2 — "Telemetry Typewriter" */}
            <div className="bg-paper p-8 rounded-brutalist border border-black-dark/10 flex flex-col justify-between h-[480px] hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-black-dark text-paper font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full uppercase">
                    PROTOCOLO 02
                  </span>
                  <Activity className="w-5 h-5 text-signal-red" />
                </div>
                <h3 className="font-sans font-bold text-xl uppercase tracking-tight">
                  Controle Tecnológico de Cronograma
                </h3>
                <p className="font-sans text-xs text-black-dark/70 leading-relaxed">
                  Nosso cronograma é alimentado diariamente com dados de progresso físico no canteiro. A telemetria nos permite antecipar desvios e otimizar prazos em tempo real.
                </p>
              </div>

              {/* Monospace Live Text Feed */}
              <div className="flex flex-col h-44 bg-black-dark rounded-[1.5rem] p-4 mt-6 font-mono text-[10px] text-paper/90 relative overflow-hidden border border-black-dark/10">
                {/* Console header */}
                <div className="flex justify-between items-center border-b border-paper/15 pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-signal-red rounded-full animate-pulse"></span>
                    <span className="text-[8px] uppercase tracking-widest text-paper/50">LIVE TELEMETRY FEED</span>
                  </div>
                  <Terminal className="w-3.5 h-3.5 text-paper/30" />
                </div>

                {/* Console text log */}
                <div className="flex-1 font-mono text-[9px] leading-relaxed text-left flex flex-col justify-end space-y-1.5 overflow-hidden">
                  <div className="text-paper/40">// SCANNING WORKSPACE DIRECTORIES...</div>
                  {telemetryLogs.slice(0, logIndex).map((msg, i) => (
                    <div key={i} className="opacity-60 text-paper/70 font-mono truncate">{msg}</div>
                  ))}
                  <div className="text-signal-red font-mono font-bold flex items-center">
                    <span>{liveLog}</span>
                    <span className="inline-block w-1.5 h-3.5 bg-signal-red ml-1 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — "Cursor Protocol Scheduler" */}
            <div className="bg-paper p-8 rounded-brutalist border border-black-dark/10 flex flex-col justify-between h-[480px] hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-black-dark text-paper font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full uppercase">
                    PROTOCOLO 03
                  </span>
                  <Calendar className="w-5 h-5 text-signal-red" />
                </div>
                <h3 className="font-sans font-bold text-xl uppercase tracking-tight">
                  Planejamento de Suprimentos & Logística
                </h3>
                <p className="font-sans text-xs text-black-dark/70 leading-relaxed">
                  Logística rigorosa baseada em marcos (milestones). Materiais e insumos críticos são programados e adquiridos em etapas cirúrgicas para evitar flutuações e atrasos.
                </p>
              </div>

              {/* Weekly scheduler grid UI */}
              <div className="relative h-44 bg-off-white/40 rounded-[1.5rem] border border-black-dark/5 p-4 mt-6 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between border-b border-black-dark/5 pb-2">
                  <span className="font-mono text-[8px] tracking-wider text-black-dark/40 uppercase">SUNDRY DISPATCH TIMELINE</span>
                  <span className="font-mono text-[8px] bg-signal-red/10 text-signal-red px-1.5 py-0.5 rounded">AUTO_PLAN</span>
                </div>

                {/* The Grid */}
                <div ref={gridContainerRef} className="grid grid-cols-7 gap-1.5 my-2.5 relative">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                    <div 
                      key={i} 
                      className={`day-cell h-10 border border-black-dark/10 rounded-lg flex flex-col items-center justify-center transition-all duration-300
                        ${schedulerActiveDay === i 
                          ? 'bg-signal-red border-signal-red text-off-white scale-95 shadow-md shadow-signal-red/20' 
                          : 'bg-paper text-black-dark/60 hover:border-black-dark/30'}`}
                    >
                      <span className="font-sans font-bold text-xs">{day}</span>
                      <span className="text-[6px] font-mono opacity-50">S_{i+1}</span>
                    </div>
                  ))}
                </div>

                {/* Save Button */}
                <button 
                  ref={saveBtnRef}
                  id="features-scheduler-save"
                  className={`w-full py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest font-bold transition-all duration-300 border
                    ${schedulerSaved 
                      ? 'bg-black-dark border-black-dark text-paper' 
                      : 'bg-paper border-black-dark/10 text-black-dark hover:bg-black-dark hover:text-paper'}`}
                >
                  {schedulerSaved ? '✓ PLANO DE LOGÍSTICA SALVO' : 'SALVAR PLANEJAMENTO'}
                </button>

                {/* Animated Cursor simulating protocol scheduling interaction */}
                <div 
                  ref={cursorRef} 
                  className="absolute pointer-events-none z-30 transition-transform origin-top-left w-5 h-5 opacity-0"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full filter drop-shadow">
                    <path d="M4.5 3V17L9.5 13.5L14.5 21L17.5 19L12.5 11.5L18.5 11L4.5 3Z" fill="#E63B2E" stroke="#111111" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* D. PHILOSOPHY — "The Manifesto" */}
      <section 
        id="philosophy"
        ref={philosophyRef}
        className="relative bg-black-dark text-paper py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      >
        {/* Parallax texture image at low opacity */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=2000&q=80" 
            alt="Raw concrete texture panel"
            className="w-full h-full object-cover opacity-15 filter grayscale contrast-150"
            style={{ transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0 bg-black-dark/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-left space-y-16">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase text-signal-red tracking-widest font-bold">// MANIFESTO DE RIGOR</span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-tighter">
              Nossa Filosofia
            </h2>
          </div>

          <div ref={philosophyTextRef} className="space-y-12">
            {/* The Neutral Statement */}
            <p className="font-sans text-lg md:text-2xl text-paper/40 leading-relaxed font-light max-w-3xl">
              {"Grandes obras nascem de uma engenharia transparente e próxima. Transformamos desafios complexos de gestão e projetos em soluções inteligentes, seguras e previsíveis para o seu investimento.".split(' ').map((word, i) => (
                <span key={i} className="reveal-word inline-block mr-2">{word}</span>
              ))}
            </p>

            {/* The Bold Manifest Contrast Statement */}
            <p className="font-sans text-3xl md:text-6xl font-bold leading-tight uppercase tracking-tighter">
              {"Nós focamos em: ".split(' ').map((word, i) => (
                <span key={`f-${i}`} className="reveal-word inline-block mr-3 text-paper/30">{word}</span>
              ))}
              {"parceria genuína, ".split(' ').map((word, i) => (
                <span key={`p-${i}`} className="reveal-word inline-block mr-3 text-signal-red font-serif italic normal-case tracking-normal">{word}</span>
              ))}
              {"TECNOLOGIA BIM E GESTÃO COM ".split(' ').map((word, i) => (
                <span key={`e-${i}`} className="reveal-word inline-block mr-3 text-paper">{word}</span>
              ))}
              {"compromisso real.".split(' ').map((word, i) => (
                <span key={`x-${i}`} className="reveal-word inline-block mr-3 text-paper font-serif italic normal-case tracking-normal">{word}</span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* E. PROTOCOL — "Sticky Stacking Archive" */}
      <section 
        id="protocol" 
        ref={protocolContainerRef}
        className="relative bg-off-white py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black-dark/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase text-signal-red tracking-widest font-bold">// O MÉTODO DE ENTREGA</span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-tighter mt-2">
              Protocolo Sequencial
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm text-black-dark/70 leading-relaxed font-light">
            Nossos projetos seguem etapas de precisão não lineares no controle, mas rigidamente sequenciais em sua validação construtiva.
          </p>
        </div>

        {/* Stacking Cards Wrapper */}
        <div className="space-y-16 relative">
          
          {/* Card 1 */}
          <div className="protocol-card bg-paper p-8 md:p-12 rounded-brutalist border border-black-dark/10 min-h-[70vh] flex flex-col md:flex-row gap-8 justify-between items-center sticky top-[12vh]">
            <div className="space-y-6 max-w-xl text-left">
              <span className="font-mono text-sm text-signal-red font-bold tracking-widest block">ETAPA 01</span>
              <h3 className="font-sans font-bold text-2xl md:text-4xl uppercase tracking-tight">
                Análise & Modelagem BIM
              </h3>
              <p className="font-sans text-sm md:text-base text-black-dark/70 leading-relaxed font-light">
                Desenvolvemos modelos tridimensionais integrados de alta precisão. Compatibilizamos os projetos estruturais, elétricos e hidrossanitários antes de pisar no canteiro, antecipando interferências geométricas para eliminar desperdícios de materiais e retrabalhos na execução.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-off-white font-mono text-[10px] tracking-wider py-1.5 px-3 rounded-full border border-black-dark/5">Compatibilidade Digital 100%</span>
                <span className="bg-off-white font-mono text-[10px] tracking-wider py-1.5 px-3 rounded-full border border-black-dark/5">Modelagem 3D Estrutural</span>
              </div>
            </div>

            {/* SVG Interactive Motif: Rotating Geometric Grid */}
            <div className="w-full md:w-[350px] aspect-square flex items-center justify-center bg-off-white rounded-brutalist border border-black-dark/5 p-8 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-64 h-64 animate-[spin_60s_linear_infinite]" viewBox="0 0 200 200" fill="none">
                  {/* Outer Concentric Circles */}
                  <circle cx="100" cy="100" r="90" stroke="#111111" strokeWidth="0.5" strokeDasharray="3,3" />
                  <circle cx="100" cy="100" r="75" stroke="#E63B2E" strokeWidth="0.75" />
                  <circle cx="100" cy="100" r="55" stroke="#111111" strokeWidth="0.5" />
                  
                  {/* Grid Lines */}
                  <line x1="100" y1="10" x2="100" y2="190" stroke="#111111" strokeWidth="0.5" />
                  <line x1="10" y1="100" x2="190" y2="100" stroke="#111111" strokeWidth="0.5" />
                  
                  {/* Diagonals */}
                  <line x1="36.36" y1="36.36" x2="163.64" y2="163.64" stroke="#111111" strokeWidth="0.5" strokeDasharray="5,5" />
                  <line x1="163.64" y1="36.36" x2="36.36" y2="163.64" stroke="#111111" strokeWidth="0.5" strokeDasharray="5,5" />
                  
                  {/* Structural Points */}
                  <circle cx="100" cy="25" r="3" fill="#E63B2E" />
                  <circle cx="100" cy="175" r="3" fill="#E63B2E" />
                  <circle cx="25" cy="100" r="3" fill="#E63B2E" />
                  <circle cx="175" cy="100" r="3" fill="#E63B2E" />
                  <circle cx="100" cy="100" r="5" fill="#111111" />
                </svg>
              </div>
              <span className="absolute bottom-4 right-4 font-mono text-[9px] text-black-dark/40">SYS_MOTIF // MODEL_GRID</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="protocol-card bg-paper p-8 md:p-12 rounded-brutalist border border-black-dark/10 min-h-[70vh] flex flex-col md:flex-row gap-8 justify-between items-center sticky top-[12vh]">
            <div className="space-y-6 max-w-xl text-left">
              <span className="font-mono text-sm text-signal-red font-bold tracking-widest block">ETAPA 02</span>
              <h3 className="font-sans font-bold text-2xl md:text-4xl uppercase tracking-tight">
                Execução Técnica Rigorosa
              </h3>
              <p className="font-sans text-sm md:text-base text-black-dark/70 leading-relaxed font-light">
                O planejamento digital se materializa no canteiro de obras com precisão cirúrgica. Gerenciamos suprimentos, controlamos prazos de forma intensiva e realizamos vistorias técnicas contínuas, garantindo que o cronograma físico-financeiro seja cumprido rigorosamente conforme o planejado.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-off-white font-mono text-[10px] tracking-wider py-1.5 px-3 rounded-full border border-black-dark/5">Laser Scanning 3D</span>
                <span className="bg-off-white font-mono text-[10px] tracking-wider py-1.5 px-3 rounded-full border border-black-dark/5">Controle de Qualidade</span>
              </div>
            </div>

            {/* SVG Interactive Motif: Scanning Laser Line over Grid */}
            <div className="w-full md:w-[350px] aspect-square flex items-center justify-center bg-off-white rounded-brutalist border border-black-dark/5 p-8 relative overflow-hidden">
              <div className="w-full h-full flex flex-col justify-between border border-black-dark/10 rounded-xl relative p-4 bg-paper/30">
                {/* Dots Matrix */}
                <div className="grid grid-cols-8 gap-4 w-full h-full relative">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-black-dark/20 rounded-full mx-auto" />
                  ))}
                  
                  {/* Animating Laser Scanner Line */}
                  <div className="absolute left-0 w-full h-0.5 bg-signal-red shadow-[0_0_8px_#E63B2E] animate-[bounce_5s_infinite_ease-in-out]" />
                </div>
              </div>
              <span className="absolute bottom-4 right-4 font-mono text-[9px] text-black-dark/40">LASER_SCAN // SYSTEM_ACTIVE</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="protocol-card bg-paper p-8 md:p-12 rounded-brutalist border border-black-dark/10 min-h-[70vh] flex flex-col md:flex-row gap-8 justify-between items-center sticky top-[12vh]">
            <div className="space-y-6 max-w-xl text-left">
              <span className="font-mono text-sm text-signal-red font-bold tracking-widest block">ETAPA 03</span>
              <h3 className="font-sans font-bold text-2xl md:text-4xl uppercase tracking-tight">
                Auditoria & Entrega As-Built
              </h3>
              <p className="font-sans text-sm md:text-base text-black-dark/70 leading-relaxed font-light">
                Entregamos a obra pronta acompanhada do modelo 'As-Built' 100% atualizado, refletindo fielmente tudo o que foi executado. O cliente recebe um mapeamento detalhado da infraestrutura e das instalações ocultas, garantindo total segurança para futuras manutenções ou ampliações.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-off-white font-mono text-[10px] tracking-wider py-1.5 px-3 rounded-full border border-black-dark/5">Modelo As-Built Entregue</span>
                <span className="bg-off-white font-mono text-[10px] tracking-wider py-1.5 px-3 rounded-full border border-black-dark/5">Garantia Técnica</span>
              </div>
            </div>

            {/* SVG Interactive Motif: EKG Pulsing Waveform */}
            <div className="w-full md:w-[350px] aspect-square flex items-center justify-center bg-off-white rounded-brutalist border border-black-dark/5 p-8 relative overflow-hidden">
              <div className="w-full h-40 flex items-center justify-center relative">
                <svg className="w-full h-full" viewBox="0 0 300 100" fill="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#111111" strokeWidth="0.25" strokeDasharray="3,3" />
                  <path 
                    d="M0,50 L50,50 L60,30 L70,70 L80,50 L120,50 L135,10 L150,90 L165,50 L200,50 L210,35 L220,65 L230,50 L300,50" 
                    stroke="#E63B2E" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="600"
                    strokeDashoffset="600"
                    className="animate-[dash_3s_linear_infinite]"
                    style={{
                      strokeDasharray: 600,
                      animation: 'dash 3s linear infinite'
                    }}
                  />
                </svg>
                {/* CSS animation inline for path drawing */}
                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                `}</style>
              </div>
              <span className="absolute bottom-4 right-4 font-mono text-[9px] text-black-dark/40">WAVEFORM // STABILITY_INDEX</span>
            </div>
          </div>

        </div>
      </section>

      {/* F. PORTFÓLIO - NOSSAS EXECUÇÕES */}
      <section 
        id="portfolio" 
        className="relative py-24 md:py-32 px-6 md:px-12 bg-off-white border-t border-black-dark/10"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase text-signal-red tracking-widest font-bold">// NOSSO PORTFÓLIO DE ENGENHARIA</span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-tighter">
              NOSSAS EXECUÇÕES
            </h2>
            <p className="font-sans text-sm text-black-dark/70 leading-relaxed font-light">
              Explore a precisão e a qualidade de engenharia nas obras executadas pela O.P. ENGENHARIA em diferentes disciplinas construtivas.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Todas', 'Areninhas', 'ETEs', 'Projetos'].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider border transition-all duration-300
                    ${isActive 
                      ? 'bg-signal-red border-signal-red text-off-white shadow-md shadow-signal-red/20 scale-105' 
                      : 'bg-paper border-black-dark/10 text-black-dark hover:bg-signal-red hover:border-signal-red hover:text-off-white hover:scale-105'
                    }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Grid of Work Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listaObras
              .filter(obra => {
                if (activeFilter === 'Todas') return true;
                if (activeFilter === 'Areninhas') return obra.categoria === 'areninha';
                if (activeFilter === 'ETEs') return obra.categoria === 'ete';
                if (activeFilter === 'Projetos') return obra.categoria === 'infra';
                return false;
              })
              .map((obra) => (
                <div 
                  key={obra.id}
                  onClick={() => setSelectedObra(obra)}
                  className="group bg-paper rounded-brutalist border border-black-dark/10 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-[380px]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={obra.imagemCapa} 
                      alt={obra.titulo}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-signal-red text-off-white font-mono text-[9px] tracking-widest px-2.5 py-1 rounded-full uppercase font-bold">
                      {obra.categoria === 'areninha' ? 'Areninha' : (obra.categoria === 'ete' ? 'ETE' : 'Projeto')}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-sans font-bold text-lg uppercase tracking-tight text-black-dark group-hover:text-signal-red transition-colors">
                        {obra.titulo}
                      </h3>
                      {obra.desc && (
                        <p className="font-sans text-xs text-black-dark/70 line-clamp-2 mt-2 leading-relaxed font-light">
                          {obra.desc}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-signal-red font-bold">
                      Ver Galeria <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* G. FOOTER */}
      <footer 
        id="footer" 
        className="relative bg-black-dark text-paper rounded-t-[4rem] px-6 md:px-12 py-16 md:py-24 border-t border-paper/10 mt-12 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-signal-red font-bold">●</span>
                <span className="font-sans font-bold text-lg tracking-tighter">O.P. ENGENHARIA</span>
              </div>
              <p className="font-sans text-xs text-paper/50 leading-relaxed font-light">
                Gestão de obras de alta precisão baseada em processos integrados de engenharia, telemetria tecnológica e fidelidade à arquitetura.
              </p>
            </div>

            {/* Navigation columns */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-signal-red font-bold mb-4">// LINKS</h4>
              <ul className="space-y-2.5 font-sans text-xs text-paper/70 font-light">
                <li><a href="#features" className="hover:text-paper transition-colors">Soluções</a></li>
                <li><a href="#philosophy" className="hover:text-paper transition-colors">Manifesto</a></li>
                <li><a href="#protocol" className="hover:text-paper transition-colors">Nosso Protocolo</a></li>
                <li><a href="#portfolio" className="hover:text-paper transition-colors">Portfólio</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-signal-red font-bold mb-4">// LEGAL</h4>
              <ul className="space-y-2.5 font-sans text-xs text-paper/70 font-light">
                <li><a href="#" className="hover:text-paper transition-colors">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-paper transition-colors">Diretrizes de Privacidade</a></li>
                <li><a href="#" className="hover:text-paper transition-colors">Normas de Compliance</a></li>
                <li><a href="#" className="hover:text-paper transition-colors">Licenciamentos CREA</a></li>
              </ul>
            </div>

            {/* Contacts & System Status */}
            <div className="space-y-6">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-signal-red font-bold mb-3">// CONTATO</h4>
                <p className="font-mono text-xs text-paper/80 font-light">oliveiraarlison980@gmail.com</p>
                <p className="font-mono text-xs text-paper/50 font-light mt-1">Novo Oriente - CE</p>
              </div>

              {/* Monospace Operational status indicator */}
              <div 
                id="system-status-indicator"
                className="inline-flex items-center gap-2 bg-paper/5 border border-paper/10 py-1.5 px-3 rounded-full font-mono text-[9px] text-paper/80"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span>SISTEMA OPERACIONAL // LATENCY 12MS // BUILD STABLE</span>
              </div>
            </div>

          </div>

          {/* Bottom disclaimer */}
          <div className="border-t border-paper/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-paper/40">
            <span>© {new Date().getFullYear()} O.P. ENGENHARIA. TODOS OS DIREITOS RESERVADOS.</span>
            <span>PROJETADO COM PRECISÃO BRUTALISTA</span>
          </div>
        </div>
      </footer>

      {/* Lightbox Gallery Modal */}
      {selectedObra && (
        <div 
          className="fixed inset-0 z-50 bg-black-dark/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setSelectedObra(null)}
        >
          <div 
            className="bg-off-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-brutalist border border-black-dark/15 p-6 md:p-8 relative scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button "X" */}
            <button 
              onClick={() => setSelectedObra(null)}
              className="absolute top-4 right-4 bg-signal-red text-off-white hover:bg-black-dark hover:text-paper rounded-full p-2 transition-all duration-300 z-10 shadow-md flex items-center justify-center w-8 h-8 font-bold"
              aria-label="Fechar modal"
            >
              X
            </button>

            {/* Modal Content */}
            <div className="space-y-6 text-left">
              <div>
                <span className="font-mono text-[10px] uppercase text-signal-red tracking-widest font-bold block mb-1">
                  // {selectedObra.categoria.toUpperCase()}
                </span>
                <h3 className="font-sans font-bold text-2xl md:text-3xl uppercase tracking-tight text-black-dark">
                  {selectedObra.titulo}
                </h3>
              </div>

              {selectedObra.desc && (
                <p className="font-sans text-xs md:text-sm text-black-dark/80 leading-relaxed font-light">
                  {selectedObra.desc}
                </p>
              )}

              <div className="border-t border-black-dark/15 pt-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-black-dark font-bold mb-4">// GALERIA DE FOTOS</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedObra.imagens && selectedObra.imagens.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-black-dark/10 group bg-paper">
                      <img 
                        src={imgUrl} 
                        alt={`${selectedObra.titulo} - Foto ${idx + 1}`}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
