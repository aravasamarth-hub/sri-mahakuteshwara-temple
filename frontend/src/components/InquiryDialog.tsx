import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTemple } from "@/components/TempleLayout";

type DialogKind = "pooja" | "donation" | "room" | "hall";
type InquiryDialogProps = { kind: DialogKind; itemTitle: string; itemSubtitle?: string; onClose: () => void };

export default function InquiryDialog({ kind, itemTitle, itemSubtitle, onClose }: InquiryDialogProps) {
  const { copy, language } = useTemple();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [extra, setExtra] = useState("");

  const isDonation = kind === "donation";
  const isPooja = kind === "pooja";
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || (isPooja && !date) || (isDonation && !amount)) { setError(true); return; }
    setError(false); setSubmitted(true);
  };

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} data-testid={`${kind}-modal-backdrop`}>
    <div className="inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" data-testid={`${kind}-modal`}>
      <button className="modal-close" onClick={onClose} aria-label="Close form" data-testid={`${kind}-modal-close`}><X size={18} /></button>
      {!submitted ? <>
        <span className="modal-ornament">✦</span><p className="eyebrow">{isDonation ? copy.donate : isPooja ? copy.bookPooja : copy.enquire}</p><h2 id="inquiry-title" className="font-heading text-2xl font-semibold text-(--text)" data-testid={`${kind}-modal-title`}>{itemTitle}</h2>{itemSubtitle && <p className="mt-2 text-sm text-(--muted)">{itemSubtitle}</p>}
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} data-testid={`${kind}-modal-form`}>
          <label className="form-label" htmlFor={`${kind}-name`}>{copy.name}<Input id={`${kind}-name`} value={name} onChange={(event) => setName(event.target.value)} placeholder={copy.name} data-testid={`${kind}-form-name`} /></label>
          <label className="form-label" htmlFor={`${kind}-phone`}>{copy.phoneLabel}<Input id={`${kind}-phone`} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91 00000 00000" inputMode="tel" data-testid={`${kind}-form-phone`} /></label>
          {isDonation ? <label className="form-label" htmlFor="donation-amount">{copy.amount}<Input id="donation-amount" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="₹ 501" inputMode="numeric" data-testid="donation-form-amount" /></label> : <label className="form-label" htmlFor={`${kind}-date`}>{copy.date}<Input id={`${kind}-date`} type="date" value={date} onChange={(event) => setDate(event.target.value)} data-testid={`${kind}-form-date`} /></label>}
          {isPooja ? <label className="form-label" htmlFor="pooja-extra">{copy.nakshatra} <span>({copy.optional})</span><Input id="pooja-extra" value={extra} onChange={(event) => setExtra(event.target.value)} placeholder="Ashwini / Kashyapa" data-testid="pooja-form-nakshatra" /></label> : <label className="form-label" htmlFor={`${kind}-extra`}>{kind === "hall" ? (language === "en" ? "Number of guests" : language === "kn" ? "ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ" : "अतिथियों की संख्या") : (language === "en" ? "Additional details" : language === "kn" ? "ಹೆಚ್ಚುವರಿ ವಿವರಗಳು" : "अतिरिक्त विवरण")} <span>({copy.optional})</span><Input id={`${kind}-extra`} value={extra} onChange={(event) => setExtra(event.target.value)} placeholder={kind === "hall" ? "300" : "..."} data-testid={`${kind}-form-extra`} /></label>}
          {error && <p className="form-error" role="alert" data-testid={`${kind}-form-error`}>{copy.required}</p>}
          <div className="mt-2 flex gap-3"><Button type="button" variant="outline" onClick={onClose} className="flex-1" data-testid={`${kind}-modal-cancel`}>{copy.cancel}</Button><Button type="submit" className="gold-button flex-1" data-testid={isDonation ? "donation-modal-submit-btn" : isPooja ? "booking-modal-submit-btn" : `${kind}-modal-submit-btn`}>{isDonation ? copy.submitDonation : isPooja ? copy.submitBooking : copy.sendMessage}</Button></div>
        </form>
      </> : <div className="success-state" data-testid={`${kind}-success`}><div className="success-icon">✓</div><p className="eyebrow">{copy.sacred}</p><h2 className="mt-2 font-heading text-2xl font-semibold text-(--text)">{isDonation ? copy.successDonation : isPooja ? copy.successBooking : copy.successEnquiry}</h2><p className="mt-3 text-sm leading-7 text-(--muted)">{copy.temple} · {copy.place}</p><Button className="gold-button mt-7 w-full" onClick={onClose} data-testid={`${kind}-success-close`}>{copy.cancel}</Button></div>}
    </div>
  </div>;
}