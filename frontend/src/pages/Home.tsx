import { ArrowDownRight, ArrowRight, Clock3, Flower2, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { templeImages } from "@/lib/temple";
import { useTemple } from "@/components/TempleLayout";

const quickLinks = [
  { to: "/poojas", icon: Flower2, en: "Pooja booking", kn: "ಪೂಜೆ ಬುಕಿಂಗ್", noteEn: "Offer a personal seva", noteKn: "ವೈಯಕ್ತಿಕ ಸೇವೆ ಸಲ್ಲಿಸಿ" },
  { to: "/donations", icon: Heart, en: "Hundi offerings", kn: "ಹುಂಡಿ ಕಾಣಿಕೆ", noteEn: "Let your gift become seva", noteKn: "ನಿಮ್ಮ ಕಾಣಿಕೆ ಸೇವೆಯಾಗಲಿ" },
  { to: "/rooms", icon: Sparkles, en: "Pilgrim rooms", kn: "ಭಕ್ತರ ಕೊಠಡಿಗಳು", noteEn: "Rest near the shrine", noteKn: "ದೇವಾಲಯದ ಸಮೀಪ ವಿಶ್ರಾಂತಿ" },
  { to: "/halls", icon: Clock3, en: "Marriage halls", kn: "ಮದುವೆ ಮಂಟಪಗಳು", noteEn: "Gather in a sacred setting", noteKn: "ಪವಿತ್ರ ಸ್ಥಳದಲ್ಲಿ ಸೇರಿ" },
];

export default function Home() {
  const { copy, language } = useTemple();
  return <div data-testid="home-page">
    <section className="hero-section" data-testid="home-hero">
      <img className="hero-image" src={templeImages.hero} alt="Mahakaleshwar Temple stone architecture in Badami" data-testid="hero-temple-image" />
      <div className="hero-overlay" /><div className="hero-grain" />
      <div className="container-wide relative z-10 grid min-h-[calc(100svh-5rem)] items-end gap-10 pb-14 pt-28 lg:grid-cols-[1fr_0.65fr] lg:items-center lg:pb-20">
        <div data-testid="hero-copy"><div className="hero-kicker"><span className="diya-dot" /> {copy.sacred} <span className="diya-dot" /></div><h1 className="hero-title" data-testid="hero-title">{copy.temple}<em>{copy.place}</em></h1><p className="hero-description" data-testid="hero-intro">{copy.aboutText}</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/poojas" className="button-gold" data-testid="hero-book-pooja-btn">{copy.bookPooja}<ArrowRight size={16} /></Link><Link to="/about" className="button-ghost-light" data-testid="hero-story-btn">{copy.learnMore}<ArrowDownRight size={16} /></Link></div></div>
        <div className="hero-rail" data-testid="hero-darshan-card"><div className="hero-rail-number">01</div><div><span className="eyebrow light">{copy.liveDarshan}</span><h2>{copy.morning}<br />{copy.from} <span>—</span> {copy.to}</h2><p>{copy.tagline}</p></div></div>
      </div><div className="hero-scroll"><span>{language === "en" ? "Begin your darshan" : "ನಿಮ್ಮ ದರ್ಶನ ಪ್ರಾರಂಭಿಸಿ"}</span><ArrowDownRight size={17} /></div>
    </section>
    <section className="section-pad soft-surface" data-testid="quick-links-section"><div className="container-wide"><div className="section-heading-row"><div><p className="eyebrow">{language === "en" ? "A simple offering" : "ಸರಳವಾದ ಅರ್ಪಣೆ"}</p><h2 className="section-title" data-testid="quick-links-title">{copy.explore}</h2></div><p className="section-aside">{language === "en" ? "Everything you need for a peaceful visit to the shrine." : "ದೇವಾಲಯದ ಶಾಂತ ದರ್ಶನಕ್ಕೆ ಬೇಕಾದ ಎಲ್ಲವೂ."}</p></div><div className="quick-grid">{quickLinks.map(({ to, icon: Icon, en, kn, noteEn, noteKn }) => <Link to={to} key={to} className="quick-card" data-testid={`quick-link-${to.slice(1)}`}><span className="quick-icon"><Icon size={20} /></span><span><strong>{language === "en" ? en : kn}</strong><small>{language === "en" ? noteEn : noteKn}</small></span><ArrowRight className="quick-arrow" size={17} /></Link>)}</div></div></section>
    <section className="section-pad" data-testid="home-introduction"><div className="container-wide grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div className="image-stack" data-testid="home-image-stack"><img src={templeImages.gateway} alt="Temple gateway" data-testid="gateway-image" /><span className="image-caption">{copy.place} · Karnataka</span></div><div className="max-w-xl"><p className="eyebrow">{language === "en" ? "The shrine" : "ಪವಿತ್ರ ಕ್ಷೇತ್ರ"}</p><h2 className="section-title" data-testid="home-intro-title">{copy.aboutTitle}</h2><p className="body-copy" data-testid="home-intro-copy">{copy.deityText}</p><Link to="/about" className="text-link" data-testid="home-about-link">{copy.learnMore}<ArrowRight size={16} /></Link></div></div></section>
  </div>;
}
