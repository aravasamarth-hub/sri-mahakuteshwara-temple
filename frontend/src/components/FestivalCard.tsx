import { useState, useEffect } from "react";
import { Clock, Share2, Sparkles, Check, Shirt, Calendar, ArrowRight } from "lucide-react";
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

  const handleShare = async () => {
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
    <div className="group rounded-3xl border border-(--line) bg-(--card) overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Festival Banner Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img
          src={festival.bannerImage}
          alt={festival.titleEn}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Date Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#b8860b] text-white shadow-md">
            <Calendar size={13} />
            {language === "en"
              ? festival.dateBadgeEn
              : language === "kn"
              ? festival.dateBadgeKn
              : festival.dateBadgeHi}
          </span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-(--gold) text-white hover:text-stone-950 backdrop-blur-md transition-all shadow-md"
          title="Share Festival"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
        </button>

        {/* Header Title inside Banner */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#fbbf24] block">
            {language === "en" ? "Sacred Utsava" : language === "kn" ? "ಪವಿತ್ರ ಉತ್ಸವ" : "पावन उत्सव"}
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-bold leading-tight mt-0.5">
            {language === "en" ? festival.titleEn : language === "kn" ? festival.titleKn : festival.titleHi}
          </h3>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
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
  );
}
