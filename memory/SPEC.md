# Mahakaleshwar Temple, Badami

## Product
Frontend-only bilingual temple website with English-first content, Kannada toggle, React-state day/night theme, placeholder devotional audio control, responsive navigation, and static inquiry forms.

## Key flows
- Visitors can browse Home, About, Timings, Poojas, Donations, Rooms, Marriage Halls, and Contact routes.
- Pooja, donation, room, and hall actions open validated modal forms with confirmation states. No submissions leave the browser.
- Contact form validates name, phone, and message, then shows a confirmation state.
- Theme and language are held in React state for the current session only; audio is a muted placeholder `<audio>` element.

## Data
Static in `frontend/src/lib/temple.ts`: four required poojas, four donation categories, two halls, temple copy, and five supplied image URLs. Backend and database are intentionally not used by the frontend MVP.

## Auth
None. No credentials or gated areas.