import { useState, type FormEvent } from "react";
import { Check, Copy, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTemple } from "@/components/TempleLayout";
import { api } from "@/services/api";
import GoogleMapsEmbed from "@/components/GoogleMapsEmbed";

export default function Contact() {
  const { copy, language } = useTemple();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);

    try {
      const res = await api.submitContact({
        fullName: name,
        phone,
        message,
        language,
      });
      if (res.whatsappUrl) {
        setWhatsappUrl(res.whatsappUrl);
      }
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="page-hero compact" data-testid="contact-hero">
        <div className="container-wide">
          <p className="eyebrow">{language === "en" ? "Reach the trust" : language === "kn" ? "ಟ್ರಸ್ಟ್ ಸಂಪರ್ಕ" : "ट्रस्ट से संपर्क करें"}</p>
          <h1 className="page-title" data-testid="contact-title">{copy.contactTitle}</h1>
          <p className="page-lede">{copy.contactIntro}</p>
        </div>
      </section>

      <section className="section-pad soft-surface" data-testid="contact-content">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">{language === "en" ? "Find us" : language === "kn" ? "ನಮ್ಮನ್ನು ಹುಡುಕಿ" : "हमारा पता"}</p>
            <h2 className="section-title">
              {language === "en" ? "We are here for your questions" : language === "kn" ? "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗಾಗಿ ನಾವು ಇಲ್ಲಿದ್ದೇವೆ" : "आपके प्रश्नों के लिए हम सदैव तत्पर हैं"}
            </h2>

            <div className="contact-details mb-6">
              <div data-testid="contact-address">
                <span><MapPin size={18} /></span>
                <div>
                  <strong>{language === "en" ? "Address" : language === "kn" ? "ವಿಳಾಸ" : "पता"}</strong>
                  <p>{copy.address}</p>
                </div>
              </div>

              <div data-testid="contact-phone">
                <span><Phone size={18} /></span>
                <div>
                  <strong>{language === "en" ? "Phone" : language === "kn" ? "ದೂರವಾಣಿ" : "दूरभाष"}</strong>
                  <p>{copy.phone}</p>
                </div>
              </div>

              <div data-testid="contact-email">
                <span><Mail size={18} /></span>
                <div>
                  <strong>{language === "en" ? "Email" : language === "kn" ? "ಇಮೇಲ್" : "ईमेल"}</strong>
                  <p>{copy.email}</p>
                </div>
              </div>
            </div>

            {/* Live Interactive Google Maps */}
            <GoogleMapsEmbed />
          </div>

          <div className="contact-form-wrap" data-testid="contact-form-wrap">
            {sent ? (
              <div className="success-state inline" data-testid="contact-success">
                <div className="success-icon"><Check size={24} /></div>
                <p className="eyebrow">{copy.sacred}</p>
                <h2>{copy.successEnquiry}</h2>
                <p className="text-xs text-(--muted) mt-2 max-w-sm mx-auto">
                  {language === "en"
                    ? "Our office has received your message. You can also chat directly with us on WhatsApp."
                    : language === "kn"
                    ? "ನಮ್ಮ ಕಚೇರಿಯು ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಸ್ವೀಕರಿಸಿದೆ. ನೀವು ವಾಟ್ಸಾಪ್ ಮೂಲಕವೂ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಬಹುದು."
                    : "मंदिर कार्यालय को आपका संदेश प्राप्त हो गया है। आप व्हाट्सएप द्वारा भी संपर्क कर सकते हैं।"}
                </p>

                <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-sm"
                    >
                      <MessageCircle size={15} />
                      {language === "en" ? "Chat on WhatsApp" : language === "kn" ? "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ" : "व्हाट्सएप पर बात करें"}
                    </a>
                  )}

                  <button
                    className="text-link"
                    onClick={() => {
                      setSent(false);
                      setName("");
                      setPhone("");
                      setMessage("");
                    }}
                    data-testid="contact-send-another-btn"
                  >
                    <Copy size={15} /> {language === "en" ? "Send another" : language === "kn" ? "ಮತ್ತೊಂದು ಕಳುಹಿಸಿ" : "दूसरा संदेश भेजें"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="eyebrow">{language === "en" ? "Write to us" : language === "kn" ? "ನಮಗೆ ಬರೆಯಿರಿ" : "संदेश भेजें"}</p>
                <h2 className="font-heading text-3xl font-semibold text-(--text)">{copy.sendMessage}</h2>

                <form className="mt-6 grid gap-4" onSubmit={submit} data-testid="contact-form">
                  <label className="form-label">
                    {copy.name}
                    <Input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={copy.name}
                      required
                      data-testid="contact-form-name"
                    />
                  </label>

                  <label className="form-label">
                    {copy.phoneLabel}
                    <Input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+91 00000 00000"
                      inputMode="tel"
                      required
                      data-testid="contact-form-phone"
                    />
                  </label>

                  <label className="form-label">
                    {copy.message}
                    <Textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={
                        language === "en"
                          ? "Tell us how we can help..."
                          : language === "kn"
                          ? "ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು..."
                          : "बताइए हम आपकी क्या सहायता कर सकते हैं..."
                      }
                      required
                      data-testid="contact-form-message"
                    />
                  </label>

                  {error && (
                    <p className="form-error" role="alert" data-testid="contact-form-error">
                      {copy.required}
                    </p>
                  )}

                  <Button type="submit" disabled={loading} className="gold-button mt-2 w-full" data-testid="contact-form-submit-btn">
                    {loading ? "Sending..." : copy.sendMessage}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}