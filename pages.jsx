/* ============================================================
   GothCorset DZ — page components
   Pages: Home / Shop / Product / About
   ============================================================ */

const { useState, useEffect, useMemo, useRef } = React;

// Letter-by-letter wrapper. Splits text into spans for stagger animation.
function SplitText({ text, base = 0, step = 0.04, className = "hero__char" }) {
  const chars = Array.from(text);
  return (
    <span className="hero__title-line">
      {chars.map((c, i) => (
        <span key={i}
              className={className}
              style={{ animationDelay: (base + i * step) + "s" }}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

// Marquee ticker — endlessly scrolling gothic motto strip.
function Marquee() {
  const items = [
    {t: "DARK FASHION", em: true},
    {t: "FOR HAUNTED SOULS"},
    {t: "INSTAGRAM DM ONLY"},
    {t: "ALGIERS · DZ", em: true},
    {t: "NO RETURNS · ONLY HAUNTINGS"},
    {t: "CASH · CCP"},
    {t: "EST · MMXXIV", em: true},
  ];
  const group = (k) => (
    <div className="marquee__item" key={k}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span>{it.em ? <em>{it.t}</em> : it.t}</span>
          <span className="marquee__sep" />
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {group("a")}
        {group("b")}
      </div>
    </div>
  );
}

// Hook: scroll-reveal — adds .is-in to any [data-reveal] when visible
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// ---- shared product card ----------------------------------------
function ProductCard({ p, onClick }) {
  return (
    <article className={`pcard ${p.soldOut ? "is-sold" : ""}`} onClick={onClick} data-reveal>
      <div className="pcard__img">
        <div className="pcard__img-inner" style={{ backgroundImage: p.img }} />
        <span className="pcard__placeholder-label">{p.placeholder}</span>
        {p.badge && !p.soldOut && <span className="pcard__badge">{p.badge}</span>}
        <span className="pcard__tag">{p.cat}</span>
        {p.soldOut && (
          <div className="pcard__stamp"><div className="pcard__stamp-text">SOLD</div></div>
        )}
      </div>
      <div className="pcard__body">
        <span className="pcard__name">{p.name}</span>
        <div className="pcard__meta">
          <span className="pcard__cat">SIZE {p.size}</span>
          <span className="pcard__price">{p.price.toLocaleString("fr-FR")} DA</span>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// HOMEPAGE
// ============================================================
function HomePage({ onNav, onOpenProduct }) {
  useScrollReveal();
  const arrivals = PRODUCTS.slice(0, 5);
  const featured = PRODUCTS[0];

  return (
    <main data-screen-label="Home">
      {/* ---- HERO ---- */}
      <section className="hero" data-screen-label="Home / Hero">
        <div className="hero__bg" aria-hidden="true" />
        <span className="hero__placeholder-label">HERO IMG · LOW-KEY EDITORIAL · 35mm</span>

        <div className="hero__corner tl" />
        <div className="hero__corner tr" />
        <div className="hero__corner bl" />
        <div className="hero__corner br" />

        <div className="hero__content">
          <div className="hero__sub flicker--slow">EST. <span className="glow-blood">MMXXIV</span> · ALGIERS · INSTAGRAM DM ONLY</div>
          <h1 className="hero__title">
            <SplitText text="DARK " base={0.2} step={0.06} />
            <em><SplitText text="FASHION" base={0.55} step={0.06} /></em>
          </h1>
          <div className="hero__title2">FOR HAUNTED SOULS</div>
          <a className="hero__cta glow-blood" onClick={() => onNav("shop")}>SHOP THE COLLECTION</a>
        </div>

        <div className="hero__scroll">SCROLL</div>
      </section>

      {/* ---- Marquee ticker ---- */}
      <Marquee />

      {/* ---- Chandelier ---- */}
      <ChandelierDivider />

      {/* ---- NEW ARRIVALS ---- */}
      <section className="section section--alt" data-screen-label="Home / New Arrivals">
        <div className="section__inner">
          <div className="section__head">
            <div>
              <div className="section__kicker">01 · NEW ARRIVALS</div>
              <h2 className="section__title">Freshly Risen</h2>
            </div>
            <div className="kbd-line">
              <span className="dim" style={{fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.28em",textTransform:"uppercase"}}>
                Updated · Lune Croissante
              </span>
              <a className="hero__cta" onClick={() => onNav("shop")} style={{margin:0,fontSize:11}}>VIEW ALL →</a>
            </div>
          </div>

          <div className="arrivals">
            {arrivals.map(p => <ProductCard key={p.id} p={p} onClick={() => onOpenProduct(p.id)} />)}
          </div>
        </div>
      </section>

      {/* ---- FEATURED PIECE ---- */}
      <section className="section" data-screen-label="Home / Featured" style={{position:"relative", overflow:"hidden"}}>
        <RoseWindow color="#8B0000" size={900} />
        <div className="section__inner" style={{position:"relative", zIndex: 2}}>
          <div className="section__head">
            <div>
              <div className="section__kicker">02 · THE FEATURED RELIC</div>
              <h2 className="section__title">House Piece</h2>
            </div>
          </div>

          <FeaturedPiece p={featured} onOpen={() => onOpenProduct(featured.id)} />
        </div>
      </section>

      {/* ---- COLLECTIONS ---- */}
      <section className="section section--alt" data-screen-label="Home / Collections">
        <div className="section__inner">
          <div className="section__head">
            <div>
              <div className="section__kicker">03 · THE DARK COLLECTIONS</div>
              <h2 className="section__title">Choose Your Haunting</h2>
            </div>
            <div className="dim" style={{maxWidth:"36ch", fontFamily:"var(--f-serif)", fontStyle:"italic", fontSize:18}}>
              Three moods, three wardrobes for the same dark girl.
            </div>
          </div>

          <div className="collections">
            {COLLECTIONS.map(c => (
              <a key={c.id} className="collection" data-reveal
                 onClick={() => onNav("shop")}
                 style={{ "--bg-img": c.img }}>
                <span className="collection__placeholder-label">EDITORIAL · {c.name}</span>
                <span className="collection__num">{c.num}</span>
                <h3 className="collection__name">{c.name}</h3>
                <div className="collection__desc">{c.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Bat wings divider ---- */}
      <BatWingsDivider />

      {/* manifesto strip */}
      <section className="section" data-screen-label="Home / Manifesto">
        <div className="section__inner" style={{textAlign:"center", maxWidth: 900, margin: "0 auto"}}>
          <div className="section__kicker" data-reveal>04 · MANIFESTO</div>
          <h2 className="section__title" style={{marginTop:18, fontSize:"clamp(40px, 5vw, 80px)"}} data-reveal>
            We dress the haunted.<br/>The lost. The <em style={{fontStyle:"normal", color:"var(--blood)"}}>beautifully dark.</em>
          </h2>
          <div className="dim" style={{marginTop:32, fontFamily:"var(--f-mono)", fontSize:12, letterSpacing:"0.3em", textTransform:"uppercase"}} data-reveal>
            Order via Instagram DM · Delivery DZ-wide · Cash or CCP
          </div>
          <a className="hero__cta" onClick={() => onNav("about")} style={{marginTop:36, display:"inline-block"}}>READ MORE →</a>
        </div>
      </section>
    </main>
  );
}

function FeaturedPiece({ p, onOpen }) {
  const [size, setSize] = useState(p.sizes[1] || p.sizes[0]);
  return (
    <div className="featured" data-reveal>
      <div className="featured__img">
        <div className="featured__img-inner" style={{ backgroundImage: p.img }} />
        <span className="featured__img-label">PRODUCT · {p.placeholder}</span>
      </div>
      <div className="featured__body">
        <div className="featured__kicker">{p.cat} · MADE BY HAND</div>
        <h3 className="featured__name">{p.name}</h3>
        <p className="featured__desc">{p.desc}</p>
        <div className="featured__price">{p.price.toLocaleString("fr-FR")} DA</div>

        <div>
          <div className="pdp__label">SELECT SIZE</div>
          <div className="size-row">
            {p.sizes.map(s => (
              <button key={s} className="size-pill"
                      aria-pressed={size === s}
                      onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>
        </div>

        <a className="btn-ig" href="https://instagram.com/gothcorset__storedz" target="_blank" rel="noreferrer">
          ORDER ON INSTAGRAM
        </a>
        <button className="hero__cta" style={{alignSelf:"flex-start", marginTop:-4}} onClick={onOpen}>VIEW DETAILS →</button>
      </div>
    </div>
  );
}

// ============================================================
// SHOP PAGE
// ============================================================
function ShopPage({ onOpenProduct }) {
  useScrollReveal();
  const [filter, setFilter] = useState("ALL");

  const cats = ["ALL", "CORSETS", "RINGS", "Y2K"];
  const filtered = useMemo(() => {
    if (filter === "ALL") return PRODUCTS;
    if (filter === "CORSETS") return PRODUCTS.filter(p => p.cat === "CORSET");
    if (filter === "RINGS")   return PRODUCTS.filter(p => p.cat === "RING");
    if (filter === "Y2K")     return PRODUCTS.filter(p => p.cat === "Y2K");
    return PRODUCTS;
  }, [filter]);

  const count = (cat) => {
    if (cat === "ALL") return PRODUCTS.length;
    if (cat === "CORSETS") return PRODUCTS.filter(p => p.cat === "CORSET").length;
    if (cat === "RINGS") return PRODUCTS.filter(p => p.cat === "RING").length;
    if (cat === "Y2K") return PRODUCTS.filter(p => p.cat === "Y2K").length;
  };

  return (
    <main data-screen-label="Shop">
      <header className="shop-head" data-reveal>
        <div className="shop-eyebrow">THE SHOP · {PRODUCTS.length} PIECES IN CRYPT</div>
        <h1 className="shop-title">All Wares</h1>
        <p className="shop-sub">Every piece is one of a few. Once sold, the next moon brings the restock — or doesn't.</p>
      </header>

      <div className="filter-row" data-reveal>
        {cats.map(c => (
          <button key={c} className="filter-pill"
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}>
            {c}<span className="count">{String(count(c)).padStart(2,"0")}</span>
          </button>
        ))}
        <div style={{flex:1}} />
        <span className="filter-pill" style={{pointerEvents:"none", color:"var(--muted)"}}>
          SORT · LATEST
        </span>
      </div>

      <div className="shop-grid">
        {filtered.map(p => <ProductCard key={p.id} p={p} onClick={() => onOpenProduct(p.id)} />)}
      </div>

      <ArchRow width={1600} archCount={14} height={80} />
    </main>
  );
}

// ============================================================
// PRODUCT DETAIL
// ============================================================
function ProductPage({ id, onNav, onOpenProduct }) {
  useScrollReveal();
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  const [size, setSize] = useState(p.sizes[Math.min(1, p.sizes.length - 1)]);
  const thumbs = useMemo(() => {
    // make alt thumbnails by re-seeding ph()
    return [p.img, ph(parseInt(p.id.slice(1)) + 100, "#241818", "#0e0808"), ph(parseInt(p.id.slice(1)) + 200, "#1e1818", "#0a0808"), ph(parseInt(p.id.slice(1)) + 300, "#2a1818", "#140a0a")];
  }, [p.id]);
  const [thumb, setThumb] = useState(0);

  useEffect(() => { setSize(p.sizes[Math.min(1, p.sizes.length - 1)]); setThumb(0); }, [p.id]);

  const related = PRODUCTS.filter(x => x.id !== p.id && x.cat === p.cat).slice(0, 3);
  const padRelated = [...related, ...PRODUCTS.filter(x => x.id !== p.id && !related.includes(x))].slice(0, 3);

  return (
    <main data-screen-label="Product detail">
      <div className="pdp__crumb">
        <a onClick={() => onNav("home")}>HOME</a> &nbsp;/&nbsp;
        <a onClick={() => onNav("shop")}>SHOP</a> &nbsp;/&nbsp;
        <span style={{color:"var(--text)"}}>{p.name.toUpperCase()}</span>
      </div>

      <section className="pdp" data-reveal>
        <div className="pdp__gallery">
          <div className="pdp__main-img">
            <div className="pdp__main-img-inner" style={{ backgroundImage: thumbs[thumb] }} />
            <span className="featured__img-label">PRODUCT · {p.placeholder}</span>
            {p.soldOut && (
              <div className="pcard__stamp"><div className="pcard__stamp-text">SOLD</div></div>
            )}
          </div>
          <div className="pdp__thumbs">
            {thumbs.map((t, i) => (
              <button key={i} className="pdp__thumb" aria-pressed={i === thumb} onClick={() => setThumb(i)}>
                <div className="pdp__thumb-inner" style={{ backgroundImage: t }} />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp__info">
          <div className="pdp__cat">{p.cat} · NO. {p.id.toUpperCase()}</div>
          <h1 className="pdp__name">{p.name}</h1>
          <div className="pdp__price">{p.price.toLocaleString("fr-FR")} DA</div>
          <p className="pdp__desc">{p.desc} {p.desc} Reads better in person — natural light kills the magic.</p>

          <div>
            <div className="pdp__label">SELECT SIZE — {p.size}</div>
            <div className="size-row">
              {p.sizes.map(s => (
                <button key={s} className="size-pill"
                        aria-pressed={size === s}
                        onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <a className="btn-ig btn-ig--full"
             href="https://instagram.com/gothcorset__storedz"
             target="_blank" rel="noreferrer"
             aria-disabled={p.soldOut}
             style={p.soldOut ? {opacity:0.55, pointerEvents:"none"} : null}>
            {p.soldOut ? "RESTOCK · DM TO RESERVE" : "ORDER VIA INSTAGRAM DM"}
          </a>

          <div className="pdp__paynote">
            <span>CASH IN HAND</span>
            <span>CCP ACCEPTED</span>
            <span>DELIVERY DZ-WIDE</span>
          </div>

          <div className="pdp__details">
            <div><b>MATERIAL</b> <span>{p.cat === "CORSET" ? "Cotton sateen · steel boning" : p.cat === "RING" ? "Oxidized brass · iron" : "Bias-cut satin · lace trim"}</span></div>
            <div><b>FIT</b> <span>{p.cat === "CORSET" ? "True to size — measure waist" : p.cat === "RING" ? "True to size · adjustable shank" : "Slim through hip · contact for measurements"}</span></div>
            <div><b>CARE</b> <span>Hand-wash cold · Hang to dry · Never the moon</span></div>
            <div><b>ORIGIN</b> <span>Crafted in Algiers, DZ</span></div>
          </div>
        </div>
      </section>

      <section className="related" data-reveal>
        <div className="related__head">
          <div className="section__kicker" style={{marginBottom:10}}>RELATED</div>
          <h2 className="related__title">You Might Also Haunt</h2>
        </div>
        <div className="related__grid">
          {padRelated.map(r => <ProductCard key={r.id} p={r} onClick={() => onOpenProduct(r.id)} />)}
        </div>
      </section>
    </main>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================
function AboutPage({ onNav }) {
  useScrollReveal();
  return (
    <main data-screen-label="About">
      <section className="about-hero" data-reveal>
        <div>
          <div className="about-hero__eyebrow">A LETTER FROM THE STUDIO</div>
          <h1 className="about-hero__title">A small house of <em>dark fashion</em>.</h1>
        </div>
        <div className="about-hero__quote">
          "I wanted clothes for the girls who light candles for fun. So I started cutting them."
          <div style={{fontFamily:"var(--f-mono)", fontSize:11, letterSpacing:"0.3em", marginTop:18, color:"var(--muted)"}}>
            — NANA · FOUNDER · ALGIERS
          </div>
        </div>
      </section>

      <section className="about-manifesto" data-reveal>
        <div className="about-manifesto__num">§ I — MANIFESTO</div>
        <div className="about-manifesto__body">
          <p>We dress the haunted. The lost. The beautifully dark. The girls who line their eyes before they line up groceries.</p>
          <p>Every piece is cut, fitted and finished by hand in a small studio in Algiers. Small batches. No restocks promised. Order via DM — we will measure you, take payment in cash or CCP, and send the parcel by courier across Algeria.</p>
          <p>This is not fast fashion. This is slow, candlelit work. Made for the few who already know the rules of black.</p>
        </div>
      </section>

      <ChandelierDivider />

      <section className="ig-grid-wrap" data-reveal>
        <div className="section__head">
          <div>
            <div className="section__kicker">@gothcorset__storedz</div>
            <h2 className="section__title">From the Crypt</h2>
          </div>
          <a className="hero__cta" href="https://instagram.com/gothcorset__storedz" target="_blank" rel="noreferrer">FOLLOW →</a>
        </div>
        <div className="ig-grid">
          {IG_GRID.map((src, i) => (
            <a key={i} className="ig-cell" style={{ "--bg-img": src }}>
              <span className="ig-cell__label">IG · {String(i+1).padStart(2,"0")}</span>
            </a>
          ))}
        </div>
      </section>

      <BatWingsDivider />

      <section className="contact-band" data-reveal>
        <div className="contact-band__kicker">CONTACT · INSTAGRAM DM ONLY</div>
        <h2 className="contact-band__title">Slide into the crypt.</h2>
        <a className="contact-band__handle" href="https://instagram.com/gothcorset__storedz" target="_blank" rel="noreferrer">
          @gothcorset__storedz
        </a>
        <div style={{marginTop:36, fontFamily:"var(--f-mono)", fontSize:11, letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)"}}>
          Replies within 24h · French / Arabic / English
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { HomePage, ShopPage, ProductPage, AboutPage, ProductCard });
