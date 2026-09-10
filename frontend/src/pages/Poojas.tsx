import { useState } from "react";
import { ArrowRight, Clock3, Flower2, MoonStar, SunMedium } from "lucide-react";
import { poojas, templeImages, type Pooja } from "@/lib/temple";
import { useTemple } from "@/components/TempleLayout";
import InquiryDialog from "@/components/InquiryDialog";

export default function Poojas() {
  const { copy, language } = useTemple();
  const [selected, setSelected] = useState<Pooja | null>(null);
  return <div data-testid="poojas-page">
    <section className="page-hero compact" data-testid="poojas-hero">
      <div className="container-wide">
        <p className="eyebrow">{copy.sacred}</p>
        <h1 className="page-title" data-testid="poojas-title">{copy.poojaTitle}</h1>
        <p className="page-lede">{copy.poojaIntro}</p>
      </div>
    </section>
    <section className="section-pad pattern-surface" data-testid="pooja-list-section">
      <div className="container-wide">
        {/* Sacred Sanctum & Papavinasha Spotlight */}
        <div className="mb-14 grid items-center gap-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] shadow-lg">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-md group">
            <img
              src={templeImages.darshan}
              alt="Sri Mahakuteshwara Garbhagriha Shiva Linga Darshan"
              className="w-full h-[360px] sm:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
              data-testid="poojas-darshan-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ffd700] mb-1">
                {language === "en" ? "Daily Sanctum Darshan" : language === "kn" ? "ಗರ್ಭಗುಡಿ ನಿತ್ಯ ದರ್ಶನ" : "गर्भगृह नित्य दर्शन"}
              </span>
              <h3 className="text-xl font-bold font-serif text-white">
                {language === "en" ? "Lord Sri Mahakuteshwara" : language === "kn" ? "ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಸ್ವಾಮಿ" : "भगवान श्री महाकूटेश्वर"}
              </h3>
              <p className="text-xs text-stone-200 mt-1">
                {language === "en"
                  ? "Adorned with silver kavacha, rudraksha mala, sacred bilva patre & fragrant floral garlands."
                  : language === "kn"
                  ? "ಬೆಳ್ಳಿ ಕವಚ, ರುದ್ರಾಕ್ಷಿ ಮಾಲೆ, ಬಿಲ್ವಪತ್ರೆ ಹಾಗೂ ಪುಷ್ಪಾಲಂಕಾರದಿಂದ ಕಂಗೊಳಿಸುವ ದರ್ಶನ."
                  : "रजत कवच, रुद्राक्ष माला, बिल्व पत्र एवं दिव्य पुष्पों से सुशोभित पावन दर्शन।"}
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow">{copy.sacred}</p>
            <h2 className="section-title text-2xl sm:text-3xl font-serif">
              {language === "en"
                ? "Sacred Abhisheka with Natural Spring Waters"
                : language === "kn"
                ? "ಪಾಪವಿನಾಶ ತೀರ್ಥೋದಕದೊಂದಿಗೆ ರುದ್ರಾಭಿಷೇಕ"
                : "पापविनाशी पावन तीर्थ जल से रुद्राभिषेक"}
            </h2>
            <p className="body-copy mt-3 text-sm sm:text-base leading-relaxed">
              {language === "en"
                ? "At Mahakuta, daily abhishekas and archanas are conducted following ancient Shaiva Agamas. Devotees may offer personal sankalpa for health, prosperity, and spiritual peace. The holy spring water of the Papavinasha Pushkarini flows eternally through the temple complex, sanctifying every prayer."
                : language === "kn"
                ? "ಮಹಾಕೂಟದಲ್ಲಿ ಪುರಾತನ ಶೈವಾಗಮ ವಿಧಿವಿಧಾನಗಳಂತೆ ಪ್ರತಿದಿನ ಅಭಿಷೇಕ ಹಾಗೂ ಅರ್ಚನೆಗಳು ನೆರವೇರುತ್ತವೆ. ಭಕ್ತರು ತಮ್ಮ ಆಯುರಾರೋಗ್ಯ ಮತ್ತು ಶಾಂತಿಗಾಗಿ ವಿಶೇಷ ಸಂಕಲ್ಪ ಪೂಜೆ ಸಲ್ಲಿಸಬಹುದು. ಪಾಪವಿನಾಶ ಪುಷ್ಕರಿಣಿಯ ಸದಾ ಹರಿಯುವ ನೈಸರ್ಗಿಕ ತೀರ್ಥವು ಪ್ರತಿ ಪೂಜೆಯನ್ನು ಪವಿತ್ರಗೊಳಿಸುತ್ತದೆ."
                : "महाकूट में प्राचीन शैवागम परंपरा अनुसार प्रतिदिन अभिषेक एवं अर्चना संपन्न होती है। श्रद्धालु अपने स्वास्थ्य, समृद्धि एवं आत्मशांति हेतु विशेष संकल्प पूजा करा सकते हैं। पापविनाशी पुष्करिणी का निरंतर बहता पावन जल प्रत्येक अनुष्ठान को दिव्य बनाता है।"}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href="#pooja-timings" className="text-link text-sm font-semibold inline-flex items-center gap-1.5">
                {language === "en" ? "View daily ritual timings" : language === "kn" ? "ದೈನಂದಿನ ಪೂಜಾ ಸಮಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ" : "दैनिक पूजा समय देखें"}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{language === "en" ? "Daily seva" : language === "kn" ? "ದೈನಂದಿನ ಸೇವೆ" : "दैनिक सेवा"}</p>
            <h2 className="section-title">{language === "en" ? "Choose your offering" : language === "kn" ? "ನಿಮ್ಮ ಅರ್ಪಣೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ" : "अपनी पूजा सेवा चुनें"}</h2>
          </div>
          <span className="count-pill">04 {language === "en" ? "rituals" : language === "kn" ? "ಸೇವೆಗಳು" : "अनुष्ठान"}</span>
        </div>
        <div className="pooja-grid">
          {poojas.map((pooja, index) => <article className="pooja-card" key={pooja.id} data-testid={`pooja-card-${pooja.id}`}>
            <div className="pooja-card-top"><span className="pooja-number">0{index + 1}</span><span className="pooja-icon"><Flower2 size={20} /></span></div>
            <h3 data-testid={`pooja-name-${pooja.id}`}>{language === "en" ? pooja.en : language === "kn" ? pooja.kn : pooja.hi}<small>/ {language === "en" ? pooja.kn : pooja.en}</small></h3>
            <p>{language === "en" ? pooja.descriptionEn : language === "kn" ? pooja.descriptionKn : pooja.descriptionHi}</p>
            <div className="pooja-card-bottom"><button className="small-gold-btn" onClick={() => setSelected(pooja)} data-testid={`pooja-book-btn-${pooja.id}`}>{copy.bookNow}<ArrowRight size={14} /></button></div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section-pad soft-surface" data-testid="poojas-timings-section" id="pooja-timings">
      <div className="container-narrow">
        <div className="section-heading-row mb-6">
          <div>
            <p className="eyebrow">{language === "en" ? "Sacred timings" : language === "kn" ? "ಪವಿತ್ರ ಸಮಯಗಳು" : "पूजा समय"}</p>
            <h2 className="section-title">{language === "en" ? "Pooja & Darshan Timings" : language === "kn" ? "ಪೂಜೆ ಮತ್ತು ದರ್ಶನ ಸಮಯ" : "दैनिक पूजा एवं दर्शन समय"}</h2>
          </div>
          <p className="section-aside">{language === "en" ? "Special sankalpa and archana are performed during the scheduled morning and evening darshan hours." : language === "kn" ? "ಬೆಳಗಿನ ಮತ್ತು ಸಂಜೆಯ ದರ್ಶನದ ಸಮಯದಲ್ಲಿ ವಿಶೇಷ ಸಂಕಲ್ಪ ಮತ್ತು ಅರ್ಚನೆಗಳನ್ನು ನೆರವೇರಿಸಲಾಗುತ್ತದೆ." : "प्रातः एवं सायं दर्शन के पावन समय पर विशेष संकल्प और अभिषेक संपन्न होते हैं।"}</p>
        </div>
        <div className="schedule-card" data-testid="poojas-schedule-card">
          <div className="schedule-top">
            <span className="schedule-symbol"><Clock3 size={23} /></span>
            <div>
              <p className="eyebrow">{copy.open}</p>
              <h2>{language === "en" ? "Daily ritual schedule" : language === "kn" ? "ದೈನಂದಿನ ಪೂಜಾ ವೇಳಾಪಟ್ಟಿ" : "दैनिक अनुष्ठान सारिणी"}</h2>
            </div>
          </div>
          <div className="schedule-row" data-testid="morning-pooja-timing">
            <div className="schedule-icon"><SunMedium size={21} /></div>
            <div>
              <span>{copy.morning} · {language === "en" ? "Abhisheka & Archana" : language === "kn" ? "ಅಭಿಷೇಕ ಮತ್ತು ಅರ್ಚನೆ" : "अभिषेक एवं अर्चना"}</span>
              <strong>{copy.from} — 1:00 PM</strong>
            </div>
            <i />
          </div>
          <div className="schedule-row" data-testid="evening-pooja-timing">
            <div className="schedule-icon"><MoonStar size={21} /></div>
            <div>
              <span>{copy.evening} · {language === "en" ? "Maha Mangalarathi & Darshan" : language === "kn" ? "ಮಹಾ ಮಂಗಳಾರತಿ ಮತ್ತು ದರ್ಶನ" : "महा मंगळारती एवं दर्शन"}</span>
              <strong>{language === "en" ? "4:00 PM — 6:00 PM" : language === "kn" ? "ಸಂಜೆ 4:00 — 6:00" : "सायं 4:00 — 6:00"}</strong>
            </div>
            <i />
          </div>
          <div className="schedule-note">
            {language === "en" ? "Priests perform personalized sankalpa with devotee names and nakshatra during these sacred hours. Festival pooja timings are announced by the trust." : language === "kn" ? "ಈ ಪವಿತ್ರ ಸಮಯದಲ್ಲಿ ಅರ್ಚಕರು ಭಕ್ತರ ಹೆಸರು ಮತ್ತು ನಕ್ಷತ್ರದೊಂದಿಗೆ ವೈಯಕ್ತಿಕ ಸಂಕಲ್ಪವನ್ನು ನೆರವೇರಿಸುತ್ತಾರೆ. ಹಬ್ಬದ ವಿಶೇಷ ಸಮಯವನ್ನು ಟ್ರಸ್ಟ್ ಪ್ರಕಟಿಸುತ್ತದೆ." : "इन पावन घड़ियों में श्रद्धालु के नाम एवं गोत्र से विशेष संकल्प किया जाता है। विशेष पर्वों का समय ट्रस्ट द्वारा सूचित किया जाता है।"}
          </div>
        </div>
      </div>
    </section>
    {selected && <InquiryDialog kind="pooja" itemTitle={`${language === "en" ? selected.en : language === "kn" ? selected.kn : selected.hi} (${language === "en" ? selected.kn : selected.en})`} itemSubtitle={language === "en" ? selected.descriptionEn : language === "kn" ? selected.descriptionKn : selected.descriptionHi} onClose={() => setSelected(null)} />}
  </div>;
}