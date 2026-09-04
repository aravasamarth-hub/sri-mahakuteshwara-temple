import { useState } from "react";
import { ArrowRight, HandHeart } from "lucide-react";
import { donations, type Donation } from "@/lib/temple";
import { useTemple } from "@/components/TempleLayout";
import InquiryDialog from "@/components/InquiryDialog";

export default function Donations() {
  const { copy, language } = useTemple();
  const [selected, setSelected] = useState<Donation | null>(null);
  return <div data-testid="donations-page"><section className="page-hero compact" data-testid="donations-hero"><div className="container-wide"><p className="eyebrow">{language === "en" ? "Hundi · Seva" : "ಹುಂಡಿ · ಸೇವೆ"}</p><h1 className="page-title" data-testid="donations-title">{copy.donationTitle}</h1><p className="page-lede">{copy.donationIntro}</p></div></section><section className="section-pad" data-testid="donation-list-section"><div className="container-wide"><div className="donation-grid">{donations.map((donation, index) => <article key={donation.id} className={`donation-card ${index === 0 ? "featured" : ""}`} data-testid={`donation-card-${donation.id}`}><span className="donation-index">0{index + 1}</span><HandHeart className="donation-icon" size={23} /><h2>{language === "en" ? donation.en : donation.kn}</h2><p>{language === "en" ? donation.descriptionEn : donation.descriptionKn}</p><button className="text-link" onClick={() => setSelected(donation)} data-testid={`donation-donate-btn-${donation.id}`}>{copy.donateNow}<ArrowRight size={16} /></button></article>)}</div></div></section>{selected && <InquiryDialog kind="donation" itemTitle={language === "en" ? selected.en : selected.kn} itemSubtitle={language === "en" ? selected.descriptionEn : selected.descriptionKn} onClose={() => setSelected(null)} />}</div>;
}