import { MapPin, Navigation, Car, Bus, Train } from "lucide-react";
import { useTemple } from "@/components/TempleLayout";

export default function GoogleMapsEmbed() {
  const { language } = useTemple();

  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Mahakuta+Group+of+Temples,+Mahakuta,+Karnataka+587201";

  return (
    <div className="rounded-2xl border border-(--line) bg-(--card) overflow-hidden shadow-sm" data-testid="live-google-maps">
      {/* Live Map Header */}
      <div className="p-4 border-b border-(--line) flex flex-wrap items-center justify-between gap-3 bg-(--surface-soft)">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-lg bg-(--surface) text-(--gold)">
            <MapPin size={18} />
          </span>
          <div>
            <strong className="text-sm font-serif text-(--text) block">
              {language === "en"
                ? "Sri Kshetra Mahakuteshwara Temple"
                : language === "kn"
                ? "ಶ್ರೀ ಕ್ಷೇತ್ರ ಮಹಾಕೂಟೇಶ್ವರ ದೇವಾಲಯ"
                : "श्री क्षेत्र महाकूटेश्वर मंदिर"}
            </strong>
            <span className="text-[11px] text-(--muted)">Mahakuta, Badami Taluk, Bagalkot District, Karnataka 587201</span>
          </div>
        </div>

        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-(--gold) hover:bg-(--gold-bright) text-white text-xs font-semibold transition-all shadow-sm"
        >
          <Navigation size={14} />
          {language === "en" ? "Get Directions" : language === "kn" ? "ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ" : "दिशा-निर्देश प्राप्त करें"}
        </a>
      </div>

      {/* Embedded Google Maps iframe */}
      <div className="relative w-full h-[280px] sm:h-[320px] bg-stone-100">
        <iframe
          title="Sri Mahakuta Temple Badami Google Map"
          src="https://maps.google.com/maps?q=Mahakuta+Group+of+Temples,+Badami,+Karnataka&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* Transit & Parking Details */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-(--background) border-t border-(--line)">
        <div className="flex items-center gap-2.5 p-2 rounded-lg border border-(--line) bg-(--card)">
          <Train size={16} className="text-(--gold) shrink-0" />
          <div>
            <span className="text-[10px] text-(--muted) block">
              {language === "en" ? "Nearest Railway" : language === "kn" ? "ಹತ್ತಿರದ ರೈಲ್ವೆ ನಿಲ್ದಾಣ" : "निकटतम रेलवे"}
            </span>
            <strong className="text-(--text)">Badami Station (BDM) · 14 km</strong>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-lg border border-(--line) bg-(--card)">
          <Bus size={16} className="text-(--gold) shrink-0" />
          <div>
            <span className="text-[10px] text-(--muted) block">
              {language === "en" ? "Bus Stand" : language === "kn" ? "ಬಸ್ ನಿಲ್ದಾಣ" : "बस स्टैंड"}
            </span>
            <strong className="text-(--text)">Badami KSRTC Bus Stand · 14 km</strong>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-lg border border-(--line) bg-(--card)">
          <Car size={16} className="text-(--gold) shrink-0" />
          <div>
            <span className="text-[10px] text-(--muted) block">
              {language === "en" ? "Pilgrim Parking" : language === "kn" ? "ವಾಹನ ನಿಲುಗಡೆ" : "पार्किंग व्यवस्था"}
            </span>
            <strong className="text-(--text)">
              {language === "en" ? "Free parking near Mahadwara" : language === "kn" ? "ಮಹಾದ್ವಾರದ ಬಳಿ ಉಚಿತ ಪಾರ್ಕಿಂಗ್" : "महाद्वार के समीप निःशुल्क पार्किंग"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
