import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Landmark, Sparkles, Scroll, Crown, HeartHandshake } from "lucide-react";
import { useTemple } from "@/components/TempleLayout";
import RevealOnScroll from "./RevealOnScroll";

interface TimelineEvent {
  id: string;
  year: string;
  yearKn: string;
  yearHi: string;
  icon: typeof Landmark;
  titleEn: string;
  titleKn: string;
  titleHi: string;
  rulerEn: string;
  rulerKn: string;
  rulerHi: string;
  textEn: string;
  textKn: string;
  textHi: string;
}

const timelineData: TimelineEvent[] = [
  {
    id: "foundation",
    year: "c. 543 – 597 CE",
    yearKn: "ಕ್ರಿ.ಶ. 543 – 597",
    yearHi: "लगभग 543 – 597 ईस्वी",
    icon: Landmark,
    titleEn: "Early Chalukya Foundation",
    titleKn: "ಆರಂಭಿಕ ಚಾಲುಕ್ಯರ ಶಿಲಾ ಪ್ರತಿಷ್ಠಾಪನೆ",
    titleHi: "प्रारंभिक चालुक्य युगीन पाषाण आधारशिला",
    rulerEn: "Pulakeshin I & Kirtivarman I",
    rulerKn: "ಮೊದಲನೆಯ ಪುಲಕೇಶಿ ಮತ್ತು ಕೀರ್ತಿವರ್ಮ",
    rulerHi: "पुलकेशिन् प्रथम एवं कीर्तिवर्मन् प्रथम",
    textEn:
      "Kings Pulakeshin I and Kirtivarman I establish sacred shrines in the secluded Malaprabha valley, sanctifying the natural thermal spring into a Shaivite holy pilgrimage center.",
    textKn:
      "ಮಲಪ್ರಭಾ ಕಣಿವೆಯ ಪ್ರಶಾಂತ ವನದಲ್ಲಿ ಮೊದಲನೆಯ ಪುಲಕೇಶಿ ಮತ್ತು ಕೀರ್ತಿವರ್ಮ ರಾಜರು ನೈಸರ್ಗಿಕ ತೀರ್ಥದ ಸುತ್ತಲೂ ಶಿವಾಲಯಗಳನ್ನು ನಿರ್ಮಿಸಿ ಈ ಕ್ಷೇತ್ರವನ್ನು ದಕ್ಷಿಣ ಕಾಶಿಯನ್ನಾಗಿ ರೂಪಿಸಿದರು.",
    textHi:
      "मलप्रभा घाटी के पावन वनों में प्राकृतिक उष्ण जलकुंड के समीप चालुक्य नरेशों द्वारा देवालयों की स्थापना कर इसे पावन शैव तीर्थ के रूप में प्रतिष्ठित किया गया।",
  },
  {
    id: "mangalesha",
    year: "596 – 609 CE",
    yearKn: "ಕ್ರಿ.ಶ. 596 – 609",
    yearHi: "596 – 609 ईस्वी",
    icon: Crown,
    titleEn: "Mangalesha Era & Imperial Grants",
    titleKn: "ಮಂಗಳೇಶ ಚಕ್ರವರ್ತಿಯ ಆಳ್ವಿಕೆ ಮತ್ತು ದತ್ತಿ",
    titleHi: "महाराज मंगलेश शासन एवं शाही अनुदान",
    rulerEn: "King Mangalesha",
    rulerKn: "ಮಂಗಳೇಶ ಮಹಾರಾಜ",
    rulerHi: "नरेश मंगलेश",
    textEn:
      "Emperor Mangalesha richly patronizes Makuteshwaranatha, granting revenue from ten prosperous villages and constructing the stepped stone Pushkarini with central pavilion.",
    textKn:
      "ಮಂಗಳೇಶ ಮಹಾರಾಜನು ಮಕುಟೇಶ್ವರನಾಥನಿಗೆ ಹತ್ತು ಸಮೃದ್ಧ ಗ್ರಾಮಗಳನ್ನು ದತ್ತಿಯಾಗಿ ನೀಡಿ, ಶಿಲಾ ಸೋಪಾನಗಳ ಪವಿತ್ರ ಪುಷ್ಕರಿಣಿ ಹಾಗೂ ಭವ್ಯ ಮಂಟಪಗಳನ್ನು ನಿರ್ಮಿಸಿದನು.",
    textHi:
      "महाराज मंगलेश ने मकुटेश्वरनाथ महादेव को दस समृद्ध गांवों का राजस्व दान दिया तथा केंद्रीय मंडप से युक्त पाषाण पुष्करिणी का निर्माण करवाया।",
  },
  {
    id: "pillar-inscription",
    year: "595 / 602 CE",
    yearKn: "ಕ್ರಿ.ಶ. 595 / 602",
    yearHi: "595 / 602 ईस्वी",
    icon: Scroll,
    titleEn: "The Sacred Mahakuta Pillar Inscription",
    titleKn: "ಮಹಾಕೂಟದ ಐತಿಹಾಸಿಕ ವಿಜಯ ಸ್ತಂಭ ಶಾಸನ",
    titleHi: "महाकूट का प्रसिद्ध धर्म-विजय स्तंभ शिलालेख",
    rulerEn: "Imperial Chalukya Archive",
    rulerKn: "ಚಾಲುಕ್ಯ ರಾಜವಂಶದ ಧರ್ಮ-ವಿಜಯ ದಾಖಲೆ",
    rulerHi: "चालुक्य वंशावली एवं विजय अभिलेख",
    textEn:
      "A magnificent monolithic red sandstone pillar (Dharma-vijaya) is erected in the courtyard, inscribed in ancient Sanskrit and Halegannada recording the royal lineage and victories.",
    textKn:
      "ದೇವಾಲಯದ ಅಂಗಳದಲ್ಲಿ ಪ್ರತಿಷ್ಠಾಪಿಸಲಾದ ಕೆಂಪು ಶಿಲೆಯ ಭವ್ಯ ವಿಜಯ ಸ್ತಂಭವು ಚಾಲುಕ್ಯ ವಂಶಾವಳಿ ಮತ್ತು ಧಾರ್ಮಿಕ ಸಮರ್ಪಣೆಗಳನ್ನು ಸಂಸ್ಕೃತ ಹಾಗೂ ಹಳೆಗನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಅಮರಗೊಳಿಸಿದೆ.",
    textHi:
      "मंदिर प्रांगण में स्थापित लाल बलुआ पत्थर का भव्य एकाश्म स्तंभ प्राचीन संस्कृत व पुरानी कन्नड़ में चालुक्य वंश के गौरव एवं धार्मिक समर्पण को वर्णित करता है।",
  },
  {
    id: "vinapoti",
    year: "c. 696 – 733 CE",
    yearKn: "ಕ್ರಿ.ಶ. 696 – 733",
    yearHi: "लगभग 696 – 733 ईस्वी",
    icon: Sparkles,
    titleEn: "Vinapoti Inscription & Ruby Throne",
    titleKn: "ವಿನಾಪೋತಿಯ ನವರತ್ನ ರತ್ನಖಚಿತ ಪೀಠ ಸಮರ್ಪಣೆ",
    titleHi: "विनापोती शिलालेख एवं माणिक्य सिंहासन दान",
    rulerEn: "King Vijayaditya Reign",
    rulerKn: "ವಿಜಯಾದಿತ್ಯ ಮಹಾರಾಜನ ಕಾಲ",
    rulerHi: "महाराज विजयादित्य शासनकाल",
    textEn:
      "An epigraph on the porch of the main shrine records Queen Vinapoti's sacred offering of a ruby-studded golden pedestal (pitha) to the presiding Shiva Linga.",
    textKn:
      "ಮುಖ್ಯ ದೇವಾಲಯದ ಮುಖಮಂಟಪದ ಶಾಸನವು ವಿಜಯಾದಿತ್ಯ ರಾಜನ ಪ್ರಿಯ ರಾಣಿ ವಿನಾಪೋತಿಯು ನವರತ್ನ ಖಚಿತ ಬೆಳ್ಳಿ-ಬಂಗಾರದ ಪೀಠವನ್ನು ಮಕುಟೇಶ್ವರಲಿಂಗಕ್ಕೆ ಸಮರ್ಪಿಸಿದ ಭಕ್ತಿಪೂರ್ವಕ ಇತಿಹಾಸವನ್ನು ಸಾರುತ್ತದೆ.",
    textHi:
      "मुख्य देवालय के मंडप पर उत्कीर्ण अभिलेख के अनुसार रानी विनापोती द्वारा शिवलिंग हेतु बहुमूल्य माणिक्य जड़ित स्वर्ण पीठ का समर्पण किया गया।",
  },
  {
    id: "living-temple",
    year: "Living Tradition Today",
    yearKn: "೧೪೦೦+ ವರ್ಷಗಳ ನಿರಂತರ ಆರಾಧನೆ",
    yearHi: "1400+ वर्षों की जीवंत परंपरा",
    icon: HeartHandshake,
    titleEn: "14 Centuries of Living Faith",
    titleKn: "ಹದಿನಾಲ್ಕು ಶತಮಾನಗಳ ನಿರಂತರ ಪೂಜಾ ಪರಂಪರೆ",
    titleHi: "चौदह शताब्दियों की अखंड श्रद्धा",
    rulerEn: "Devotees Across Generations",
    rulerKn: "ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಭಕ್ತ ಸಮೂಹ",
    rulerHi: "पीढ़ियों से सेवारत श्रद्धालु",
    textEn:
      "Today, Sri Kshetra Mahakuteshwara stands as a living spiritual sanctuary where pilgrims continue ancient rituals, holy water snana in Papavinasha, and daily maha mangalarathi.",
    textKn:
      "ಇಂದಿಗೂ ಮಹಾಕೂಟ ಕ್ಷೇತ್ರವು ನಿತ್ಯ ಪೂಜೆ, ಪಾಪವಿನಾಶ ತೀರ್ಥ ಸ್ನಾನ ಮತ್ತು ವಾರ್ಷಿಕ ರಥೋತ್ಸವಗಳೊಂದಿಗೆ ಜೀವಂತ ಭಕ್ತಿ ಕ್ಷೇತ್ರವಾಗಿ ಸಹಸ್ರಾರು ಭಕ್ತರಿಗೆ ಶಾಂತಿ ನೀಡುತ್ತಿದೆ.",
    textHi:
      "वर्तमान में भी महाकूटेश्वर पावन धाम में नित्य रुद्राभिषेक, पवित्र पापनाशिनी तीर्थ स्नान एवं वार्षिक रथोत्सव की परंपरा निरंतर जारी है।",
  },
];

export default function TimelineReveal() {
  const { language } = useTemple();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24" data-testid="heritage-timeline">
      <div className="container-wide">
        <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-(--gold)">
            {language === "en" ? "Chronicles of Faith" : language === "kn" ? "ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆ" : "ऐतिहासिक कालक्रम"}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-(--text) mt-2">
            {language === "en"
              ? "Fourteen Centuries of Royal Devotion"
              : language === "kn"
              ? "ಹದಿನಾಲ್ಕು ಶತಮಾನಗಳ ಚಾಲುಕ್ಯ ಭಕ್ತಿ ವೈಭವ"
              : "चौदह शताब्दियों का चालुक्य युगीन वैभव"}
          </h2>
          <p className="text-xs sm:text-sm text-(--muted) mt-3 leading-relaxed">
            {language === "en"
              ? "Grounded in historical inscriptions and imperial epigraphs from the 6th-century Badami Chalukya dynasty."
              : language === "kn"
              ? "ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ರಾಜವಂಶದ ಶಿಲಾ ಶಾಸನಗಳು ಮತ್ತು ಇತಿಹಾಸದ ಆಧಾರದ ಮೇಲೆ ದಾಖಲಾದ ಪರಂಪರೆ."
              : "छठी शताब्दी के बादामी चालुक्य शिलालेखों एवं इतिहास पर आधारित पावन कालक्रम।"}
          </p>
        </RevealOnScroll>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated SVG Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-(--line)">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-[#d4af37] via-[#fbbf24] to-[#7f1734] origin-top"
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full bg-(--card) border-2 border-(--gold) flex items-center justify-center text-(--gold) shadow-md">
                    <Icon size={16} />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <RevealOnScroll
                      delay={idx * 0.1}
                      className="p-5 sm:p-6 rounded-2xl border border-(--line) bg-(--card) shadow-sm hover:shadow-xl hover:border-(--gold) transition-all duration-300"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-(--sand) text-[#b46a2c] dark:text-[#fbbf24]">
                          {language === "en" ? item.year : language === "kn" ? item.yearKn : item.yearHi}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-(--muted)">
                          {language === "en" ? item.rulerEn : language === "kn" ? item.rulerKn : item.rulerHi}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-(--text)">
                        {language === "en" ? item.titleEn : language === "kn" ? item.titleKn : item.titleHi}
                      </h3>

                      <p className="text-xs text-(--muted) mt-2 leading-relaxed">
                        {language === "en" ? item.textEn : language === "kn" ? item.textKn : item.textHi}
                      </p>
                    </RevealOnScroll>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
