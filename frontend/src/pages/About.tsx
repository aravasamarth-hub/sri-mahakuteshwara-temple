import { useState } from "react";
import { ArrowRight, Clock3, Gem, History, Image as ImageIcon, MoonStar, ShieldCheck, SunMedium, X } from "lucide-react";
import { Link } from "react-router-dom";
import { templeGallery, templeImages } from "@/lib/temple";
import { useTemple } from "@/components/TempleLayout";

export default function About() {
  const { copy, language } = useTemple();
  const [activeGalleryItem, setActiveGalleryItem] = useState<(typeof templeGallery)[0] | null>(null);

  const cards = [
    { icon: History, title: copy.historyTitle, text: copy.historyText },
    { icon: Gem, title: copy.deityTitle, text: copy.deityText },
    { icon: ShieldCheck, title: copy.trustTitle, text: copy.trustText },
  ];

  return (
    <div data-testid="about-page">
      <section className="page-hero" data-testid="about-hero">
        <div className="container-wide">
          <p className="eyebrow">
            {language === "en"
              ? "The shrine · Est. in faith"
              : language === "kn"
              ? "ಪವಿತ್ರ ಕ್ಷೇತ್ರ · ಭಕ್ತಿಯಲ್ಲಿ ನೆಲೆಸಿದೆ"
              : "पावन धाम · अगाध आस्था"}
          </p>
          <h1 className="page-title" data-testid="about-title">
            {copy.aboutTitle}
          </h1>
          <p className="page-lede">{copy.aboutText}</p>
        </div>
      </section>

      <section className="section-pad" data-testid="about-story">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.88fr_1.12fr] items-center">
          <div className="image-stack tall">
            <img
              src={templeImages.water}
              alt="Sacred Pushkarini Papavinasha holy water tank in Mahakuta"
              data-testid="about-courtyard-image"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
            <span className="image-caption">
              {language === "en"
                ? "Sacred Pushkarini · Papavinasha Theertha"
                : language === "kn"
                ? "ಪಾಪವಿನಾಶ ತೀರ್ಥ · ಶ್ರೀ ಕ್ಷೇತ್ರ ಮಹಾಕೂಟ"
                : "पापविनाशी पवित्र पुष्करिणी · श्री क्षेत्र महाकूट"}
            </span>
          </div>
          <div>
            <p className="eyebrow">{language === "en" ? "Our story" : language === "kn" ? "ನಮ್ಮ ಕಥೆ" : "हमारा इतिहास"}</p>
            <h2 className="section-title" data-testid="about-history-title">
              {copy.historyTitle}
            </h2>
            <p className="body-copy" data-testid="about-history-copy">
              {language === "en"
                ? "Built during the 6th–7th century CE by the early Badami Chalukyas, the Mahakuta temple complex represents a crucial transitional milestone in temple architecture. Known in sacred literature as Dakshina Kashi, this holy forest valley houses more than two dozen ancient sandstone shrines, ancient inscriptions, and the immortal natural thermal spring known as Papavinasha Theertha."
                : language === "kn"
                ? "ಕ್ರಿ.ಶ. 6-7ನೇ ಶತಮಾನದಲ್ಲಿ ಬಾದಾಮಿ ಚಾಲುಕ್ಯರಿಂದ ನಿರ್ಮಿಸಲ್ಪಟ್ಟ ಮಹಾಕೂಟ ಕ್ಷೇತ್ರವು ದ್ರಾವಿಡ ಮತ್ತು ನಾಗರ ಶೈಲಿಯ ಸಮ್ಮಿಶ್ರ ಶಿಲ್ಪಕಲೆಯ ಅದ್ಭುತ ಕೇಂದ್ರವಾಗಿದೆ. 'ದಕ್ಷಿಣ ಕಾಶಿ' ಎಂದೇ ಪ್ರಸಿದ್ಧವಾದ ಈ ತಪೋಭೂಮಿಯಲ್ಲಿ ಎರಡು ಡಜನ್‌ಗೂ ಹೆಚ್ಚು ಪ್ರಾಚೀನ ಶಿವಾಲಯಗಳು, ಐತಿಹಾಸಿಕ ಶಾಸನಗಳು ಹಾಗೂ ಸದಾ ಹರಿಯುವ ಪವಿತ್ರ ಪಾಪವಿನಾಶ ಪುಷ್ಕರಿಣಿ ನೆಲೆಸಿದೆ."
                : "छठी-सातवीं शताब्दी में बादामी चालुक्य वंश द्वारा निर्मित महाकूट मंदिर परिसर वास्तुकला का अनुपम संगम है। 'दक्षिण काशी' के रूप में विख्यात यह पावन तीर्थ दो दर्जन से अधिक प्राचीन शिवालयों, ऐतिहासिक शिलालेखों तथा निर्मल पापविनाशी पुष्करिणी से सुशोभित है।"}
            </p>
            <div className="gold-rule" />
            <div className="info-grid">
              {cards.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="info-card"
                  data-testid={`about-card-${title.slice(0, 8).toLowerCase().replaceAll(" ", "-")}`}
                >
                  <Icon size={20} className="text-(--gold)" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Temple Heritage Photo Gallery */}
      <section className="section-pad warm-pattern" data-testid="about-heritage-gallery">
        <div className="container-wide">
          <div className="section-heading-row mb-8">
            <div>
              <p className="eyebrow flex items-center gap-1.5">
                <ImageIcon size={15} className="text-(--gold)" />
                {language === "en" ? "Sacred Heritage" : language === "kn" ? "ಪವಿತ್ರ ಪರಂಪರೆ" : "धरोहर दर्शन"}
              </p>
              <h2 className="section-title">
                {language === "en"
                  ? "Photographs of Sri Kshetra Mahakuta"
                  : language === "kn"
                  ? "ಶ್ರೀ ಕ್ಷೇತ್ರ ಮಹಾಕೂಟದ ಪವಿತ್ರ ಚಿತ್ರಣ"
                  : "श्री क्षेत्र महाकूट पावन छायाचित्र"}
              </h2>
            </div>
            <p className="section-aside">
              {language === "en"
                ? "Original photographs of the shrines, sacred banyan trees, holy Pushkarini and daily darshan."
                : language === "kn"
                ? "ಪ್ರಾಚೀನ ಶಿವಾಲಯಗಳು, ಶತಮಾನಗಳ ಪವಿತ್ರ ಆಲದ ಮರಗಳು, ಪುಷ್ಕರಿಣಿ ಹಾಗೂ ನಿತ್ಯ ದರ್ಶನದ ನೈಜ ಛಾಯಾಚಿತ್ರಗಳು."
                : "प्राचीन देवालय, शताब्दियों पुराने वटवृक्ष, पुष्करिणी एवं नित्य दर्शन के मौलिक छायाचित्र।"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="temple-gallery-grid">
            {templeGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveGalleryItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-(--border) bg-(--surface-soft) aspect-[4/3] shadow-sm hover:shadow-lg transition-all"
                data-testid={`gallery-item-${item.id}`}
              >
                <img
                  src={item.src}
                  alt={item.en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <span className="text-xs font-semibold text-white drop-shadow-sm line-clamp-1">
                    {language === "en" ? item.en : language === "kn" ? item.kn : item.hi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {activeGalleryItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveGalleryItem(null)}
          data-testid="gallery-lightbox"
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveGalleryItem(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-black/40 rounded-full transition-colors"
              aria-label="Close"
              data-testid="close-lightbox"
            >
              <X size={24} />
            </button>
            <img
              src={activeGalleryItem.src}
              alt={activeGalleryItem.en}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl border border-white/20 shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-lg sm:text-xl font-bold font-serif">
                {language === "en"
                  ? activeGalleryItem.en
                  : language === "kn"
                  ? activeGalleryItem.kn
                  : activeGalleryItem.hi}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                {language === "en"
                  ? "Sri Kshetra Mahakuta · Dakshina Kashi, Badami"
                  : language === "kn"
                  ? "ಶ್ರೀ ಕ್ಷೇತ್ರ ಮಹಾಕೂಟ · ದಕ್ಷಿಣ ಕಾಶಿ, ಬಾದಾಮಿ"
                  : "श्री क्षेत्र महाकूट · दक्षिण काशी, बादामी"}
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="section-pad soft-surface" data-testid="about-timings-section" id="timings">
        <div className="container-narrow">
          <div className="section-heading-row mb-6">
            <div>
              <p className="eyebrow">{language === "en" ? "Plan your visit" : language === "kn" ? "ನಿಮ್ಮ ಭೇಟಿಯನ್ನು ಯೋಜಿಸಿ" : "दर्शन योजना"}</p>
              <h2 className="section-title">{copy.timings}</h2>
            </div>
            <p className="section-aside">
              {language === "en"
                ? "Come with an open heart. The temple welcomes darshan every day."
                : language === "kn"
                ? "ತೆರೆದ ಹೃದಯದಿಂದ ಬನ್ನಿ. ದೇವಾಲಯವು ಪ್ರತಿದಿನ ದರ್ಶನಕ್ಕೆ ಸ್ವಾಗತಿಸುತ್ತದೆ."
                : "श्रद्धा और भक्ति भाव से पधारें। मंदिर में प्रतिदिन दर्शन का सुअवसर है।"}
            </p>
          </div>
          <div className="schedule-card" data-testid="about-schedule-card">
            <div className="schedule-top">
              <span className="schedule-symbol">
                <Clock3 size={23} />
              </span>
              <div>
                <p className="eyebrow">{copy.open}</p>
                <h2>{language === "en" ? "Darshan schedule" : language === "kn" ? "ದರ್ಶನ ವೇಳಾಪಟ್ಟಿ" : "दर्शन समय सारिणी"}</h2>
              </div>
            </div>
            <div className="schedule-row" data-testid="morning-timing">
              <div className="schedule-icon">
                <SunMedium size={21} />
              </div>
              <div>
                <span>{copy.morning}</span>
                <strong>{copy.from}</strong>
              </div>
              <i />
            </div>
            <div className="schedule-row" data-testid="evening-timing">
              <div className="schedule-icon">
                <MoonStar size={21} />
              </div>
              <div>
                <span>{copy.evening}</span>
                <strong>{copy.to}</strong>
              </div>
              <i />
            </div>
            <div className="schedule-note">
              {language === "en"
                ? "Special festival timings will be announced by the temple trust."
                : language === "kn"
                ? "ವಿಶೇಷ ಹಬ್ಬದ ಸಮಯವನ್ನು ದೇವಾಲಯದ ಟ್ರಸ್ಟ್ ಪ್ರಕಟಿಸುತ್ತದೆ."
                : "विशेष पर्वों एवं उत्सवों का समय मंदिर ट्रस्ट द्वारा सूचित किया जाएगा।"}
            </div>
          </div>
          <div className="visit-note" data-testid="about-visit-note">
            <p className="eyebrow">{language === "en" ? "Before you arrive" : language === "kn" ? "ಬರುವ ಮುನ್ನ" : "दर्शन पूर्व निर्देश"}</p>
            <p>
              {language === "en"
                ? "Please dress modestly, keep the sanctum peaceful and allow a little extra time for your darshan."
                : language === "kn"
                ? "ದಯವಿಟ್ಟು ಸರಳ ಉಡುಪು ಧರಿಸಿ, ಗರ್ಭಗುಡಿಯ ಶಾಂತಿಯನ್ನು ಕಾಪಾಡಿ ಮತ್ತು ದರ್ಶನಕ್ಕಾಗಿ ಸ್ವಲ್ಪ ಹೆಚ್ಚುವರಿ ಸಮಯ ಮೀಸಲಿಡಿ."
                : "कृपया मर्यादित वस्त्र धारण करें, गर्भगृह की पवित्रता बनाए रखें और दर्शन हेतु पर्याप्त समय लेकर आएं।"}
            </p>
            <Link to="/poojas" className="text-link" data-testid="about-poojas-link">
              {copy.bookPooja}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="quote-band" data-testid="about-quote">
        <div className="container-narrow">
          <span>“</span>
          <p>
            {language === "en"
              ? "In every carved stone, a prayer. In every visitor, a blessing."
              : language === "kn"
              ? "ಪ್ರತಿ ಕೆತ್ತಿದ ಕಲ್ಲಿನಲ್ಲಿ ಒಂದು ಪ್ರಾರ್ಥನೆ. ಪ್ರತಿ ಭಕ್ತನಲ್ಲಿ ಒಂದು ಆಶೀರ್ವಾದ."
              : "हर तराशे पत्थर में एक प्रार्थना। हर श्रद्धालु के आगमन में भगवान का आशीर्वाद।"}
          </p>
          <Link to="/poojas" className="text-link light-link" data-testid="about-pooja-link">
            {copy.bookPooja}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}