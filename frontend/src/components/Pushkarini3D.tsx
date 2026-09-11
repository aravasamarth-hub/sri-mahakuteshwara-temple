import { useState, useRef, useEffect, useId } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Waves,
  Eye,
} from "lucide-react";
import { useTemple } from "@/components/TempleLayout";
import { motion, AnimatePresence } from "motion/react";

export interface PushkariniHotspot {
  id: string;
  number: string;
  xPercent: number; // Position percentage on desktop image
  yPercent: number;
  mobileXPercent: number;
  mobileYPercent: number;
  titleEn: string;
  titleKn: string;
  titleHi: string;
  tagEn: string;
  tagKn: string;
  tagHi: string;
  descEn: string;
  descKn: string;
  descHi: string;
  detailsEn: string[];
  detailsKn: string[];
  detailsHi: string[];
  photo: string;
  captionEn: string;
  captionKn: string;
  captionHi: string;
}

const hotspots: PushkariniHotspot[] = [
  {
    id: "linga",
    number: "01",
    xPercent: 43.3,
    yPercent: 50.8,
    mobileXPercent: 43.3,
    mobileYPercent: 51,
    titleEn: "Chaturmukha Shiva Linga",
    titleKn: "ಚತುರ್ಮುಖ ಶ್ರೀ ಶಿವಲಿಂಗ",
    titleHi: "चतुर्मुख श्री शिवलिंग",
    tagEn: "Sacred Sanctum Inside the Tank",
    tagKn: "ಪುಷ್ಕರಿಣಿಯ ಕೇಂದ್ರ ಶಿಲಾ ಮಂಟಪ",
    tagHi: "पुष्करिणी के मध्य मंडप में प्रतिष्ठित",
    descEn:
      "Enshrined within an ancient 7th-century open stone mandapa rising directly from the sacred pool, this exceptionally rare four-faced Shiva Linga faces the four cardinal directions: Sadyojata (West), Vamadeva (North), Aghora (South), and Tatpurusha (East), with the formless Ishana gazing upward toward the heavens.",
    descKn:
      "ಪುಷ್ಕರಿಣಿಯ ಮಧ್ಯದಲ್ಲಿರುವ 7ನೇ ಶತಮಾನದ ಶಿಲಾ ಮಂಟಪದಲ್ಲಿ ಪ್ರತಿಷ್ಠಾಪಿಸಲಾದ ಅಪರೂಪದ ಚತುರ್ಮುಖ ಶಿವಲಿಂಗ. ನಾಲ್ಕು ದಿಕ್ಕುಗಳಿಗೂ ಮುಖಮಾಡಿರುವ ಸದ್ಯೋಜಾತ, ವಾಮದೇವ, ಅಘೋರ ಮತ್ತು ತತ್ಪುರುಷ ಮುಖಗಳನ್ನು ಹೊಂದಿದೆ. ಸದಾ ಹರಿಯುವ ನೈಸರ್ಗಿಕ ತೀರ್ಥವು ಲಿಂಗಕ್ಕೆ ನಿರಂತರ ಜಲಾಭಿಷೇಕವನ್ನು ನೆರವೇರಿಸುತ್ತದೆ.",
    descHi:
      "पवित्र पुष्करिणी के मध्य में स्थित सातवीं शताब्दी के शिला मंडप में विराजित अत्यंत दुर्लभ चतुर्मुख शिवलिंग। चारों दिशाओं में भगवान शिव के चार दिव्य स्वरूप—सद्योजात, वामदेव, अघोर एवं तत्पुरुष—दर्शन देते हैं। प्राकृतिक जलस्रोत से नित्य निरंतर जलाभिषेक संपन्न होता है।",
    detailsEn: [
      "Carved from single dense sandstone block in early Badami Chalukya style (c. 600 CE)",
      "Natural spring waters constantly flow around its plinth, performing eternal Jalabhisheka",
      "Corresponds directly to the sacred Shaivite Panchamukha Agamic philosophy",
    ],
    detailsKn: [
      "ಬಾದಾಮಿ ಚಾಲುಕ್ಯರ ಆರಂಭಿಕ ಕಾಲದ (ಕ್ರಿ.ಶ. 600) ಏಕಶಿಲಾ ಕೆತ್ತನೆ",
      "ಪುಷ್ಕರಿಣಿಯ ಶುದ್ಧ ತೀರ್ಥವು ನಿರಂತರವಾಗಿ ಜಲಾಭಿಷೇಕ ಮಾಡುತ್ತದೆ",
      "ಶೈವಾಗಮದ ಪಂಚಮುಖ ತತ್ವಕ್ಕೆ ನೇರ ನಿದರ್ಶನ",
    ],
    detailsHi: [
      "बादामी चालुक्य कालीन (लगभग 600 ईस्वी) दुर्लभ एकाश्म बलुआ पत्थर की मूर्ति",
      "निर्मल जलधारा द्वारा अखंड प्राकृतिक जलाभिषेक",
      "शैव आगम के पंचमुख सिद्धांत का साक्षात स्वरूप",
    ],
    photo: "/images/temple/pushkarini-chaturmukha-linga.jpg",
    captionEn: "Close-up view of the submerged Chaturmukha Shiva Linga inside the stone pavilion",
    captionKn: "ಶಿಲಾ ಮಂಟಪದಲ್ಲಿರುವ ಚತುರ್ಮುಖ ಶಿವಲಿಂಗದ ನೈಜ ಸಮೀಪ ದೃಶ್ಯ",
    captionHi: "शिला मंडप के भीतर प्रतिष्ठित चतुर्मुख शिवलिंग का वास्तविक दृश्य",
  },
  {
    id: "teertha",
    number: "02",
    xPercent: 28,
    yPercent: 72,
    mobileXPercent: 28,
    mobileYPercent: 72,
    titleEn: "Papavinasha Theertha",
    titleKn: "ಪಾಪವಿನಾಶ ಪವಿತ್ರ ತೀರ್ಥ",
    titleHi: "पापनाशिनी पावन तीर्थ",
    tagEn: "Perennial Cleansing Waters of Dakshina Kashi",
    tagKn: "ಪಾಪ ಪರಿಹಾರಕ ದೈವಿಕ ಜಲಕುಂಡ",
    tagHi: "दक्षिण काशी का परम पावन जलकुंड",
    descEn:
      "Celebrated across centuries of sacred literature and stone inscriptions as Karnataka's most sanctified stepwell pool. Pilgrims undertake holy ablution in these crystal-clear, emerald-tinted mineral waters to dissolve ancestral karmas before offering prayers at the main sanctum.",
    descKn:
      "ಶತಮಾನಗಳಿಂದಲೂ 'ದಕ್ಷಿಣ ಕಾಶಿ'ಯ ಪರಮ ಪವಿತ್ರ ಜಲಕುಂಡವೆಂದು ಪ್ರಸಿದ್ಧವಾಗಿದೆ. ಈ ಹಸಿರು-ಸ್ಫಟಿಕದಂತಹ ನಿರ್ಮಲ ತೀರ್ಥದಲ್ಲಿ ಮುಳುಗೆದ್ದು ಸ್ನಾನ ಮಾಡುವುದರಿಂದ ಸಮಸ್ತ ಪಾಪಗಳು ದೂರವಾಗಿ ಮನಸ್ಸಿಗೆ ಪರಿಶುದ್ಧತೆ, ಶಾಂತಿ ಲಭಿಸುತ್ತದೆ ಎಂಬುದು ಅನಾದಿ ಕಾಲದ ನಂಬಿಕೆ.",
    descHi:
      "शताब्दियों से 'दक्षिण काशी' के सर्वाधिक पावन जलकुंड के रूप में प्रसिद्ध। इस निर्मल, औषधीय गुणों से परिपूर्ण जल में स्नान करने से जन्म-जन्मांतर के पापों का क्षय होकर आत्मिक शांति और पुण्य की प्राप्ति होती है।",
    detailsEn: [
      "Naturally filtered thermal water with high mineral purity and natural clarity",
      "Maintains a continuous constant depth and gentle temperature through all seasons",
      "Historical inscriptions record royal queens and kings bathing here prior to temple donations",
    ],
    detailsKn: [
      "ನೈಸರ್ಗಿಕವಾಗಿ ಶುದ್ಧೀಕರಣಗೊಳ್ಳುವ ಖನಿಜಯುಕ್ತ ಶುದ್ಧ ತೀರ್ಥ",
      "ಎಲ್ಲಾ ಋತುಗಳಲ್ಲೂ ಸಮಾನ ತಾಪಮಾನ ಹಾಗೂ ನೀರಿನ ಮಟ್ಟವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳುತ್ತದೆ",
      "ರಾಜ-ಮಹಾರಾಣಿಯರು ದಾನ ನೀಡುವ ಮುನ್ನ ಇಲ್ಲಿ ಪುಣ್ಯಸ್ನಾನ ಮಾಡುತ್ತಿದ್ದ ಬಗ್ಗೆ ಶಾಸನಗಳಲ್ಲಿ ಉಲ್ಲೇಖವಿದೆ",
    ],
    detailsHi: [
      "प्राकृतिक रूप से शुद्ध व औषधीय गुणों से युक्त निर्मल जल",
      "ग्रीष्म हो या शीत, जलस्तर व तापमान सदैव एकसमान रहता है",
      "ऐतिहासिक अभिलेखों में सम्राटों और रानियों द्वारा दान से पूर्व यहाँ स्नान का उल्लेख है",
    ],
    photo: "/images/temple/pushkarini-wide-ghats.jpg",
    captionEn: "Panoramic view of the sacred emerald waters and sandstone retaining walls",
    captionKn: "ಪವಿತ್ರ ಹಸಿರು ತೀರ್ಥ ಮತ್ತು ಪ್ರಾಚೀನ ಶಿಲಾ ಗೋಡೆಗಳ ವಿಹಂಗಮ ನೋಟ",
    captionHi: "निर्मल जलकुंड एवं बलुआ पत्थर की दीवारों का मनोरम विहंगम दृश्य",
  },
  {
    id: "spring",
    number: "03",
    xPercent: 12,
    yPercent: 46,
    mobileXPercent: 12,
    mobileYPercent: 46,
    titleEn: "Sacred Perennial Spring",
    titleKn: "ನಿತ್ಯ ಹರಿಯುವ ನೈಸರ್ಗಿಕ ತೀರ್ಥದ ಸೆಲೆ",
    titleHi: "अखंड प्राकृतिक जल स्रोत",
    tagEn: "Subterranean Natural Aquifer",
    tagKn: "ಬಾದಾಮಿ ಬೆಟ್ಟಗಳಿಂದ ಹರಿಯುವ ಜೀವಜಲ",
    tagHi: "बलुआ पाषाण पहाड़ियों से फूटता प्राकृतिक स्रोत",
    descEn:
      "A geological and spiritual wonder: natural sweet thermal water continuously gushes from an underground cavern beneath the Badami red sandstone hills. The spring never dries up, feeding the tank constantly even in the peak drought of Karnataka summers.",
    descKn:
      "ಬಾದಾಮಿಯ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬೆಟ್ಟಗಳ ಆಳದಿಂದ ನೈಸರ್ಗಿಕವಾಗಿ ಉದ್ಭವಿಸುವ ಈ ಜೀವಂತ ತೀರ್ಥದ ಸೆಲೆಯು ಎಂದಿಗೂ ಬತ್ತುವುದಿಲ್ಲ. ಅತ್ಯಂತ ಬಿರು ಬೇಸಿಗೆಯಲ್ಲೂ ಸಮೃದ್ಧ ನೀರಿನ ಧಾರೆಯನ್ನು ಪುಷ್ಕರಿಣಿಗೆ ಒದಗಿಸುತ್ತದೆ.",
    descHi:
      "एक प्राकृतिक व आध्यात्मिक चमत्कार: बादामी की पहाड़ियों के गर्भ से निरंतर फूटता मीठे जल का स्रोत। भीषण ग्रीष्म ऋतु में भी यह जलस्रोत कभी नहीं सूखता और पुष्करिणी को सदैव तृप्त रखता है।",
    detailsEn: [
      "Feeds fresh water continuously through hidden conduits in the western ashlar masonry wall",
      "Surplus sacred water gently drains outward into the lush temple coconut and banyan grove",
      "Recorded in local folklore as an underground branch of the sacred Ganga (Gupta Ganga)",
    ],
    detailsKn: [
      "ಪಶ್ಚಿಮ ಶಿಲಾ ಗೋಡೆಯ ಮೂಲಕ ಸದಾ ತಾಜಾ ತೀರ್ಥ ಒಳಹರಿಯುತ್ತದೆ",
      "ಹೆಚ್ಚುವರಿ ನೀರು ದೇವಾಲಯದ ಹಸಿರು ತೆಂಗಿನ ಹಾಗೂ ಅರಳಿ ತೋಟಗಳಿಗೆ ಹರಿಯುತ್ತದೆ",
      "ಸ್ಥಳೀಯ ನಂಬಿಕೆಯಂತೆ ಇದು 'ಗುಪ್ತ ಗಂಗೆ'ಯ ಪವಿತ್ರ ರೂಪವಾಗಿದೆ",
    ],
    detailsHi: [
      "पश्चिमी दीवार की प्राचीन शिलाओं के भीतर से अविरल जल प्रवाह",
      "अतिरिक्त जल परिसर के सघन वटवृक्षों व उद्यानों को सिंचित करता है",
      "लोकमान्यता में इसे 'गुप्त गंगा' का पावन स्वरूप माना गया है",
    ],
    photo: "/images/temple/pushkarini-sacred-tank.jpg",
    captionEn: "Stone masonry channel where the natural underground spring replenishes the tank",
    captionKn: "ನೈಸರ್ಗಿಕ ತೀರ್ಥದ ಸೆಲೆಯು ಪುಷ್ಕರಿಣಿಗೆ ಹರಿಯುವ ಶಿಲಾ ಮಾರ್ಗ",
    captionHi: "शिला मार्ग जहाँ से अखंड प्राकृतिक जलस्रोत कुंड में प्रविष्ट होता है",
  },
  {
    id: "steps",
    number: "04",
    xPercent: 88,
    yPercent: 50,
    mobileXPercent: 86,
    mobileYPercent: 50,
    titleEn: "Ritual Bathing Steps (Ghats)",
    titleKn: "ಪವಿತ್ರ ಸ್ನಾನದ ಶಿಲಾ ಸೋಪಾನಗಳು",
    titleHi: "पवित्र स्नान सोपान (घाट)",
    tagEn: "Ancient Sandstone Ablution Ghats",
    tagKn: "ಭಕ್ತರ ತೀರ್ಥಸ್ನಾನದ ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲುಗಳು",
    tagHi: "तीर्थयात्रियों के पावन स्नान हेतु सोपान",
    descEn:
      "Broad, carefully dressed multi-tier sandstone ghats designed in the 7th century allow pilgrims safe access to the holy pool. Surrounding the steps are open arcaded stone niches, small secondary shrines, and carved nandi reliefs where devotees perform morning dhyana and rituals.",
    descKn:
      "7ನೇ ಶತಮಾನದಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಭವ್ಯ ಕೆತ್ತನೆಯ ಮೆಟ್ಟಿಲುಗಳು ಭಕ್ತರಿಗೆ ಸುರಕ್ಷಿತವಾಗಿ ತೀರ್ಥದಲ್ಲಿ ಇಳಿಯಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತವೆ. ಮೆಟ್ಟಿಲುಗಳ ಸುತ್ತಲೂ ಪ್ರಾಚೀನ ಶಿಲಾ ಮಂಟಪಗಳು, ನಂದಿ ಶಿಲ್ಪಗಳು ಹಾಗೂ ಧ್ಯಾನ ಸ್ಥಳಗಳಿವೆ.",
    descHi:
      "सातवीं शताब्दी में निर्मित चौड़े व सुव्यवस्थित लाल बलुआ पत्थर के सोपान। इन सीढ़ियों के समीप प्राचीन देवालय, नंदी प्रतिमाएं एवं मंडप स्थित हैं जहाँ श्रद्धालु स्नान उपरांत ध्यान व अनुष्ठान करते हैं।",
    detailsEn: [
      "Stepped design accommodates seasonal water-level variations with complete stability",
      "Flanked by early Chalukyan sub-shrines dedicated to Lord Shiva, Parvati, and Vishnu",
      "Thousands of devotees gather on these ghats during the annual Maha Shivaratri Brahmotsava",
    ],
    detailsKn: [
      "ಶತಮಾನಗಳ ಪ್ರವಾಹವನ್ನು ಮೆಟ್ಟಿ ನಿಂತಿರುವ ಸುಭದ್ರ ಶಿಲಾ ವಿನ್ಯಾಸ",
      "ಮೆಟ್ಟಿಲುಗಳ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಶಿವ, ಪಾರ್ವತಿ ಮತ್ತು ನಂದಿಯ ಪುರಾತನ ಕಿರು ದೇವಾಲಯಗಳು",
      "ಮಹಾ ಶಿವರಾತ್ರಿಯಂದು ಸಾವಿರಾರು ಭಕ್ತರು ಇಲ್ಲಿ ನೆರೆದು ಪುಣ್ಯಸ್ನಾನ ಮಾಡುತ್ತಾರೆ",
    ],
    detailsHi: [
      "सैकड़ों वर्षों से अडिग प्राचीन चालुक्य स्थापत्य का उत्कृष्ट उदाहरण",
      "सोपानों के ऊपर भगवान शिव, पार्वती एवं नंदी के लघु देवालय",
      "महाशिवरात्रि के पावन अवसर पर सहस्रों श्रद्धालु यहाँ स्नान कर पुण्य लाभ लेते हैं",
    ],
    photo: "/images/temple/pushkarini-devotees-bath.jpg",
    captionEn: "Devotees descending the sacred sandstone steps for ritual morning bath",
    captionKn: "ಪ್ರಾಚೀನ ಶಿಲಾ ಮೆಟ್ಟಿಲುಗಳಲ್ಲಿ ತೀರ್ಥಸ್ನಾನ ಮಾಡುತ್ತಿರುವ ಭಕ್ತರ ನೈಜ ದೃಶ್ಯ",
    captionHi: "पवित्र घाटों पर प्रातःकालीन अनुष्ठान स्नान करते श्रद्धालु",
  },
];

export default function PushkariniExperience() {
  const { language } = useTemple();
  const [selectedHotspot, setSelectedHotspot] = useState<PushkariniHotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<PushkariniHotspot | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);
  const filterId = useId();

  // Subtle Mouse Parallax (-1 to 1)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Keyboard navigation between hotspots
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedHotspot) return;
      const currentIndex = hotspots.findIndex((h) => h.id === selectedHotspot.id);
      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % hotspots.length;
        setSelectedHotspot(hotspots[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + hotspots.length) % hotspots.length;
        setSelectedHotspot(hotspots[prevIndex]);
      } else if (e.key === "Escape") {
        setSelectedHotspot(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedHotspot]);

  // Floating Dust Particles in Sunlight Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 675);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create subtle golden dust motes drifting in sunbeams
    const particleCount = 38;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.4) * 0.35,
      vy: -(Math.random() * 0.3 + 0.15),
      opacity: Math.random() * 0.55 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.pulseSpeed;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentOpacity = p.opacity + Math.sin(p.angle) * 0.15;

        // Soft golden glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        gradient.addColorStop(0, `rgba(255, 235, 170, ${Math.max(0, currentOpacity)})`);
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 250, 220, ${Math.max(0, currentOpacity * 1.2)})`;
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Ambient Sacred Water Sound (Synthesized natural ripples via Web Audio API)
  const toggleWaterAudio = () => {
    if (isAudioPlaying) {
      if (audioGainRef.current && audioContextRef.current) {
        audioGainRef.current.gain.linearRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.6);
        setTimeout(() => {
          setIsAudioPlaying(false);
        }, 600);
      } else {
        setIsAudioPlaying(false);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Gentle pink noise filtered for water ripple sound
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(450, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);

      whiteNoise.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(0);
      audioGainRef.current = gain;
      setIsAudioPlaying(true);
    } catch {
      setIsAudioPlaying(false);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-(--gold)/30 bg-stone-950 shadow-2xl transition-all select-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="interactive-pushkarini-container"
    >
      {/* SVG Water Ripple & Caustic Filter Definition */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id={`water-ripple-${filterId}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.035"
              numOctaves="3"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                dur="16s"
                values="0.012 0.030; 0.018 0.045; 0.012 0.030"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Main Photographic Stage (16:9 Aspect Ratio on Desktop) */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] w-full overflow-hidden bg-stone-950">
        {/* Background Authentic Photograph with Slow Parallax Movement */}
        <div
          className="absolute inset-[-4%] w-[108%] h-[108%] transition-transform duration-700 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -8}px, 0) scale(1.04)`,
          }}
        >
          <img
            src="/images/temple/pushkarini-aerial-view.jpg"
            alt="Authentic high-resolution photograph of Sri Kshetra Mahakuta Papavinasha Pushkarini sacred stepwell tank"
            className="w-full h-full object-cover object-center"
            loading="eager"
            data-testid="pushkarini-hero-photo"
          />

          {/* Gentle Water Ripple Shader Effect (Targeted to the sacred water area) */}
          <div
            className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none opacity-40 mix-blend-overlay transition-opacity"
            style={{ filter: `url(#water-ripple-${filterId})` }}
          />

          {/* Soft Water Specular Highlight & Morning Sunlight Glint */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-emerald-950/40 via-teal-900/10 to-transparent pointer-events-none" />

          {/* Soft Golden Morning Sunlight Rays Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[#fbbf24]/20 pointer-events-none mix-blend-screen" />
          <div className="absolute inset-0 bg-radial-[at_top_right] from-[#ffe58f]/25 via-transparent to-black/35 pointer-events-none" />
        </div>

        {/* Floating Dust Particles Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Top Floating Control & Discovery Bar */}
        <div className="absolute top-3 sm:top-5 inset-x-3 sm:inset-x-6 z-20 flex items-center justify-between gap-3 pointer-events-auto">
          {/* Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-white text-xs shadow-lg">
            <Compass size={14} className="text-[#ffd700] animate-spin-slow" />
            <span className="font-serif tracking-wider uppercase text-[11px] font-semibold text-[#f5eedc]">
              {language === "en"
                ? "UNESCO Discovery · 600 CE Sacred Tank"
                : language === "kn"
                ? "ಪ್ರಾಚೀನ ಪರಂಪರೆ · ಕ್ರಿ.ಶ. 600ರ ಪವಿತ್ರ ತೀರ್ಥ"
                : "प्राचीन धरोहर · 600 ईस्वी पावन तीर्थ"}
            </span>
          </div>

          {/* Audio & Hint Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleWaterAudio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-stone-200 hover:text-white hover:border-[#ffd700] text-xs transition-colors shadow-lg cursor-pointer"
              aria-label={isAudioPlaying ? "Mute sacred spring water sounds" : "Play sacred spring water sounds"}
              data-testid="pushkarini-audio-toggle"
              title="Toggle ambient holy spring water sound"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 size={14} className="text-[#ffd700] animate-pulse" />
                  <span className="hidden xs:inline text-[11px] font-medium">Spring Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX size={14} className="text-stone-400" />
                  <span className="hidden xs:inline text-[11px] font-medium">Spring Sound Off</span>
                </>
              )}
            </button>

            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-stone-300 text-[11px]">
              <Eye size={13} className="text-[#ffd700]" />
              <span>Tap glowing beacons to discover sacred relics</span>
            </div>
          </div>
        </div>

        {/* 4 Interactive Glowing Hotspot Markers */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {hotspots.map((spot) => {
            const isSelected = selectedHotspot?.id === spot.id;
            const isHovered = hoveredHotspot?.id === spot.id;

            return (
              <div
                key={spot.id}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: `${spot.xPercent}%`,
                  top: `${spot.yPercent}%`,
                }}
              >
                <button
                  onClick={() => setSelectedHotspot(spot)}
                  onMouseEnter={() => setHoveredHotspot(spot)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  className={`group relative flex items-center justify-center cursor-pointer transition-transform duration-300 ${
                    isSelected ? "scale-125" : "hover:scale-115"
                  }`}
                  aria-label={`Discover ${spot.titleEn}`}
                  data-testid={`pushkarini-hotspot-${spot.id}`}
                >
                  {/* Subtle Expanding Radar Rings */}
                  <span className="absolute -inset-2 rounded-full bg-[#e5c158]/30 animate-ping duration-1000 pointer-events-none" />
                  <span className="absolute -inset-3.5 rounded-full bg-[#d4af37]/15 animate-pulse duration-1000 pointer-events-none" />

                  {/* Hotspot Core Diya Beacon */}
                  <div
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-serif text-xs font-bold transition-all shadow-xl ${
                      isSelected
                        ? "bg-gradient-to-r from-[#ffd700] to-[#f59e0b] text-stone-950 ring-4 ring-white/70 scale-110"
                        : "bg-black/75 text-[#ffd700] border-2 border-[#ffd700] backdrop-blur-md group-hover:bg-[#ffd700] group-hover:text-stone-950"
                    }`}
                  >
                    <Sparkles size={14} className={isSelected ? "animate-spin-slow" : ""} />
                  </div>

                  {/* Desktop Hover Label Pill */}
                  <div
                    className={`hidden sm:flex absolute left-1/2 -translate-x-1/2 -top-9 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#ffd700]/50 text-white text-[11px] font-medium whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none ${
                      isHovered || isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                  >
                    <span>{language === "en" ? spot.titleEn : language === "kn" ? spot.titleKn : spot.titleHi}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Hotspot Quick Selector Strip (Especially convenient on mobile & tablet) */}
        <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-6 z-20 flex items-center justify-center gap-1.5 sm:gap-3 pointer-events-auto">
          <div className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-2xl bg-black/70 backdrop-blur-md border border-[#d4af37]/30 max-w-full overflow-x-auto shadow-2xl scrollbar-none">
            {hotspots.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#c99e28] to-[#e5c158] text-stone-950 font-bold shadow-md scale-102"
                      : "text-stone-300 hover:text-white hover:bg-white/10"
                  }`}
                  data-testid={`quick-tab-${spot.id}`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px] font-serif">
                    {spot.number}
                  </span>
                  <span className="text-[11px] sm:text-xs">
                    {language === "en" ? spot.titleEn : language === "kn" ? spot.titleKn : spot.titleHi}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Museum-Grade Floating Information Card (Desktop floating modal / Mobile bottom sheet) */}
      <AnimatePresence>
        {selectedHotspot && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedHotspot(null)}
            data-testid="hotspot-modal-backdrop"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-stone-900/95 border border-[#d4af37]/40 shadow-2xl text-white backdrop-blur-xl flex flex-col"
              data-testid="pushkarini-info-card"
            >
              {/* Card Photo Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl bg-black">
                <img
                  src={selectedHotspot.photo}
                  alt={selectedHotspot.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-colors shadow-lg cursor-pointer"
                  aria-label="Close details"
                  data-testid="close-info-card"
                >
                  <X size={18} />
                </button>

                {/* Photo Caption Badge */}
                <div className="absolute bottom-3 left-4 right-4 text-xs text-stone-300 font-sans line-clamp-1">
                  <em>
                    {language === "en"
                      ? selectedHotspot.captionEn
                      : language === "kn"
                      ? selectedHotspot.captionKn
                      : selectedHotspot.captionHi}
                  </em>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-7 flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#ffd700]">
                    <MapPin size={13} />
                    <span>
                      {language === "en"
                        ? selectedHotspot.tagEn
                        : language === "kn"
                        ? selectedHotspot.tagKn
                        : selectedHotspot.tagHi}
                    </span>
                  </div>

                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold font-serif text-[#fdf7e8] tracking-tight">
                    {language === "en"
                      ? selectedHotspot.titleEn
                      : language === "kn"
                      ? selectedHotspot.titleKn
                      : selectedHotspot.titleHi}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
                  {language === "en"
                    ? selectedHotspot.descEn
                    : language === "kn"
                    ? selectedHotspot.descKn
                    : selectedHotspot.descHi}
                </p>

                {/* Archaeological & Spiritual Bullet Points */}
                <div className="rounded-2xl border border-(--line) bg-black/40 p-4 flex flex-col gap-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffd700] flex items-center gap-1.5">
                    <Waves size={13} />
                    {language === "en" ? "Archaeological & Sacred Notes" : language === "kn" ? "ಐತಿಹಾಸಿಕ ಹಾಗೂ ಪವಿತ್ರ ವಿವರಗಳು" : "पुरातात्विक एवं पावन तथ्य"}
                  </span>
                  <ul className="flex flex-col gap-2 text-xs sm:text-sm text-stone-200">
                    {(language === "en"
                      ? selectedHotspot.detailsEn
                      : language === "kn"
                      ? selectedHotspot.detailsKn
                      : selectedHotspot.detailsHi
                    ).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-snug">
                        <span className="text-[#ffd700] font-bold shrink-0 mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Navigation Between Relics */}
                <div className="mt-2 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-stone-400">
                    Relic {selectedHotspot.number} of {hotspots.length}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const currentIndex = hotspots.findIndex((h) => h.id === selectedHotspot.id);
                        const prevIndex = (currentIndex - 1 + hotspots.length) % hotspots.length;
                        setSelectedHotspot(hotspots[prevIndex]);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/20 hover:border-[#ffd700] text-xs text-stone-200 hover:text-white transition-colors cursor-pointer"
                      aria-label="Previous relic"
                    >
                      <ChevronLeft size={14} />
                      <span className="hidden xs:inline">Prev</span>
                    </button>

                    <button
                      onClick={() => {
                        const currentIndex = hotspots.findIndex((h) => h.id === selectedHotspot.id);
                        const nextIndex = (currentIndex + 1) % hotspots.length;
                        setSelectedHotspot(hotspots[nextIndex]);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#c99e28] to-[#e5c158] text-stone-950 font-bold text-xs shadow-md transition-transform hover:scale-102 cursor-pointer"
                      aria-label="Next relic"
                    >
                      <span className="hidden xs:inline">Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
