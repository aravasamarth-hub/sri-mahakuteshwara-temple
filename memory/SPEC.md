# Mahakaleshwar Temple, Badami

## Product
Frontend-only bilingual temple website with English-first content, Kannada toggle, React-state day/night theme, uploaded devotional audio control, responsive navigation, and static inquiry forms. Its reusable CSS/SVG heritage system has four purpose-built assets: 1920×1080 day/night desktop ornaments and 1080×2340 day/night mobile ornaments. Day mode uses Chalukya sandstone parchment, low-opacity mandalas, engraved corner vines, lotus borders, temple and Pushkarini line art; night mode recolors the same visual language in charcoal, bronze and metallic gold.

## Key flows
- Visitors can browse Home, About, Timings, Poojas, Donations, Rooms, Marriage Halls, and Contact routes.
- Pooja, donation, room, and hall actions open validated modal forms with confirmation states. No submissions leave the browser.
- Contact form validates name, phone, and message, then shows a confirmation state.
- Theme, language, and audio playback are held in React state for the current session only; the uploaded devotional MP3 starts muted and can be played or paused from the shared control.

## Data
Static in `frontend/src/lib/temple.ts`: four required poojas without displayed pricing, four donation categories, two halls, temple copy, and five supplied image URLs. Backend and database are intentionally not used by the frontend MVP.

## Auth
None. No credentials or gated areas.