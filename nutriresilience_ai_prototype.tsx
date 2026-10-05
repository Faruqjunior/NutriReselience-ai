import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Smile, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  User, 
  Sparkles, 
  ChevronRight, 
  MapPin, 
  Coins, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  Pause, 
  RefreshCw, 
  BookOpen, 
  HelpCircle,
  Menu,
  X,
  Info,
  Send,
  Sliders,
  Utensils,
  Brain,
  Activity,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    appName: "NutriResilience AI",
    tagline: "Personalized Nutrition & Mental Wellbeing for Kenya",
    language: "Language",
    voiceAudio: "Voice Audio",
    voiceOn: "Audio Enabled",
    voiceOff: "Audio Muted",
    lowData: "Low-Data Mode",
    lowDataActive: "Low-Data Active (Saving bandwidth)",
    privacyConsent: "Privacy & Informed Consent",
    consentText: "Your privacy is strictly protected. NutriResilience AI collects zero identifying personal data. Emergency referrals are available 24/7.",
    acceptConsent: "I Understand & Agree",
    emergencyHelpline: "Emergency Helplines (Kenya)",
    mentalHealthLine: "National Mental Health Helpline: 1190",
    gbvLine: "GBV Support Helpline: 1195",
    redCrossLine: "Kenya Red Cross Emergency: 1199",
    tabs: {
      dashboard: "Home",
      nutriplan: "NutriPlan",
      mindcare: "MindCare",
      referrals: "Support & Care",
      assistant: "AI NutriBuddy"
    },
    personas: {
      title: "Select Your Profile for Tailored Guidance",
      pregnant: "Pregnant / Lactating Mother",
      pregnantDesc: "Focus on Iron, Folate, Calcium & Maternal Mental Health",
      budget: "Low-Income Household",
      budgetDesc: "Maximizing nutrition on a tight daily KSh budget",
      youth: "Adolescent Focus",
      youthDesc: "Growth, energy, exam stress & positive body image",
      elderly: "Older Adult (Wazee)",
      elderlyDesc: "Easy digestion, joint health, diabetes & hypertension care",
      relief: "Food Insecure / Relief Mode",
      reliefDesc: "High-density nutrient emergency meal strategies"
    },
    dashboard: {
      welcome: "Habari! Welcome back",
      dailyQuoteTitle: "Daily Resilience Thought",
      dailyQuote: "Chakula ni dawa - Food is medicine. Even small steps in daily nutrition strengthen your mind and home.",
      quickBudgetMeal: "Today's Budget Meal Recommendation",
      quickMoodCheck: "How are you feeling today?",
      emergencyAlert: "In Crisis? Free Toll-Free Help Available",
      quickTools: "Quick Tools"
    },
    nutriplan: {
      title: "Affordable Kenyan Meal Planner",
      budgetLabel: "Your Daily Food Budget per person (KSh):",
      calcBtn: "Generate Local Meal Plan",
      staplesTitle: "Locally Sourced Kenyan Nutritious Foods",
      nutrientTarget: "Daily Nutrient Focus for",
      ingredients: "Key Local Ingredients",
      prepSteps: "Budget Preparation Method",
      costPerServing: "Est. Cost / Portion"
    },
    mindcare: {
      title: "MindCare & Emotional Health",
      moodTracker: "Daily Mood Check-in",
      guidedExercise: "Grounding & Breathing Exercise (Amani Timer)",
      screenerTitle: "Simple Wellness Self-Check (PHQ-2)",
      communityStories: "Community Resilience Voices",
      breathingInstruction: "Breathe in slowly... Hold... Breathe out slowly..."
    },
    assistant: {
      title: "AI NutriBuddy Assistant",
      subtitle: "Ask me anything about local foods, cheap recipes, pregnancy care, or stress relief in Kenya.",
      placeholder: "Type a question in Swahili or English (e.g., Jinsi ya kupika ndengu kwa bajeti ndogo?)...",
      disclaimer: "AI Guidance only. Not a replacement for professional medical advice."
    }
  },
  sw: {
    appName: "NutriResilience AI",
    tagline: "Lishe Bora na Afya ya Akili kwa Wakenya Wote",
    language: "Lugha",
    voiceAudio: "Sauti za Kusoma",
    voiceOn: "Sauti Imewashwa",
    voiceOff: "Sauti Imezimwa",
    lowData: "Njia ya Data Ndogo",
    lowDataActive: "Data Ndogo Inafanya Kazi (Inaokoa Data)",
    privacyConsent: "Faragha na Idhini",
    consentText: "Faragha yako inalindwa kikamilifu. NutriResilience AI haichukui taarifa zako za siri. Huduma za dharura zinapatikana saa 24/7.",
    acceptConsent: "Nimekula na Kukubali",
    emergencyHelpline: "Nambari za Dharura (Kenya)",
    mentalHealthLine: "Afya ya Akili Kitengo cha Kitaifa: 1190",
    gbvLine: "Usaidizi wa Ukatili wa Kijinsia: 1195",
    redCrossLine: "Ambulansi ya Msalaba Mwekundu: 1199",
    tabs: {
      dashboard: "Nyumbani",
      nutriplan: "Mpango Lishe",
      mindcare: "Afya ya Akili",
      referrals: "Vituo na Usaidizi",
      assistant: "Rafiki NutriBuddy"
    },
    personas: {
      title: "Chagua Aina ya Wasifu Wako",
      pregnant: "Mama Mjamzito / Anayenyonyesha",
      pregnantDesc: "Uwezo wa Madini ya Chuma (Iron), Folate na Afya ya Mama",
      budget: "Familia ya Bajeti Ndogo",
      budgetDesc: "Kupata lishe bora kwa KSh chache za kila siku",
      youth: "Vijana na Makatika",
      youthDesc: "Nishati ya ukuaji, maandalizi ya mtihani na msongo wa mawazo",
      elderly: "Wazee (Wazee Wetu)",
      elderlyDesc: "Chakula laini cha kusaga, viungo, na kuzuia kisukari",
      relief: "Usaidizi wa Dharura wa Chakula",
      reliefDesc: "Mbinu za kupata virutubisho vya haraka wakati wa shida"
    },
    dashboard: {
      welcome: "Habari za leo! Karibu",
      dailyQuoteTitle: "Wazo la Busara la Siku",
      dailyQuote: "Chakula ni dawa na nguzo ya familia. Hatua ndogo katika lishe husaidia kuimarisha akili na amani nyumbani.",
      quickBudgetMeal: "Pendekezo la Chakula cha Bajeti cha Leo",
      quickMoodCheck: "Unajihisi vipi leo?",
      emergencyAlert: "Uko kwenye shida? Piga Nambari za Bure",
      quickTools: "Zana za Haraka"
    },
    nutriplan: {
      title: "Mpango wa Chakula cha Bei Nafuu Kenya",
      budgetLabel: "Bajeti yako ya chakula kwa siku (KSh):",
      calcBtn: "Tengeneza Ratiba ya Chakula",
      staplesTitle: "Chakula Kinachopatikana Nchini Kenya",
      nutrientTarget: "Virutubisho Muhimu kwa",
      ingredients: "Mahitaji Muhimu ya Kienyeji",
      prepSteps: "Njia Rahisi ya Kupika",
      costPerServing: "Gharama kwa Sahani"
    },
    mindcare: {
      title: "Afya ya Akili na Utulivu wa Mawazo",
      moodTracker: "Hali yako ya Moyo Leo",
      guidedExercise: "Zoezi la Kupumua na Kutuliza Akili (Amani Timer)",
      screenerTitle: "Kujipima Hali ya Hisia (PHQ-2)",
      communityStories: "Ushuhuda na Sauti za Jamii",
      breathingInstruction: "Vuta hewa ndani polepole... Zuia kidogo... Toa hewa polepole..."
    },
    assistant: {
      title: "Msaidizi wako NutriBuddy",
      subtitle: "Niulize swali lolote kuhusu vyakula vya Kenya, kupika kwa bajeti, au afya ya uzazi na akili.",
      placeholder: "Andika swali lako kwa Kiswahili au Kiingereza...",
      disclaimer: "Ushauri wa AI pekee. Sio badala ya daktari hospitalini."
    }
  }
};

const KENYAN_STAPLES = [
  { name: "Sukuma Wiki (Collard Greens)", iron: "High", folate: "Medium", cost: "KSh 20-40/bunch", benefits: "Rich in Fiber & Vitamin C", Category: "Greens" },
  { name: "Terere / Mchicha (Amaranth Leaves)", iron: "Very High", folate: "High", cost: "KSh 30/bunch", benefits: "Excellent for anemia and maternal blood expansion", Category: "Greens" },
  { name: "Ndengu (Mung Beans / Yellow Beans)", iron: "High", folate: "Very High", cost: "KSh 60/cup", benefits: "Low-cost protein, gentle on digestion for toddlers & mothers", Category: "Pulses" },
  { name: "Githeri (Maize & Beans)", iron: "Medium", folate: "High", cost: "KSh 80/bowl", benefits: "Sustained energy grain + legume synergy", Category: "Staple" },
  { name: "Omena (Lake Victoria Sardines)", iron: "Very High", folate: "Medium", cost: "KSh 50/tin", benefits: "Calcium powerhouse for bone density & fetal development", Category: "Protein" },
  { name: "Sweet Potatoes (Viazihai/Yellow Slesh)", iron: "Medium", folate: "Medium", cost: "KSh 40/piece", benefits: "Vitamin A for immune resilience and vision", Category: "Carbs" },
  { name: "Avocado (Parachichi)", iron: "Low", folate: "High", cost: "KSh 30-50/pc", benefits: "Healthy mono-unsaturated fats for fetal brain growth", Category: "Fats" },
  { name: "Ugali ya Mtama/Uwele (Millet Ugali)", iron: "High", folate: "Medium", cost: "KSh 70/kg", benefits: "Gluten-free, low glycemic index for diabetic care", Category: "Staple" }
];

const HEALTH_CENTERS = [
  { name: "Kenyatta National Hospital - Nutrition & Mental Health Clinic", location: "Nairobi, Upper Hill", phone: "+254 20 2726300", type: "National Referral Hospital", freeServices: true },
  { name: "Mbagathi County Hospital (Sub-County Clinic)", location: "Nairobi, Kibera/Lang'ata", phone: "0722 000000", type: "County Public Hospital", freeServices: true },
  { name: "Mathari National Teaching & Referral Hospital", location: "Nairobi, Thika Road", phone: "+254 20 2337694", type: "Mental Health Specialist Center", freeServices: true },
  { name: "Mama Lucy Kibaki Hospital Maternal Clinic", location: "Nairobi, Embakasi", phone: "0700 119000", type: "Maternal & Child Health", freeServices: true },
  { name: "Coast General Teaching & Referral Hospital", location: "Mombasa", phone: "+254 41 2314201", type: "Regional Hospital", freeServices: true },
  { name: "Moi Teaching & Referral Hospital (MTRH)", location: "Eldoret", phone: "+254 53 2033471", type: "Referral & Nutrition Center", freeServices: true }
];

export default function App() {
  // App State
  const [lang, setLang] = useState('en'); // 'en' or 'sw'
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [persona, setPersona] = useState('pregnant');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Audio simulation state
  const [speakingText, setSpeakingText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // NutriPlan state
  const [budget, setBudget] = useState(150);
  const [generatedMeal, setGeneratedMeal] = useState(null);

  // MindCare state
  const [todayMood, setTodayMood] = useState(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const [breathingCounter, setBreathingCounter] = useState(4);
  const [phqAnswers, setPhqAnswers] = useState({ q1: 0, q2: 0 });

  // AI Assistant Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      textEn: "Jambo! I am NutriBuddy. How can I support your meal planning or mental wellbeing today?",
      textSw: "Jambo! Mimi ni NutriBuddy. Nawezaje kukusaidia na mpango wa chakula au afya ya akili leo?"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const t = TRANSLATIONS[lang];

  const speakText = (text) => {
    if (!voiceEnabled) return;
    setSpeakingText(text);
    setIsPlayingAudio(true);
    
    // Web Speech API fallback check
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'sw' ? 'sw-KE' : 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 3500);
    }
  };

  useEffect(() => {
    let interval = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingCounter((prev) => {
          if (prev > 1) return prev - 1;
          
          // Switch breathing phases
          if (breathingPhase === 'Inhale') {
            setBreathingPhase('Hold');
            return 4;
          } else if (breathingPhase === 'Hold') {
            setBreathingPhase('Exhale');
            return 4;
          } else {
            setBreathingPhase('Inhale');
            return 4;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
      setBreathingCounter(4);
      setBreathingPhase('Inhale');
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathingPhase]);

  const handleGenerateMeal = () => {
    let meal = {
      title: "",
      cost: budget,
      ingredients: [],
      preparation: "",
      nutrients: ""
    };

    if (persona === 'pregnant') {
      meal.title = lang === 'en' ? "Iron & Folate Rich Terere-Ndengu Pot with Yellow Sweet Potato" : "Mseto wa Terere, Ndengu na Viasihai Vyenye Madini ya Chuma";
      meal.ingredients = [
        "1 bunch Terere (Amaranth leaves) - KSh 30",
        "1 cup boiled Ndengu (Mung beans) - KSh 50",
        "2 medium boiled Sweet Potatoes - KSh 40",
        "1 small ripe Avocado - KSh 30"
      ];
      meal.preparation = lang === 'en' 
        ? "Lightly saute tomatoes and onions, fold in boiled ndengu, add chopped terere at the very end to preserve vitamins. Serve with warm sweet potatoes and sliced avocado."
        : "Kaanga vitunguu na nyanya, weka ndengu zilizotokota, kisha weka terere dakika ya mwisho ili lishe isipotee. Kulia kwa viazi vitamu na parachichi.";
      meal.nutrients = lang === 'en' ? "Provides 85% Daily Folate & 70% Iron needed for maternal blood health." : "Inatoa 85% ya Folate na 70% ya Chuma kinachohitajika na mama mjamzito.";
    } else if (persona === 'budget') {
      meal.title = lang === 'en' ? "High-Protein Githeri with Sukuma Wiki & Avocado" : "Githeri Safi ya Sukuma Wiki na Parachichi";
      meal.ingredients = [
        "1 bowl mixed Githeri (Maize + Beans) - KSh 70",
        "1 bunch Sukuma Wiki - KSh 20",
        "1 Tomato & Onion - KSh 20",
        "Half Avocado - KSh 20"
      ];
      meal.preparation = lang === 'en'
        ? "Simmer pre-boiled githeri with onions and garlic. Add finely shredded sukuma wiki. Garnish with rich avocado slices for essential healthy oils."
        : "Chemsha githeri na kitunguu na saumu. Ongeza sukuma wiki iliyokatwa kwa umakini. Ongeza parachichi upate mafuta mazuri ya mwili.";
      meal.nutrients = lang === 'en' ? "High fiber, steady glucose energy release, and complete plant proteins." : "Unywele mwingi, nguvu za muda mrefu na protini kamili ya mmea.";
    } else if (persona === 'elderly') {
      meal.title = lang === 'en' ? "Soft Millet Uji/Ugali with Braised Omena & Mchicha" : "Uji Au Ugali Laini wa Mtama na Omena za Mchicha";
      meal.ingredients = [
        "Mtama (Millet) flour - KSh 30",
        "1 tin dried Omena (washed thoroughly) - KSh 50",
        "Mchicha greens - KSh 30"
      ];
      meal.preparation = lang === 'en'
        ? "Pan-roast washed omena till crispy, soft stew with tomato paste. Cook soft millet ugali. Easily digestible and bone-fortifying."
        : "Kaanga omena zilizowa vizuri, pika kwa mchuzi wa nyanya. Pika ugali laini wa mtama. Ni rahisi kusaga na inaimarisha mifupa.";
      meal.nutrients = lang === 'en' ? "Extremely rich in Calcium and Vitamin D for joint and bone density." : "Tajiri wa Calcium na Vitamin D kwa ajili ya mifupa na viungo.";
    } else {
      meal.title = lang === 'en' ? "Power-Packed Energy Sukuma & Egg Ugali Bowl" : "Ugali, Mayai na Sukuma ya Nguvu za Haraka";
      meal.ingredients = [
        "2 Whole Eggs - KSh 35",
        "Ugali Maize Meal portion - KSh 25",
        "Sukuma wiki & Terere mix - KSh 30"
      ];
      meal.preparation = lang === 'en'
        ? "Boil or scramble eggs with tomato. Stir-fry mixed greens quickly. Serve hot with whole grain ugali."
        : "Pika mayai na nyanya. Kaanga mboga za majani kwa haraka. Kulia kwa ugali moto.";
      meal.nutrients = lang === 'en' ? "Quick bioavailable protein, Vitamin B12, and eye-health Lutein." : "Protini ya haraka, Vitamin B12 na kinga ya macho.";
    }

    setGeneratedMeal(meal);
  };

  const handleSendMessage = () => {
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    const newMsg = { sender: 'user', textEn: userText, textSw: userText };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let responseEn = "That is a great nutrition question. In Kenya, affordable foods like Omena, Ndengu, and Terere provide vital nutrients. For personalized care or health symptoms, please consult a local community health worker or sub-county health center.";
      let responseSw = "Hili ni swali zuri sana kuhusu lishe. Nchini Kenya, vyakula na bei nafuu kama Omena, Ndengu na Terere vinatoa virutubisho muhimu mno. Kujua zaidi kuhusu afya yako, tafadhali tembelea kituo cha afya kilicho karibu nawe.";

      const qLower = userText.toLowerCase();
      if (qLower.includes('mimba') || qLower.includes('pregnant') || qLower.includes('mother')) {
        responseEn = "For pregnant women, high Iron & Folate are crucial to prevent anemia. Eat Terere, boiled Ndengu, yellow sweet potatoes, and take free IFAS supplements from your local antenatal clinic!";
        responseSw = "Kwa akina mama wajawazito, Madini ya Chuma na Folate ni muhimu kuzuia upungufu wa damu. Kula Terere, Ndengu, viazi lishe na upate vidonge vya IFAS bure katika kliniki iliyo karibu!";
      } else if (qLower.includes('stress') || qLower.includes('mawazo') || qLower.includes('huzuni') || qLower.includes('sad')) {
        responseEn = "Feeling overwhelmed is understandable. Take a moment with our MindCare breathing tool. If you need immediate free confidential listening, dial Kenya National Mental Health Helpline 1190 toll-free.";
        responseSw = "Kuhisi msongo wa mawazo hutokea. Chukua muda kutumia zana yetu ya Amani/Breathing. Ukihitaji mtu wa kuongea naye bure, piga nambari ya dharura ya afya ya akili 1190.";
      } else if (qLower.includes('bajeti') || qLower.includes('budget') || qLower.includes('money') || qLower.includes('fedha')) {
        responseEn = "To eat nutritious meals on KSh 100-200 a day: prioritize Omena (KSh 40), Githeri (KSh 50), and Sukuma wiki (KSh 20). Combining pulses and dark greens gives high nutritional density at low cost.";
        responseSw = "Kula vizuri kwa KSh 100-200 kwa siku: tumia Omena (KSh 40), Githeri (KSh 50), na Sukuma wiki (KSh 20). Kuchanganya nafaka na mboga za kienyeji inatoa afya tele kwa gharama ndogo.";
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', textEn: responseEn, textSw: responseSw }
      ]);
      setIsTyping(false);
      speakText(lang === 'sw' ? responseSw : responseEn);
    }, 1200);
  };

  return (
    <div className={`min-h-screen ${lowDataMode ? 'bg-amber-50/30' : 'bg-slate-50'} text-slate-800 font-sans pb-20 md:pb-6`}>
      
      {}
      {!hasConsented && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-emerald-600 animate-fade-in">
            <div className="flex items-center space-x-3 text-emerald-800 mb-4">
              <ShieldCheck className="w-9 h-9 text-emerald-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold leading-tight">{t.appName}</h2>
                <p className="text-xs text-emerald-700">{t.tagline}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-600 mb-6 bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
              <h3 className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600" /> {t.privacyConsent}
              </h3>
              <p>{t.consentText}</p>
              <ul className="text-xs space-y-1 text-slate-700 list-disc list-inside pt-1">
                <li>Free digital health & community dietary guidance</li>
                <li>No personal GPS or phone contacts gathered</li>
                <li>Direct crisis linkage to 1190 & 1195 Toll-Free services</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setHasConsented(true);
                speakText(t.appName + ". " + t.tagline);
              }}
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg transition duration-200 flex items-center justify-center space-x-2 text-base"
            >
              <span>{t.acceptConsent}</span>
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {}
      <header className="sticky top-0 z-40 bg-emerald-900 text-white shadow-md border-b border-emerald-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-xl shadow-inner">
              NR
            </div>
            <div>
              <h1 className="font-extrabold text-lg leading-tight tracking-tight flex items-center gap-2">
                NutriResilience AI
                {lowDataMode && (
                  <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Low Data
                  </span>
                )}
              </h1>
              <p className="text-xs text-emerald-200 hidden sm:block">{t.tagline}</p>
            </div>
          </div>

          {/* Quick Header Tools */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <div className="bg-emerald-800 rounded-lg p-1 flex items-center text-xs font-semibold border border-emerald-700">
              <button
                onClick={() => { setLang('en'); speakText("Switched to English"); }}
                className={`px-2.5 py-1 rounded-md transition ${lang === 'en' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200 hover:text-white'}`}
              >
                ENG
              </button>
              <button
                onClick={() => { setLang('sw'); speakText("Imebadilishwa kwenda Kiswahili"); }}
                className={`px-2.5 py-1 rounded-md transition ${lang === 'sw' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200 hover:text-white'}`}
              >
                SWA
              </button>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                const nextState = !voiceEnabled;
                setVoiceEnabled(nextState);
                if (nextState) speakText("Voice audio enabled");
              }}
              title={voiceEnabled ? t.voiceOn : t.voiceOff}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 border ${
                voiceEnabled 
                  ? 'bg-amber-400 text-emerald-950 border-amber-300' 
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Low-Data Mode Toggle */}
            <button
              onClick={() => {
                setLowDataMode(!lowDataMode);
                speakText(lowDataMode ? "Full mode active" : "Low data mode active");
              }}
              title="Toggle Low Bandwidth Mode"
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 border ${
                lowDataMode 
                  ? 'bg-amber-500 text-slate-950 border-amber-400' 
                  : 'bg-emerald-800 text-emerald-200 border-emerald-700'
              }`}
            >
              {lowDataMode ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {}
      <section className="bg-emerald-800 text-emerald-100 border-b border-emerald-700 py-2.5 px-4 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center space-x-3 text-xs whitespace-nowrap scrollbar-none">
          <span className="font-bold text-amber-300 flex items-center gap-1 pr-1 border-r border-emerald-700">
            <User className="w-3.5 h-3.5" /> {t.personas.title.split(' ')[0]}:
          </span>
          
          {[
            { id: 'pregnant', label: t.personas.pregnant, icon: '🤰' },
            { id: 'budget', label: t.personas.budget, icon: '🍲' },
            { id: 'youth', label: t.personas.youth, icon: '🎓' },
            { id: 'elderly', label: t.personas.elderly, icon: '👵' },
            { id: 'relief', label: t.personas.relief, icon: '🆘' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPersona(item.id);
                speakText(item.label);
              }}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition ${
                persona === item.id 
                  ? 'bg-amber-400 text-emerald-950 font-bold shadow-md' 
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-700'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Audio Playback Status Indicator */}
      {isPlayingAudio && (
        <div className="bg-amber-400 text-emerald-950 text-xs px-4 py-1.5 flex items-center justify-between font-semibold shadow-sm animate-pulse">
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
            <Volume2 className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">"{speakingText}"</span>
          </div>
        </div>
      )}

      {}
      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* TABS: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Persona Hero Welcome */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 bg-emerald-950/50 text-amber-300 text-xs px-3 py-1 rounded-full border border-emerald-700/50">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Targeted for: <strong>{t.personas[persona]}</strong></span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-amber-100">
                  {t.dashboard.welcome}!
                </h2>
                <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
                  {persona === 'pregnant' && "Maternal nutritional support with extra Iron & Folate rich local foods, plus emotional grounding."}
                  {persona === 'budget' && "Maximizing nutrition on a flexible daily Kenya Shillings budget for your household."}
                  {persona === 'youth' && "High-energy balanced meals, exam stress management, and body positivity guidance."}
                  {persona === 'elderly' && "Soft digestible meals rich in Calcium for joint strength, hypertension and diabetic balance."}
                  {persona === 'relief' && "Emergency nutrient-dense choices using affordable pulses, local greens, and clean water."}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      speakText(t.dashboard.welcome + ". " + t.personas[persona]);
                    }}
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold px-4 py-2.5 rounded-xl transition shadow-md"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Listen Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('nutriplan')}
                    className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition border border-emerald-500"
                  >
                    <span>View Meal Planner</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Emergency Banner */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-900 text-sm">{t.dashboard.emergencyAlert}</h4>
                  <p className="text-xs text-red-700">Kenya National Mental Health Helpline: <strong className="text-red-900">1190</strong> (Toll-Free) | GBV Hotline: <strong>1195</strong></p>
                </div>
              </div>
              <a
                href="tel:1190"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 1190 Now</span>
              </a>
            </div>

            {/* Daily Wisdom & Quick Mood */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Daily Resilience Quote Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> {t.dashboard.dailyQuoteTitle}
                    </span>
                    <button 
                      onClick={() => speakText(t.dashboard.dailyQuote)}
                      className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-full hover:bg-slate-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-slate-700 italic text-base leading-relaxed font-serif">
                    "{t.dashboard.dailyQuote}"
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
                  <span>Kenyan Cultural Wellness Wisdom</span>
                  <button 
                    onClick={() => setActiveTab('mindcare')}
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    Explore MindCare &rarr;
                  </button>
                </div>
              </div>

              {/* Quick Mood Check-in */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-base">{t.dashboard.quickMoodCheck}</h3>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                    Self Check
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center">
                  {[
                    { mood: 'Great', emoji: '😃', labelEn: 'Furaha / Happy', color: 'bg-emerald-100 text-emerald-800' },
                    { mood: 'Good', emoji: '🙂', labelEn: 'Sawa / Calm', color: 'bg-teal-100 text-teal-800' },
                    { mood: 'Okay', emoji: '😐', labelEn: 'Kawaida / Okay', color: 'bg-amber-100 text-amber-800' },
                    { mood: 'Sad', emoji: '😔', labelEn: 'Huzuni / Sad', color: 'bg-blue-100 text-blue-800' },
                    { mood: 'Stressed', emoji: '😰', labelEn: 'Mawazo / Anxious', color: 'bg-rose-100 text-rose-800' }
                  ].map((m) => (
                    <button
                      key={m.mood}
                      onClick={() => {
                        setTodayMood(m.mood);
                        speakText(`You logged feeling ${m.mood}`);
                      }}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 border transition ${
                        todayMood === m.mood 
                          ? 'ring-2 ring-emerald-600 bg-emerald-50 border-emerald-400 scale-105' 
                          : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="text-[10px] font-bold text-slate-600 truncate w-full">{m.mood}</span>
                    </button>
                  ))}
                </div>

                {todayMood && (
                  <div className="bg-emerald-50 text-emerald-900 p-3 rounded-xl text-xs flex items-center justify-between border border-emerald-200">
                    <span>Mood logged: <strong>{todayMood}</strong></span>
                    <button 
                      onClick={() => setActiveTab('mindcare')}
                      className="font-bold text-emerald-700 underline text-[11px]"
                    >
                      Try Breathing Exercise
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Local Kenyan Foods Highlight */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{t.nutriplan.staplesTitle}</h3>
                  <p className="text-xs text-slate-500">Accessible nutrient dense local foods across Kenya</p>
                </div>
                <button 
                  onClick={() => setActiveTab('nutriplan')}
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  View Meal Planner &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {KENYAN_STAPLES.slice(0, 4).map((food, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {food.Category}
                      </span>
                      <span className="text-[11px] font-bold text-amber-700">{food.cost}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">{food.name}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{food.benefits}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TABS: NUTRIPLAN (Meal Planner) */}
        {activeTab === 'nutriplan' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-800">{t.nutriplan.title}</h2>
                  <p className="text-xs text-slate-500">Tailored to: <strong className="text-emerald-700">{t.personas[persona]}</strong></p>
                </div>
                <Utensils className="w-8 h-8 text-emerald-600" />
              </div>

              {/* Budget Slider */}
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-emerald-700" /> {t.nutriplan.budgetLabel}
                  </label>
                  <span className="text-lg font-black text-emerald-800 bg-white px-3 py-1 rounded-xl shadow-sm border border-emerald-200">
                    KSh {budget}
                  </span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer h-2 bg-emerald-200 rounded-lg"
                />

                <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                  <span>KSh 50 (Very Low)</span>
                  <span>KSh 200 (Medium)</span>
                  <span>KSh 500 (Higher)</span>
                </div>
              </div>

              <button
                onClick={handleGenerateMeal}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.nutriplan.calcBtn}</span>
              </button>
            </div>

            {/* Generated Recipe Card */}
            {generatedMeal && (
              <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-lg space-y-4 animate-fade-in">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                      Estimated Cost: ~{generatedMeal.cost} KSh
                    </span>
                    <h3 className="text-xl font-black text-slate-800 mt-2">{generatedMeal.title}</h3>
                  </div>
                  <button
                    onClick={() => speakText(`${generatedMeal.title}. ${generatedMeal.preparation}`)}
                    className="p-2 bg-emerald-100 text-emerald-800 rounded-full hover:bg-emerald-200"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-800">
                      <Check className="w-4 h-4 text-emerald-600" /> {t.nutriplan.ingredients}
                    </h4>
                    <ul className="space-y-1.5 text-slate-700 text-xs">
                      {generatedMeal.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-800">
                      <Info className="w-4 h-4 text-emerald-600" /> {t.nutriplan.nutrientTarget}
                    </h4>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {generatedMeal.nutrients}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-1 text-xs uppercase tracking-wider text-slate-600">
                    {t.nutriplan.prepSteps}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {generatedMeal.preparation}
                  </p>
                </div>
              </div>
            )}

            {/* Full Staples Food Directory */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-base">{t.nutriplan.staplesTitle} Directory</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {KENYAN_STAPLES.map((food, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 bg-white shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {food.Category}
                      </span>
                      <span className="text-xs font-black text-amber-700">{food.cost}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">{food.name}</h4>
                    <p className="text-xs text-slate-600">{food.benefits}</p>
                    <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 flex justify-between">
                      <span>Iron: <strong>{food.iron}</strong></span>
                      <span>Folate: <strong>{food.folate}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TABS: MINDCARE (Mental Wellbeing) */}
        {activeTab === 'mindcare' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-800">{t.mindcare.title}</h2>
                  <p className="text-xs text-slate-500">Self-care, stress grounding, and emotional support</p>
                </div>
                <Brain className="w-8 h-8 text-emerald-600" />
              </div>

              {/* Guided Breathing Exercise Timer */}
              <div className="bg-gradient-to-br from-teal-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md text-center space-y-4 relative overflow-hidden">
                <h3 className="font-bold text-amber-300 text-sm">{t.mindcare.guidedExercise}</h3>
                
                <div className="my-6 flex flex-col items-center justify-center">
                  <div className={`w-32 h-32 rounded-full border-4 border-amber-400 flex flex-col items-center justify-center shadow-2xl transition-all duration-1000 ${
                    breathingPhase === 'Inhale' ? 'scale-110 bg-amber-400/20' : breathingPhase === 'Hold' ? 'scale-105 bg-amber-400/30' : 'scale-95 bg-emerald-900/40'
                  }`}>
                    <span className="text-xs text-amber-200 uppercase tracking-widest">{breathingPhase}</span>
                    <span className="text-4xl font-black text-white">{breathingCounter}</span>
                  </div>
                </div>

                <p className="text-xs text-emerald-200 max-w-sm mx-auto">
                  {t.mindcare.breathingInstruction}
                </p>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setBreathingActive(!breathingActive);
                      speakText(breathingActive ? "Exercise paused" : "Starting breathing exercise");
                    }}
                    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl transition shadow flex items-center gap-2"
                  >
                    {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{breathingActive ? 'Pause Exercise' : 'Start Amani Timer'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Simple Wellness Intake Check (PHQ-2) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-base">{t.mindcare.screenerTitle}</h3>
              <p className="text-xs text-slate-500">Over the last 2 weeks, how often have you been bothered by these issues?</p>

              <div className="space-y-4 text-xs">
                
                {/* Q1 */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <p className="font-semibold text-slate-800">1. Little interest or pleasure in doing things?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Not at all', 'Several days', 'More than half days', 'Nearly every day'].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPhqAnswers(prev => ({ ...prev, q1: idx }))}
                        className={`p-2 rounded-xl border text-center transition ${
                          phqAnswers.q1 === idx ? 'bg-emerald-700 text-white font-bold border-emerald-700' : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q2 */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <p className="font-semibold text-slate-800">2. Feeling down, depressed, or hopeless?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Not at all', 'Several days', 'More than half days', 'Nearly every day'].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPhqAnswers(prev => ({ ...prev, q2: idx }))}
                        className={`p-2 rounded-xl border text-center transition ${
                          phqAnswers.q2 === idx ? 'bg-emerald-700 text-white font-bold border-emerald-700' : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Feedback Based on Score */}
              {(phqAnswers.q1 + phqAnswers.q2) >= 3 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-2 text-amber-900">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Support Guidance Recommendation</span>
                  </div>
                  <p>Your responses suggest you may be experiencing emotional distress. Please consider speaking with a trusted health counselor or calling Kenya's free Mental Health Helpline <strong>1190</strong>.</p>
                </div>
              )}
            </div>

            {/* Community Voices & Resilience Stories */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-base">{t.mindcare.communityStories}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                  <div className="flex items-center justify-between font-bold text-emerald-900">
                    <span>Amina M. (Nakuru)</span>
                    <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded-full">Mother of 3</span>
                  </div>
                  <p className="text-slate-700 italic">
                    "When my husband lost his casual job, feeding our young children felt overwhelming. Cooking Ndengu with local amaranth greens gave us rich energy while staying strictly within our budget."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
                  <div className="flex items-center justify-between font-bold text-teal-900">
                    <span>Samuel O. (Kibera, Nairobi)</span>
                    <span className="text-[10px] bg-teal-200 px-2 py-0.5 rounded-full">Youth Advocate</span>
                  </div>
                  <p className="text-slate-700 italic">
                    "The 1190 helpline provided someone who listened when anxiety was keeping me up at night. Combining mind exercises with good simple food changed my daily routine."
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TABS: REFERRALS & CRISIS */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-800">Support & Healthcare Facilities</h2>
                  <p className="text-xs text-slate-500">Kenya public health centers, sub-county clinics & emergency contacts</p>
                </div>
                <MapPin className="w-8 h-8 text-emerald-600" />
              </div>

              {/* Direct Emergency Call Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div className="p-4 bg-red-600 text-white rounded-2xl space-y-2 flex flex-col justify-between shadow-md">
                  <div>
                    <h4 className="font-extrabold text-sm">Mental Health Helpline</h4>
                    <p className="text-xs text-red-100">National Toll-Free 24/7</p>
                  </div>
                  <a
                    href="tel:1190"
                    className="w-full py-2 bg-white text-red-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-red-50"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call 1190
                  </a>
                </div>

                <div className="p-4 bg-purple-700 text-white rounded-2xl space-y-2 flex flex-col justify-between shadow-md">
                  <div>
                    <h4 className="font-extrabold text-sm">GBV Support Helpline</h4>
                    <p className="text-xs text-purple-100">Gender Violence Toll-Free</p>
                  </div>
                  <a
                    href="tel:1195"
                    className="w-full py-2 bg-white text-purple-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-purple-50"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call 1195
                  </a>
                </div>

                <div className="p-4 bg-emerald-800 text-white rounded-2xl space-y-2 flex flex-col justify-between shadow-md">
                  <div>
                    <h4 className="font-extrabold text-sm">Red Cross Emergency</h4>
                    <p className="text-xs text-emerald-100">Ambulance & Crisis Response</p>
                  </div>
                  <a
                    href="tel:1199"
                    className="w-full py-2 bg-white text-emerald-900 font-bold rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-emerald-50"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call 1199
                  </a>
                </div>

              </div>
            </div>

            {/* Health Center Directory */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-base">Key Kenyan Healthcare Directory</h3>

              <div className="space-y-3">
                {HEALTH_CENTERS.map((facility, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 text-sm">{facility.name}</h4>
                        {facility.freeServices && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                            Public Services
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {facility.location} &bull; <span className="text-emerald-700 font-medium">{facility.type}</span>
                      </p>
                    </div>

                    <a
                      href={`tel:${facility.phone}`}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 self-start sm:self-auto shadow-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{facility.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TABS: AI NUTRIBUDDY ASSISTANT */}
        {activeTab === 'assistant' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
            
            {/* Assistant Header */}
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-sm">
                  AI
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">{t.assistant.title}</h3>
                  <p className="text-xs text-emerald-200">{t.assistant.subtitle}</p>
                </div>
              </div>

              <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded-full border border-emerald-700">
                Swahili + English
              </span>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {chatMessages.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                const text = lang === 'sw' ? msg.textSw : msg.textEn;

                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isUser
                          ? 'bg-emerald-700 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none space-y-1'
                      }`}
                    >
                      <p>{text}</p>
                      
                      {!isUser && (
                        <div className="pt-1 flex justify-end">
                          <button
                            onClick={() => speakText(text)}
                            className="p-1 text-slate-400 hover:text-emerald-700"
                            title="Listen"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-400 flex items-center space-x-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                    <span>NutriBuddy is generating tailored guidance...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.assistant.placeholder}
                className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputQuery.trim()}
                className="p-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl shadow-xs transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-100 text-[10px] text-slate-500 text-center py-1.5 px-2 border-t border-slate-200">
              {t.assistant.disclaimer}
            </div>

          </div>
        )}

      </main>

      {}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-40 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around py-2 px-1">
          
          {[
            { id: 'dashboard', label: t.tabs.dashboard, icon: Activity },
            { id: 'nutriplan', label: t.tabs.nutriplan, icon: Utensils },
            { id: 'mindcare', label: t.tabs.mindcare, icon: Brain },
            { id: 'referrals', label: t.tabs.referrals, icon: MapPin },
            { id: 'assistant', label: t.tabs.assistant, icon: MessageSquare }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  speakText(tab.label);
                }}
                className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition ${
                  isActive ? 'text-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-emerald-700 scale-110' : ''}`} />
                <span className="text-[10px] mt-1 truncate max-w-[65px]">{tab.label}</span>
              </button>
            );
          })}

        </div>
      </nav>

    </div>
  );
}