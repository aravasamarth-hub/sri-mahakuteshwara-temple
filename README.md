# 🛕 ಶ್ರೀ ಕ್ಷೇತ್ರ ಮಹಾಕೂಟೇಶ್ವರ ದೇವಾಲಯ, ಬಾದಾಮಿ
### Sri Mahakuteshwara Temple · Dakshina Kashi, Badami
#### श्री महाकूटेश्वर मंदिर · दक्षिण काशी, बादामी

A modern, responsive, trilingual devotional web platform for **Sri Kshetra Mahakuteshwara Temple** in Badami, Bagalkot district, Karnataka. Built with authentic temple photography, heritage design system, and full pilgrim seva services.

---

## 🌟 Key Features

- **Trilingual Accessibility**: Complete support for **Kannada (ಕನ್ನಡ)**, **English**, and **Hindi (हिंदी)** with instant language switcher.
- **29 Authentic Photographs**: Original high-resolution photography of the ancient Badami Chalukya shrines, holy Papavinasha Pushkarini stepwell, Garbhagriha Shiva Linga Darshan with full alankara, and the sacred banyan tree canopy.
- **Pilgrim Guest House & Rooms (ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ಪ್ರವಾಸಿ ನಿಲಯ)**: Room booking inquiries with interactive room photography preview (deluxe double rooms, garden rooms, single cots).
- **Poojas & Darshan Timings**: Complete daily schedule for morning abhisheka, archana, and evening maha mangalarathi.
- **Hundi & Annadhana Seva**: Devotee donations and seva contributions.
- **Marriage & Function Halls (ಕಲ್ಯಾಣ ಮಂಟಪ)**: Booking inquiries for large and medium kalyana mantapas.
- **Interactive Heritage Gallery**: 12-photo curated gallery with fullscreen lightbox modal.
- **Day & Night Themes**: Devotional theme switcher with ambient sacred audio chant.
- **SEO & Production Optimized**: Pre-configured Apache `.htaccess` rewrite rules for seamless routing.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS, Tailwind CSS, Lucide Icons
- **Typography**: Lora & Poppins (Latin & Devanagari)
- **Deployment**: Static SPA ready for Hostinger, Netlify, Vercel, or Apache/Nginx

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/aravasamarth-hub/sri-mahakuteshwara-temple.git

# Navigate to frontend
cd sri-mahakuteshwara-temple/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Open `http://localhost:3000` to view the website locally.

### Production Build
```bash
npm run build
```
The compiled production bundle is generated in `frontend/dist/`.

---

## 📁 Repository Layout

```text
frontend/
  ├── public/
  │   ├── images/
  │   │   ├── temple/       # 24 authentic Mahakuta temple photographs
  │   │   └── rooms/        # 5 Pravasi Nilaya & room interior photographs
  │   ├── mahakuta-entrance.jpg # Calibrated entrance hero photo
  │   └── .htaccess         # Apache SPA rewrite rules for Hostinger
  └── src/
      ├── components/       # Reusable layout, navigation, modals
      ├── lib/temple.ts     # Content, translations (KN/EN/HI), and data
      ├── pages/            # Home, About, Poojas, Rooms, Halls, Donations, Contact
      └── index.css         # Devotional design system and tokens
```

---

## 📜 License & Copyright
© Sri Mahakuteshwara Religious & Charitable Trust, Badami, Karnataka. All rights reserved.
