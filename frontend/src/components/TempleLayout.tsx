import { createContext, useContext, useRef, useState, type PropsWithChildren } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AudioLines, Landmark, Menu, Moon, Music2, Sun } from "lucide-react";
import { ui, navItems, type Copy, type Language, type Theme } from "@/lib/temple";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type TempleContextValue = { language: Language; theme: Theme; copy: Copy; toggleLanguage: () => void; toggleTheme: () => void; audioOn: boolean; toggleAudio: () => void };
const TempleContext = createContext<TempleContextValue | null>(null);

export function useTemple() {
  const value = useContext(TempleContext);
  if (!value) throw new Error("useTemple must be used inside TempleLayout");
  return value;
}

function TempleProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("day");
  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    const next = !audioOn;
    setAudioOn(next);
    if (audioRef.current) {
      audioRef.current.muted = !next;
      if (next) audioRef.current.play().catch(() => undefined);
      else audioRef.current.pause();
    }
  };

  return (
    <TempleContext.Provider value={{ language, theme, copy: ui[language], toggleLanguage: () => setLanguage((current) => current === "en" ? "kn" : "en"), toggleTheme: () => setTheme((current) => current === "day" ? "night" : "day"), audioOn, toggleAudio }}>
      <audio ref={audioRef} loop muted aria-label="Placeholder devotional music" data-testid="devotional-audio" />
      {children}
    </TempleContext.Provider>
  );
}

function TempleHeader() {
  const { language, theme, copy, toggleLanguage, toggleTheme, audioOn, toggleAudio } = useTemple();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="temple-header" data-testid="site-header">
      <div className="container-wide flex h-20 items-center justify-between gap-6">
        <Link to="/" className="temple-logo" data-testid="navbar-logo" onClick={() => setMobileOpen(false)}>
          <span className="temple-logo-mark"><Landmark size={22} strokeWidth={1.5} /></span>
          <span className="min-w-0"><strong>{copy.temple}</strong><small>{copy.place} · {copy.tagline}</small></span>
        </Link>
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary navigation" data-testid="desktop-navigation">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} data-testid={`nav-link-${item.en.toLowerCase().replaceAll(" ", "-")}`}>{language === "en" ? item.en : item.kn}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2" data-testid="header-controls">
          <button className="language-switch" onClick={toggleLanguage} aria-label="Switch language" data-testid="language-toggle-btn"><span className={language === "en" ? "selected" : ""}>EN</span><i /> <span className={language === "kn" ? "selected" : ""}>ಕನ್ನಡ</span></button>
          <button className="icon-control" onClick={toggleTheme} aria-label={theme === "day" ? "Switch to night mode" : "Switch to day mode"} data-testid="theme-toggle-btn">{theme === "day" ? <Moon size={17} /> : <Sun size={17} />}</button>
          <button className={`icon-control audio-control ${audioOn ? "playing" : ""}`} onClick={toggleAudio} aria-label={audioOn ? "Mute devotional music" : "Play devotional music"} data-testid="audio-toggle-btn">{audioOn ? <AudioLines size={17} /> : <Music2 size={17} />}</button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<button className="icon-control xl:hidden" aria-label="Open navigation" data-testid="mobile-menu-btn"><Menu size={19} /></button>} />
            <SheetContent side="right" className="temple-mobile-sheet">
              <SheetHeader><SheetTitle className="font-heading text-left text-xl text-[var(--text)]">{copy.temple}</SheetTitle></SheetHeader>
              <div className="mt-8 flex flex-col gap-2" data-testid="mobile-navigation">
                {navItems.map((item) => <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={`mobile-nav-link ${location.pathname === item.to ? "active" : ""}`} data-testid={`mobile-nav-link-${item.en.toLowerCase().replaceAll(" ", "-")}`}>{language === "en" ? item.en : item.kn}</Link>)}
              </div>
              <div className="mt-8 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]"><span className="mb-2 block uppercase tracking-[0.2em] text-[10px] text-[var(--gold)]">{copy.placeholder}</span>{copy.liveDarshan} · {copy.from} – {copy.to}</div>
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
  return <footer className="temple-footer" data-testid="site-footer">
    <div className="container-wide grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
      <div data-testid="footer-brand"><div className="footer-brand-title"><span className="temple-logo-mark"><Landmark size={20} /></span><span>{copy.temple}<small>{copy.place}</small></span></div><p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">{copy.footerLine}</p></div>
      <div data-testid="footer-quick-links"><p className="eyebrow mb-4">{language === "en" ? "Quick links" : "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು"}</p><div className="grid grid-cols-2 gap-y-3">{navItems.slice(0, 6).map((item) => <Link key={item.to} to={item.to} className="footer-link" data-testid={`footer-link-${item.en.toLowerCase().replaceAll(" ", "-")}`}>{language === "en" ? item.en : item.kn}</Link>)}</div></div>
      <div data-testid="footer-connect"><p className="eyebrow mb-4">{language === "en" ? "Connect with us" : "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ"}</p><p className="text-sm leading-7 text-[var(--muted)]">{copy.phone}<br />{copy.email}</p><div className="mt-5 flex gap-2"><a href="#" aria-label="Instagram" className="social-link" data-testid="social-instagram"><span className="font-serif text-sm font-bold">ig</span></a><a href="#" aria-label="Facebook" className="social-link" data-testid="social-facebook"><span className="font-serif text-sm font-bold">f</span></a><a href="#" aria-label="YouTube" className="social-link" data-testid="social-youtube"><span className="font-serif text-sm font-bold">yt</span></a></div></div>
    </div>
    <div className="footer-bottom"><div className="container-wide flex flex-col justify-between gap-2 py-4 text-xs text-[var(--muted)] sm:flex-row"><span data-testid="footer-copyright">© {new Date().getFullYear()} {copy.temple}, {copy.place}</span><span data-testid="footer-language">{language === "en" ? "ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು" : "May all beings be happy"}</span></div></div>
  </footer>;
}

function TempleFrame() {
  const { theme } = useTemple();
  return <div className={`temple-app ${theme === "night" ? "night" : ""}`} data-testid="temple-app"><TempleHeader /><main data-testid="page-content"><Outlet /></main><TempleFooter /><div className="audio-status" data-testid="audio-status"><Music2 size={14} /><span>{useTemple().audioOn ? "Music on" : "Music muted"}</span></div></div>;
}

export default function TempleLayout() {
  return <TempleProvider><TempleFrame /></TempleProvider>;
}