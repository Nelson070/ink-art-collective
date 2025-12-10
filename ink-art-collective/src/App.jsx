import React, { useState, useMemo } from 'react';
import { 
  Clock, Upload, Check, X, MapPin, Instagram, 
  Linkedin, Lock, Phone, Mail, Image as ImageIcon,
  Award, Users, Heart, Calendar as CalendarIcon, 
  User, Palette, ChevronRight, ChevronLeft,
  Filter, Search, Trash2, MoreVertical, DollarSign,
  MessageCircle, Star, Quote, Plus, Minus
} from 'lucide-react';

// --- DADOS FAKES (SIMULAÇÃO) ---
const MOCK_DB = {
  saveAppointment: async (data) => {
    console.log("Simulando envio ao banco de dados:", data);
    return new Promise(resolve => setTimeout(resolve, 1500));
  }
};

// --- DADOS ESTÁTICOS ---
const ARTISTS = [
  {
    id: 'art1',
    name: 'Victor Moreira',
    specialty: 'Realismo Preto e Cinza',
    image: 'https://i.pinimg.com/736x/bd/d5/ad/bdd5ad46d9ac37c8968fa47afd1aa82b.jpg',
  },
  {
    id: 'art2',
    name: 'Antônio Gomes',
    specialty: 'OldSchool, BlackWork',
    image: 'https://i.pinimg.com/1200x/a0/c6/ee/a0c6ee3ef1ce5f24ef5671da94d318cf.jpg',
  },
  {
    id: 'art3',
    name: 'Rodrigo Santos',
    specialty: 'FineLine',
    image: 'https://i.pinimg.com/1200x/5f/fb/cb/5ffbcb7bae47d00aebf38d98ff3e566b.jpg',
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Carolina Mendes",
    text: "Amei o trabalho do Rodrigo! O traço fino dele é impecável. O estúdio é super limpo e a vibe é incrível. Já estou planejando a próxima.",
    rating: 5,
    date: "Há 2 semanas"
  },
  {
    id: 2,
    name: "Rafael Souza",
    text: "Fiz minha primeira tatuagem grande com o Victor. O realismo ficou absurdo, parece uma foto. Profissionalismo nota 1000.",
    rating: 5,
    date: "Há 1 mês"
  },
  {
    id: 3,
    name: "Beatriz Lima",
    text: "O Antônio captou exatamente a ideia do Old School que eu queria. Atendimento excelente desde o orçamento até o pós-tattoo.",
    rating: 5,
    date: "Há 3 dias"
  }
];

const FAQ_ITEMS = [
  {
    question: "Tatuagem dói muito?",
    answer: "A dor é relativa e varia de pessoa para pessoa e do local do corpo. Costelas e pés costumam ser mais sensíveis, enquanto braços e pernas são mais tranquilos. Nossos artistas utilizam técnicas leves para minimizar o desconforto."
  },
  {
    question: "Qual o valor mínimo?",
    answer: "O valor mínimo do estúdio é R$ 350,00. Isso cobre os materiais descartáveis de alta qualidade e a hora técnica inicial do artista. O preço final depende do tamanho, detalhamento e estilo da arte."
  },
  {
    question: "Como cuidar da minha tatuagem nova?",
    answer: "Mantenha o curativo pelo tempo indicado (2-4h). Lave com sabonete neutro, não coce, não arranque casquinhas e use a pomada recomendada 3x ao dia. Evite sol, mar, piscina e alimentos gordurosos por 15 dias."
  },
  {
    question: "Vocês fazem cobertura (Cover-up)?",
    answer: "Sim! Trabalhamos com coberturas, mas é necessária uma avaliação prévia. Em alguns casos, sugerimos algumas sessões de remoção a laser antes para garantir um resultado perfeito."
  },
  {
    question: "Preciso agendar com antecedência?",
    answer: "Sim, trabalhamos preferencialmente com horário marcado para garantir a atenção exclusiva ao seu projeto. Para flash tattoos ou projetos pequenos, consulte disponibilidade via WhatsApp para o mesmo dia."
  }
];

// Portfólios individuais para o Modal
const ARTIST_PORTFOLIOS = {
  'art1': [ // Victor Moreira
    'https://i.pinimg.com/1200x/56/2f/fa/562ffada1842b2d5ce82fa65b65ee14d.jpg',
    'https://i.pinimg.com/1200x/54/16/0f/54160fdca48b972230f26fb25c7fbef9.jpg',
    'https://i.pinimg.com/1200x/c0/b1/ff/c0b1ff2b4f4fc3db104faffb13b4fef4.jpg',
  ],
  'art2': [ // Antônio Gomes
    'https://i.pinimg.com/1200x/df/4b/b5/df4bb522d987e56c2c807a35309a3550.jpg',
    'https://i.pinimg.com/736x/6d/62/49/6d62491b9d7937e36a878dd41cf1e80b.jpg',
    'https://i.pinimg.com/736x/cc/89/ba/cc89bae7f5b6b2ed1d04bee40f9e78e1.jpg ',
  ],
  'art3': [ // Rodrigo Santos
    'https://i.pinimg.com/736x/89/73/96/8973964477ac884fa3be552f6f4cf12e.jpg',
    'https://i.pinimg.com/736x/c8/3e/b4/c83eb416b94fd616d4b0b4779ae6b61e.jpg',
    'https://tattoo2me.com/cdn-cgi/imagedelivery/nDLZbBGIcmvx5JwFlQje1A/blog.tattoo2me.com/2022/10/1-74-scaled.jpg/w=768',
  ]
};

const PORTFOLIO_IMAGES = [
  'https://img.freepik.com/fotos-gratis/arme-com-tatuagem-perto-do-esboco_23-2147834016.jpg?t=st=1765250118~exp=1765253718~hmac=dd7c540d7ee1ba9b7b5ccb8024ae8d02ea7279d7d443530fa3cc7de25f399466&w=1480',
  'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://img.freepik.com/fotos-premium/secao-media-de-mulher-com-cobra_1048944-17930036.jpg?w=1480',
  'https://img.freepik.com/fotos-premium/mancha-de-tatuagem-minimalista-mascara-tradicional-japonesa-de-guerreiro-samurai-menyoroi-espada-dragao-envolta_1110519-5593.jpg?w=1480',
  'https://images.unsplash.com/photo-1562962230-16e4623d36e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://img.freepik.com/fotos-premium/mao-tatuada-com-tatuagem-de-flor-de-rosa-em-preto-e-branco_1308175-32604.jpg?w=1480',
];

// --- COMPONENTES UI ---

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h3 className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm mb-2">{subtitle}</h3>
    <h2 className="text-4xl md:text-5xl font-extrabold text-stone-100 font-serif tracking-tight">{title}</h2>
    <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-red-700 text-white hover:bg-red-600 shadow-[0_4px_14px_0_rgba(185,28,28,0.39)]",
    outline: "border-2 border-stone-600 text-stone-300 hover:border-red-600 hover:text-white bg-transparent",
    text: "text-stone-400 hover:text-red-500 p-0"
  };
  return <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

// 1. HERO
const Hero = ({ scrollToBooking }) => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="https://img.freepik.com/fotos-gratis/tatuagem-de-uma-coruja-em-preto-e-branco_1206-8.jpg?t=st=1765250855~exp=1765254455~hmac=fa6e41d46d9ff1aa16c9ad0b705733331a4bb0a78e25725605c1aa67ff8ea8fd&w=1480" alt="Background" className="w-full h-full object-cover opacity-30 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/40"></div>
    </div>
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <p className="text-red-500 font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">Desde 2012</p>
      <h1 className="text-6xl md:text-8xl font-black text-stone-100 mb-6 tracking-tighter leading-none">INK & ART <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-200 to-stone-600">COLLECTIVE</span></h1>
      <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">Onde a arte encontra a pele. Especialistas em realismo, FineLine, OldSchool e Blackwork.</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button onClick={scrollToBooking}>Agendar Sessão</Button>
        <Button variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}>Conheça o Estúdio</Button>
      </div>
    </div>
  </section>
);

// 2. NOVO COMPONENTE: QUEM SOMOS
const About = () => (
  <section id="about" className="py-24 bg-stone-900 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-800/20 skew-x-12 transform translate-x-20"></div>
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
      <div className="md:w-1/2 relative group">
        <div className="absolute -inset-4 bg-red-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/A85wrnyEw1f0RyJv/estudio-tatuagem-foz--tattoo-YD06vMR0VDI284yl.jpeg" alt="Interior do Estúdio" className="relative z-10 rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full object-cover h-[500px]"/>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-stone-950 border border-stone-800 p-4 flex flex-col items-center justify-center z-20 shadow-xl">
          <span className="text-red-600 font-black text-2xl block">12</span>
          <span className="text-stone-400 text-xs uppercase tracking-widest text-center">Anos de<br/>História</span>
        </div>
      </div>
      <div className="md:w-1/2">
        <h3 className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm mb-2">O Estúdio</h3>
        <h2 className="text-4xl md:text-5xl font-extrabold text-stone-100 font-serif mb-6">Mais que Tinta, <br/>Uma Declaração.</h2>
        <p className="text-stone-400 text-lg mb-6 leading-relaxed">
          Fundado em 2012 no coração de Imperatriz, o <strong>Ink & Art Collective</strong> nasceu da necessidade de elevar a tatuagem ao status de arte plástica. 
          Não somos apenas um estúdio; somos um santuário para a expressão individual.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-stone-800">
          <div><Award className="text-red-600 mb-2" size={28} /><h4 className="text-white font-bold text-xl">15+</h4><p className="text-stone-500 text-xs uppercase tracking-wider">Prêmios</p></div>
          <div><Users className="text-red-600 mb-2" size={28} /><h4 className="text-white font-bold text-xl">2.5k</h4><p className="text-stone-500 text-xs uppercase tracking-wider">Clientes</p></div>
          <div><Heart className="text-red-600 mb-2" size={28} /><h4 className="text-white font-bold text-xl">100%</h4><p className="text-stone-500 text-xs uppercase tracking-wider">Biossegurança</p></div>
        </div>
      </div>
    </div>
  </section>
);

// 3. GALERIA
const Gallery = () => (
  <section className="py-20 bg-stone-950" id="portfolio">
    <div className="container mx-auto px-4">
      <SectionTitle title="Nossa Arte" subtitle="Portfólio Recente" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PORTFOLIO_IMAGES.map((img, idx) => (
          <div key={idx} className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-stone-900 rounded-sm">
            <img src={img} alt="Tattoo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-bold tracking-widest uppercase border-b-2 border-red-600 pb-1">Ver Detalhes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 4. ARTISTAS
const Team = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  return (
    <section className="py-32 bg-stone-900/50" id="artists">
      <div className="container mx-auto px-4">
        <SectionTitle title="Os Mestres" subtitle="Artistas Residentes" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {ARTISTS.map((artist) => (
            <div key={artist.id} className="bg-stone-950 border border-stone-800 group hover:border-red-900/30 transition-colors duration-300 flex flex-col">
              <div className="h-80 overflow-hidden relative">
                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="p-8 text-center flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-stone-100 mb-1">{artist.name}</h4>
                <p className="text-red-500 text-sm font-medium tracking-wide mb-6">{artist.specialty}</p>
                
                <div className="mt-auto">
                   <Button 
                     variant="outline" 
                     className="w-full text-xs py-3"
                     onClick={() => setSelectedArtist(artist)}
                   >
                     Ver Trabalhos
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE PORTFOLIO DO ARTISTA */}
      {selectedArtist && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setSelectedArtist(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-8 border-b border-stone-800 flex items-center gap-6 bg-stone-950">
               <img src={selectedArtist.image} className="w-20 h-20 rounded-full object-cover border-2 border-red-600" alt={selectedArtist.name}/>
               <div>
                 <h3 className="text-2xl font-bold text-white">{selectedArtist.name}</h3>
                 <p className="text-red-500 font-medium">{selectedArtist.specialty}</p>
               </div>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar">
              <h4 className="text-stone-400 text-sm uppercase tracking-widest mb-6 border-b border-stone-800 pb-2">Galeria Exclusiva</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {(ARTIST_PORTFOLIOS[selectedArtist.id] || []).map((img, idx) => (
                   <img key={idx} src={img} className="w-full aspect-square object-cover rounded-sm hover:opacity-80 transition-opacity cursor-pointer border border-stone-800" alt="Portfolio" />
                ))}
              </div>
              
              <div className="text-center bg-stone-950 p-6 rounded border border-stone-800">
                 <p className="text-stone-400 mb-4">Gostou do estilo de {selectedArtist.name.split(' ')[0]}?</p>
                 <Button onClick={() => {
                    document.getElementById('booking')?.scrollIntoView({behavior:'smooth'});
                    setSelectedArtist(null);
                 }}>
                    Solicitar Orçamento com este Artista
                 </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- DEPOIMENTOS ---
const Testimonials = () => (
  <section className="py-20 bg-stone-950 relative border-y border-stone-800/50">
    <div className="container mx-auto px-4">
      <SectionTitle title="O Que Dizem" subtitle="Depoimentos" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-stone-900/50 p-8 border border-stone-800 relative group hover:border-red-900/30 transition-colors">
            <Quote className="absolute top-6 right-6 text-stone-700 group-hover:text-red-900/50 transition-colors" size={40} />
            <div className="flex gap-1 text-yellow-600 mb-4">
              {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-stone-300 italic mb-6 leading-relaxed">"{t.text}"</p>
            <div>
              <h5 className="text-white font-bold text-sm">{t.name}</h5>
              <span className="text-stone-500 text-xs">{t.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- NOVO: FAQ (PERGUNTAS FREQUENTES) ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-stone-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionTitle title="Dúvidas" subtitle="Perguntas Frequentes" />
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border border-stone-800 rounded bg-stone-950 overflow-hidden">
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-stone-900 transition-colors focus:outline-none"
              >
                <span className="font-bold text-stone-200 text-lg">{item.question}</span>
                {openIndex === index ? <Minus className="text-red-600" size={20} /> : <Plus className="text-stone-500" size={20} />}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-stone-400 text-sm leading-relaxed border-t border-stone-900/50">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  </section>
  );
};

// --- BOTÃO FLUTUANTE WHATSAPP ---
const FloatingWhatsApp = () => (
  <a 
    href="https://wa.me/5599991831701" // Coloque seu número real aqui
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-500 transition-all hover:scale-110 flex items-center justify-center group"
    title="Fale no WhatsApp"
  >
    <MessageCircle size={28} />
    <span className="absolute right-full mr-3 bg-white text-black px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Orçamento Rápido
    </span>
  </a>
);

// 5. FORMULÁRIO WIZARD
const BookingForm = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tattooType: 'Realismo', size: 'Média (10-15cm)', placement: '',
    artistId: 'any', refImageName: '',
    date: '', time: '',
    clientName: '', phone: '', email: '', termsAccepted: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let i = 10; i <= 18; i++) {
      slots.push(`${i}:00`);
      if (i < 18) slots.push(`${i}:30`);
    }
    return slots;
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFormData(prev => ({ ...prev, refImageName: e.target.files[0].name }));
  };

  const nextStep = () => {
    // Validação Simples por Etapa
    if (currentStep === 1) {
      if (!formData.placement) return setError('Por favor, informe o local do corpo.');
    }
    if (currentStep === 2) {
      if (!formData.date || !formData.time) return setError('Selecione data e hora.');
    }
    setError('');
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) return setError('Você deve aceitar os termos.');
    if (!formData.clientName || !formData.email || !formData.phone) return setError('Preencha seus dados de contato.');

    setLoading(true);
    setError('');

    try {
      await MOCK_DB.saveAppointment(formData);
      onSuccess();
      setFormData({
        clientName: '', phone: '', email: '', tattooType: 'Realismo', size: 'Média (10-15cm)', 
        placement: '', artistId: 'any', date: '', time: '', refImageName: '', termsAccepted: false
      });
      setCurrentStep(1);
    } catch (err) {
      console.error(err);
      setError('Erro ao enviar.');
    } finally {
      setLoading(false);
    }
  };

  // Indicador de Passos
  const steps = [
    { id: 1, title: 'A Ideia', icon: Palette },
    { id: 2, title: 'Agenda', icon: CalendarIcon },
    { id: 3, title: 'Seus Dados', icon: User }
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 p-6 md:p-12 shadow-2xl min-h-[500px] flex flex-col">
      {/* Header do Form */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-4">Solicitar Orçamento</h3>
        
        {/* Barra de Progresso */}
        <div className="flex justify-between relative mb-8">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-800 -z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-red-600 -z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>
          
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? 'bg-red-600 border-red-600 text-white' : 'bg-stone-950 border-stone-700 text-stone-500'}`}>
                  {isActive ? (isCurrent ? <Icon size={18} /> : <Check size={18} />) : <span className="text-xs font-bold">{step.id}</span>}
                </div>
                <span className={`text-xs mt-2 uppercase tracking-wider font-bold ${isActive ? 'text-white' : 'text-stone-600'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {error && <div className="bg-red-900/20 text-red-400 p-3 mb-6 text-sm rounded border border-red-900/50 flex items-center gap-2"><X size={16}/> {error}</div>}

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        {/* STEP 1: A IDEIA */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Estilo</label>
                <select name="tattooType" value={formData.tattooType} onChange={handleChange} className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 focus:border-red-600 outline-none">
                  <option>Realismo</option><option>Old School</option><option>Neo-Tradicional</option><option>Blackwork</option><option>Oriental</option><option>Fine Line</option>
                </select>
              </div>
              <div>
                <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Tamanho</label>
                <select name="size" value={formData.size} onChange={handleChange} className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 focus:border-red-600 outline-none">
                  <option>Pequena (até 5cm)</option><option>Média (10-15cm)</option><option>Grande (20cm+)</option><option>Fechamento</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Local do Corpo</label>
              <input name="placement" value={formData.placement} onChange={handleChange} className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 focus:border-red-600 outline-none placeholder:text-stone-700" placeholder="Ex: Antebraço, Costela, Perna..." />
            </div>

            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Artista Preferido</label>
              <select name="artistId" value={formData.artistId} onChange={handleChange} className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 focus:border-red-600 outline-none">
                <option value="any">Qualquer Artista Disponível</option>
                {ARTISTS.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            </div>

            <div className="p-4 border border-dashed border-stone-700 bg-stone-950/50 text-center relative hover:border-red-600 transition-colors group cursor-pointer">
              <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
              <div className="flex flex-col items-center justify-center py-2">
                <Upload className="text-stone-400 mb-2 group-hover:text-red-500 transition-colors" size={24} />
                <span className="text-stone-300 text-sm font-medium">{formData.refImageName || "Clique para adicionar referência"}</span>
                <span className="text-stone-600 text-xs mt-1">Opcional, mas recomendado</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: AGENDA */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Data Preferida</label>
              <input required type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 focus:border-red-600 outline-none invert-calendar-icon text-lg" />
              <p className="text-xs text-stone-500 mt-2 flex items-center gap-1"><Clock size={12}/> Funcionamos de Terça a Sábado</p>
            </div>
            
            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Horário</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {timeSlots.map(t => (
                  <div 
                    key={t} 
                    onClick={() => setFormData(prev => ({...prev, time: t}))}
                    className={`p-2 text-center text-sm border cursor-pointer transition-all ${formData.time === t ? 'bg-red-600 border-red-600 text-white font-bold' : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-500'}`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DADOS PESSOAIS */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Nome Completo</label>
              <input required name="clientName" value={formData.clientName} onChange={handleChange} className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 focus:border-red-600 outline-none" placeholder="Seu nome" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 focus:border-red-600 outline-none" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block text-stone-400 text-xs uppercase tracking-wider mb-2">WhatsApp</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 focus:border-red-600 outline-none" placeholder="(00) 00000-0000" />
              </div>
            </div>

            <div className="bg-stone-950 p-4 border border-stone-800 rounded">
              <h4 className="text-stone-200 text-sm font-bold mb-2">Resumo:</h4>
              <p className="text-stone-500 text-xs">
                {formData.tattooType} • {formData.placement} <br/>
                {formData.date ? new Date(formData.date).toLocaleDateString('pt-BR') : ''} às {formData.time}
              </p>
            </div>

            <div className="flex items-start gap-3 mt-4">
              <input required type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mt-1 accent-red-600 w-4 h-4" />
              <p className="text-xs text-stone-400">
                Concordo que este é um pedido de orçamento. O agendamento final será confirmado mediante pagamento de sinal.
              </p>
            </div>
          </div>
        )}

        {/* NAVEGAÇÃO */}
        <div className="mt-8 flex justify-between pt-6 border-t border-stone-800">
          {currentStep > 1 ? (
            <Button type="button" variant="text" onClick={prevStep} className="flex items-center gap-2">
              <ChevronLeft size={16} /> Voltar
            </Button>
          ) : <div></div>}

          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep} className="px-10">
              Próximo <ChevronRight size={16} />
            </Button>
          ) : (
            <Button type="submit" disabled={loading} className="px-10">
              {loading ? 'Enviando...' : 'Finalizar Pedido'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

// 6. ADMIN PANEL (DASHBOARD COMPLETO)
const AdminPanel = ({ onLogout }) => {
  // Estado local para gerenciar a lista de agendamentos no frontend
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2024-10-15', time: '14:00', clientName: 'João Silva', phone: '(11) 99999-9999', tattooType: 'Realismo', placement: 'Braço', artistId: 'Victor Moreira', status: 'pending', value: 1200 },
    { id: 2, date: '2024-10-16', time: '10:00', clientName: 'Maria Oliveira', phone: '(11) 98888-8888', tattooType: 'Old School', placement: 'Perna', artistId: 'Antônio Gomes', status: 'confirmed', value: 850 },
    { id: 3, date: '2024-10-18', time: '16:00', clientName: 'Carlos Souza', phone: '(11) 97777-7777', tattooType: 'FineLine', placement: 'Costas', artistId: 'Rodrigo Santos', status: 'cancelled', value: 2000 },
    { id: 4, date: '2024-10-20', time: '11:00', clientName: 'Ana Clara', phone: '(11) 96666-6666', tattooType: 'Fine Line', placement: 'Pulso', artistId: 'Qualquer Artista', status: 'pending', value: 350 }
  ]);
  
  const [filter, setFilter] = useState('all'); // all, pending, today

  // Ações de Gestão
  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
  };

  const handleDelete = (id) => {
    if(confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
    }
  };

  // Cálculos para o Dashboard
  const stats = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter(a => a.status === 'pending').length,
      revenue: appointments.filter(a => a.status === 'confirmed').reduce((acc, curr) => acc + curr.value, 0)
    };
  }, [appointments]);

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'pending') return apt.status === 'pending';
    if (filter === 'confirmed') return apt.status === 'confirmed';
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-950 p-6 md:p-10">
      {/* Header Admin */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-stone-800 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-100 flex items-center gap-3">
            <Lock className="text-red-600" /> Painel de Controle
          </h2>
          <p className="text-stone-500 text-sm mt-1">Bem-vindo, Administrador.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.location.href = '/'}>Ver Site</Button>
          <Button variant="primary" onClick={onLogout}>Sair</Button>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-lg flex items-center gap-4">
          <div className="p-4 bg-stone-950 rounded-full text-stone-400"><CalendarIcon size={24} /></div>
          <div>
            <h4 className="text-stone-400 text-xs uppercase tracking-wider">Total Agendamentos</h4>
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-lg flex items-center gap-4">
          <div className="p-4 bg-yellow-900/20 rounded-full text-yellow-500"><Clock size={24} /></div>
          <div>
            <h4 className="text-stone-400 text-xs uppercase tracking-wider">Pendentes</h4>
            <span className="text-2xl font-bold text-white">{stats.pending}</span>
          </div>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-lg flex items-center gap-4">
          <div className="p-4 bg-green-900/20 rounded-full text-green-500"><DollarSign size={24} /></div>
          <div>
            <h4 className="text-stone-400 text-xs uppercase tracking-wider">Faturamento (Est.)</h4>
            <span className="text-2xl font-bold text-white">R$ {stats.revenue}</span>
          </div>
        </div>
      </div>

      {/* Área da Tabela */}
      <div className="bg-stone-900 rounded-lg border border-stone-800 overflow-hidden shadow-2xl">
        {/* Filtros da Tabela */}
        <div className="p-6 border-b border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex bg-stone-950 rounded p-1">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 text-xs font-bold uppercase rounded transition-colors ${filter === 'all' ? 'bg-stone-800 text-white' : 'text-stone-500 hover:text-white'}`}>Todos</button>
            <button onClick={() => setFilter('pending')} className={`px-4 py-2 text-xs font-bold uppercase rounded transition-colors ${filter === 'pending' ? 'bg-stone-800 text-white' : 'text-stone-500 hover:text-white'}`}>Pendentes</button>
            <button onClick={() => setFilter('confirmed')} className={`px-4 py-2 text-xs font-bold uppercase rounded transition-colors ${filter === 'confirmed' ? 'bg-stone-800 text-white' : 'text-stone-500 hover:text-white'}`}>Confirmados</button>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500" size={16} />
            <input type="text" placeholder="Buscar cliente..." className="bg-stone-950 border border-stone-800 text-white pl-10 pr-4 py-2 rounded text-sm w-full focus:border-red-600 outline-none" />
          </div>
        </div>

        {/* Tabela Responsiva */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-stone-950 text-stone-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-stone-800">Data & Hora</th>
                <th className="p-4 border-b border-stone-800">Cliente</th>
                <th className="p-4 border-b border-stone-800">Projeto</th>
                <th className="p-4 border-b border-stone-800">Status</th>
                <th className="p-4 border-b border-stone-800 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-300 text-sm">
              {filteredAppointments.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-stone-500">Nenhum agendamento encontrado neste filtro.</td></tr>
              ) : filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-stone-800/50 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-white flex items-center gap-2"><CalendarIcon size={14} className="text-red-600"/> {new Date(apt.date).toLocaleDateString('pt-BR')}</div>
                    <div className="text-stone-500 pl-6">{apt.time}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white text-base">{apt.clientName}</div>
                    <div className="text-xs text-stone-500 flex items-center gap-1 mt-1"><Phone size={12}/> {apt.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-stone-200"><span className="text-red-500 font-bold">{apt.tattooType}</span> - {apt.placement}</div>
                    <div className="text-xs text-stone-500 mt-1">Artista: {apt.artistId}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                      apt.status === 'confirmed' ? 'bg-green-900/20 text-green-500 border-green-900' :
                      apt.status === 'cancelled' ? 'bg-red-900/20 text-red-500 border-red-900' :
                      'bg-yellow-900/20 text-yellow-500 border-yellow-900'
                    }`}>
                      {apt.status === 'pending' ? 'Pendente' : apt.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      {apt.status === 'pending' && (
                        <>
                          <button onClick={() => handleStatusChange(apt.id, 'confirmed')} title="Aprovar" className="p-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors shadow-lg"><Check size={16} /></button>
                          <button onClick={() => handleStatusChange(apt.id, 'cancelled')} title="Rejeitar" className="p-2 bg-stone-700 text-stone-300 rounded hover:bg-red-600 hover:text-white transition-colors"><X size={16} /></button>
                        </>
                      )}
                      <button onClick={() => handleDelete(apt.id)} title="Excluir" className="p-2 text-stone-600 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 7. MAIN APP
export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleLoginAttempt = (password) => {
    if (password === 'admin123') {
      setIsAdminMode(true);
      setShowLogin(false);
    } else {
      alert('Senha inválida (Dica: admin123)');
    }
  };

  const handleBookingSuccess = () => {
    setNotification('Solicitação enviada (Simulação)!');
    setTimeout(() => setNotification(null), 5000);
  };

  if (isAdminMode) return <AdminPanel onLogout={() => setIsAdminMode(false)} />;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-red-900 selection:text-white">
      {/* HEADER NAV */}
      <nav className="fixed w-full z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-white">INK<span className="text-red-600">.</span>ART</div>
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-stone-400">
             <a href="#about" className="hover:text-red-500 transition-colors">Quem Somos</a>
             <a href="#portfolio" className="hover:text-red-500 transition-colors">Portfólio</a>
             <a href="#artists" className="hover:text-red-500 transition-colors">Artistas</a>
             <a href="#location" className="hover:text-red-500 transition-colors">Local</a>
          </div>
          <Button variant="primary" className="text-xs px-5 py-2" onClick={() => document.getElementById('booking')?.scrollIntoView({behavior:'smooth'})}>Agendar</Button>
        </div>
      </nav>

      {/* NOTIFICAÇÃO */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 bg-green-900 text-green-100 px-6 py-4 rounded border border-green-700 animate-bounce-in flex items-center gap-2 shadow-2xl">
          <Check size={20} /> <span className="font-bold">{notification}</span>
        </div>
      )}

      {/* CONTEÚDO */}
      <main>
        <Hero scrollToBooking={() => document.getElementById('booking')?.scrollIntoView({behavior:'smooth'})} />
        <About />
        <Gallery />
        <Team />
        <Testimonials />
        <FAQ /> {/* NOVA SEÇÃO ADICIONADA AQUI */}
        
        <section id="booking" className="py-20 bg-stone-950 relative">
          <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <SectionTitle title="Faça sua História" subtitle="Agendamento" />
            <BookingForm onSuccess={handleBookingSuccess} />
          </div>
        </section>
        
        <section id="location" className="h-96 relative w-full bg-stone-900 overflow-hidden group">
          {/* Mapa com Filtro Dark Mode */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3971.344302960335!2d-47.48359155480042!3d-5.515812089032496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1765294350634!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Studio Location"
            className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          ></iframe>
          
          {/* Overlay de Informação */}
          <div className="absolute top-1/2 left-8 md:left-20 transform -translate-y-1/2 bg-stone-950/90 backdrop-blur-md p-8 border-l-4 border-red-600 shadow-2xl max-w-sm">
            <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <MapPin className="text-red-600" /> Ink & Art HQ
            </h4>
            <p className="text-stone-300 text-sm mb-6 leading-relaxed">
              Bernardo Sayão, 1000 - Subsolo<br/>
              Nova Imperatriz, Imperatriz - MA
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-stone-400 text-sm">
                <Clock size={16} className="text-red-600" /> 
                <span>Ter - Sex: 10h - 20h</span>
              </div>
              <div className="flex items-center gap-3 text-stone-400 text-sm">
                <Clock size={16} className="text-red-600" /> 
                <span>Sábado: 10h - 18h</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-6 w-full text-xs"
              onClick={() => window.open('https://goo.gl/maps/YOUR_LINK_HERE', '_blank')}
            >
              Traçar Rota
            </Button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-stone-900 text-stone-500 text-sm">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-white font-bold text-lg mb-4">INK & ART</h5>
            <p className="mb-4">Arte permanente para almas temporárias.</p>
            <div className="flex gap-4">
              <Instagram className="hover:text-white cursor-pointer" />
              <Linkedin className="hover:text-white cursor-pointer" />
            </div>
          </div>
          <div><h5 className="text-white mb-4 uppercase tracking-wider text-xs">Menu</h5>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-red-500">Quem Somos</a></li>
              <li><a href="#portfolio" className="hover:text-red-500">Portfólio</a></li>
            </ul>
          </div>
          <div><h5 className="text-white mb-4 uppercase tracking-wider text-xs">Contato</h5><p>(11) 99999-9999</p><p>contato@inkart.com</p></div>
          <div className="text-right">
             <Button variant="outline" className="text-xs" onClick={() => setShowLogin(true)}>Staff Area</Button>
          </div>
        </div>
      </footer>

      {/* ELEMENTOS FLUTUANTES */}
      <FloatingWhatsApp />

      {/* MODAL LOGIN */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-700 p-8 rounded-lg max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Acesso Restrito</h3>
            <input type="password" id="adminPass" className="w-full bg-stone-950 border border-stone-800 text-white p-3 mb-4 focus:border-red-600 outline-none" placeholder="Senha" />
            <div className="flex gap-2">
              <Button className="w-full" onClick={() => handleLoginAttempt(document.getElementById('adminPass').value)}>Entrar</Button>
              <Button className="w-full" variant="outline" onClick={() => setShowLogin(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}