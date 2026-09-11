import { createContext, useContext, useEffect, useRef, useState, type PropsWithChildren } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AudioLines, Menu, Moon, Music2, Sun, Volume2, VolumeX } from "lucide-react";
import { devotionalAudioUrl, ui, navItems, type Copy, type Language, type Theme } from "@/lib/temple";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type TempleContextValue = {
  language: Language;
  theme: Theme;
  copy: Copy;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  audioOn: boolean;
  toggleAudio: () => void;
  volume: number;
  setVolume: (v: number) => void;
};
const TempleContext = createContext<TempleContextValue | null>(null);

function TempleLogoMark() {
  return (
    <span className="temple-logo-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4 27.2 8.5 24 12 20.8 8.5 24 4Z" fill="currentColor" />
        <path d="M18 13h12l2 4H16l2-4Z" fill="currentColor" opacity=".82" />
        <path d="M14 18h20l2.5 5H11.5L14 18Z" fill="currentColor" opacity=".68" />
        <path d="M9 24h30v17H9V24Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 28h30M15 41V30h18v11M21 41v-7h6v7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 42h36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function useTemple() {
  const value = useContext(TempleContext);
  if (!value) throw new Error("useTemple must be used inside TempleLayout");
  return value;
}

function TempleProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("mahakuta_lang");
    return saved === "kn" || saved === "hi" || saved === "en" ? saved : "en";
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("mahakuta_theme_v2");
    return saved === "night" || saved === "day" ? saved : "night";
  });
  const [audioOn, setAudioOn] = useState(() => {
    return localStorage.getItem("mahakuta_audio_on") === "true";
  });
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem("mahakuta_audio_volume");
    return saved ? Math.max(0.05, Math.min(1, parseFloat(saved))) : 0.35;
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    localStorage.setItem("mahakuta_audio_volume", clamped.toString());
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  const toggleAudio = () => {
    const next = !audioOn;
    setAudioOn(next);
    localStorage.setItem("mahakuta_audio_on", next.toString());
    if (audioRef.current) {
      audioRef.current.muted = !next;
      audioRef.current.volume = volume;
      if (next) {
        audioRef.current.play().catch(() => undefined);
      } else {
        audioRef.current.pause();
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage((current) => {
      const next = current === "en" ? "kn" : current === "kn" ? "hi" : "en";
      localStorage.setItem("mahakuta_lang", next);
      return next;
    });
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("mahakuta_lang", lang);
  };

  const handleToggleTheme = () => {
    setTheme((current) => {
      const next = current === "day" ? "night" : "day";
      localStorage.setItem("mahakuta_theme_v2", next);
      return next;
    });
  };

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Auto-pause ambient audio if any other HTML media element begins playing
  useEffect(() => {
    const handleOtherMediaPlay = (e: Event) => {
      if (e.target !== audioRef.current && e.target instanceof HTMLMediaElement) {
        if (audioOn && audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
      }
    };
    window.addEventListener("play", handleOtherMediaPlay, true);
    return () => window.removeEventListener("play", handleOtherMediaPlay, true);
  }, [audioOn]);

  return (
    <TempleContext.Provider
      value={{
        language,
        theme,
        copy: ui[language],
        setLanguage: handleSetLanguage,
        toggleLanguage,
        toggleTheme: handleToggleTheme,
        audioOn,
        toggleAudio,
        volume,
        setVolume,
      }}
    >
      <audio
        ref={audioRef}
        src={devotionalAudioUrl}
        autoPlay={audioOn}
        loop
        muted={!audioOn}
        preload="auto"
        aria-label="Devotional music"
        data-testid="devotional-audio"
      />
      {children}
    </TempleContext.Provider>
  );
}

function TempleHeader() {
  const { language, theme, copy, setLanguage, toggleTheme, audioOn, toggleAudio, volume, setVolume } = useTemple();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > 180) {
        if (currentScrollY > lastScrollY.current + 8) {
          setIsHidden(true); // scrolling down
        } else if (currentScrollY < lastScrollY.current - 8) {
          setIsHidden(false); // scrolling up
        }
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`temple-header transition-transform duration-300 ${isHidden ? "-translate-y-full" : "translate-y-0"} ${
        isScrolled ? "shadow-md backdrop-blur-md" : ""
      }`}
      data-testid="site-header"
    >
      <div className="container-wide flex h-24 items-center justify-between gap-6 max-sm:h-20">
        <Link to="/" className="temple-logo min-w-0 shrink" data-testid="navbar-logo" onClick={() => setMobileOpen(false)}>
          <TempleLogoMark />
          <span className="min-w-0">
            <strong>{copy.temple}</strong>
            <small className="hidden xs:block">
              {copy.place} · {copy.tagline}
            </small>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation" data-testid="desktop-navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              data-testid={`nav-link-${item.en.toLowerCase().replaceAll(" ", "-")}`}
            >
              {item[language]}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0" data-testid="header-controls">
          <div className="language-switch" role="group" aria-label="Switch language" data-testid="language-switch-group">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={language === "en" ? "selected" : ""}
              data-testid="language-btn-en"
            >
              EN
            </button>
            <i aria-hidden="true" />
            <button
              type="button"
              onClick={() => setLanguage("kn")}
              className={language === "kn" ? "selected" : ""}
              data-testid="language-btn-kn"
            >
              ಕನ್ನಡ
            </button>
            <i aria-hidden="true" />
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={language === "hi" ? "selected" : ""}
              data-testid="language-btn-hi"
            >
              हिंदी
            </button>
          </div>
          <button
            className="icon-control theme-btn"
            onClick={toggleTheme}
            aria-label={theme === "day" ? "Switch to night mode" : "Switch to day mode"}
            data-testid="theme-toggle-btn"
          >
            {theme === "day" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Audio toggle with hover volume controller */}
          <div className="relative">
            <button
              className={`icon-control audio-control audio-btn ${audioOn ? "playing ring-1 ring-(--gold)/50" : ""}`}
              onClick={toggleAudio}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowVolumePopup((prev) => !prev);
              }}
              aria-label={audioOn ? "Mute devotional music" : "Play devotional music"}
              data-testid="audio-toggle-btn"
              title={audioOn ? "Click to mute · Right-click for volume" : "Click to play ambient temple music"}
            >
              {audioOn ? <AudioLines size={20} /> : <Music2 size={20} />}
            </button>

            {showVolumePopup && (
              <div className="absolute right-0 top-12 z-50 p-3 rounded-xl bg-(--surface) border border-(--line) shadow-2xl flex flex-col gap-2 min-w-[170px] animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between text-xs text-(--muted)">
                  <span className="font-semibold text-(--text)">Devotional Volume</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVolume(volume > 0 ? 0 : 0.35)}
                    className="text-(--muted) hover:text-(--gold)"
                    aria-label="Toggle mute volume"
                  >
                    {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-(--line) rounded-lg accent-(--gold) cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<button type="button" className="icon-control menu-trigger xl:hidden shrink-0" aria-label="Open navigation" data-testid="mobile-menu-btn"><Menu size={22} /></button>} />
            <SheetContent side="right" className="temple-mobile-sheet flex flex-col justify-between">
              <div>
                <SheetHeader>
                  <SheetTitle className="font-heading text-left text-xl text-(--text)">{copy.temple}</SheetTitle>
                </SheetHeader>

                <div className="mt-4 flex items-center justify-between gap-2 border-b border-(--line) pb-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="icon-control"
                      onClick={toggleTheme}
                      aria-label={theme === "day" ? "Switch to night mode" : "Switch to day mode"}
                    >
                      {theme === "day" ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                    <button
                      className={`icon-control audio-control ${audioOn ? "playing" : ""}`}
                      onClick={toggleAudio}
                      aria-label={audioOn ? "Mute devotional music" : "Play devotional music"}
                    >
                      {audioOn ? <AudioLines size={18} /> : <Music2 size={18} />}
                    </button>
                  </div>
                  <span className="text-xs text-(--muted)">{theme === "day" ? "Day mode" : "Night mode"}</span>
                </div>

                <div className="mt-6 flex flex-col gap-2" data-testid="mobile-navigation">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`mobile-nav-link ${location.pathname === item.to ? "active" : ""}`}
                      data-testid={`mobile-nav-link-${item.en.toLowerCase().replaceAll(" ", "-")}`}
                    >
                      {item[language]}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-(--line) bg-(--surface) p-4 text-sm text-(--muted)">
                <span className="mb-2 block uppercase tracking-[0.2em] text-[10px] text-(--gold)">{copy.liveDarshan}</span>
                {copy.morning} · {copy.from} – {copy.to}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="header-rule" />
    </header>
  );
}

function TempleFooter() {
  const { copy, language } = useTemple();
  return (
    <footer className="temple-footer" data-testid="site-footer">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div data-testid="footer-brand">
          <div className="footer-brand-title">
            <TempleLogoMark />
            <span>
              {copy.temple}
              <small>{copy.place}</small>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-(--muted)">{copy.footerLine}</p>
        </div>
        <div data-testid="footer-quick-links">
          <p className="eyebrow mb-4">{language === "en" ? "Quick links" : language === "kn" ? "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು" : "त्वरित लिंक"}</p>
          <div className="grid grid-cols-2 gap-y-3">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="footer-link"
                data-testid={`footer-link-${item.en.toLowerCase().replaceAll(" ", "-")}`}
              >
                {item[language]}
              </Link>
            ))}
          </div>
        </div>
        <div data-testid="footer-connect">
          <p className="eyebrow mb-4">{language === "en" ? "Connect with us" : language === "kn" ? "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ" : "संपर्क सूत्र"}</p>
          <p className="text-sm leading-7 text-(--muted)">
            {copy.phone}
            <br />
            {copy.email}
          </p>
          <div className="mt-5 flex gap-2">
            <a href="#" aria-label="Instagram" className="social-link" data-testid="social-instagram">
              <span className="font-serif text-sm font-bold">ig</span>
            </a>
            <a href="#" aria-label="Facebook" className="social-link" data-testid="social-facebook">
              <span className="font-serif text-sm font-bold">f</span>
            </a>
            <a href="#" aria-label="YouTube" className="social-link" data-testid="social-youtube">
              <span className="font-serif text-sm font-bold">yt</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container-wide flex flex-col justify-between gap-2 py-4 text-xs text-(--muted) sm:flex-row">
          <span data-testid="footer-copyright">
            © {new Date().getFullYear()} {copy.temple}, {copy.place}
          </span>
          <span data-testid="footer-language">
            {language === "en" ? "ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು" : language === "kn" ? "ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು" : "सर्वे भवन्तु सुखिनः"}
          </span>
        </div>
      </div>
    </footer>
  );
}

function TempleFrame() {
  const { theme, language, audioOn, toggleAudio } = useTemple();
  return (
    <div className={`temple-app ${theme === "night" ? "night" : "day"}`} data-lang={language} lang={language} data-testid="temple-app">
      <TempleHeader />
      <main data-testid="page-content">
        <Outlet />
      </main>
      <TempleFooter />
      <button
        onClick={toggleAudio}
        className="audio-status cursor-pointer hover:border-(--gold) transition-colors text-left"
        data-testid="audio-status"
        aria-label="Toggle ambient temple music"
      >
        <Music2 size={14} className={audioOn ? "animate-spin text-(--gold)" : "text-(--muted)"} />
        <span>{audioOn ? "Music playing" : "Music muted"}</span>
      </button>
    </div>
  );
}

export default function TempleLayout() {
  return (
    <TempleProvider>
      <TempleFrame />
    </TempleProvider>
  );
}