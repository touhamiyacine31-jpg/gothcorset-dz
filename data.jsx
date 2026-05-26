/* ============================================================
   GothCorset DZ — product data
   Real images sourced from @gothcorset__storedz Instagram.
   ============================================================ */

// Helper: returns a css background-image value for a local image.
function img(filename) {
  return `url("images/${filename}")`;
}

// Fallback dark placeholder for any missing image slot.
function ph(seed, hueA = "#2a1e1e", hueB = "#1a1212", accent = "rgba(139,0,0,0.18)") {
  const s = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 520'>
      <defs>
        <linearGradient id='g${seed}' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0' stop-color='${hueA}'/>
          <stop offset='1' stop-color='${hueB}'/>
        </linearGradient>
        <radialGradient id='r${seed}' cx='0.5' cy='0.55' r='0.55'>
          <stop offset='0' stop-color='${accent}'/>
          <stop offset='1' stop-color='rgba(0,0,0,0)'/>
        </radialGradient>
        <pattern id='p${seed}' width='8' height='8' patternUnits='userSpaceOnUse' patternTransform='rotate(${(seed*23)%180})'>
          <line x1='0' y1='0' x2='0' y2='8' stroke='rgba(232,224,208,0.04)' stroke-width='1'/>
        </pattern>
      </defs>
      <rect width='400' height='520' fill='url(#g${seed})'/>
      <rect width='400' height='520' fill='url(#p${seed})'/>
      <rect width='400' height='520' fill='url(#r${seed})'/>
    </svg>
  `.trim());
  return `url("data:image/svg+xml;utf8,${s}")`;
}

const PRODUCTS = [
  {
    id: "p1",
    name: "Velour Mortis Corset",
    cat: "CORSET",
    price: 5200,
    size: "S–XL",
    sizes: ["S","M","L","XL"],
    soldOut: false,
    badge: "NEW",
    img: img("ig_02.webp"),
    placeholder: "MODEL · CORSET · 35mm",
    desc: "Hand-laced velvet corset, steel-boned. Cut for the silhouette of a saint or a sinner — your call."
  },
  {
    id: "p2",
    name: "Crucis Signet",
    cat: "RING",
    price: 2500,
    size: "6–9",
    sizes: ["6","7","8","9"],
    soldOut: false,
    badge: "NEW",
    img: img("ig_01.webp"),
    placeholder: "RING · OXIDIZED BRASS",
    desc: "Heavy oxidized brass signet, engraved with a pointed cross. Tarnishes beautifully."
  },
  {
    id: "p3",
    name: "Y2K Slip in Ash",
    cat: "Y2K",
    price: 3400,
    size: "S–L",
    sizes: ["S","M","L"],
    soldOut: false,
    badge: "NEW",
    img: img("ig_08.webp"),
    placeholder: "SLIP DRESS · ASH GREY",
    desc: "Bias-cut satin slip with safety-pin straps. Wear it home from a funeral."
  },
  {
    id: "p4",
    name: "Madonna Lacquer Corset",
    cat: "CORSET",
    price: 4800,
    size: "S–L",
    sizes: ["S","M","L"],
    soldOut: false,
    badge: "NEW",
    img: img("ig_04.webp"),
    placeholder: "CORSET · LACQUER FINISH",
    desc: "Glossy black lacquer corset with cathedral-arch front panel. Reflects every candle."
  },
  {
    id: "p5",
    name: "Crescent Tear Ring",
    cat: "RING",
    price: 2800,
    size: "6–9",
    sizes: ["6","7","8","9"],
    soldOut: true,
    badge: "SOLD",
    img: img("ig_01.webp"),
    placeholder: "RING · CRESCENT",
    desc: "Crescent moon cradling a single garnet tear. One left in the studio — already claimed."
  },
  {
    id: "p6",
    name: "Reliquary Choker",
    cat: "Y2K",
    price: 2900,
    size: "OS",
    sizes: ["ONE"],
    soldOut: false,
    badge: "RESTOCK",
    img: img("ig_09.jpg"),
    placeholder: "CHOKER · CHAIN",
    desc: "Rusted chain choker with a tiny glass vial. Fill it with whatever you can't let go of."
  },
  {
    id: "p7",
    name: "Sangre Underbust",
    cat: "CORSET",
    price: 4400,
    size: "S–L",
    sizes: ["S","M","L"],
    soldOut: false,
    badge: "",
    img: img("ig_07.webp"),
    placeholder: "UNDERBUST · OXBLOOD",
    desc: "Oxblood waist-cincher in matte cotton sateen. Pairs with everything that already broke your heart."
  },
  {
    id: "p8",
    name: "Vespers Stack (Set of 3)",
    cat: "RING",
    price: 3200,
    size: "6–9",
    sizes: ["6","7","8","9"],
    soldOut: false,
    badge: "",
    img: img("ig_01.webp"),
    placeholder: "STACKING RINGS · TRIO",
    desc: "Three stacking bands — thorn, chain, smooth — wear all or one."
  },
  {
    id: "p9",
    name: "Patent Mini Slip",
    cat: "Y2K",
    price: 3900,
    size: "S–L",
    sizes: ["S","M","L"],
    soldOut: false,
    badge: "",
    img: img("ig_05.webp"),
    placeholder: "MINI SLIP · PATENT",
    desc: "Patent-look mini with a single safety pin closure. Y2K with last rites."
  },
  {
    id: "p10",
    name: "Nocturne Lace Corset",
    cat: "CORSET",
    price: 5000,
    size: "S–L",
    sizes: ["S","M","L"],
    soldOut: true,
    badge: "SOLD",
    img: img("ig_10.webp"),
    placeholder: "CORSET · BLACK LACE",
    desc: "Floral chantilly overlay on inky satin. Restocking next moon."
  },
  {
    id: "p11",
    name: "Iron Filigree Cross",
    cat: "RING",
    price: 2600,
    size: "6–9",
    sizes: ["6","7","8","9"],
    soldOut: false,
    badge: "",
    img: img("ig_06.webp"),
    placeholder: "RING · IRON CROSS",
    desc: "Iron filigree band with a small Maltese cross. Will leave a mark on pale skin."
  },
  {
    id: "p12",
    name: "Crypt Cami",
    cat: "Y2K",
    price: 2700,
    size: "S–L",
    sizes: ["S","M","L"],
    soldOut: false,
    badge: "",
    img: img("ig_11.webp"),
    placeholder: "CAMI · LACE TRIM",
    desc: "Silk cami with thin lace trim. Layer under a corset or wear alone — both correct."
  },
];

const COLLECTIONS = [
  {
    id: "c1", num: "01",
    name: "DARK ROMANCE",
    desc: "Velvet · Lace · Slow Hours",
    img: img("ig_03.webp"),
  },
  {
    id: "c2", num: "02",
    name: "ANGELIC",
    desc: "White Linen · Halo Light · Ruin",
    img: img("ig_13.webp"),
  },
  {
    id: "c3", num: "03",
    name: "VAMPIRE",
    desc: "Oxblood · Patent · Hunger",
    img: img("ig_14.webp"),
  },
];

const IG_GRID = [
  img("hero_bg.jpg"),
  img("ig_02.webp"),
  img("ig_03.webp"),
  img("editorial_01.jpg"),
  img("ig_05.webp"),
  img("ig_06.webp"),
  img("ig_07.webp"),
  img("editorial_02.jpg"),
  img("ig_09.jpg"),
  img("ig_10.webp"),
  img("ig_11.webp"),
  img("ig_12.webp"),
];

Object.assign(window, { PRODUCTS, COLLECTIONS, IG_GRID, ph, img });
