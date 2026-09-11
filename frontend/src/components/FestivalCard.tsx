import { useState, useEffect } from "react";
import { Clock, Share2, Sparkles, Check, Shirt, Calendar, ArrowRight, Maximize2, X } from "lucide-react";
import { useTemple } from "@/components/TempleLayout";
import GoldenButton from "./GoldenButton";

export interface FestivalItem {
  id: string;
  targetDate: string; // ISO date or future target date
  titleEn: string;
  titleKn: string;
  titleHi: string;
  dateBadgeEn: string;
  dateBadgeKn: string;
  dateBadgeHi: string;
  descEn: string;
  descKn: string;
  descHi: string;
  bannerImage: string;
  ritualsEn: string[];
  ritualsKn: string[];
  ritualsHi: string[];
  dressCodeEn: string;
  dressCodeKn: string;
  dressCodeHi: string;
}

interface FestivalCardProps {
  festival: FestivalItem;
  onBookSeva?: () => void;
}

export default function FestivalCard({ festival, onBookSeva }: FestivalCardProps) {
  const { language } = useTemple();
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(festival.targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [festival.targetDate]);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const title = language === "en" ? festival.titleEn : language === "kn" ? festival.titleKn : festival.titleHi;
    const text = `${title} at Sri Kshetra Mahakuteshwara Temple, Badami.`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // User cancelled or failed
      }
    } else {
      navigator.clipboard.writeText(`${title} - ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const rituals =
    language === "en" ? festival.ritualsEn : language === "kn" ? festival.ritualsKn : festival.ritualsHi;

  return (
    <>
      <div className="group rounded-3xl border border-(--line) bg-(--card) overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 md:grid-cols-[0.88fr_1.12fr]">
        {/* Sacred Deity Photo Column - Fully Visible & Uncropped */}
        <div className="relative min-h-[440px] sm:min-h-[520px] md:min-h-[580px] bg-stone-950 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
          {/* Ambient blurred glow backdrop */}
          <img
            src={festival.bannerImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Full uncropped sacred portrait photo */}
          <img
            src={festival.bannerImage}
            alt={festival.titleEn}
            onClick={() => setLightboxOpen(true)}
            className="relative z-10 max-h-[420px] sm:max-h-[500px] md:max-h-[560px] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 transition-transform duration-500 group-hover:scale-[1.02] cursor-pointer"
            title="Click to view full sacred darshan"
          />

          {/* Date Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#b8860b] text-white shadow-lg backdrop-blur-sm">
              <Calendar size={13} />
              {language === "en"
                ? festival.dateBadgeEn
                : language === "kn"
                ? festival.dateBadgeKn
                : festival.dateBadgeHi}
            </span>
          </div>

          {/* Action Buttons Top Right: Fullscreen View & Share */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => setLightboxOpen(true)}
              className="p-2.5 rounded-full bg-black/60 hover:bg-(--gold) text-white hover:text-stone-950 backdrop-blur-md transition-all shadow-md border border-white/15"
              title="View Full Photo"
            >
              <Maximize2 size={15} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-black/60 hover:bg-(--gold) text-white hover:text-stone-950 backdrop-blur-md transition-all shadow-md border border-white/15"
              title="Share Festival"
            >
              {copied ? <Check size={15} className="text-green-400" /> : <Share2 size={15} />}
            </button>
          </div>

          {/* Tap to View Fullscreen Hint */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 hover:bg-(--gold) text-white hover:text-stone-950 text-[11px] font-medium backdrop-blur-md border border-white/15 transition-all shadow-md"
          >
            <Maximize2 size={11} />
            <span>{language === "en" ? "Full Sacred Darshan" : language === "kn" ? "ಸಂಪೂರ್ಣ ದರ್ಶನ ವೀಕ್ಷಿಸಿ" : "संपूर्ण दर्शन देखें"}</span>
          </button>
        </div>

        {/* Content Details Column */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            {/* Header Title */}
            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-(--gold) block">
                {language === "en" ? "Sacred Utsava" : language === "kn" ? "ಪವಿತ್ರ ಉತ್ಸವ" : "पावन उत्सव"}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold leading-tight mt-1 text-(--text)">
                {language === "en" ? festival.titleEn : language === "kn" ? festival.titleKn : festival.titleHi}
              </h3>
            </div>
          {/* Live Countdown Timer (Auto-hides if expired) */}
          {!timeLeft.expired ? (
            <div className="p-3.5 rounded-2xl border border-(--line) bg-(--surface-soft) mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-(--muted) flex items-center gap-1 mb-2">
                <Clock size={12} className="text-(--gold)" />
                {language === "en" ? "Starts In" : language === "kn" ? "ಉತ್ಸವ ಪ್ರಾರಂಭಕ್ಕೆ ಉಳಿದ ಸಮಯ" : "आरंभ होने में शेष समय"}
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-1.5 rounded-lg bg-(--card) border border-(--line)">
                  <strong className="text-lg sm:text-xl font-bold font-mono text-(--gold) block leading-none">
                    {timeLeft.days}
                  </strong>
                  <span className="text-[10px] text-(--muted) uppercase font-semibold">
                    {language === "en" ? "Days" : language === "kn" ? "ದಿನ" : "दिन"}
                  </span>
                </div>
                <div className="p-1.5 rounded-lg bg-(--card) border border-(--line)">
                  <strong className="text-lg sm:text-xl font-bold font-mono text-(--gold) block leading-none">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </strong>
                  <span className="text-[10px] text-(--muted) uppercase font-semibold">
                    {language === "en" ? "Hrs" : language === "kn" ? "ಗಂಟೆ" : "घंटे"}
                  </span>
                </div>
                <div className="p-1.5 rounded-lg bg-(--card) border border-(--line)">
                  <strong className="text-lg sm:text-xl font-bold font-mono text-(--gold) block leading-none">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </strong>
                  <span className="text-[10px] text-(--muted) uppercase font-semibold">
                    {language === "en" ? "Min" : language === "kn" ? "ನಿಮಿಷ" : "मिनट"}
                  </span>
                </div>
                <div className="p-1.5 rounded-lg bg-(--card) border border-(--line)">
                  <strong className="text-lg sm:text-xl font-bold font-mono text-(--gold) block leading-none">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </strong>
                  <span className="text-[10px] text-(--muted) uppercase font-semibold">
                    {language === "en" ? "Sec" : language === "kn" ? "ಸೆಕೆಂಡ್" : "सेकंड"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold text-center mb-4 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200">
              {language === "en" ? "Annual Rituals Underway" : language === "kn" ? "ವಾರ್ಷಿಕ ಪೂಜಾ ಕೈಂಕರ್ಯಗಳು ನೆರವೇರುತ್ತಿವೆ" : "वार्षिक पूजा अनुष्ठान जारी"}
            </div>
          )}

          <p className="text-xs text-(--muted) leading-relaxed">
            {language === "en" ? festival.descEn : language === "kn" ? festival.descKn : festival.descHi}
          </p>

          {/* Ritual Schedule */}
          <div className="mt-4 pt-3 border-t border-(--line)">
            <span className="text-[11px] font-bold uppercase tracking-wider text-(--text) mb-2 flex items-center gap-1.5">
              <Sparkles size={13} className="text-(--gold)" />
              {language === "en" ? "Sacred Rituals" : language === "kn" ? "ಪೂಜಾ ವಿಧಿವಿಧಾನಗಳು" : "पूजा अनुष्ठान"}
            </span>
            <ul className="space-y-1 text-xs text-(--muted)">
              {rituals.map((ritual, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-(--gold) mt-0.5 font-bold">✦</span>
                  <span>{ritual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Traditional Dress Code */}
          <div className="mt-3.5 p-2.5 rounded-xl border border-(--line) bg-(--surface-soft) flex items-start gap-2 text-xs text-(--muted)">
            <Shirt size={15} className="text-(--gold) shrink-0 mt-0.5" />
            <div>
              <strong className="text-[11px] text-(--text) block">
                {language === "en" ? "Pilgrim Dress Code" : language === "kn" ? "ಉಡುಪಿನ ನಿಯಮ" : "पारंपरिक वेशभूषा"}
              </strong>
              <span className="text-[11px]">
                {language === "en"
                  ? festival.dressCodeEn
                  : language === "kn"
                  ? festival.dressCodeKn
                  : festival.dressCodeHi}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-(--line) flex items-center gap-3">
          {onBookSeva ? (
            <button onClick={onBookSeva} className="button-gold flex-1">
              {language === "en" ? "Book Festival Seva" : language === "kn" ? "ಉತ್ಸವ ಸೇವೆ ಕಾಯ್ದಿರಿಸಿ" : "उत्सव सेवा बुक करें"}
              <ArrowRight size={14} />
            </button>
          ) : (
            <GoldenButton to="/poojas" size="md" className="flex-1">
              {language === "en" ? "Book Festival Seva" : language === "kn" ? "ಉತ್ಸವ ಸೇವೆ ಕಾಯ್ದಿರಿಸಿ" : "उत्सव सेवा बुक करें"}
              <ArrowRight size={14} />
            </GoldenButton>
          )}
        </div>
      </div>
      </div>

      {/* Fullscreen Sacred Darshan Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
            title="Close Darshan View"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-h-[90vh] max-w-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={festival.bannerImage}
              alt={festival.titleEn}
              className="max-h-[82vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/15"
            />
            <p className="mt-3 text-center text-xs text-amber-200/90 font-medium">
              {language === "en"
                ? "Sri Mahakuteshwara Swamy — Sacred Utsava Darshan"
                : language === "kn"
                ? "ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಸ್ವಾಮಿ — ಪವಿತ್ರ ಉತ್ಸವ ದರ್ಶನ"
                : "श्री महाकूटेश्वर स्वामी — पावन उत्सव दर्शन"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
