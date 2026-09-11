import { Clock3, MoonStar, SunMedium, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { templeImages } from "@/lib/temple";
import { useTemple } from "@/components/TempleLayout";
import TimelineReveal from "@/components/TimelineReveal";
import PremiumGallery from "@/components/PremiumGallery";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function About() {
  const { copy, language } = useTemple();

  return (
    <div data-testid="about-page">
      {/* 1. Page Hero */}
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

      {/* 2. Introductory Shrine Story */}
      <RevealOnScroll>
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
                  ? "Built during the late 6th and early 7th century CE by the early Badami Chalukyas, the Mahakuta temple complex represents a crucial transitional milestone in temple architecture. Known in sacred literature as Dakshina Kashi, this holy forest valley houses more than two dozen ancient sandstone shrines, ancient stone inscriptions, and the immortal natural thermal spring known as Papavinasha Theertha."
                  : language === "kn"
                  ? "ಕ್ರಿ.ಶ. 6-7ನೇ ಶತಮಾನದಲ್ಲಿ ಬಾದಾಮಿ ಚಾಲುಕ್ಯರಿಂದ ನಿರ್ಮಿಸಲ್ಪಟ್ಟ ಮಹಾಕೂಟ ಕ್ಷೇತ್ರವು ದ್ರಾವಿಡ ಮತ್ತು ನಾಗರ ಶೈಲಿಯ ಸಮ್ಮಿಶ್ರ ಶಿಲ್ಪಕಲೆಯ ಅದ್ಭುತ ಕೇಂದ್ರವಾಗಿದೆ. 'ದಕ್ಷಿಣ ಕಾಶಿ' ಎಂದೇ ಪ್ರಸಿದ್ಧವಾದ ಈ ತಪೋಭೂಮಿಯಲ್ಲಿ ಎರಡು ಡಜನ್‌ಗೂ ಹೆಚ್ಚು ಪ್ರಾಚೀನ ಶಿವಾಲಯಗಳು, ಐತಿಹಾಸಿಕ ಶಾಸನಗಳು ಹಾಗೂ ಸದಾ ಹರಿಯುವ ಪವಿತ್ರ ಪಾಪವಿನಾಶ ಪುಷ್ಕರಿಣಿ ನೆಲೆಸಿದೆ."
                  : "छठी-सातवीं शताब्दी में बादामी चालुक्य वंश द्वारा निर्मित महाकूट मंदिर परिसर वास्तुकला का अनुपम संगम है। 'दक्षिण काशी' के रूप में विख्यात यह पावन तीर्थ दो दर्जन से अधिक प्राचीन शिवालयों, ऐतिहासिक शिलालेखों तथा निर्मल पापविनाशी पुष्करिणी से सुशोभित है।"}
              </p>
              <div className="gold-rule" />

              <div className="mt-6 flex flex-col gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-4 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-(--gold) block mb-1">
                    {language === "en" ? "Architectural Significance" : language === "kn" ? "ಶಿಲ್ಪಕಲೆಯ ಮಹತ್ವ" : "स्थापत्य विशिष्टता"}
                  </span>
                  <p className="text-sm text-(--muted) leading-relaxed">
                    {language === "en"
                      ? "Mahakuta is renowned for standing at the crossroads of northern Rekha-Nagara and southern Dravida architectural traditions, pioneering curvilinear superstructures and intricate lattice jali stone screens."
                      : language === "kn"
                      ? "ಉತ್ತರ ಭಾರತದ ನಾಗರ ಶೈಲಿ ಹಾಗೂ ದಕ್ಷಿಣ ಭಾರತದ ದ್ರಾವಿಡ ಶೈಲಿಗಳೆರಡರ ಅಪೂರ್ವ ಸಮ್ಮಿಲನವನ್ನು ಇಲ್ಲಿ ಕಾಣಬಹುದು. ಕೆತ್ತನೆಯ ಶಿಲಾ ಕಿಟಕಿಗಳು ಮತ್ತು ಶಿಖರಗಳು ಚಾಲುಕ್ಯರ ಪ್ರೌಢಿಮೆಯನ್ನು ಸಾರುತ್ತವೆ."
                      : "महाकूट उत्तर भारत की रेखा-नागर एवं दक्षिण भारत की द्रविड़ स्थापत्य शैली के अद्भुत संगम हेतु प्रसिद्ध है।"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 3. Authentic Timeline Reveal (Chronicle of Mahakuta) */}
      <section className="section-pad warm-pattern" id="history" data-testid="about-timeline-section">
        <div className="container-wide">
          <div className="section-heading-row mb-12">
            <div>
              <p className="eyebrow flex items-center gap-1.5 text-(--gold)">
                <BookOpen size={15} />
                {language === "en" ? "Historical Inscriptions & Chronicle" : language === "kn" ? "ಐತಿಹಾಸಿಕ ಶಾಸನಗಳು ಮತ್ತು ಇತಿಹಾಸ" : "ऐतिहासिक शिलालेख व इतिहास"}
              </p>
              <h2 className="section-title">
                {language === "en"
                  ? "Chronicles of Sri Kshetra Mahakuta"
                  : language === "kn"
                  ? "ಶ್ರೀ ಕ್ಷೇತ್ರ ಮಹಾಕೂಟದ ಯುಗಯಾತ್ರೆ"
                  : "श्री क्षेत्र महाकूट ऐतिहासिक कालक्रम"}
              </h2>
            </div>
            <p className="section-aside">
              {language === "en"
                ? "Grounded in genuine lithic records including the Mahakuta Pillar Inscription of King Mangalesha (602 CE) and the Vinapoti Inscription of King Vijayaditya."
                : language === "kn"
                ? "ರಾಜ ಮಂಗಳೇಶನ ಮಹಾಕೂಟ ಸ್ತಂಭ ಶಾಸನ (ಕ್ರಿ.ಶ. 602) ಹಾಗೂ ವಿಜಯಾದಿತ್ಯನ ವಿನಾಪೋತಿ ಶಾಸನಗಳ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು."
                : "महाराज मंगलेश के महाकूट स्तंभ शिलालेख (602 ई.) तथा विनपोती शिलालेख पर आधारित प्रमाणिक ऐतिहासिक धरोहर।"}
            </p>
          </div>

          <TimelineReveal />
        </div>
      </section>

      {/* 4. Authentic Temple Heritage Photo Gallery with Filters and Lightbox */}
      <RevealOnScroll>
        <section className="section-pad" data-testid="about-heritage-gallery">
          <div className="container-wide">
            <PremiumGallery />
          </div>
        </section>
      </RevealOnScroll>

      {/* 5. Timings & Pilgrim Guidelines */}
      <RevealOnScroll>
        <section className="section-pad soft-surface" data-testid="about-timings-section" id="timings">
          <div className="container-narrow">
            <div className="section-heading-row mb-6">
              <div>
                <p className="eyebrow">
                  {language === "en" ? "Plan your visit" : language === "kn" ? "ನಿಮ್ಮ ಭೇಟಿಯನ್ನು ಯೋಜಿಸಿ" : "दर्शन योजना"}
                </p>
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
                  <h2>
                    {language === "en" ? "Darshan schedule" : language === "kn" ? "ದರ್ಶನ ವೇಳಾಪಟ್ಟಿ" : "दर्शन समय सारिणी"}
                  </h2>
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
              <p className="eyebrow">
                {language === "en" ? "Before you arrive" : language === "kn" ? "ಬರುವ ಮುನ್ನ" : "दर्शन पूर्व निर्देश"}
              </p>
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
      </RevealOnScroll>

      {/* 6. Devotional Benediction Quote */}
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