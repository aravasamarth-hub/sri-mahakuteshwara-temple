import { useState } from "react";
import { ArrowRight, Users } from "lucide-react";
import { halls } from "@/lib/temple";
import { useTemple } from "@/components/TempleLayout";
import InquiryDialog from "@/components/InquiryDialog";

export default function Halls() {
  const { copy, language } = useTemple();
  const [selected, setSelected] = useState<(typeof halls)[number] | null>(null);
  return <div data-testid="halls-page"><section className="page-hero compact" data-testid="halls-hero"><div className="container-wide"><p className="eyebrow">{language === "en" ? "Celebrations · Togetherness" : "ಸಮಾರಂಭ · ಒಗ್ಗಟ್ಟು"}</p><h1 className="page-title" data-testid="halls-title">{copy.hallsTitle}</h1><p className="page-lede">{copy.hallsIntro}</p></div></section><section className="section-pad" data-testid="halls-list-section"><div className="container-wide grid gap-8 lg:grid-cols-2">{halls.map((hall) => <article className="hall-card" key={hall.id} data-testid={`hall-card-${hall.id}`}><div className="hall-image-wrap"><img src={hall.image} alt={language === "en" ? hall.en : hall.kn} data-testid={`hall-image-${hall.id}`} /><span className="hall-capacity"><Users size={14} /> {language === "en" ? hall.capacityEn : hall.capacityKn}</span></div><div className="hall-copy"><p className="eyebrow">{language === "en" ? "Kalyan mantapa" : "ಕಲ್ಯಾಣ ಮಂಟಪ"}</p><h2>{language === "en" ? hall.en : hall.kn}</h2><p>{language === "en" ? hall.featuresEn : hall.featuresKn}</p><button className="text-link" onClick={() => setSelected(hall)} data-testid={`hall-enquire-btn-${hall.id}`}>{copy.enquire}<ArrowRight size={16} /></button></div></article>)}</div></section>{selected && <InquiryDialog kind="hall" itemTitle={language === "en" ? selected.en : selected.kn} itemSubtitle={language === "en" ? selected.capacityEn : selected.capacityKn} onClose={() => setSelected(null)} />}</div>;
}