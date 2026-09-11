import { useState, type FormEvent } from "react";
import { X, MessageCircle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTemple } from "@/components/TempleLayout";
import { api } from "@/services/api";
import PaymentVerification from "./PaymentVerification";

type DialogKind = "pooja" | "donation" | "room" | "hall";

interface InquiryDialogProps {
  kind: DialogKind;
  itemTitle: string;
  itemSubtitle?: string;
  initialDate?: string;
  initialRooms?: number;
  initialGuests?: number;
  onClose: () => void;
}

export default function InquiryDialog({
  kind,
  itemTitle,
  itemSubtitle,
  initialDate,
  initialRooms,
  initialGuests,
  onClose,
}: InquiryDialogProps) {
  const { copy, language } = useTemple();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(initialDate || "");
  const [amount, setAmount] = useState(kind === "donation" ? "501" : kind === "pooja" ? "351" : "");
  const [extra, setExtra] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [showPaymentVerification, setShowPaymentVerification] = useState(false);

  const isDonation = kind === "donation";
  const isPooja = kind === "pooja";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || (isPooja && !date) || (isDonation && !amount)) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);

    try {
      if (isPooja) {
        const res = await api.submitPoojaBooking({
          poojaId: itemTitle.slice(0, 15).toLowerCase().replaceAll(" ", "-"),
          poojaName: itemTitle,
          fullName: name,
          phone,
          preferredDate: date,
          nakshatra: extra,
          amount: parseFloat(amount) || 351,
          language,
        });
        setReferenceId(res.referenceId || "MHK-POOJA");
        setWhatsappUrl(res.whatsappUrl || "");
      } else if (isDonation) {
        const res = await api.submitDonation({
          sevaCategory: itemTitle,
          amount: parseFloat(amount) || 501,
          fullName: name,
          phone,
          language,
        });
        setReferenceId(res.referenceId || "MHK-HUNDI");
        setWhatsappUrl(res.whatsappUrl || "");
      } else if (kind === "room") {
        const res = await api.submitRoomBooking({
          fullName: name,
          phone,
          checkInDate: date || new Date().toISOString().split("T")[0],
          checkOutDate: date || new Date().toISOString().split("T")[0],
          numberOfRooms: initialRooms || 1,
          numberOfGuests: initialGuests || 2,
          roomType: itemTitle,
          language,
        });
        setReferenceId(res.referenceId || "MHK-ROOM");
        setWhatsappUrl(res.whatsappUrl || "");
      } else {
        const res = await api.submitHallBooking({
          fullName: name,
          phone,
          hallType: itemTitle,
          eventDate: date || new Date().toISOString().split("T")[0],
          estimatedGuests: extra || "300+",
          language,
        });
        setReferenceId(res.referenceId || "MHK-HALL");
        setWhatsappUrl(res.whatsappUrl || "");
      }
      setSubmitted(true);
    } catch {
      // Fallback in case of network issue
      setReferenceId(`MHK-${kind.toUpperCase()}-LOCAL`);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (showPaymentVerification) {
    return (
      <PaymentVerification
        linkedType={isPooja ? "pooja" : "donation"}
        referenceId={referenceId}
        itemTitle={itemTitle}
        defaultAmount={parseFloat(amount) || (isPooja ? 351 : 501)}
        devoteeName={name}
        phone={phone}
        onClose={onClose}
      />
    );
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-testid={`${kind}-modal-backdrop`}
    >
      <div
        className="inquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        data-testid={`${kind}-modal`}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close form" data-testid={`${kind}-modal-close`}>
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <span className="modal-ornament">✦</span>
            <p className="eyebrow">{isDonation ? copy.donate : isPooja ? copy.bookPooja : copy.enquire}</p>
            <h2 id="inquiry-title" className="font-heading text-2xl font-semibold text-(--text)" data-testid={`${kind}-modal-title`}>
              {itemTitle}
            </h2>
            {itemSubtitle && <p className="mt-2 text-sm text-(--muted)">{itemSubtitle}</p>}

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit} data-testid={`${kind}-modal-form`}>
              <label className="form-label" htmlFor={`${kind}-name`}>
                {copy.name}
                <Input
                  id={`${kind}-name`}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={copy.name}
                  required
                  data-testid={`${kind}-form-name`}
                />
              </label>

              <label className="form-label" htmlFor={`${kind}-phone`}>
                {copy.phoneLabel}
                <Input
                  id={`${kind}-phone`}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+91 00000 00000"
                  inputMode="tel"
                  required
                  data-testid={`${kind}-form-phone`}
                />
              </label>

              {isDonation ? (
                <label className="form-label" htmlFor="donation-amount">
                  {copy.amount}
                  <Input
                    id="donation-amount"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="₹ 501"
                    inputMode="numeric"
                    required
                    data-testid="donation-form-amount"
                  />
                </label>
              ) : (
                <label className="form-label" htmlFor={`${kind}-date`}>
                  {copy.date}
                  <Input
                    id={`${kind}-date`}
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    data-testid={`${kind}-form-date`}
                  />
                </label>
              )}

              {isPooja ? (
                <label className="form-label" htmlFor="pooja-extra">
                  {copy.nakshatra} <span>({copy.optional})</span>
                  <Input
                    id="pooja-extra"
                    value={extra}
                    onChange={(event) => setExtra(event.target.value)}
                    placeholder="Ashwini / Kashyapa"
                    data-testid="pooja-form-nakshatra"
                  />
                </label>
              ) : (
                <label className="form-label" htmlFor={`${kind}-extra`}>
                  {kind === "hall"
                    ? language === "en"
                      ? "Number of guests"
                      : language === "kn"
                      ? "ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ"
                      : "अतिथियों की संख्या"
                    : language === "en"
                    ? "Additional details"
                    : language === "kn"
                    ? "ಹೆಚ್ಚುವರಿ ವಿವರಗಳು"
                    : "अतिरिक्त विवरण"}
                  <span>({copy.optional})</span>
                  <Input
                    id={`${kind}-extra`}
                    value={extra}
                    onChange={(event) => setExtra(event.target.value)}
                    placeholder={kind === "hall" ? "300" : "..."}
                    data-testid={`${kind}-form-extra`}
                  />
                </label>
              )}

              {error && (
                <p className="form-error" role="alert" data-testid={`${kind}-form-error`}>
                  {copy.required}
                </p>
              )}

              <div className="mt-2 flex gap-3">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1" data-testid={`${kind}-modal-cancel`}>
                  {copy.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="gold-button flex-1"
                  data-testid={isDonation ? "donation-modal-submit-btn" : isPooja ? "booking-modal-submit-btn" : `${kind}-modal-submit-btn`}
                >
                  {loading
                    ? "Submitting..."
                    : isDonation
                    ? copy.submitDonation
                    : isPooja
                    ? copy.submitBooking
                    : copy.sendMessage}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="success-state" data-testid={`${kind}-success`}>
            <div className="success-icon">✓</div>
            <p className="eyebrow">{copy.sacred}</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-(--text)">
              {isDonation ? copy.successDonation : isPooja ? copy.successBooking : copy.successEnquiry}
            </h2>

            {referenceId && (
              <div className="mt-3 inline-block px-3 py-1.5 rounded-lg border border-(--line) bg-(--card) text-xs font-mono text-(--gold)">
                Reference ID: <strong>{referenceId}</strong>
              </div>
            )}

            <p className="mt-3 text-sm leading-7 text-(--muted)">
              {copy.temple} · {copy.place}
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              {(isPooja || isDonation) && (
                <Button
                  type="button"
                  onClick={() => setShowPaymentVerification(true)}
                  className="gold-button w-full flex items-center justify-center gap-2"
                  data-testid="open-payment-btn"
                >
                  <QrCode size={16} />
                  {language === "en" ? "Pay via UPI QR & Upload Receipt" : language === "kn" ? "ಯುಪಿಐ ಮೂಲಕ ಪಾವತಿಸಿ ರಶೀದಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" : "यूपीआई से भुगतान करें एवं रसीद अपलोड करें"}
                </Button>
              )}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <MessageCircle size={16} />
                  {language === "en" ? "Connect on WhatsApp" : language === "kn" ? "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ದೃಢೀಕರಿಸಿ" : "व्हाट्सएप पर पुष्टि करें"}
                </a>
              )}

              <Button variant="outline" className="w-full" onClick={onClose} data-testid={`${kind}-success-close`}>
                {copy.cancel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}