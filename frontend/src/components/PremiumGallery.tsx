import { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useTemple } from "@/components/TempleLayout";
import { templeImages, roomImages } from "@/lib/temple";

export interface GalleryItem {
  id: string;
  category: "temple" | "pushkarini" | "sculptures" | "festivals" | "rooms";
  src: string;
  titleEn: string;
  titleKn: string;
  titleHi: string;
  descEn: string;
  descKn: string;
  descHi: string;
}

export const curatedGallery: GalleryItem[] = [
  {
    id: "garbhagriha",
    category: "temple",
    src: templeImages.darshan,
    titleEn: "Garbhagriha Shiva Linga Darshan",
    titleKn: "ಗರ್ಭಗುಡಿ ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಲಿಂಗ ದರ್ಶನ",
    titleHi: "गर्भगृह श्री महाकूटेश्वर शिवलिंग दर्शन",
    descEn: "Presiding ancient Shiva Linga with full golden floral alankara inside the sanctum.",
    descKn: "ಪುಷ್ಪಾಲಂಕೃತವಾಗಿ ಕಂಗೊಳಿಸುವ ಮಹಾಕೂಟೇಶ್ವರನ ಮುಖ್ಯ ಗರ್ಭಗುಡಿ ದರ್ಶನ.",
    descHi: "गर्भगृह में विराजमान भगवान शिव का पुष्प एवं स्वर्ण अलंकृत पावन दर्शन।",
  },
  {
    id: "pushkarini-tank",
    category: "pushkarini",
    src: templeImages.water,
    titleEn: "Sacred Papavinasha Pushkarini",
    titleKn: "ಪಾಪವಿನಾಶ ಪುಷ್ಕರಿಣಿ ಪವಿತ್ರ ತೀರ್ಥ",
    titleHi: "पापनाशिनी पावन पुष्करिणी तीर्थ",
    descEn: "Crystal-clear sacred water tank with ancient steps and central stone pavilion.",
    descKn: "ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲುಗಳು ಮತ್ತು ಮಧ್ಯದ ಶಿಲಾ ಮಂಟಪದಿಂದ ಕೂಡಿದ ಪವಿತ್ರ ಜಲಕುಂಡ.",
    descHi: "शिला सोपानों एवं केंद्रीय मंडप से युक्त निर्मल पापनाशिनी तीर्थ।",
  },
  {
    id: "twin-shrines",
    category: "temple",
    src: templeImages.twinShrines,
    titleEn: "Early Badami Chalukya Twin Shrines",
    titleKn: "ಬಾದಾಮಿ ಚಾಲುಕ್ಯರ ಜೋಡಿ ಶಿವಾಲಯಗಳು",
    titleHi: "बादामी चालुक्य कालीन जुड़वां शिवालय",
    descEn: "Stepped Nagara and Dravidian hybrid vimana architecture dating to 600 CE.",
    descKn: "ಕ್ರಿ.ಶ. 600ರ ಕಾಲದ ದ್ರಾವಿಡ ಮತ್ತು ನಾಗರ ಶೈಲಿಯ ಸುಂದರ ಶಿಖರಗಳುಳ್ಳ ದೇವಾಲಯಗಳು.",
    descHi: "छठी शताब्दी के नागर एवं द्रविड़ स्थापत्य शैली के अद्वितीय देवालय।",
  },
  {
    id: "banyan-tree",
    category: "temple",
    src: templeImages.banyan,
    titleEn: "Centuries-Old Sacred Banyan Tree",
    titleKn: "ಶತಮಾನಗಳ ಪ್ರಾಚೀನ ಪವಿತ್ರ ಆಲದ ಮರ",
    titleHi: "शताब्दियों प्राचीन पावन वटवृक्ष",
    descEn: "Colossal canopy sheltering ancient shrines and Nandi statues under continuous shade.",
    descKn: "ದೇವಾಲಯದ ಪ್ರಾಂಗಣದಲ್ಲಿ ನೆರಳು ನೀಡುವ ಶತಮಾನಗಳ ಪುರಾತನ ಆಲದ ವೃಕ್ಷದ ಹಂದರ.",
    descHi: "मंदिर प्रांगण को छांव प्रदान करता शताब्दियों पुराना विशाल वटवृक्ष।",
  },
  {
    id: "stone-carving",
    category: "sculptures",
    src: templeImages.carving,
    titleEn: "Intricate Stone Pediment Sculptures",
    titleKn: "ಶಿಲಾ ಮಂಟಪದ ಮೇಲಿನ ದೇವತಾ ಕೆತ್ತನೆಗಳು",
    titleHi: "पाषाण मंडप पर उत्कीर्ण अनुपम देव प्रतिमाएं",
    descEn: "Intricately sculpted celestial figures and Shiva ganas carved into red sandstone.",
    descKn: "ಕೆಂಪು ಮರಳುಗಲ್ಲಿನಲ್ಲಿ ಅದ್ಭುತವಾಗಿ ಕೆತ್ತಲಾದ ದೇವಗಣಗಳು ಮತ್ತು ಶಿಲ್ಪಕಲಾ ವೈಭವ.",
    descHi: "लाल बलुआ पत्थर पर सूक्ष्मता से गढ़ी गई शिवगण एवं देव प्रतिमाएं।",
  },
  {
    id: "nandi-mandapa",
    category: "sculptures",
    src: templeImages.nandiMandapa,
    titleEn: "Pillared Nandi Mandapa & Pavilions",
    titleKn: "ಕಲ್ಲಿನ ಕಂಬಗಳ ಭವ್ಯ ನಂದಿ ಮಂಟಪ",
    titleHi: "स्तंभयुक्त भव्य नंदी मंडप",
    descEn: "Carved stone Nandi bull seated reverently facing the garbhagriha.",
    descKn: "ಗರ್ಭಗುಡಿಯೆದುರು ಪ್ರಾರ್ಥನಾ ಭಂಗಿಯಲ್ಲಿ ಆಸೀನನಾಗಿರುವ ಕಲ್ಲಿನ ನಂದಿ ವಿಗ್ರಹ.",
    descHi: "गर्भगृह के सम्मुख श्रद्धा भाव से विराजमान पाषाण नंदी महाराज।",
  },
  {
    id: "pushkarini-steps",
    category: "pushkarini",
    src: templeImages.pushkariniSteps,
    titleEn: "Garlanded Shrine by Pushkarini Ghat",
    titleKn: "ಪುಷ್ಕರಿಣಿ ಮೆಟ್ಟಿಲುಗಳ ಬದಿಯ ಪುಷ್ಪಾಲಂಕೃತ ಗುಡಿ",
    titleHi: "पुष्करिणी सोपानों पर पुष्पालंकृत देवालय",
    descEn: "Pilgrims performing water oblations beside the decorated stone shrine.",
    descKn: "ತೀರ್ಥಸ್ನಾನದ ಬಳಿಕ ಭಕ್ತರು ಪೂಜೆ ಸಲ್ಲಿಸುವ ಪುಷ್ಕರಿಣಿಯ ಮುಂಭಾಗದ ಗುಡಿ.",
    descHi: "पवित्र तीर्थ स्नान के उपरांत पूजा अर्चना का पावन सोपान स्थल।",
  },
  {
    id: "shikhara-davam",
    category: "temple",
    src: templeImages.shikhara,
    titleEn: "Mahakuteshwara Dravidian Shikhara",
    titleKn: "ಮಹಾಕೂಟೇಶ್ವರ ದೇವಾಲಯದ ಭವ್ಯ ಶಿಖರ",
    titleHi: "महाकूटेश्वर मंदिर का भव्य शिखर",
    descEn: "Multi-tiered sandstone vimana tower crowned with square kalasha dome.",
    descKn: "ಕಲಶದಿಂದ ಕಂಗೊಳಿಸುವ ಕೆಂಪು ಶಿಲೆಯ ಭವ್ಯ ಹಂತಗಳ ವಿಮಾನ ಗೋಪುರ.",
    descHi: "कलश से सुशोभित बहुस्तरीय पाषाण विमान शिखर।",
  },
  {
    id: "annual-jatre",
    category: "festivals",
    src: templeImages.twinShrinesCanopy,
    titleEn: "Annual Rathotsava Festival Arena",
    titleKn: "ವಾರ್ಷಿಕ ಬ್ರಹ್ಮ ರಥೋತ್ಸವ ಪ್ರಾಂಗಣ",
    titleHi: "वार्षिक रथोत्सव पावन परिसर",
    descEn: "Thousands of devotees gather under the forest canopy during Magha Poornima.",
    descKn: "ಮಾಘ ಶುದ್ಧ ಹುಣ್ಣಿಮೆಯಂದು ಸಹಸ್ರಾರು ಭಕ್ತರು ಸೇರುವ ಪವಿತ್ರ ರಥೋತ್ಸವ ಮೈದಾನ.",
    descHi: "माघ पूर्णिमा के अवसर पर हजारों श्रद्धालुओं का पावन संगम स्थल।",
  },
  {
    id: "nandi-under-tree",
    category: "sculptures",
    src: templeImages.nandiUnderTree,
    titleEn: "Nandi Bulls under Sacred Foliage",
    titleKn: "ಪವಿತ್ರ ವೃಕ್ಷ ಛಾಯೆಯಲ್ಲಿ ನಂದಿ ವಿಗ್ರಹಗಳು",
    titleHi: "पावन छांव में नंदी प्रतिमाएं",
    descEn: "Revered Nandi sculptures resting under the centuries-old banyan branches.",
    descKn: "ಪುರಾತನ ವೃಕ್ಷದ ಬೇರುಗಳ ಸನಿಹದಲ್ಲಿರುವ ಭಕ್ತಿ ಪ್ರೇರಿತ ನಂದಿ ಶಿಲ್ಪಗಳು.",
    descHi: "प्राचीन वटवृक्ष की जड़ों के समीप स्थापित पाषाण नंदी प्रतिमाएं।",
  },
  {
    id: "pravasi-nilaya",
    category: "rooms",
    src: roomImages.pravasiNilayaWide,
    titleEn: "Sri Mahakuteshwara Pravasi Nilaya",
    titleKn: "ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಪ್ರವಾಸಿ ನಿಲಯ",
    titleHi: "श्री महाकूटेश्वर प्रवासी निलय",
    descEn: "Pilgrim guest house providing peaceful, clean lodging inside the temple campus.",
    descKn: "ದೇವಾಲಯದ ಆವರಣದಲ್ಲೇ ಇರುವ ಭಕ್ತರ ಶಾಂತಿಯುತ ತಂಗುದಾಣ.",
    descHi: "मंदिर परिसर में स्थित शांत एवं स्वच्छ यात्री विश्राम भवन।",
  },
  {
    id: "room-interior",
    category: "rooms",
    src: roomImages.roomDoubleDeity,
    titleEn: "Guest House Deluxe Rooms",
    titleKn: "ಯಾತ್ರಿ ನಿವಾಸದ ಕೊಠಡಿ ವ್ಯವಸ್ಥೆ",
    titleHi: "यात्री निवास कक्ष व्यवस्था",
    descEn: "Clean, humble, and well-maintained rooms for families and pilgrims.",
    descKn: "ಕುಟುಂಬ ಸಮೇತ ಬರುವ ಭಕ್ತರಿಗೆ ಶುಚಿಯಾದ ಹಾಸಿಗೆ ಮತ್ತು ಸ್ನಾನಗೃಹ ಸೌಲಭ್ಯ.",
    descHi: "परिवार सहित पधारने वाले श्रद्धालुओं हेतु स्वच्छ एवं सुविधाजनक कमरे।",
  },
];

export default function PremiumGallery() {
  const { language } = useTemple();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const categories = [
    { id: "all", en: "All Photographs", kn: "ಎಲ್ಲಾ ಚಿತ್ರಗಳು", hi: "सभी छायाचित्र" },
    { id: "temple", en: "Ancient Shrines", kn: "ಪ್ರಾಚೀನ ದೇವಾಲಯಗಳು", hi: "प्राचीन शिवालय" },
    { id: "pushkarini", en: "Holy Pushkarini", kn: "ಪವಿತ್ರ ಪುಷ್ಕರಿಣಿ", hi: "पावन पुष्करिणी" },
    { id: "sculptures", en: "Stone Sculptures", kn: "ಶಿಲ್ಪಕಲೆಗಳು", hi: "पाषाण शिल्प" },
    { id: "festivals", en: "Festivals & Jatre", kn: "ಜಾತ್ರೆ ಉತ್ಸವಗಳು", hi: "जात्रा उत्सव" },
    { id: "rooms", en: "Pilgrim Rooms", kn: "ಪ್ರವಾಸಿ ನಿಲಯ", hi: "यात्री निवास" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? curatedGallery
      : curatedGallery.filter((item) => item.category === selectedCategory);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
        setZoomLevel(1);
      } else if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
        setZoomLevel(1);
      } else if (e.key === "Escape") {
        setActiveIdx(null);
        setZoomLevel(1);
      }
    },
    [activeIdx, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activeItem = activeIdx !== null ? filteredItems[activeIdx] : null;

  return (
    <section className="py-16 sm:py-24" data-testid="premium-gallery-section">
      <div className="container-wide">
        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveIdx(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-(--gold) text-stone-950 font-bold shadow-md scale-105"
                  : "bg-(--card) text-(--muted) hover:text-(--text) border border-(--line) hover:border-(--gold)"
              }`}
            >
              {language === "en" ? cat.en : language === "kn" ? cat.kn : cat.hi}
            </button>
          ))}
        </div>

        {/* Masonry / Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveIdx(idx);
                setZoomLevel(1);
              }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-(--line) bg-(--card) shadow-sm hover:shadow-2xl hover:border-(--gold) transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.titleEn}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white/80 group-hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#fbbf24] block">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold font-serif line-clamp-1 leading-snug">
                    {language === "en" ? item.titleEn : language === "kn" ? item.titleKn : item.titleHi}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      {activeItem && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-fade-in ${
            isFullscreen ? "p-0" : ""
          }`}
          onClick={() => setActiveIdx(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between pb-3 text-white/80">
              <span className="text-xs font-mono">
                {activeIdx! + 1} / {filteredItems.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.2, z + 0.3))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.3))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  onClick={() => setActiveIdx(null)}
                  className="p-2 rounded-full bg-red-600/80 hover:bg-red-600 text-white transition-colors ml-2"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Main Lightbox Image Stage with Crossfade and Zoom */}
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-stone-950/60 max-h-[70vh]">
              {/* Prev Button */}
              <button
                onClick={() => {
                  setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
                  setZoomLevel(1);
                }}
                className="absolute left-3 z-20 p-2.5 rounded-full bg-black/60 hover:bg-(--gold) text-white hover:text-stone-950 backdrop-blur-md transition-all"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft size={20} />
              </button>

              <img
                src={activeItem.src}
                alt={activeItem.titleEn}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: "transform 0.25s ease",
                }}
                className="max-h-[68vh] w-auto max-w-full object-contain cursor-zoom-in"
                onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 1.6))}
              />

              {/* Next Button */}
              <button
                onClick={() => {
                  setActiveIdx((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
                  setZoomLevel(1);
                }}
                className="absolute right-3 z-20 p-2.5 rounded-full bg-black/60 hover:bg-(--gold) text-white hover:text-stone-950 backdrop-blur-md transition-all"
                title="Next (Right Arrow)"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Caption & Metadata Footer */}
            <div className="mt-4 text-center text-white max-w-2xl px-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#fbbf24]">
                {activeItem.category} · Sri Kshetra Mahakuta
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif mt-0.5">
                {language === "en" ? activeItem.titleEn : language === "kn" ? activeItem.titleKn : activeItem.titleHi}
              </h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                {language === "en" ? activeItem.descEn : language === "kn" ? activeItem.descKn : activeItem.descHi}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
