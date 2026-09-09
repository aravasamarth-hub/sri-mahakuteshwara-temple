# Mahakaleshwar Temple, Badami

## Product
Frontend-only bilingual temple website with English-first content, Kannada toggle, React-state day/night theme, uploaded devotional audio control, responsive navigation, and static inquiry forms. Its reusable Royal Chalukya ornament system is three vector masks in `frontend/public/ornaments/` (`corner-mandala.svg`, tiling `vine-edge.svg`, tiling `lotus-border.svg`) painted by a shared `::before` layer on `.section-pad`, `.page-hero`, `.hero-section` and `.temple-footer` via CSS `mask-image`. Colour and opacity come from `--ornament-ink` / `--ornament-opacity` (day #D4B06A at 25%, night #D4AF37 at 21%, footer gold at 22%); scale comes from `--orn-corner`, `--orn-vine`, `--orn-lotus` (clamped for desktop, reduced under 760px). Quarter mandalas sit in every section corner, vines run the left/right edges, lotus borders run top/bottom, and the centre stays clean for content.

## Key flows
- Visitors can browse Home, About, Timings, Poojas, Donations, Rooms, Marriage Halls, and Contact routes.
- Pooja, donation, room, and hall actions open validated modal forms with confirmation states. No submissions leave the browser.
- Contact form validates name, phone, and message, then shows a confirmation state.
- Theme, language, and audio playback are held in React state for the current session only; the uploaded devotional MP3 starts muted and can be played or paused from the shared control.

## Data
Static in `frontend/src/lib/temple.ts`: four required poojas without displayed pricing, four donation categories, two halls, temple copy, and five supplied image URLs. Backend and database are intentionally not used by the frontend MVP.

## Auth
None. No credentials or gated areas.