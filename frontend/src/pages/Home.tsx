import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, Clock3, Flower2, Heart, Sparkles, Calendar, Waves, Flame, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { templeImages } from "@/lib/temple";
import { useTemple } from "@/components/TempleLayout";
import { api, type TempleTimingsData, type FestivalData } from "@/services/api";
import RevealOnScroll from "@/components/RevealOnScroll";
import GoldenButton from "@/components/GoldenButton";
import Pushkarini3D from "@/components/Pushkarini3D";
import FestivalCard, { type FestivalItem } from "@/components/FestivalCard";

const quickLinks = [
  { to: "/poojas", icon: Flower2, en: "Pooja booking", kn: "ಪೂಜೆ ಬುಕಿಂಗ್", hi: "पूजा बुकिंग", noteEn: "Offer a personal seva", noteKn: "ವೈಯಕ್ತಿಕ ಸೇವೆ ಸಲ್ಲಿಸಿ", noteHi: "व्यक्तिगत सेवा अर्पित करें" },
  { to: "/donations", icon: Heart, en: "Hundi offerings", kn: "ಹುಂಡಿ ಕಾಣಿಕೆ", hi: "हुंडी दान", noteEn: "Let your gift become seva", noteKn: "ನಿಮ್ಮ ಕಾಣಿಕೆ ಸೇವೆಯಾಗಲಿ", noteHi: "आपकी भेंट सेवा बने" },
  { to: "/rooms", icon: Sparkles, en: "Pilgrim rooms", kn: "ಭಕ್ತರ ಕೊಠಡಿಗಳು", hi: "भक्त निवास", noteEn: "Rest near the shrine", noteKn: "ದೇವಾಲಯದ ಸಮೀಪ ವಿಶ್ರಾಂತಿ", noteHi: "मंदिर के निकट विश्राम" },
  { to: "/halls", icon: Clock3, en: "Marriage halls", kn: "ಮದುವೆ ಮಂಟಪಗಳು", hi: "ಕಲ್ಯಾಣ ಮಂಟಪ", noteEn: "Gather in a sacred setting", noteKn: "ಪವಿತ್ರ ಸ್ಥಳದಲ್ಲಿ ಸೇರಿ", noteHi: "पावन परिसर में मंगल कार्य" },
];

// Curated authentic sacred festivals data
const fallbackFestivals: FestivalItem[] = [
  {
    id: "mahashivaratri",
    targetDate: "2027-03-06T00:00:00",
    titleEn: "Maha Shivaratri Brahmotsava",
    titleKn: "ಮಹಾ ಶಿವರಾತ್ರಿ ಬ್ರಹ್ಮೋತ್ಸವ",
    titleHi: "महा शिवरात्रि ब्रह्मोत्सव",
    dateBadgeEn: "Annual Maha Festival",
    dateBadgeKn: "ವಾರ್ಷಿಕ ಮಹಾ ಜಾತ್ರೆ",
    dateBadgeHi: "वार्षिक महा महोत्सव",
    descEn:
      "The paramount sacred night of Lord Shiva in Dakshina Kashi. Featuring continuous 24-hour Rudrabhisheka to the ancient Chaturmukha Linga, all-night Jagaran, holy ablution in Papavinasha Pushkarini, and grand Mahamangalarathi.",
    descKn:
      "ದಕ್ಷಿಣ ಕಾಶಿಯ ಪರಮ ಪವಿತ್ರ ಮಹೋತ್ಸವ. ರಾತ್ರಿಯಿಡೀ ಭಕ್ತರ ಜಾಗರಣೆ, ಚತುರ್ಮುಖ ಶಿವಲಿಂಗಕ್ಕೆ ನಿರಂತರ ಏಕಾದಶ ರುದ್ರಾಭಿಷೇಕ, ಪಾಪವಿನಾಶ ತೀರ್ಥದಲ್ಲಿ ಪುಣ್ಯಸ್ನಾನ ಹಾಗೂ ರಥೋತ್ಸವ ವೈಭವ.",
    descHi:
      "दक्षिण काशी का परम पावन पर्व। अखंड रुद्राभिषेक, रात्रि जागरण, पवित्र पुष्करिणी में पापनाशिनी पुण्य स्नान एवं भव्य महाआरती दर्शन।",
    bannerImage: templeImages.darshan,
    ritualsEn: [
      "04:30 AM — Mangala Vadya & Suprabhata Darshana",
      "08:00 AM — Ekadasha Rudra Abhisheka with Sacred Herbs",
      "06:30 PM — Bilva Sahasranamarchana & Deepotsava",
      "11:30 PM — Maha Nishita Kala Abhisheka & All-Night Jagaran",
    ],
    ritualsKn: [
      "ಬೆಳಿಗ್ಗೆ 04:30 — ಮಂಗಳ ವಾದ್ಯ ಮತ್ತು ಸುಪ್ರಭಾತ ದರ್ಶನ",
      "ಬೆಳಿಗ್ಗೆ 08:00 — ಏಕಾದಶ ರುದ್ರಾಭಿಷೇಕ ಮತ್ತು ಪಂಚಾಮೃತ ಸ್ನಾನ",
      "ಸಂಜೆ 06:30 — ಸಹಸ್ರ ಬಿಲ್ವಾರ್ಚನೆ ಮತ್ತು ದೀಪೋತ್ಸವ",
      "ರಾತ್ರಿ 11:30 — ಮಹಾ ನಿಶೀಥ ಕಾಲ ಅಭಿಷೇಕ ಹಾಗೂ ಅಖಂಡ ಜಾಗರಣೆ",
    ],
    ritualsHi: [
      "प्रातः 04:30 — मंगल वाद्य एवं सुप्रभात दर्शन",
      "प्रातः 08:00 — एकादश रुद्राभिषेक एवं पंचामृत अभिषेक",
      "सायं 06:30 — सहस्र बिल्वार्चन एवं भव्य दीपोत्सव",
      "रात्रि 11:30 — महानिशीथ काल अभिषेक व अखंड जागरण",
    ],
    dressCodeEn: "Traditional Dhoti/Kurta for Men; Saree/Salwar for Women.",
    dressCodeKn: "ಪುರುಷರಿಗೆ ಧೋತಿ ಅಥವಾ ಕುರ್ತಾ; ಮಹಿಳೆಯರಿಗೆ ಸೀರೆ ಅಥವಾ ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪು ಕಡ್ಡಾಯ.",
    dressCodeHi: "पुरुषों हेतु धोती/कुर्ता तथा महिलाओं हेतु साड़ी/पारंपरिक परिधान अनिवार्य।",
  },
];

export default function Home() {
  const { copy, language } = useTemple();
  const [timings, setTimings] = useState<TempleTimingsData | null>(null);
  const [festivals, setFestivals] = useState<FestivalData[]>([]);

  // Framer Motion scroll hook for smooth cinematic slow zoom & parallax
  const { scrollY } = useScroll();
  const heroZoom = useTransform(scrollY, [0, 800], [1.0, 1.08]);
  const heroBgTranslate = useTransform(scrollY, [0, 800], [0, 100]);
  const heroContentOpacity = useTransform(scrollY, [0, 320], [1, 0]);
  const heroContentY = useTransform(scrollY, [0, 320], [0, -40]);

  useEffect(() => {
    api.getTimings().then(setTimings).catch(() => {});
    api.getFestivals().then(setFestivals).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      {/* 1. Cinematic 100vh Full-Height Hero */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-start" data-testid="home-hero">
        {/* Background Image with Slow Zoom & Parallax */}
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ scale: heroZoom, y: heroBgTranslate }}
        >
          <img
            className="w-full h-full object-cover object-center"
            src={templeImages.hero}
            alt="Mahakuta Temple Dakshina Kashi entrance arch in Badami"
            data-testid="hero-temple-image"
          />
        </motion.div>

        {/* Soft Transparent Golden & Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[at_top_right] from-[#d4af37]/15 via-transparent to-black/60 pointer-events-none" />

        {/* Hero Text & Actions */}
        <motion.div
          className="container-wide relative z-10 grid items-center gap-8 pt-16 pb-6 max-sm:pt-20 max-sm:pb-8 lg:grid-cols-[1.2fr_0.65fr]"
          style={{ opacity: heroContentOpacity, y: heroContentY }}
        >
          <div data-testid="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hero-kicker flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#e5c158] font-semibold"
            >
              <span className="diya-dot" /> {copy.sacred} <span className="diya-dot" />
            </motion.div>

            {/* Upward Title Fade */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title mt-2 text-white font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-md"
              data-testid="hero-title"
            >
              {copy.temple}
              <em className="block text-2xl sm:text-4xl lg:text-5xl font-serif text-[#ffd866] not-italic mt-1">
                {copy.place}
              </em>
            </motion.h1>

            {/* Subtitle with 300ms Delay */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hero-description mt-4 text-stone-200 text-sm sm:text-base max-w-xl leading-relaxed drop-shadow"
              data-testid="hero-intro"
            >
              {copy.aboutText}
            </motion.p>

            {/* Elegant Buttons Sliding In */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <GoldenButton to="/poojas" size="lg" data-testid="hero-book-pooja-btn">
                {copy.bookPooja}
                <ArrowRight size={16} />
              </GoldenButton>
              <GoldenButton to="/about" variant="ghost" size="lg" data-testid="hero-story-btn">
                {copy.learnMore}
                <ArrowDownRight size={16} />
              </GoldenButton>
            </motion.div>
          </div>

          {/* Darshan Timings & Sacred Location Hero Rails */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hero-rail-stack flex flex-col gap-3.5 self-center lg:self-end"
          >
            {/* 01 Darshan Timings Rail Card (Updated live from backend) */}
            <div className="hero-rail" data-testid="hero-darshan-card">
              <div className="hero-rail-number">01</div>
              <div>
                <span className="eyebrow light">{copy.liveDarshan}</span>
                <h2>
                  {copy.morning}
                  <br />
                  {timings ? timings.morningDarshan : `${copy.from} — ${copy.to}`}
                </h2>
                <p>
                  {timings ? `Evening: ${timings.eveningDarshan}` : copy.tagline}
                </p>
              </div>
            </div>

            {/* 02 Sacred Location / Address Card */}
            <div className="hero-rail hero-rail-location group" data-testid="hero-location-card">
              <div className="hero-rail-number">02</div>
              <div>
                <span className="eyebrow light flex items-center gap-1.5">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#fbbf24]/50 bg-[#fbbf24]/15 text-[#fbbf24]">
                    <MapPin size={10} />
                  </span>
                  {language === "en" ? "Address" : language === "kn" ? "ವಿಳಾಸ" : "पता"}
                </span>
                <h2>
                  {language === "en" ? "Temple Road, Badami" : language === "kn" ? "ದೇವಾಲಯ ರಸ್ತೆ, ಬಾದಾಮಿ" : "मंदिर मार्ग, बादामी"}
                </h2>
                <p className="flex items-center gap-1.5 flex-wrap">
                  <span>{language === "kn" ? "ಕರ್ನಾಟಕ 587201" : language === "hi" ? "कर्नाटक 587201" : "Karnataka 587201"}</span>
                  <span className="text-[#fbbf24]/60">•</span>
                  <a
                    href="https://maps.google.com/?q=Sri+Mahakuteshwara+Temple+Badami"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-0.5 text-[#fbbf24] hover:text-[#fde68a] transition-colors font-medium underline underline-offset-2"
                  >
                    <span>{language === "en" ? "Directions" : language === "kn" ? "ದಾರಿ" : "दिशा"}</span>
                    <ArrowUpRight size={11} />
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero-scroll"
          style={{ opacity: heroContentOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>
            {language === "en" ? "Begin your darshan" : language === "kn" ? "ನಿಮ್ಮ ದರ್ಶನ ಪ್ರಾರಂಭಿಸಿ" : "दर्शन आरंभ करें"}
          </span>
          <ArrowDownRight size={17} />
        </motion.div>
      </section>

      {/* 2. Active Festival Banner (if backend active) */}
      {festivals.length > 0 && festivals[0].isActive && (
        <section className="bg-(--maroon) text-white border-y border-(--gold) py-4 px-4">
          <div className="container-wide flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-(--gold) text-white shrink-0">
                <Calendar size={18} />
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#fbbf24] block">
                  {language === "en" ? "Upcoming Sacred Festival" : language === "kn" ? "ಮುಂಬರುವ ಪವಿತ್ರ ಜಾತ್ರಾ ಮಹೋತ್ಸವ" : "आगामी पावन जात्रा महोत्सव"}
                </span>
                <strong className="text-sm sm:text-base font-serif">
                  {language === "en" ? festivals[0].titleEn : language === "kn" ? festivals[0].titleKn : festivals[0].titleHi}
                </strong>
                <span className="text-xs text-stone-200 ml-2 hidden sm:inline">
                  — {festivals[0].dateString}
                </span>
              </div>
            </div>

            <Link
              to="/poojas"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#fbbf24] hover:bg-(--gold) text-white text-xs font-semibold transition-colors"
            >
              {language === "en" ? "Special Pooja Seva" : language === "kn" ? "ವಿಶೇಷ ಪೂಜಾ ಸೇವೆ" : "विशेष पूजा सेवा"}
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      )}

      {/* 3. Quick Links Section */}
      <RevealOnScroll>
        <section className="section-pad soft-surface" data-testid="quick-links-section">
          <div className="container-wide">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">
                  {language === "en" ? "A simple offering" : language === "kn" ? "ಸರಳವಾದ ಅರ್ಪಣೆ" : "पावन सेवा"}
                </p>
                <h2 className="section-title" data-testid="quick-links-title">
                  {copy.explore}
                </h2>
              </div>
              <p className="section-aside">
                {language === "en"
                  ? "Everything you need for a peaceful visit to the shrine."
                  : language === "kn"
                  ? "ದೇವಾಲಯದ ಶಾಂತ ದರ್ಶನಕ್ಕೆ ಬೇಕಾದ ಎಲ್ಲವೂ."
                  : "मंदिर के शांतिपूर्ण दर्शन हेतु आपकी सभी आवश्यकताएँ।"}
              </p>
            </div>

            <div className="quick-grid">
              {quickLinks.map((item) => (
                <Link
                  to={item.to}
                  key={item.to}
                  className="quick-card"
                  data-testid={`quick-link-${item.to.slice(1)}`}
                >
                  <span className="quick-icon">
                    <item.icon size={20} />
                  </span>
                  <span>
                    <strong>{item[language]}</strong>
                    <small>
                      {language === "en" ? item.noteEn : language === "kn" ? item.noteKn : item.noteHi}
                    </small>
                  </span>
                  <ArrowRight className="quick-arrow" size={17} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 4. Sacred Pushkarini Interactive Experience */}
      <RevealOnScroll>
        <section className="section-pad bg-gradient-to-b from-(--background) via-(--surface-soft) to-(--background)" data-testid="pushkarini-interactive-section">
          <div className="container-wide">
            <div className="section-heading-row mb-6">
              <div>
                <p className="eyebrow flex items-center gap-1.5 text-(--gold)">
                  <Waves size={15} />
                  {language === "en"
                    ? "Interactive Sacred Pushkarini"
                    : language === "kn"
                    ? "ಪಾಪವಿನಾಶ ತೀರ್ಥ · ಪರಂಪರೆಯ ಅನುಭವ"
                    : "पापविनाशिनी पुष्करिणी · पावन धरोहर"}
                </p>
                <h2 className="section-title">
                  {language === "en"
                    ? "Papavinasha Pushkarini · Holy Stepwell"
                    : language === "kn"
                    ? "ಪಾಪವಿನಾಶ ತೀರ್ಥ ಪುಷ್ಕರಿಣಿ"
                    : "पापविनाशिनी पवित्र पुष्करिणी"}
                </h2>
              </div>
              <p className="section-aside">
                {language === "en"
                  ? "Discover the 7th-century sacred stepwell, the rare submerged Chaturmukha Shiva Linga, and the perennial thermal spring through authentic photography and interactive relics."
                  : language === "kn"
                  ? "7ನೇ ಶತಮಾನದ ಮೆಟ್ಟಿಲು ಬಾವಿ, ಮಧ್ಯದ ಚತುರ್ಮುಖ ಶಿವಲಿಂಗ ಮಂಟಪ ಹಾಗೂ ಸದಾ ಹರಿಯುವ ನೈಸರ್ಗಿಕ ತೀರ್ಥವನ್ನು ನೈಜ ಚಿತ್ರಣ ಹಾಗೂ ಪವಿತ್ರ ತಾಣಗಳೊಂದಿಗೆ ಅನ್ವೇಷಿಸಿ."
                  : "सातवीं शताब्दी के इस पावन जलकुंड, मध्यस्थ दुर्लभ चतुर्मुख शिवलिंग एवं अखंड प्राकृतिक जलस्रोत का वास्तविक छायाचित्रों द्वारा पावन दर्शन करें।"}
              </p>
            </div>

            {/* Authentic Photographic Interactive Viewer */}
            <div className="rounded-3xl overflow-hidden border border-(--line) shadow-2xl bg-black/5">
              <Pushkarini3D />
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 5. Sacred Festivals & Brahmotsava Live Countdown */}
      <RevealOnScroll>
        <section className="section-pad warm-pattern" data-testid="festival-countdown-section">
          <div className="container-wide">
            <div className="section-heading-row mb-8">
              <div>
                <p className="eyebrow flex items-center gap-1.5 text-(--gold)">
                  <Flame size={15} />
                  {language === "en" ? "Sacred Gatherings" : language === "kn" ? "ಪವಿತ್ರ ಜಾತ್ರಾ ಮಹೋತ್ಸವ" : "महा उत्सव"}
                </p>
                <h2 className="section-title">
                  {language === "en"
                    ? "Upcoming Temple Festivals"
                    : language === "kn"
                    ? "ಮುಂಬರುವ ದೈವಿಕ ಉತ್ಸವಗಳು"
                    : "आगामी दिव्य महोत्सव"}
                </h2>
              </div>
              <p className="section-aside">
                {language === "en"
                  ? "Participate in grand annual celebrations, all-night Jagaran, and special abhishekas with pilgrims from across India."
                  : language === "kn"
                  ? "ರಾತ್ರಿಯಿಡೀ ಭಕ್ತಿಪೂರ್ವಕ ಜಾಗರಣೆ, ವಿಶೇಷ ರುದ್ರಾಭಿಷೇಕ ಮತ್ತು ವಾರ್ಷಿಕ ಮಹೋತ್ಸವದಲ್ಲಿ ಭಾಗವಹಿಸಿ."
                  : "अखंड जागरण, विशेष रुद्राभिषेक एवं वार्षिक महापर्व में सम्मिलित होकर पुण्य लाभ प्राप्त करें।"}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <FestivalCard festival={fallbackFestivals[0]} />
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 6. Introduction to Mahakuta */}
      <RevealOnScroll>
        <section className="section-pad" data-testid="home-introduction">
          <div className="container-wide grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="image-stack" data-testid="home-image-stack">
              <img src={templeImages.gateway} alt="Temple gateway" data-testid="gateway-image" />
              <span className="image-caption">{copy.place} · Karnataka</span>
            </div>
            <div className="max-w-xl">
              <p className="eyebrow">
                {language === "en" ? "The shrine" : language === "kn" ? "ಪವಿತ್ರ ಕ್ಷೇತ್ರ" : "पावन धाम"}
              </p>
              <h2 className="section-title" data-testid="home-intro-title">
                {copy.aboutTitle}
              </h2>
              <p className="body-copy" data-testid="home-intro-copy">
                {copy.deityText}
              </p>
              <Link to="/about" className="text-link" data-testid="home-about-link">
                {copy.learnMore}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 7. Sacred Highlights Strip */}
      <RevealOnScroll>
        <section className="section-pad warm-pattern" data-testid="home-highlights">
          <div className="container-wide">
            <div className="section-heading-row mb-8">
              <div>
                <p className="eyebrow">
                  {language === "en" ? "Sacred landmarks" : language === "kn" ? "ಪವಿತ್ರ ತಾಣಗಳು" : "पावन स्थल"}
                </p>
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
              <Link
                to="/poojas"
                className="group block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-soft) shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={templeImages.darshan}
                    alt="Garbhagriha Darshan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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

              <Link
                to="/about"
                className="group block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-soft) shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={templeImages.water}
                    alt="Papavinasha Pushkarini"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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

              <Link
                to="/about"
                className="group block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-soft) shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={templeImages.banyan}
                    alt="Sacred Banyan Tree"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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

              <Link
                to="/about"
                className="group block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-soft) shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={templeImages.twinShrines}
                    alt="Badami Chalukya Shrines"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
      </RevealOnScroll>
    </div>
  );
}

