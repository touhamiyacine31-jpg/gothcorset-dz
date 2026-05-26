/* ============================================================
   GothCorset DZ — root app
   Single-page router with internal state.
   ============================================================ */

const { useState, useEffect } = React;

function Nav({ route, onNav }) {
  const active = (r) => (route === r ? "page" : undefined);
  return (
    <nav className="nav" data-screen-label="Nav">
      <div className="nav__inner">
        <a className="nav__logo" onClick={() => onNav("home")}>
          GOTH<span>CORSET</span> DZ
        </a>
        <div className="nav__links">
          <a className="nav__link" aria-current={active("shop")}  onClick={() => onNav("shop")}>SHOP</a>
          <a className="nav__link" onClick={() => onNav("shop")}>CORSETS</a>
          <a className="nav__link" onClick={() => onNav("shop")}>ACCESSORIES</a>
          <a className="nav__link" aria-current={active("about")} onClick={() => onNav("about")}>ABOUT</a>
          <a className="nav__link" href="https://instagram.com/gothcorset__storedz" target="_blank" rel="noreferrer">CONTACT</a>
        </div>
        <a className="nav__cta" href="https://instagram.com/gothcorset__storedz" target="_blank" rel="noreferrer">
          DM TO ORDER <span className="dot" />
        </a>
      </div>
    </nav>
  );
}

function Footer({ onNav }) {
  return (
    <footer className="footer" data-screen-label="Footer">
      <ArchRow width={1600} archCount={16} height={84} color="#C9A96E" opacity={0.22} />
      <div className="footer__inner">
        <div>
          <div className="footer__brand-name">GOTH<span>CORSET</span> DZ</div>
          <div className="footer__tag">"Dark Fashion 4 Haunted Souls."</div>
          <p className="footer__desc">
            A small house of corsets, gothic rings and Y2K relics. Hand-cut in Algiers by Nana. Orders by Instagram DM, payment cash or CCP, delivery DZ-wide.
          </p>
        </div>
        <div>
          <h4>SHOP</h4>
          <ul>
            <li><a onClick={() => onNav("shop")}>All Wares</a></li>
            <li><a onClick={() => onNav("shop")}>Corsets</a></li>
            <li><a onClick={() => onNav("shop")}>Rings</a></li>
            <li><a onClick={() => onNav("shop")}>Y2K</a></li>
          </ul>
        </div>
        <div>
          <h4>ORDER</h4>
          <ul>
            <li>How to order</li>
            <li>Cash in hand</li>
            <li>CCP accepted</li>
            <li>Delivery — DZ-wide</li>
            <li>No returns · only hauntings</li>
          </ul>
        </div>
        <div>
          <h4>FOLLOW</h4>
          <ul>
            <li><a href="https://instagram.com/gothcorset__storedz" target="_blank" rel="noreferrer">@gothcorset__storedz</a></li>
            <li><a onClick={() => onNav("about")}>About Nana</a></li>
            <li>Lookbook (Soon)</li>
            <li>Newsletter (Never)</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© MMXXVI · ALGIERS · NO RETURNS, ONLY HAUNTINGS</span>
        <span>BUILT BY CANDLELIGHT</span>
      </div>
    </footer>
  );
}

function App() {
  const [route, setRoute] = useState("home");      // home | shop | product | about
  const [productId, setProductId] = useState(null);

  const nav = (r) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openProduct = (id) => {
    setProductId(id);
    setRoute("product");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // re-run reveal observer on route change
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    els.forEach(el => el.classList.remove("is-in"));
  }, [route, productId]);

  // ---- Red cursor glow + dot tracker
  useEffect(() => {
    const glow = document.querySelector(".cursor-glow");
    const dot  = document.querySelector(".cursor-dot");
    if (!glow || !dot) return;
    let x = window.innerWidth/2, y = window.innerHeight/2;
    let gx = x, gy = y;
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.left = x + "px"; dot.style.top = y + "px";
      glow.classList.add("is-on"); dot.classList.add("is-on");
      const t = e.target;
      const hot = t && (t.closest("a, button, .pcard, .filter-pill, .size-pill, .nav__link"));
      dot.classList.toggle("is-hot", !!hot);
    };
    const onLeave = () => { glow.classList.remove("is-on"); dot.classList.remove("is-on"); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    let raf;
    const loop = () => {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      glow.style.left = gx + "px"; glow.style.top = gy + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ---- Hero parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".hero__bg");
      if (!hero) return;
      const y = window.scrollY;
      hero.style.setProperty("--py", (y * 0.35) + "px");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [route]);

  let page;
  if (route === "home")    page = <HomePage onNav={nav} onOpenProduct={openProduct} />;
  else if (route === "shop")    page = <ShopPage onOpenProduct={openProduct} />;
  else if (route === "product") page = <ProductPage id={productId} onNav={nav} onOpenProduct={openProduct} />;
  else if (route === "about")   page = <AboutPage onNav={nav} />;
  else page = <HomePage onNav={nav} onOpenProduct={openProduct} />;

  return (
    <>
      <Nav route={route} onNav={nav} />
      {page}
      <Footer onNav={nav} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
