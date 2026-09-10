import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, Clock3, Flower2, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { templeImages } from "@/lib/temple";
import { useTemple } from "@/components/TempleLayout";

const quickLinks = [
  { to: "/poojas", icon: Flower2, en: "Pooja booking", kn: "ಪೂಜೆ ಬುಕಿಂಗ್", hi: "पूजा बुकिंग", noteEn: "Offer a personal seva", noteKn: "ವೈಯಕ್ತಿಕ ಸೇವೆ ಸಲ್ಲಿಸಿ", noteHi: "व्यक्तिगत सेवा अर्पित करें" },
  { to: "/donations", icon: Heart, en: "Hundi offerings", kn: "ಹುಂಡಿ ಕಾಣಿಕೆ", hi: "हुंडी दान", noteEn: "Let your gift become seva", noteKn: "ನಿಮ್ಮ ಕಾಣಿಕೆ ಸೇವೆಯಾಗಲಿ", noteHi: "आपकी भेंट सेवा बने" },
  { to: "/rooms", icon: Sparkles, en: "Pilgrim rooms", kn: "ಭಕ್ತರ ಕೊಠಡಿಗಳು", hi: "भक्त निवास", noteEn: "Rest near the shrine", noteKn: "ದೇವಾಲಯದ ಸಮೀಪ ವಿಶ್ರಾಂತಿ", noteHi: "मंदिर के निकट विश्राम" },
  { to: "/halls", icon: Clock3, en: "Marriage halls", kn: "ಮದುವೆ ಮಂಟಪಗಳು", hi: "कल्याण मंडप", noteEn: "Gather in a sacred setting", noteKn: "ಪವಿತ್ರ ಸ್ಥಳದಲ್ಲಿ ಸೇರಿ", noteHi: "पावन परिसर में मंगल कार्य" },
];

export default function Home() {
  const { copy, language } = useTemple();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 200);
  const heroTranslateY = -Math.min(scrollY * 0.2, 40);

  return <div data-testid="home-page">
    <section className="hero-section" data-testid="home-hero">
      <img className="hero-image" src={templeImages.hero} alt="Mahakuta Temple Dakshina Kashi entrance arch in Badami" data-testid="hero-temple-image" />
      <div className="hero-overlay" />
      <div
        className="container-wide relative z-10 grid min-h-[calc(100vh-6.5rem)] max-sm:min-h-[calc(92vh-5rem)] items-end gap-8 pb-8 pt-24 max-sm:pt-14 max-sm:pb-6 lg:grid-cols-[1.15fr_0.65fr] lg:pb-10 transition-opacity duration-75"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroTranslateY}px)`,
          pointerEvents: heroOpacity <= 0.05 ? "none" : "auto",
        }}
      >
        <div data-testid="hero-copy"><div className="hero-kicker"><span className="diya-dot" /> {copy.sacred} <span className="diya-dot" /></div><h1 className="hero-title" data-testid="hero-title">{copy.temple}<em>{copy.place}</em></h1><p className="hero-description" data-testid="hero-intro">{copy.aboutText}</p><div className="mt-6 flex flex-wrap gap-3"><Link to="/poojas" className="button-gold" data-testid="hero-book-pooja-btn">{copy.bookPooja}<ArrowRight size={16} /></Link><Link to="/about" className="button-ghost-light" data-testid="hero-story-btn">{copy.learnMore}<ArrowDownRight size={16} /></Link></div></div>
        <div className="hero-rail" data-testid="hero-darshan-card"><div className="hero-rail-number">01</div><div><span className="eyebrow light">{copy.liveDarshan}</span><h2>{copy.morning}<br />{copy.from} <span>—</span> {copy.to}</h2><p>{copy.tagline}</p></div></div>
      </div><div className="hero-scroll" style={{ opacity: heroOpacity }}><span>{language === "en" ? "Begin your darshan" : language === "kn" ? "ನಿಮ್ಮ ದರ್ಶನ ಪ್ರಾರಂಭಿಸಿ" : "दर्शन आरंभ करें"}</span><ArrowDownRight size={17} /></div>
    </section>
    <section className="section-pad soft-surface" data-testid="quick-links-section"><div className="container-wide"><div className="section-heading-row"><div><p className="eyebrow">{language === "en" ? "A simple offering" : language === "kn" ? "ಸರಳವಾದ ಅರ್ಪಣೆ" : "पावन सेवा"}</p><h2 className="section-title" data-testid="quick-links-title">{copy.explore}</h2></div><p className="section-aside">{language === "en" ? "Everything you need for a peaceful visit to the shrine." : language === "kn" ? "ದೇವಾಲಯದ ಶಾಂತ ದರ್ಶನಕ್ಕೆ ಬೇಕಾದ ಎಲ್ಲವೂ." : "मंदिर के शांतिपूर्ण दर्शन हेतु आपकी सभी आवश्यकताएँ।"}</p></div><div className="quick-grid">{quickLinks.map((item) => <Link to={item.to} key={item.to} className="quick-card" data-testid={`quick-link-${item.to.slice(1)}`}><span className="quick-icon"><item.icon size={20} /></span><span><strong>{item[language]}</strong><small>{language === "en" ? item.noteEn : language === "kn" ? item.noteKn : item.noteHi}</small></span><ArrowRight className="quick-arrow" size={17} /></Link>)}</div></div></section>
    <section className="section-pad" data-testid="home-introduction"><div className="container-wide grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div className="image-stack" data-testid="home-image-stack"><img src={templeImages.gateway} alt="Temple gateway" data-testid="gateway-image" /><span className="image-caption">{copy.place} · Karnataka</span></div><div className="max-w-xl"><p className="eyebrow">{language === "en" ? "The shrine" : language === "kn" ? "ಪವಿತ್ರ ಕ್ಷೇತ್ರ" : "पावन धाम"}</p><h2 className="section-title" data-testid="home-intro-title">{copy.aboutTitle}</h2><p className="body-copy" data-testid="home-intro-copy">{copy.deityText}</p><Link to="/about" className="text-link" data-testid="home-about-link">{copy.learnMore}<ArrowRight size={16} /></Link></div></div></section>

    {/* Sacred Highlights Strip */}
    <section className="section-pad warm-pattern" data-testid="home-highlights">
      <div className="container-wide">
        <div className="section-heading-row mb-8">
          <div>
            <p className="eyebrow">{language === "en" ? "Sacred landmarks" : language === "kn" ? "ಪವಿತ್ರ ತಾಣಗಳು" : "पावन स्थल"}</p>
            <h2 className="section-title">
              {language === "en"
                ? "Glimpses of Sri Kshetra Mahakuta"
                : language === "kn"
                ? "ಶ್ರೀ ಕ್ಷೇತ್ರ ಮಹಾಕೂಟದ ಪವಿತ್ರ ದೃಶ್ಯಾವಳಿ"
                : "श्री क्षेत्र महाकूट के पावन दर्शन"}
            </h2>
          </div>
          <Link to="/about" className="text-link" data-testid="home-view-gallery-link">
            {language === "en" ? "View all photos" : language === "kn" ? "ಎಲ್ಲಾ ಚಿತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ" : "सभी चित्र देखें"}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/poojas" className="group block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-soft) shadow-sm hover:shadow-xl transition-all">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={templeImages.darshan} alt="Garbhagriha Darshan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ffd700]">
                  {language === "en" ? "Daily Sanctum" : language === "kn" ? "ಗರ್ಭಗುಡಿ" : "गर्भगृह"}
                </span>
                <h3 className="text-base font-bold font-serif leading-snug">
                  {language === "en" ? "Shiva Linga Darshan" : language === "kn" ? "ಶ್ರೀ ಶಿವಲಿಂಗ ದರ್ಶನ" : "शिवलिंग दर्शन"}
                </h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-(--muted) group-hover:text-(--gold) transition-colors">
              <span>{language === "en" ? "Book daily pooja" : language === "kn" ? "ಪೂಜೆ ಕಾಯ್ದಿರಿಸಿ" : "पूजा सेवा बुक करें"}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/about" className="group block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-soft) shadow-sm hover:shadow-xl transition-all">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={templeImages.water} alt="Papavinasha Pushkarini" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ffd700]">
                  {language === "en" ? "Holy Spring" : language === "kn" ? "ಪವಿತ್ರ ತೀರ್ಥ" : "पवित्र तीर्थ"}
                </span>
                <h3 className="text-base font-bold font-serif leading-snug">
                  {language === "en" ? "Papavinasha Tank" : language === "kn" ? "ಪಾಪವಿನಾಶ ಪುಷ್ಕರಿಣಿ" : "पापविनाशी पुष्करिणी"}
                </h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-(--muted) group-hover:text-(--gold) transition-colors">
              <span>{language === "en" ? "Sacred bathing pool" : language === "kn" ? "ಪಾಪ ಪರಿಹಾರಕ ತೀರ್ಥ" : "पावन स्नान कुंड"}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/about" className="group block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-soft) shadow-sm hover:shadow-xl transition-all">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={templeImages.banyan} alt="Sacred Banyan Tree" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ffd700]">
                  {language === "en" ? "Ancient Tree" : language === "kn" ? "ಪ್ರಾಚೀನ ವೃಕ್ಷ" : "प्राचीन वृक्ष"}
                </span>
                <h3 className="text-base font-bold font-serif leading-snug">
                  {language === "en" ? "Sacred Banyan Canopy" : language === "kn" ? "ಪವಿತ್ರ ಆಲದ ಮರ" : "पावन वटवृक्ष"}
                </h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-(--muted) group-hover:text-(--gold) transition-colors">
              <span>{language === "en" ? "Centuries of faith" : language === "kn" ? "ತಪಸ್ಸಿನ ವೃಕ್ಷ" : "तपस्या का पावन स्थल"}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/about" className="group block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-soft) shadow-sm hover:shadow-xl transition-all">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={templeImages.twinShrines} alt="Badami Chalukya Shrines" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ffd700]">
                  {language === "en" ? "Chalukya Art" : language === "kn" ? "ಚಾಲುಕ್ಯ ಶಿಲ್ಪಕಲೆ" : "चालुक्य स्थापत्य"}
                </span>
                <h3 className="text-base font-bold font-serif leading-snug">
                  {language === "en" ? "Sandstone Shrines" : language === "kn" ? "ಶಿಲಾ ದೇವಾಲಯಗಳು" : "शिला देवालय"}
                </h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-(--muted) group-hover:text-(--gold) transition-colors">
              <span>{language === "en" ? "6th–7th Century CE" : language === "kn" ? "ಐತಿಹಾಸಿಕ ಶಿಲ್ಪ ವೈಭವ" : "ऐतिहासिक वैभव"}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  </div>;
}
