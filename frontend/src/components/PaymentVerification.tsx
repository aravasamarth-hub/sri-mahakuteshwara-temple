import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { Check, Copy, Upload, X, QrCode, Building, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTemple } from "@/components/TempleLayout";
import { api } from "@/services/api";

export interface PaymentVerificationProps {
  linkedType: "pooja" | "donation";
  referenceId: string;
  itemTitle: string;
  defaultAmount: number;
  devoteeName: string;
  phone: string;
  onClose: () => void;
  onSuccess?: () => void;
}

// Temple Trust Bank Information (Can be updated once official trust bank details are provided)
export const TEMPLE_BANK_DETAILS = {
  upiId: "mahakuta.temple@upi",
  accountName: "Sri Mahakuteshwara Temple Religious & Charitable Trust",
  accountNumber: "38920194820",
  ifscCode: "SBIN0000806",
  bankName: "State Bank of India",
  branch: "Badami Main Branch, Bagalkot",
};

export default function PaymentVerification({
  linkedType,
  referenceId,
  itemTitle,
  defaultAmount,
  devoteeName,
  phone,
  onClose,
  onSuccess,
}: PaymentVerificationProps) {
  const { language } = useTemple();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [amount, setAmount] = useState<string>(defaultAmount > 0 ? defaultAmount.toString() : "501");
  const [utrNumber, setUtrNumber] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMsg(
        language === "en"
          ? "Please upload your payment screenshot (JPG/PNG/PDF)."
          : language === "kn"
          ? "ದಯವಿಟ್ಟು ಪಾವತಿ ರಶೀದಿ / ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
          : "कृपया भुगतान का स्क्रीनशॉट अपलोड करें।"
      );
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("referenceId", referenceId);
      formData.append("linkedType", linkedType);
      formData.append("devoteeName", devoteeName);
      formData.append("phone", phone);
      formData.append("amount", amount);
      formData.append("utrNumber", utrNumber);
      formData.append("file", selectedFile);

      const res = await api.uploadPaymentVerification(formData);
      if (res.success) {
        setVerifiedSuccess(true);
        if (res.whatsappUrl) {
          setWhatsappUrl(res.whatsappUrl);
        }
        if (onSuccess) onSuccess();
      } else {
        setErrorMsg(res.message || "Failed to submit verification.");
      }
    } catch {
      setErrorMsg("Error submitting payment verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-testid="payment-verification-modal"
    >
      <div className="inquiry-modal max-w-lg" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close form">
          <X size={18} />
        </button>

        {!verifiedSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-(--gold) font-bold text-xs uppercase tracking-wider mb-1">
              <QrCode size={16} />
              <span>{language === "en" ? "UPI QR & Direct Bank Transfer" : language === "kn" ? "ಯುಪಿಐ ಕ್ಯೂಆರ್ ಹಾಗೂ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ" : "यूपीआई क्यूआर एवं बैंक अंतरण"}</span>
            </div>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-(--text)">
              {language === "en" ? "Submit Payment Verification" : language === "kn" ? "ಪಾವತಿ ಪರಿಶೀಲನೆ ಸಲ್ಲಿಸಿ" : "भुगतान सत्यापन प्रेषित करें"}
            </h2>

            <p className="mt-1 text-xs text-(--muted)">
              {language === "en"
                ? `For: ${itemTitle} · Ref ID: ${referenceId}`
                : language === "kn"
                ? `ಸೇವೆ: ${itemTitle} · ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ: ${referenceId}`
                : `सेवा: ${itemTitle} · संदर्भ संख्या: ${referenceId}`}
            </p>

            {/* QR Code and Bank Details Grid */}
            <div className="mt-4 p-4 rounded-xl border border-(--line) bg-(--card) grid sm:grid-cols-[140px_1fr] gap-4 items-center">
              {/* QR Code */}
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-stone-200">
                <svg
                  viewBox="0 0 100 100"
                  className="w-28 h-28 text-stone-900"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="10" y="10" width="30" height="30" fill="currentColor" />
                  <rect x="60" y="10" width="30" height="30" fill="currentColor" />
                  <rect x="10" y="60" width="30" height="30" fill="currentColor" />
                  <rect x="20" y="20" width="10" height="10" fill="white" />
                  <rect x="70" y="20" width="10" height="10" fill="white" />
                  <rect x="20" y="70" width="10" height="10" fill="white" />
                  <circle cx="50" cy="50" r="10" fill="#d4af37" />
                  <path d="M50 20v10M50 70v10M20 50h10M70 50h10M65 65h10v10h-10z" fill="currentColor" />
                </svg>
                <span className="text-[10px] font-bold text-stone-600 mt-1 uppercase tracking-tight">Scan with Any UPI</span>
              </div>

              {/* Bank Credentials with Copy Buttons */}
              <div className="text-xs space-y-1.5">
                <div className="flex items-center justify-between p-1.5 rounded bg-(--background) border border-(--line)">
                  <div>
                    <span className="text-[10px] text-(--muted) block">UPI ID</span>
                    <strong className="font-mono text-xs text-(--text)">{TEMPLE_BANK_DETAILS.upiId}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(TEMPLE_BANK_DETAILS.upiId, "upi")}
                    className="p-1 rounded text-(--gold) hover:bg-(--surface)"
                    title="Copy UPI ID"
                  >
                    {copiedKey === "upi" ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded bg-(--background) border border-(--line)">
                  <div>
                    <span className="text-[10px] text-(--muted) block">A/C No ({TEMPLE_BANK_DETAILS.bankName})</span>
                    <strong className="font-mono text-xs text-(--text)">{TEMPLE_BANK_DETAILS.accountNumber}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(TEMPLE_BANK_DETAILS.accountNumber, "acc")}
                    className="p-1 rounded text-(--gold) hover:bg-(--surface)"
                    title="Copy Account Number"
                  >
                    {copiedKey === "acc" ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded bg-(--background) border border-(--line)">
                  <div>
                    <span className="text-[10px] text-(--muted) block">IFSC Code</span>
                    <strong className="font-mono text-xs text-(--text)">{TEMPLE_BANK_DETAILS.ifscCode}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(TEMPLE_BANK_DETAILS.ifscCode, "ifsc")}
                    className="p-1 rounded text-(--gold) hover:bg-(--surface)"
                    title="Copy IFSC"
                  >
                    {copiedKey === "ifsc" ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-(--muted) block mb-1">
                    {language === "en" ? "Amount Paid (₹)" : language === "kn" ? "ಪಾವತಿಸಿದ ಮೊತ್ತ (₹)" : "भुगतान राशि (₹)"}
                  </label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-(--muted) block mb-1">
                    {language === "en" ? "UPI Ref / UTR No" : language === "kn" ? "ಯುಟಿಆರ್ ಸಂಖ್ಯೆ" : "यूटीआर संख्या"}
                  </label>
                  <Input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 423984729182"
                    className="text-sm font-mono"
                  />
                </div>
              </div>

              {/* Upload Screenshot Box */}
              <div>
                <label className="text-[11px] font-semibold text-(--muted) block mb-1">
                  {language === "en" ? "Upload Payment Screenshot *" : language === "kn" ? "ಪಾವತಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ *" : "भुगतान स्क्रीनशॉट अपलोड करें *"}
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-(--line) hover:border-(--gold) p-3.5 rounded-xl text-center cursor-pointer bg-(--surface-soft) transition-all"
                >
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-12 h-12 object-cover rounded border border-(--line)" />
                      ) : (
                        <Building size={24} className="text-(--gold)" />
                      )}
                      <div className="text-left">
                        <strong className="text-xs text-(--text) block line-clamp-1">{selectedFile.name}</strong>
                        <span className="text-[10px] text-(--muted)">{(selectedFile.size / 1024).toFixed(1)} KB · Click to change</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload size={20} className="mx-auto text-(--gold) mb-1" />
                      <span className="text-xs font-semibold text-(--text) block">
                        {language === "en" ? "Click to upload screenshot" : language === "kn" ? "ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ" : "स्क्रीनशॉट अपलोड करने के लिए क्लिक करें"}
                      </span>
                      <span className="text-[10px] text-(--muted)">JPG, PNG, or PDF up to 10MB</span>
                    </div>
                  )}
                </div>
              </div>

              {errorMsg && <p className="text-xs text-red-600 mt-1 font-medium">{errorMsg}</p>}

              <div className="mt-4 flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  {language === "en" ? "Cancel" : language === "kn" ? "ರದ್ದುಮಾಡಿ" : "रद्द करें"}
                </Button>
                <Button type="submit" disabled={loading} className="gold-button flex-1">
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      {language === "en" ? "Submit for Verification" : language === "kn" ? "ಪರಿಶೀಲನೆಗೆ ಸಲ್ಲಿಸಿ" : "सत्यापन हेतु भेजें"}
                      <ArrowRight size={14} className="ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          /* Verification Submitted Success Screen */
          <div className="success-state py-4">
            <div className="success-icon">✓</div>
            <p className="eyebrow mt-2">॥ Om Namah Shivaya ॥</p>
            <h2 className="mt-1 font-heading text-2xl font-semibold text-(--text)">
              {language === "en"
                ? "Payment Submitted for Verification"
                : language === "kn"
                ? "ಪಾವತಿ ಪರಿಶೀಲನೆಗೆ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ"
                : "भुगतान सत्यापन हेतु सफलतापूर्वक प्रेषित"}
            </h2>

            <div className="my-4 p-3 rounded-xl border border-(--line) bg-(--card) text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-(--muted)">Reference ID:</span>
                <strong className="font-mono text-(--gold)">{referenceId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-(--muted)">Devotee Name:</span>
                <span className="text-(--text) font-medium">{devoteeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-(--muted)">Amount:</span>
                <strong className="text-(--text)">₹{amount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-(--muted)">Status:</span>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  Pending Verification
                </span>
              </div>
            </div>

            <p className="text-xs text-(--muted) leading-relaxed">
              {language === "en"
                ? "The temple administration will review your receipt and verify your seva. You will receive an acknowledgement once approved."
                : language === "kn"
                ? "ದೇವಾಲಯದ ಆಡಳಿತ ಮಂಡಳಿಯು ರಶೀದಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ನಿಮ್ಮ ಸೇವೆಯನ್ನು ದೃಢೀಕರಿಸುತ್ತದೆ."
                : "मंदिर प्रशासन द्वारा रसीद का सत्यापन कर सेवा की पुष्टि की जाएगी।"}
            </p>

            <div className="mt-5 space-y-2">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <MessageCircle size={16} />
                  {language === "en" ? "Send Details via WhatsApp" : language === "kn" ? "ವಾಟ್ಸಾಪ್ ಮೂಲಕ ವಿವರ ಕಳುಹಿಸಿ" : "व्हाट्सएप पर विवरण भेजें"}
                </a>
              )}

              <Button className="gold-button w-full" onClick={onClose}>
                {language === "en" ? "Close" : language === "kn" ? "ಮುಕ್ತಾಯ" : "बंद करें"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
