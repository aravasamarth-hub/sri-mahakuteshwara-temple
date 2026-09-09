"""Generates the Royal Chalukya vector ornament set used as CSS masks.
Run: python3 frontend/scripts/gen_ornaments.py  (writes into frontend/public/ornaments/)
"""
import math
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "ornaments")


def f(n):
    return f"{n:.1f}".rstrip("0").rstrip(".")


def spiral(a=78, b=-0.22, turns=2.35, steps=70):
    """Logarithmic spiral from radius `a` curling inward. Returns (path, samples)."""
    pts = []
    for i in range(steps + 1):
        t = turns * 2 * math.pi * i / steps
        r = a * math.exp(b * t)
        pts.append((r * math.cos(t), r * math.sin(t), t))
    d = "M" + " L".join(f"{f(x)} {f(y)}" for x, y, _ in pts)
    return d, pts


def rot_group(inner_id, out_id, angles):
    uses = "".join(f'<use href="#{inner_id}" transform="rotate({a})"/>' for a in angles)
    return f'<g id="{out_id}">{uses}</g>'


def flank(mirror: bool):
    W, H = 420, 1080
    sp, pts = spiral()
    # leaves along the spiral, pointing outward from the curve
    leaves = []
    for idx in (6, 16, 27, 40, 54):
        x, y, t = pts[idx]
        ang = math.degrees(t) + 90 + 20
        sc = 1.0 - idx / 120
        leaves.append(f'<use href="#leaf" transform="translate({f(x)} {f(y)}) rotate({f(ang)}) scale({f(sc)})"/>')
    x_end, y_end, _ = pts[-1]
    x0, y0, _ = pts[0]
    spray = f"""
    <g id="spray">
      <path d="{sp}" stroke-width="2.1"/>
      {''.join(leaves)}
      <use href="#dots" transform="translate({f(x_end)} {f(y_end)})"/>
      <use href="#flower" transform="translate({f(x0 + 46)} {f(y0 - 30)}) scale(.78)"/>
      <path d="M{f(x0)} {f(y0)}C{f(x0 + 30)} {f(y0 + 40)} {f(x0 + 70)} {f(y0 + 60)} {f(x0 + 120)} {f(y0 + 40)}" stroke-width="1.8"/>
      <use href="#leaf2" transform="translate({f(x0 + 60)} {f(y0 + 56)}) rotate(40)"/>
      <use href="#leaf2" transform="translate({f(x0 + 96)} {f(y0 + 52)}) rotate(-150)"/>
      <use href="#bud" transform="translate({f(x0 + 122)} {f(y0 + 40)}) rotate(70)"/>
    </g>"""

    placements = [
        (110, 130, -18, 1.0, False), (250, 265, 150, .78, True), (100, 430, 8, 1.06, False),
        (255, 585, 196, .74, True), (110, 745, -26, .98, False), (250, 895, 168, .8, True),
        (100, 1015, 14, .88, False),
    ]
    sprays = []
    for x, y, r, s, flip in placements:
        fl = " scale(-1 1)" if flip else ""
        sprays.append(f'<use href="#spray" transform="translate({x} {y}) rotate({r}) scale({s}){fl}"/>')

    flowers = [(318, 118, .62), (330, 700, .56), (172, 600, .5), (330, 400, .44), (300, 980, .5), (200, 880, .46)]
    flowers_s = "".join(f'<use href="#flower" transform="translate({x} {y}) scale({s})"/>' for x, y, s in flowers)
    paisleys = [(300, 330, -20, 1), (312, 850, 200, .9), (170, 320, 160, .8), (180, 680, 30, .85), (360, 560, -160, .7)]
    paisleys_s = "".join(f'<use href="#paisley" transform="translate({x} {y}) rotate({r}) scale({s})"/>' for x, y, r, s in paisleys)
    small = [(372, 220, .4), (378, 800, .38), (368, 1040, .36), (382, 470, .34)]
    small_s = "".join(f'<use href="#sflower" transform="translate({x} {y}) scale({s})"/>' for x, y, s in small)

    trunk = "M60 0C170 180 -30 360 90 540C210 720 -30 900 60 1080"
    body = f"""
  <path d="M7 0V{H}" stroke-width="2.4" stroke-dasharray="2 11"/>
  <path d="M15 0V{H}" stroke-width="1"/>
  <path d="{trunk}" stroke-width="2.6"/>
  <path d="{trunk}" stroke-width=".9" transform="translate(9 0)"/>
  {''.join(sprays)}
  {flowers_s}{paisleys_s}{small_s}"""
    if mirror:
        body = f'<g transform="matrix(-1 0 0 1 {W} 0)">{body}</g>'

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <defs>
    <g id="leaf"><path d="M0 0C12-16 34-20 54-6C34 10 12 12 0 0Z" fill="#000" fill-opacity=".26"/><path d="M5-1C18-6 32-8 46-5" stroke-width="1"/></g>
    <g id="leaf2"><path d="M0 0C8-10 22-12 36-4C22 6 8 8 0 0Z" fill="#000" fill-opacity=".3"/><path d="M4 0C12-4 22-5 30-3" stroke-width=".9"/></g>
    <path id="pet" d="M0-28C9-34 14-44 0-50C-14-44-9-34 0-28Z" fill="#000" fill-opacity=".34" stroke-width="1.1"/>
    {rot_group('pet', 'pet4', (0, 90, 180, 270))}
    {rot_group('pet4', 'pet12', (0, 30, 60))}
    <path id="ipet" d="M0-12C6-16 9-22 0-27C-9-22-6-16 0-12Z" fill="#000" fill-opacity=".55" stroke-width="1"/>
    {rot_group('ipet', 'ipet8', (0, 45, 90, 135, 180, 225, 270, 315))}
    <g id="flower"><circle r="53" stroke-width="1"/><use href="#pet12"/><circle r="29" stroke-width="1.3"/><use href="#ipet8"/><circle r="6" fill="#000" stroke="none"/></g>
    <path id="spet" d="M0-10C5-13 8-19 0-24C-8-19-5-13 0-10Z" fill="#000" fill-opacity=".5" stroke-width="1"/>
    {rot_group('spet', 'spet8', (0, 45, 90, 135, 180, 225, 270, 315))}
    <g id="sflower"><circle r="27" stroke-width="1"/><use href="#spet8"/><circle r="3.5" fill="#000" stroke="none"/></g>
    <g id="paisley">
      <path d="M0 0C22-6 38-30 28-50C22-66 2-70-6-56C-14-44-2-32 10-36" stroke-width="1.8"/>
      <path d="M0 0C-16-10-22-30-12-46C-8-52-2-56-6-56" stroke-width="1.8"/>
      <path d="M2-12C14-16 22-30 16-42" stroke-width="1"/>
      <circle cy="-22" r="2.6" fill="#000" stroke="none"/><circle cx="8" cy="-36" r="2" fill="#000" stroke="none"/>
    </g>
    <g id="bud"><path d="M0 0C-9-12-9-28 0-38C9-28 9-12 0 0Z" fill="#000" fill-opacity=".3"/><path d="M0-6V-30" stroke-width="1"/><path d="M-11-8C-5-16-4-26 0-38C4-26 5-16 11-8" stroke-width="1.2"/></g>
    <g id="dots" fill="#000" stroke="none"><circle r="3"/><circle cx="9" cy="7" r="2.4"/><circle cx="-9" cy="7" r="2.4"/><circle cy="12" r="2"/></g>
    {spray}
  </defs>
  {body}
</svg>
"""


def temple():
    W, H = 900, 300
    parts = []

    def arches(x1, x2, y, h=12, w=18, gap=8):
        segs = []
        x = x1 + 8
        while x + w <= x2 - 8:
            segs.append(f"M{x} {y}c{w/4:.0f}-{h} {w*3/4:.0f}-{h} {w} 0")
            x += w + gap
        return "".join(segs)

    def tier(cx, w, y_bottom, h, arch=True):
        x1, x2 = cx - w / 2, cx + w / 2
        y1 = y_bottom - h
        parts.append(f'<path d="M{f(x1)} {f(y_bottom)}V{f(y1)}H{f(x2)}V{f(y_bottom)}" stroke-width="1.8"/>')
        parts.append(f'<path d="M{f(x1 - 6)} {f(y1)}H{f(x2 + 6)}" stroke-width="2.2"/>')
        if arch and w > 40:
            parts.append(f'<path d="{arches(x1, x2, y_bottom - 6)}" stroke-width="1.1"/>')

    # platform + pillared base
    parts.append('<path d="M30 296H870M50 286H850M70 276H830" stroke-width="1.6"/>')
    parts.append('<path d="M110 246H790" stroke-width="1.6"/>')
    pillars = "".join(f"M{x} 246V276" for x in range(120, 790, 30))
    parts.append(f'<path d="{pillars}" stroke-width="1.4"/>')
    parts.append(f'<path d="{arches(110, 790, 270, 10, 22, 8)}" stroke-width="1"/>')

    # main vimana
    y = 246
    for w, h in ((260, 40), (220, 34), (184, 30), (150, 26), (118, 22), (88, 20)):
        tier(450, w, y, h)
        y -= h
    parts.append(f'<path d="M406 {y}C406 {y - 30} 494 {y - 30} 494 {y}Z" fill="#000" fill-opacity=".18" stroke-width="1.8"/>')
    parts.append(f'<path d="M450 {y - 28}V{y - 54}M441 {y - 40}H459M436 {y - 30}H464" stroke-width="1.8"/>')
    parts.append(f'<circle cx="450" cy="{y - 58}" r="4" fill="#000" stroke="none"/>')
    # entrance
    parts.append('<path d="M436 246V216C436 200 464 200 464 216V246M450 246V222" fill="#000" fill-opacity=".14" stroke-width="1.6"/>')
    # side shrines
    for cx in (190, 710):
        y = 246
        for w, h in ((92, 28), (68, 24), (46, 20)):
            tier(cx, w, y, h)
            y -= h
        parts.append(f'<path d="M{cx - 20} {y}C{cx - 20} {y - 18} {cx + 20} {y - 18} {cx + 20} {y}Z" fill="#000" fill-opacity=".18" stroke-width="1.6"/>')
        parts.append(f'<path d="M{cx} {y - 16}V{y - 34}M{cx - 6} {y - 24}H{cx + 6}" stroke-width="1.6"/>')
    # trees
    for cx, flip in ((70, 1), (830, -1)):
        parts.append(f'<path d="M{cx} 246V196M{cx} 214L{cx + 14 * flip} 200M{cx} 224L{cx - 12 * flip} 208" stroke-width="1.6"/>')
        for dx, dy, r in ((0, 176, 30), (-22 * flip, 194, 18), (24 * flip, 190, 20), (4 * flip, 152, 18), (-16 * flip, 160, 14)):
            parts.append(f'<circle cx="{cx + dx}" cy="{dy}" r="{r}" stroke-width="1.3"/>')
    # small flags on side shrines
    parts.append('<path d="M190 130l14 6-14 6M710 130l-14 6 14 6" stroke-width="1.2"/>')

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">
  {''.join(parts)}
</svg>
"""


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, content in (("flank-left.svg", flank(False)), ("flank-right.svg", flank(True)), ("temple-skyline.svg", temple())):
        with open(os.path.join(OUT, name), "w") as fh:
            fh.write(content)
        print("wrote", name, len(content))
