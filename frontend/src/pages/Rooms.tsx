import { useState } from "react";
import { ArrowRight, Building2, Check, Droplets, Home, Moon, ShowerHead, Sparkles, Wind } from "lucide-react";
import { roomImages } from "@/lib/temple";
import { useTemple } from "@/components/TempleLayout";
import InquiryDialog from "@/components/InquiryDialog";
import RoomCalendar from "@/components/RoomCalendar";

export default function Rooms() {
  const { copy, language } = useTemple();
  const [open, setOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ checkIn: string; rooms: number; guests: number } | null>(null);
  const [activePhoto, setActivePhoto] = useState<string>(roomImages.pravasiNilayaWide);

  const roomPhotos = [
    {
      src: roomImages.pravasiNilayaWide,
      titleEn: "Sri Mahakuteshwara Pravasi Nilaya",
      titleKn: "ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಪ್ರವಾಸಿ ನಿಲಯ",
      titleHi: "श्री महाकूटेश्वर प्रवासी निलय",
      subEn: "Main guest house building & paved courtyard",
      subKn: "ಮುಖ್ಯ ಯಾತ್ರಿ ನಿವಾಸ ಕಟ್ಟಡ ಮತ್ತು ಪ್ರಾಂಗಣ",
      subHi: "मुख्य यात्री निवास भवन एवं प्रांगण",
    },
    {
      src: roomImages.roomDoubleDeity,
      titleEn: "Deluxe Double Bedroom",
      titleKn: "ಡಬಲ್ ಬೆಡ್‌ರೂಮ್ ಕೊಠಡಿ",
      titleHi: "डबल बेडरूम कक्ष",
      subEn: "Clean double cots, ceiling fan, framed deity picture",
      subKn: "ಸ್ವಚ್ಛವಾದ ಜೋಡಿ ಹಾಸಿಗೆ, ಸೀಲಿಂಗ್ ಫ್ಯಾನ್, ದೇವರ ಭಾವಚಿತ್ರ",
      subHi: "स्वच्छ डबल बेड, पंखा, देव प्रतिमा",
    },
    {
      src: roomImages.roomDoubleFloral,
      titleEn: "Garden View Room",
      titleKn: "ತೋಟದ ಕಡೆ ಕಿಟಕಿ ಇರುವ ಕೊಠಡಿ",
      titleHi: "प्राकृतिक वातायन युक्त कक्ष",
      subEn: "Airy room with large window & tiled flooring",
      subKn: "ದೊಡ್ಡ ಕಿಟಕಿ ಹಾಗೂ ಸುಸಜ್ಜಿತ ಟೈಲ್ಸ್ ನೆಲಹಾಸು",
      subHi: "विशाल खिड़की एवं स्वच्छ फर्श",
    },
    {
      src: roomImages.roomSingle,
      titleEn: "Comfort Room",
      titleKn: "ಆರಾಮದಾಯಕ ಕೊಠಡಿ",
      titleHi: "सुविधाजनक विश्राम कक्ष",
      subEn: "Peaceful atmosphere with clean ventilation",
      subKn: "ಪ್ರಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು",
      subHi: "शांत वातावरण एवं उत्तम प्रकाश व्यवस्था",
    },
    {
      src: roomImages.pravasiNilayaEntrance,
      titleEn: "Guest House Entrance",
      titleKn: "ಪ್ರವಾಸಿ ನಿಲಯ ಪ್ರವೇಶ ದ್ವಾರ",
      titleHi: "प्रवासी निलय प्रवेश द्वार",
      subEn: "Gated entry stairs with security & reception",
      subKn: "ಮೆಟ್ಟಿಲುಗಳ ಪ್ರವೇಶ ದ್ವಾರ ಹಾಗೂ ಸ್ವಾಗತ ಕೌಂಟರ್",
      subHi: "सुरक्षित प्रवेश द्वार एवं स्वागत काउंटर",
    },
  ];

  const currentPhotoMeta = roomPhotos.find((p) => p.src === activePhoto) || roomPhotos[0];

  const facilities = [
    { icon: Sparkles, text: copy.facilities[0] },
    { icon: Sparkles, text: copy.facilities[1] },
    { icon: ShowerHead, text: copy.facilities[2] },
    { icon: Droplets, text: copy.facilities[3] },
    { icon: Check, text: copy.facilities[4] },
    { icon: Wind, text: language === "en" ? "Airy windows & ceiling fan" : language === "kn" ? "ಗಾಳಿ-ಬೆಳಕಿನ ಕಿಟಕಿಗಳು ಮತ್ತು ಫ್ಯಾನ್" : "हवादार खिड़कियाँ एवं पंखा" },
    { icon: Moon, text: language === "en" ? "Quiet night prayer surroundings" : language === "kn" ? "ಧ್ಯಾನ-ಶಾಂತಿಯ ಪರಿಸರ" : "शांत एवं ध्यानमग्न वातावरण" },
    { icon: Building2, text: language === "en" ? "Steps away from Pushkarini & Sanctum" : language === "kn" ? "ಪುಷ್ಕರಿಣಿ ಮತ್ತು ಗರ್ಭಗುಡಿಗೆ ಕೂಗಳತೆ ದೂರ" : "पुष्करिणी एवं गर्भगृह से अत्यंत निकट" },
  ];

  return (
    <div data-testid="rooms-page">
      <section className="page-hero compact" data-testid="rooms-hero">
        <div className="container-wide">
          <p className="eyebrow">
            {language === "en"
              ? "Pilgrim Stay · Sri Mahakuteshwara Pravasi Nilaya"
              : language === "kn"
              ? "ಭಕ್ತರ ವಸತಿ · ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಪ್ರವಾಸಿ ನಿಲಯ"
              : "भक्त निवास · श्री महाकूटेश्वर प्रवासी निलय"}
          </p>
          <h1 className="page-title" data-testid="rooms-title">
            {language === "en"
              ? "Pilgrim Guest House & Rooms"
              : language === "kn"
              ? "ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಪ್ರವಾಸಿ ನಿಲಯ (ಯಾತ್ರಿ ನಿವಾಸ)"
              : "श्री महाकूटेश्वर प्रवासी निलय (यात्री निवास)"}
          </h1>
          <p className="page-lede">{copy.roomsIntro}</p>
        </div>
      </section>

      <section className="section-pad warm-pattern" data-testid="rooms-content">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Authentic Guest House & Room Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-(--border) bg-(--surface-soft) shadow-md">
              <img
                className="w-full h-[380px] sm:h-[420px] object-cover transition-all duration-300"
                src={activePhoto}
                alt={currentPhotoMeta.titleEn}
                data-testid="room-image-main"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
                <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded bg-[#b8860b] text-white uppercase tracking-wider mb-1">
                  {language === "en" ? "Authentic Accommodation" : language === "kn" ? "ಅಧಿಕೃತ ಯಾತ್ರಿ ನಿವಾಸ" : "अधिकृत यात्री निवास"}
                </span>
                <h3 className="text-xl font-bold font-serif text-white">
                  {language === "en" ? currentPhotoMeta.titleEn : language === "kn" ? currentPhotoMeta.titleKn : currentPhotoMeta.titleHi}
                </h3>
                <p className="text-sm text-stone-200 mt-0.5">
                  {language === "en" ? currentPhotoMeta.subEn : language === "kn" ? currentPhotoMeta.subKn : currentPhotoMeta.subHi}
                </p>
              </div>
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-5 gap-2.5 mt-3.5" data-testid="room-gallery">
              {roomPhotos.map((photo, idx) => (
                <button
                  key={photo.src}
                  onClick={() => setActivePhoto(photo.src)}
                  className={`group relative h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activePhoto === photo.src
                      ? "border-(--gold) scale-105 shadow-md"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                  data-testid={idx === 1 ? "room-image-detail" : idx === 4 ? "room-image-gateway" : `room-thumb-${idx}`}
                >
                  <img src={photo.src} alt={photo.titleEn} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl border border-(--border) bg-(--surface-soft) text-xs text-(--muted) flex items-center gap-3">
              <Home size={18} className="text-(--gold) shrink-0" />
              <span>
                {language === "en"
                  ? "Located directly inside Sri Kshetra Mahakuta campus with quick walking access to the sanctum and Papavinasha holy water tank."
                  : language === "kn"
                  ? "ಶ್ರೀ ಕ್ಷೇತ್ರ ಮಹಾಕೂಟದ ಆವರಣದಲ್ಲೇ ಇರುವ ಪ್ರವಾಸಿ ನಿಲಯ, ಗರ್ಭಗುಡಿ ಹಾಗೂ ಪಾಪವಿನಾಶ ತೀರ್ಥಕ್ಕೆ ನಡೆದು ಹೋಗಬಹುದಾದ ದೂರದಲ್ಲಿದೆ."
                  : "श्री क्षेत्र महाकूट परिसर में स्थित, गर्भगृह एवं पापनाशिनी तीर्थ तक पैदल सुलभ पहुंच।"}
              </span>
            </div>
          </div>

          {/* Amenities and Booking Inquiry */}
          <div>
            <p className="eyebrow">{language === "en" ? "Stay with ease" : language === "kn" ? "ನೆಮ್ಮದಿಯ ವಾಸ" : "सुविधाजनक प्रवास"}</p>
            <h2 className="section-title">
              {language === "en"
                ? "Clean, Peaceful & Sacred Lodging"
                : language === "kn"
                ? "ಸ್ವಚ್ಛ, ಪ್ರಶಾಂತ ಹಾಗೂ ಪವಿತ್ರ ಯಾತ್ರಿ ನಿವಾಸ"
                : "स्वच्छ, शांत एवं पावन यात्री निवास"}
            </h2>

            <p className="body-copy mt-2 mb-6">
              {language === "en"
                ? "Sri Mahakuteshwara Pravasi Nilaya provides clean, quiet, and secure rooms for visiting pilgrims, families, and devotees participating in sacred ceremonies."
                : language === "kn"
                ? "ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಪ್ರವಾಸಿ ನಿಲಯವು ದರ್ಶನಕ್ಕೆ ಆಗಮಿಸುವ ಭಕ್ತಾದಿಗಳಿಗೆ, ಕುಟುಂಬಗಳಿಗೆ ಹಾಗೂ ಪೂಜಾ ಕೈಂಕರ್ಯಗಳಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳುವವರಿಗೆ ಶುಚಿಯಾದ, ಶಾಂತಿಯುತ ಕೊಠಡಿಗಳ ವ್ಯವಸ್ಥೆ ಒದಗಿಸುತ್ತದೆ."
                : "श्री महाकूटेश्वर प्रवासी निलय दर्शन हेतु आने वाले श्रद्धालुओं, परिवारों और अनुष्ठान कर्ताओं के लिए स्वच्छ, सुरक्षित एवं शांत विश्राम व्यवस्था उपलब्ध कराता है।"}
            </p>

            <div className="facility-list">
              {facilities.map(({ icon: Icon, text }) => (
                <div
                  className="facility-row"
                  key={text}
                  data-testid={`room-facility-${text.slice(0, 10).toLowerCase().replaceAll(" ", "-")}`}
                >
                  <span>
                    <Icon size={16} />
                  </span>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="button-gold" onClick={() => setOpen(true)} data-testid="room-enquire-btn">
                {copy.enquireRoom}
                <ArrowRight size={16} />
              </button>
              <span className="text-xs text-(--muted)">
                {language === "en"
                  ? "Direct booking assistance by temple reception"
                  : language === "kn"
                  ? "ದೇವಾಲಯದ ಕೌಂಟರ್ ಮೂಲಕ ನೇರ ಬುಕಿಂಗ್ ನೆರವು"
                  : "मंदिर काउंटर द्वारा सीधे बुकिंग सहायता"}
              </span>
            </div>
          </div>
        </div>

        {/* Live Room Availability Calendar */}
        <div className="container-wide mt-12">
          <RoomCalendar
            onSelectBooking={({ checkIn, rooms, guests }) => {
              setSelectedDates({ checkIn, rooms, guests });
              setOpen(true);
            }}
          />
        </div>
      </section>

      {open && (
        <InquiryDialog
          kind="room"
          itemTitle={language === "en" ? "Sri Mahakuteshwara Pravasi Nilaya" : copy.enquireRoom}
          itemSubtitle={copy.roomsIntro}
          initialDate={selectedDates?.checkIn}
          initialRooms={selectedDates?.rooms}
          initialGuests={selectedDates?.guests}
          onClose={() => {
            setOpen(false);
            setSelectedDates(null);
          }}
        />
      )}
    </div>
  );
}