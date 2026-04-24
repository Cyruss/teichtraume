// Sections for Teichträume. Exports all to window.

const LOGO_SRC = "assets/logo.svg";

// --- Small primitives -------------------------------------------------------

function SectionLabel({ num, children }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 14, color: "var(--ink)" }}>
      <span className="mono" style={{ opacity: 0.5 }}>{num}</span>
      <span style={{ flex: 1, height: 1, background: "var(--ink)", opacity: 0.25, transform: "translateY(-3px)" }} />
      <span className="mono">{children}</span>
    </div>
  );
}

function Rule({ dark = false }) {
  return <div style={{ height: 1, background: dark ? "rgba(243,239,230,0.2)" : "rgba(13,13,13,0.2)" }} />;
}

function useReveal() {
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.01 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Simple koi illustration (SVG) used for hero swim + accents
function KoiSilhouette({ size = 120, color = "#b9121b", rotate = 0, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <g fill={color}>
        {/* body */}
        <path d="M30 100 C 40 65, 90 55, 130 72 C 160 85, 175 100, 160 122 C 145 142, 110 150, 80 140 C 55 132, 24 128, 30 100 Z" />
        {/* tail */}
        <path d="M158 100 C 180 78, 196 80, 194 96 C 196 110, 186 118, 168 112 Z" />
        <path d="M158 104 C 178 120, 196 124, 196 110 C 196 104, 188 104, 172 100 Z" fill={color} opacity=".85" />
        {/* top fin */}
        <path d="M95 74 C 100 55, 118 50, 124 64 C 120 72, 108 74, 95 74 Z" opacity=".9"/>
        {/* bottom fin */}
        <path d="M90 140 C 98 152, 116 154, 118 142 C 114 136, 100 136, 90 140 Z" opacity=".9"/>
      </g>
      {/* dapple spots (black like the logo's koi) */}
      <g fill="#0d0d0d" opacity=".9">
        <ellipse cx="78" cy="92" rx="10" ry="7" />
        <ellipse cx="110" cy="108" rx="14" ry="9" />
        <ellipse cx="138" cy="94" rx="8" ry="5.5" />
      </g>
      <circle cx="48" cy="96" r="2.8" fill="#0d0d0d" />
    </svg>
  );
}

// --- NAV --------------------------------------------------------------------

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  const links = [
    ["Start", "#hero"],
    ["Leidenschaft", "#about"],
    ["Leistungen", "#services"],
    ["Zubehör", "#zubehoer"],
    ["Projekte", "#gallery"],
    ["Journal", "#instagram"],
    ["Kontakt", "#contact"],
  ];
  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? "10px 32px" : "14px 32px",
          background: scrolled ? "rgba(243,239,230,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(1.1)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(1.1)" : "none",
          transition: "background .4s, backdrop-filter .4s, color .4s, border-color .4s",
          color: scrolled ? "var(--ink)" : "var(--bg)",
          borderBottom: scrolled ? "1px solid rgba(13,13,13,0.08)" : "1px solid transparent",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1600, margin: "0 auto" }}>
          <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                padding: 0,
                background: scrolled ? "transparent" : "rgba(243,239,230,0.92)",
                backdropFilter: scrolled ? "none" : "blur(6px)",
                WebkitBackdropFilter: scrolled ? "none" : "blur(6px)",
                borderRadius: 4,
                transition: "background .4s",
                lineHeight: 0,
                overflow: "hidden",
              }}
            >
              <img
                src={LOGO_SRC}
                alt="Teichträume"
                style={{ height: scrolled ? 60 : 64, width: "auto", display: "block", transition: "height .4s" }}
              />
            </div>
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {links.map(([t, h]) => (
              <a key={h} href={h} className="mono" style={{ opacity: 0.85, letterSpacing: "0.1em" }}>
                {t}
              </a>
            ))}
            <a
              href="#contact"
              className="mono"
              style={{
                padding: "10px 16px",
                border: "1px solid currentColor",
                borderRadius: 999,
                letterSpacing: "0.12em",
              }}
            >
              Anfrage
            </a>
          </nav>
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Menü öffnen"
            style={{ color: "inherit" }}
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.4"/></svg>
          </button>
        </div>
      </header>

      <div className={"mobile-menu" + (menuOpen ? " open" : "")}>
        <button className="close" onClick={() => setMenuOpen(false)} aria-label="Menü schließen">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4"/></svg>
        </button>
        <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 12 }}>Teichträume · Koi · seit 2022</div>
        {links.map(([t, h]) => (
          <a key={h} href={h} onClick={() => setMenuOpen(false)}>{t}</a>
        ))}
        <div style={{ marginTop: 40, display: "grid", gap: 10 }}>
          <a href="mailto:info@teichtraeume.de" className="mono" style={{ fontSize: 13 }}>info@teichtraeume.de</a>
          <a href="https://wa.me/4917621925412" className="mono" style={{ fontSize: 13 }}>+49 176 21925412</a>
          <a href="impressum.html" className="mono" style={{ fontSize: 13 }}>Impressum</a>
        </div>
      </div>
    </>
  );
}

// --- HERO -------------------------------------------------------------------

function Hero({ heroImage, showKoi = true }) {
  // Full-bleed koi pond hero, editorial type overlay.
  return (
    <section id="hero" data-screen-label="01 Hero" style={{ position: "relative", height: "100vh", minHeight: 720, overflow: "hidden", color: "var(--bg)" }}>
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7) saturate(0.95)",
          transform: "scale(1.03)",
        }}
      />
      {/* Dark gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.1) 35%, rgba(13,13,13,0.75) 100%)" }} />
      {/* subtle caustics overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.06), transparent 45%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.04), transparent 50%)",
        mixBlendMode: "screen",
      }} />

      {/* top meta row */}
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, padding: "0 32px", display: "flex", justifyContent: "space-between" }} className="mono">
        <span>N 50°42'43" · E 6°23'14"</span>
        <span>Hürtgenwald · NRW</span>
        <span>Edition MMXXVI</span>
      </div>

      {/* Big title */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 32px 80px" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto" }}>
          <div className="mono" style={{ opacity: 0.85, marginBottom: 36 }}>— Spezialisiert auf Koi</div>
          <h1 className="serif" style={{
            fontSize: "clamp(72px, 11.5vw, 192px)",
            lineHeight: 0.88,
            fontWeight: 300,
            letterSpacing: "-0.035em",
            textWrap: "balance",
          }}>
            Teiche mit<br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>Charakter</em>.
          </h1>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 40, alignItems: "end" }}>
            <p style={{ maxWidth: 420, fontSize: 17, lineHeight: 1.5, opacity: 0.92 }}>
              Seit 2022 planen, bauen und pflegen wir Koiteiche, die mehr sind
              als Wasserbecken — lebende Landschaften, maßgeschneidert für
              Ihre Fische und Ihren Garten.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <a href="#services" style={{ padding: "16px 24px", background: "var(--bg)", color: "var(--ink)", borderRadius: 999, fontSize: 14, fontWeight: 500, letterSpacing: "0.02em", display: "inline-flex", alignItems: "center", gap: 10 }}>
                Leistungen ansehen <span>→</span>
              </a>
              <a href="#contact" style={{ padding: "16px 22px", border: "1px solid currentColor", borderRadius: 999, fontSize: 14, letterSpacing: "0.02em" }}>
                Termin anfragen
              </a>
            </div>
            <div className="mono" style={{ justifySelf: "end", opacity: 0.75, textAlign: "right", lineHeight: 1.8 }}>
              Scrollen <br /> ↓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Swimming koi canvas over hero -----------------------------------------
function SwimmingKoi() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const fish = Array.from(el.querySelectorAll(".koi-fish"));
    const data = fish.map((f, i) => ({
      el: f,
      t: Math.random() * 10,
      speed: 0.18 + i * 0.07,
      yBase: parseFloat(f.dataset.y),
      amp: 4 + i * 2,
      dir: i % 2 === 0 ? 1 : -1,
      x0: i % 2 === 0 ? -20 : 120,
    }));
    function tick() {
      data.forEach((d) => {
        d.t += 0.004 * d.speed * 6;
        const prog = (d.t % 1);
        const x = d.dir === 1 ? d.x0 + prog * 140 : d.x0 - prog * 140;
        const y = d.yBase + Math.sin(d.t * 2.2) * d.amp;
        const rot = Math.sin(d.t * 2.2) * 8 * (d.dir === 1 ? 1 : -1);
        const flip = d.dir === 1 ? 1 : -1;
        d.el.style.transform = `translate(${x}vw, ${y}vh) rotate(${rot}deg) scaleX(${flip})`;
      });
      raf = requestAnimationFrame(tick);
    }
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div className="koi-fish" data-y="38" style={{ position: "absolute", top: 0, left: 0, opacity: 0.55 }}>
        <KoiSilhouette size={140} color="#c41823" />
      </div>
      <div className="koi-fish" data-y="62" style={{ position: "absolute", top: 0, left: 0, opacity: 0.38 }}>
        <KoiSilhouette size={90} color="#e8e0d0" />
      </div>
      <div className="koi-fish" data-y="78" style={{ position: "absolute", top: 0, left: 0, opacity: 0.5 }}>
        <KoiSilhouette size={110} color="#0d0d0d" />
      </div>
    </div>
  );
}

// --- MARQUEE ---------------------------------------------------------------
function Marquee() {
  const items = ["Planung", "Bau", "Filtertechnik", "Pflege", "Beratung", "Winterfest", "Koi-Gesundheit", "Teichbau"];
  const row = [...items, ...items, ...items];
  return (
    <div style={{ borderTop: "1px solid rgba(13,13,13,0.15)", borderBottom: "1px solid rgba(13,13,13,0.15)", padding: "22px 0", overflow: "hidden", background: "var(--bg)" }}>
      <div style={{ display: "flex", gap: 56, whiteSpace: "nowrap", animation: "marquee 40s linear infinite" }}>
        {row.map((t, i) => (
          <span key={i} className="serif" style={{ fontSize: 32, fontStyle: "italic", fontWeight: 300, display: "inline-flex", alignItems: "center", gap: 56 }}>
            {t}
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: "var(--koi)" }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}

// --- ABOUT -----------------------------------------------------------------
function About() {
  return (
    <section id="about" data-screen-label="02 Leidenschaft" style={{ padding: "140px 32px 120px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <SectionLabel num="02 — Leidenschaft">Über Teichträume</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, marginTop: 80, alignItems: "start" }}>
          <div className="reveal">
            <h2 className="serif" style={{ fontSize: "clamp(44px, 6vw, 92px)", lineHeight: 0.98, fontWeight: 300, letterSpacing: "-0.02em" }}>
              Ein Koiteich ist <em>kein Produkt</em>. Er ist eine Beziehung —
              zwischen Ihnen, dem Wasser und den Tieren, die darin leben.
            </h2>
            <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)" }}>
                Gegründet von <strong style={{ fontWeight: 500 }}>Tim Afflerbach</strong> in Hürtgenwald.
                Aus einer Kindheitsbegeisterung für Nishikigoi wurde ein Handwerk —
                und aus dem Handwerk ein Versprechen an jeden Teich, den wir planen.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)" }}>
                Wir arbeiten mit ausgewählten Partnern für Filter­technik, Folien
                und Koi-Importe. Kein Katalog­denken: jede Anlage entsteht für den
                jeweiligen Ort, die jeweiligen Fische, die jeweiligen Menschen.
              </p>
            </div>
          </div>
          <div className="reveal d2" style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#111" }}>
              <img src="assets/image4.jpeg"
                   alt="Koi" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
            <div className="mono" style={{ marginTop: 16, display: "flex", justifyContent: "space-between", color: "var(--ink-3)" }}>
              <span>Fig. 01 — Fütterung von Hand</span>
              <span>2024</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ marginTop: 120, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(13,13,13,0.18)" }}>
          {[
            ["2022", "Gegründet"],
            ["20+", "Realisierte Teiche"],
            ["04", "Handverlesene Partner"],
            ["∞", "Geduld mit Wasser"],
          ].map(([n, l], i) => (
            <div key={i} className="reveal" style={{ padding: "40px 24px 20px", borderRight: i < 3 ? "1px solid rgba(13,13,13,0.18)" : "none" }}>
              <div className="serif" style={{ fontSize: 72, lineHeight: 1, fontWeight: 300 }}>{n}</div>
              <div className="mono" style={{ marginTop: 14, color: "var(--ink-3)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- SERVICES ---------------------------------------------------------------
function Services() {
  const services = [
    {
      num: "I",
      title: "Planung",
      kicker: "Entwurf & Beratung",
      body: "Standortanalyse, Statik, Wasserführung, Koi-Besatz. Wir beginnen mit einem Ortstermin und einer ehrlichen Einschätzung — auch wenn sie Ihnen von Ihrem Wunsch abrät.",
      points: ["Ortstermin & Analyse", "Zeichnungen & 3D-Schnitte", "Material- und Kostenplan"],
      img: "assets/hero.jpeg",
    },
    {
      num: "II",
      title: "Bau",
      kicker: "Teichbau & Technik",
      body: "Aushub, Folie, Bodenabläufe, Filterkammern, Skimmer, Belüftung, UV. Bauzeit in der Regel 2–6 Wochen — abhängig von Größe, Boden und Technikpaket.",
      points: ["Aushub & Rohbau", "Filter & Pumpentechnik", "Bepflanzung & Randgestaltung"],
      img: "assets/image1.jpeg",
    },
    {
      num: "III",
      title: "Pflege",
      kicker: "Wartung & Koi-Gesundheit",
      body: "Monatliche, quartalsweise oder saisonale Betreuung. Wasserwerte, Filtermedien, Winterfestmachen, Koi-Check. Auch als Service für Bestandsteiche.",
      points: ["Wasserwerte & Protokoll", "Filterreinigung", "Koi-Gesundheitscheck"],
      img: "assets/image3.jpeg",
    },
  ];
  const [active, setActive] = React.useState(0);
  return (
    <section id="services" data-screen-label="03 Leistungen" style={{ padding: "140px 32px 120px", background: "var(--paper)", color: "var(--ink)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <SectionLabel num="03 — Leistungen">Planung, Bau, Pflege</SectionLabel>

        <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            {services.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "36px 0",
                  borderTop: "1px solid rgba(13,13,13,0.2)",
                  borderBottom: i === services.length - 1 ? "1px solid rgba(13,13,13,0.2)" : "none",
                  position: "relative",
                  color: active === i ? "var(--ink)" : "var(--ink-3)",
                  transition: "color .3s",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", alignItems: "baseline", gap: 24 }}>
                  <span className="serif" style={{ fontStyle: "italic", fontSize: 22, opacity: active === i ? 1 : 0.5 }}>{s.num}</span>
                  <div>
                    <div className="serif" style={{ fontSize: "clamp(36px, 4.4vw, 64px)", lineHeight: 1, fontWeight: 300, letterSpacing: "-0.02em" }}>
                      {s.title}
                    </div>
                    <div className="mono" style={{ marginTop: 10, opacity: 0.7 }}>{s.kicker}</div>
                  </div>
                  <span style={{
                    width: 44, height: 44, borderRadius: "50%",
                    border: "1px solid currentColor",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16,
                    background: active === i ? "var(--koi)" : "transparent",
                    color: active === i ? "var(--bg)" : "inherit",
                    borderColor: active === i ? "var(--koi)" : "currentColor",
                    transition: "all .3s",
                  }}>→</span>
                </div>
              </button>
            ))}
          </div>

          <div style={{ position: "sticky", top: 120 }}>
            <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", background: "#111" }}>
              {services.map((s, i) => (
                <img key={i} src={s.img} alt={s.title}
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                    opacity: active === i ? 1 : 0, transition: "opacity .6s",
                    transform: active === i ? "scale(1)" : "scale(1.03)",
                  }}/>
              ))}
              <div style={{ position: "absolute", left: 24, bottom: 24, right: 24, color: "var(--bg)" }}>
                <div className="mono" style={{ opacity: 0.8 }}>0{active + 1} / 03</div>
                <div className="serif" style={{ fontSize: 40, fontWeight: 300, marginTop: 6 }}>{services[active].title}</div>
              </div>
            </div>
            <div style={{ marginTop: 32 }}>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)" }}>{services[active].body}</p>
              <ul style={{ listStyle: "none", marginTop: 28, display: "grid", gap: 12 }}>
                {services[active].points.map((p) => (
                  <li key={p} style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 15 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--koi)" }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- ZUBEHÖR ----------------------------------------------------------------
function ZubehoerGlyph({ kind }) {
  // Editorial SVG diagrams — technical, on-theme, no AI-slop illustrations.
  const stroke = "var(--ink)";
  const accent = "var(--koi)";
  const common = { width: "100%", height: "100%", viewBox: "0 0 300 220", preserveAspectRatio: "xMidYMid meet" };
  if (kind === "filter") return (
    <svg {...common}>
      {/* Trommelfilter schematic */}
      <circle cx="150" cy="110" r="68" fill="none" stroke={stroke} strokeWidth="1.2"/>
      <circle cx="150" cy="110" r="48" fill="none" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 3"/>
      <circle cx="150" cy="110" r="4" fill={accent}/>
      <line x1="20" y1="110" x2="82" y2="110" stroke={stroke} strokeWidth="1.2"/>
      <line x1="218" y1="110" x2="280" y2="110" stroke={stroke} strokeWidth="1.2"/>
      <path d="M20 90 h60 v40 h-60" fill="none" stroke={stroke} strokeWidth="1.2"/>
      <path d="M220 90 h60 v40 h-60" fill="none" stroke={stroke} strokeWidth="1.2"/>
      <text x="22" y="80" fontSize="9" fontFamily="JetBrains Mono" fill={stroke}>INLET</text>
      <text x="240" y="80" fontSize="9" fontFamily="JetBrains Mono" fill={stroke}>OUTLET</text>
    </svg>
  );
  if (kind === "pump") return (
    <svg {...common}>
      {/* Impeller */}
      <circle cx="150" cy="110" r="56" fill="none" stroke={stroke} strokeWidth="1.2"/>
      {[0,60,120,180,240,300].map(a => (
        <path key={a} d={`M150 110 Q ${150 + Math.cos((a-20)*Math.PI/180)*30} ${110 + Math.sin((a-20)*Math.PI/180)*30} ${150 + Math.cos(a*Math.PI/180)*56} ${110 + Math.sin(a*Math.PI/180)*56}`} fill="none" stroke={stroke} strokeWidth="1.2"/>
        
      ))}
      <circle cx="150" cy="110" r="6" fill={accent}/>
      <path d="M 70 180 Q 150 160 230 180" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="3 3"/>
      <text x="100" y="200" fontSize="9" fontFamily="JetBrains Mono" fill={stroke} opacity=".6">Q = m³/h</text>
    </svg>
  );
  if (kind === "aer") return (
    <svg {...common}>
      {/* Belüftung — Ausströmer mit Blasen */}
      <rect x="130" y="160" width="40" height="14" fill={stroke}/>
      <line x1="150" y1="160" x2="150" y2="130" stroke={stroke} strokeWidth="1.2"/>
      {[...Array(14)].map((_, i) => {
        const x = 90 + (i % 7) * 20;
        const y = 110 - Math.floor(i / 7) * 36;
        const r = 3 + (i % 3);
        return <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={stroke} strokeWidth="1"/>;
      })}
      <circle cx="150" cy="40" r="5" fill={accent}/>
      <path d="M20 180 h260" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 4"/>
    </svg>
  );
  if (kind === "water") return (
    <svg {...common}>
      {/* Teststreifen / pH */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={60 + i*38} y="60" width="26" height="100" fill="none" stroke={stroke} strokeWidth="1.2"/>
      ))}
      <rect x="60" y="60" width="26" height="30" fill={accent} opacity=".85"/>
      <rect x="98" y="60" width="26" height="52" fill="var(--pond)" opacity=".7"/>
      <rect x="136" y="60" width="26" height="70" fill={stroke} opacity=".5"/>
      <rect x="174" y="60" width="26" height="88" fill={stroke} opacity=".7"/>
      <rect x="212" y="60" width="26" height="96" fill={stroke} opacity=".9"/>
      <text x="60" y="180" fontSize="9" fontFamily="JetBrains Mono" fill={stroke}>pH</text>
      <text x="98" y="180" fontSize="9" fontFamily="JetBrains Mono" fill={stroke}>KH</text>
      <text x="136" y="180" fontSize="9" fontFamily="JetBrains Mono" fill={stroke}>NO₂</text>
      <text x="174" y="180" fontSize="9" fontFamily="JetBrains Mono" fill={stroke}>NO₃</text>
      <text x="212" y="180" fontSize="9" fontFamily="JetBrains Mono" fill={stroke}>O₂</text>
    </svg>
  );
  if (kind === "food") return (
    <svg {...common}>
      {/* Schale mit Koifutter-Pellets */}
      <path d="M 70 110 Q 150 170 230 110" fill="none" stroke={stroke} strokeWidth="1.2"/>
      <path d="M 70 110 Q 150 90 230 110" fill="none" stroke={stroke} strokeWidth="1.2"/>
      {[
        [120, 102, 4], [140, 100, 5], [160, 104, 4], [180, 98, 5], [200, 104, 4],
        [130, 112, 5], [150, 114, 4], [170, 110, 5], [190, 112, 4],
      ].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={p[2]} fill={i % 3 === 0 ? accent : stroke}/>) }
      <text x="110" y="60" fontSize="10" fontFamily="JetBrains Mono" fill={stroke} opacity=".6">SOMMER · 3MM</text>
    </svg>
  );
  if (kind === "tools") return (
    <svg {...common}>
      {/* Kescher */}
      <circle cx="110" cy="90" r="42" fill="none" stroke={stroke} strokeWidth="1.2"/>
      <path d="M 110 90 m -42 0 l -30 30 l 20 20 l 30 -30" fill="none" stroke={stroke} strokeWidth="1.2"/>
      <line x1="80" y1="120" x2="260" y2="60" stroke={stroke} strokeWidth="2"/>
      {/* net pattern */}
      <g stroke={stroke} strokeWidth="0.5" opacity=".5">
        {[-30,-15,0,15,30].map(dx => <line key={dx} x1={110+dx} y1={50} x2={110+dx} y2={130}/>)}
        {[-30,-15,0,15,30].map(dy => <line key={dy} x1={70} y1={90+dy} x2={150} y2={90+dy}/>)}
      </g>
      <circle cx="260" cy="60" r="4" fill={accent}/>
    </svg>
  );
  return null;
}

function Zubehoer() {
  const items = [
    { t: "Filtertechnik",     c: "Trommelfilter · Biokammern · UV-C",         k: "filter" },
    { t: "Pumpen",            c: "Energiesparend · Frostgeschützt",            k: "pump" },
    { t: "Belüftung",         c: "Membrankompressoren · Ausströmer",           k: "aer" },
    { t: "Wasseraufbereitung",c: "Mineralien · Bakterien · Teststreifen",      k: "water" },
    { t: "Futter",            c: "Saison- & Aufzuchtfutter",                   k: "food" },
    { t: "Werkzeug & Kescher",c: "Koi-gerecht, schonend",                      k: "tools" },
  ];
  return (
    <section id="zubehoer" data-screen-label="04 Zubehör" style={{ padding: "140px 32px 120px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <SectionLabel num="04 — Zubehör">Aus der eigenen Praxis</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: 60, alignItems: "end", gap: 60 }}>
          <h2 className="serif" style={{ fontSize: "clamp(44px, 5.6vw, 84px)", lineHeight: 0.98, fontWeight: 300, letterSpacing: "-0.02em" }}>
            Die Technik verschwindet —<br />
            das <em>Wasser bleibt</em>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 480 }}>
            Wir führen nur Produkte, die wir selbst an unseren Anlagen betreiben
            und aus Erfahrung empfehlen können. Für Beratung und Verkauf besuchen
            Sie uns gern persönlich in Hürtgenwald.
          </p>
        </div>

        <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(13,13,13,0.2)", border: "1px solid rgba(13,13,13,0.2)" }}>
          {items.map((it, i) => (
            <article key={i} className="zubehoer-card" style={{ background: "var(--bg)", padding: "32px 28px", display: "flex", flexDirection: "column", gap: 24, minHeight: 360, position: "relative", overflow: "hidden", cursor: "pointer", transition: "background .3s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="mono" style={{ color: "var(--ink-3)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="mono" style={{ color: "var(--ink-3)" }}>Art.</span>
              </div>
              <div style={{ flex: 1, aspectRatio: "4/3", overflow: "hidden", background: "var(--paper)", border: "1px solid rgba(13,13,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
                <div className="zubehoer-img" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .6s" }}>
                  <ZubehoerGlyph kind={it.k} />
                </div>
              </div>
              <div>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, letterSpacing: "-0.01em" }}>{it.t}</h3>
                <p className="mono" style={{ marginTop: 8, color: "var(--ink-3)" }}>{it.c}</p>
              </div>
            </article>
          ))}
        </div>
        <style>{`.zubehoer-card:hover .zubehoer-img { transform: scale(1.05); }`}</style>
      </div>
    </section>
  );
}

// --- GALLERY ---------------------------------------------------------------
function Gallery() {
  const shots = [
    { cap: "Koiteich Hürtgenwald", meta: "Hauptanlage", img: "assets/hero.jpeg", big: true },
    { cap: "Filterkammer", meta: "Eigenbau, Edelstahl", img: "assets/image1.jpeg" },
    { cap: "Filterbürsten", meta: "Mechanische Stufe", img: "assets/image2.jpeg" },
    { cap: "Fütterung", meta: "Handzahme Koi", img: "assets/image4.jpeg", big: true },
    { cap: "Wartung Technikschacht", meta: "Winter 2025", img: "assets/image3.jpeg" },
  ];
  return (
    <section id="gallery" data-screen-label="05 Projekte" style={{ padding: "140px 32px 120px", background: "#0d0d0d", color: "var(--bg)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span className="mono" style={{ opacity: 0.55 }}>05 — Projekte</span>
          <span style={{ flex: 1, height: 1, background: "currentColor", opacity: 0.25 }} />
          <span className="mono">Galerie</span>
        </div>
        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <h2 className="serif" style={{ fontSize: "clamp(44px, 5.6vw, 84px)", lineHeight: 0.98, fontWeight: 300, letterSpacing: "-0.02em" }}>
            Eindrücke<br />
            aus <em>unserer Welt</em>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.75, maxWidth: 480, alignSelf: "end" }}>
            Jede Anlage ist eine kleine Geschichte: vom ersten Spatenstich
            bis zum ersten Koi, der durchs fertige Wasser gleitet. Ein Ausschnitt
            unserer Arbeit rund um Hürtgenwald.
          </p>
        </div>

        <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "220px", gap: 16 }}>
          {shots.map((s, i) => (
            <figure key={i} style={{
              gridColumn: s.big ? "span 2" : "span 1",
              gridRow: s.big ? "span 2" : "span 1",
              position: "relative", overflow: "hidden", background: "#222",
            }}>
              <img src={s.img} alt={s.cap} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .8s" }}
                   onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.06)"}
                   onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} />
              <figcaption style={{ position: "absolute", left: 16, bottom: 16, right: 16, display: "flex", justifyContent: "space-between", fontSize: 12 }} className="mono">
                <span>{s.cap}</span>
                <span style={{ opacity: 0.7 }}>{s.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- INSTAGRAM -------------------------------------------------------------
function Instagram() {
  const posts = [
    { t: "Fütterung",   img: "assets/image4.jpeg" },
    { t: "Filterbau",   img: "assets/image1.jpeg" },
    { t: "Filterbürsten", img: "assets/image2.jpeg" },
    { t: "Wartung",     img: "assets/image3.jpeg" },
    { t: "Koiteich",    img: "assets/hero.jpeg" },
  ];
  return (
    <section id="instagram" data-screen-label="06 Journal" style={{ padding: "120px 32px 100px", background: "var(--paper)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <SectionLabel num="06 — Journal">Instagram · @teichtraeume</SectionLabel>

        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 40, alignItems: "end" }}>
          <h2 className="serif" style={{ fontSize: "clamp(40px, 4.6vw, 64px)", lineHeight: 1, fontWeight: 300 }}>
            <em>Zwischendurch</em>, aus Hürtgenwald.
          </h2>
          <div />
          <a href="https://instagram.com/teichtraeume" className="mono" style={{ padding: "12px 18px", border: "1px solid currentColor", borderRadius: 999 }}>@teichtraeume ↗</a>
        </div>

        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {posts.map((p, i) => (
            <a key={i} href="https://instagram.com/teichtraeume" style={{ display: "block", aspectRatio: "1/1", overflow: "hidden", position: "relative", background: "#ddd" }}>
              <img src={p.img} alt={p.t} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.06)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}/>
              <div style={{ position: "absolute", left: 10, bottom: 10 }} className="mono">· {p.t}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CONTACT ---------------------------------------------------------------
function Contact() {
  return (
    <section id="contact" data-screen-label="07 Kontakt" style={{ padding: "140px 32px 100px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <SectionLabel num="07 — Kontakt">Ins Gespräch kommen</SectionLabel>
        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80 }}>
          <div>
            <h2 className="serif" style={{ fontSize: "clamp(56px, 7.5vw, 128px)", lineHeight: 0.95, fontWeight: 300, letterSpacing: "-0.03em" }}>
              Schreiben Sie uns —<br />
              <em>der Teich wartet.</em>
            </h2>
            <div style={{ marginTop: 56, display: "grid", gap: 2 }}>
              {[
                ["E-Mail", "info@teichtraeume.de", "mailto:info@teichtraeume.de"],
                ["WhatsApp", "+49 176 21925412", "https://wa.me/4917621925412"],
                ["Instagram", "@teichtraeume", "https://instagram.com/teichtraeume"],
              ].map(([k, v, h], i) => (
                <a key={i} href={h} className="contact-row" style={{
                  display: "grid", gridTemplateColumns: "160px 1fr auto", gap: 24, padding: "28px 0",
                  borderTop: "1px solid rgba(13,13,13,0.2)",
                  borderBottom: i === 2 ? "1px solid rgba(13,13,13,0.2)" : "none",
                  alignItems: "center",
                  transition: "color .25s, padding .25s",
                }}>
                  <span className="mono" style={{ color: "var(--ink-3)" }}>{k}</span>
                  <span className="serif" style={{ fontSize: 32, fontWeight: 400 }}>{v}</span>
                  <span style={{ fontSize: 22 }}>↗</span>
                </a>
              ))}
            </div>
            <style>{`.contact-row:hover { color: var(--koi); padding-left: 16px !important; }`}</style>
          </div>

          <aside>
            <div style={{ border: "1px solid rgba(13,13,13,0.2)", padding: 32, position: "sticky", top: 120 }}>
              <div className="mono" style={{ color: "var(--ink-3)" }}>Werkstatt & Besuch</div>
              <div className="serif" style={{ fontSize: 28, marginTop: 12, lineHeight: 1.2 }}>
                Teichträume<br />
                An der Wurzel 9<br />
                52393 Hürtgenwald
              </div>
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(13,13,13,0.18)", display: "grid", gap: 12 }} className="mono">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <span>Öffnungszeiten</span>
                  <span style={{ textAlign: "right" }}>Nach Vereinbarung</span>
                </div>
                <p style={{ marginTop: 4, lineHeight: 1.6, color: "var(--ink-3)", fontSize: 11, letterSpacing: "0.04em", textTransform: "none", fontFamily: "inherit" }}>
                  Wir nehmen uns Zeit für jedes Gespräch.<br />
                  Bitte rufen Sie vorher kurz an oder schreiben Sie.
                </p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=An+der+Wurzel+9+52393+H%C3%BCrtgenwald"
                target="_blank"
                rel="noopener"
                className="map-link"
                aria-label="Auf Google Maps öffnen"
                style={{ marginTop: 28, aspectRatio: "4/3", background: "var(--pond)", position: "relative", overflow: "hidden", display: "block", cursor: "pointer" }}
              >
                {/* Stylized map of Vossenack — based on actual Google Maps geometry */}
                <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }}>
                  <defs>
                    <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M20 0 L0 0 0 20" fill="none" stroke="rgba(243,239,230,0.04)" strokeWidth="1"/>
                    </pattern>
                    <pattern id="forest" width="9" height="9" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="rgba(243,239,230,0.10)"/>
                      <circle cx="6" cy="5" r="0.8" fill="rgba(243,239,230,0.08)"/>
                    </pattern>
                    <pattern id="field" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
                      <line x1="0" y1="0" x2="16" y2="0" stroke="rgba(243,239,230,0.08)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>

                  <rect width="400" height="300" fill="url(#mapgrid)" />

                  {/* Large fields to the east */}
                  <path d="M 260 110 L 400 100 L 400 300 L 240 300 Z" fill="url(#field)" opacity="0.9"/>
                  {/* field boundaries */}
                  <line x1="320" y1="108" x2="310" y2="300" stroke="rgba(243,239,230,0.12)" strokeWidth="0.6"/>
                  <line x1="260" y1="200" x2="400" y2="190" stroke="rgba(243,239,230,0.1)" strokeWidth="0.5"/>

                  {/* Fields to the west */}
                  <path d="M 0 0 L 70 5 L 85 80 L 70 180 L 0 200 Z" fill="url(#field)" opacity="0.5"/>
                  <path d="M 0 230 L 80 225 L 100 280 L 60 300 L 0 300 Z" fill="url(#field)" opacity="0.55"/>

                  {/* B399 / Germeter — main road running NE to SW diagonally */}
                  <path d="M 175 -10 L 162 50 L 148 110 L 130 180 L 105 260 L 85 310"
                        stroke="rgba(243,239,230,0.9)" strokeWidth="3.2" fill="none" strokeLinecap="round"/>
                  <path d="M 175 -10 L 162 50 L 148 110 L 130 180 L 105 260 L 85 310"
                        stroke="rgba(13,13,13,0.35)" strokeWidth="0.6" strokeDasharray="5 8" fill="none"/>

                  {/* B399 shield — place midway */}
                  <g transform="translate(115 240)">
                    <rect x="-11" y="-7" width="22" height="14" rx="2" fill="#f5d547" stroke="rgba(13,13,13,0.5)" strokeWidth="0.6"/>
                    <text x="0" y="3" textAnchor="middle" fill="#0d0d0d" fontSize="8" fontFamily="JetBrains Mono" fontWeight="700">B399</text>
                  </g>
                  {/* Germeter label on the B399 */}
                  <text x="156" y="80" fill="rgba(243,239,230,0.6)" fontSize="7" fontFamily="JetBrains Mono" letterSpacing="0.5" transform="rotate(73 156 80)">GERMETER</text>

                  {/* Pfarrer-Dickmann-Straße — branches east from B399, runs E */}
                  <path d="M 155 85 L 210 92 L 280 104 L 340 118 L 400 135"
                        stroke="rgba(243,239,230,0.75)" strokeWidth="2" fill="none"/>
                  <text x="230" y="88" fill="rgba(243,239,230,0.75)" fontSize="7.5" fontFamily="JetBrains Mono" letterSpacing="0.4" transform="rotate(8 230 88)">PFARRER-DICKMANN-STR.</text>

                  {/* An der Wurzel — branches SOUTH from Pfarrer-Dickmann, forms a loop back to B399 */}
                  {/* Northern segment: east branch at the top (where the pin sits) */}
                  <path d="M 240 100 L 260 115 L 275 125" stroke="rgba(243,239,230,0.6)" strokeWidth="1.5" fill="none"/>
                  {/* Main southward leg */}
                  <path d="M 240 100 L 232 140 L 220 190 L 200 230 L 175 265 L 148 285"
                        stroke="rgba(243,239,230,0.6)" strokeWidth="1.5" fill="none"/>
                  {/* reconnection back to B399 at the bottom */}
                  <path d="M 148 285 L 120 295" stroke="rgba(243,239,230,0.55)" strokeWidth="1.3" fill="none"/>

                  {/* An der Wurzel label — along the vertical section */}
                  <text x="228" y="175" fill="rgba(243,239,230,0.85)" fontSize="8.5" fontFamily="JetBrains Mono" letterSpacing="0.5" transform="rotate(72 228 175)">AN DER WURZEL</text>

                  {/* Zweifaller Weg — branches WEST from B399 near top */}
                  <path d="M 152 105 L 90 110 L 30 114" stroke="rgba(243,239,230,0.5)" strokeWidth="1.2" fill="none"/>
                  <text x="55" y="102" fill="rgba(243,239,230,0.55)" fontSize="7" fontFamily="JetBrains Mono">ZWEIFALLER WEG</text>

                  {/* Bus stop (C) — just west of pin on Pfarrer-Dickmann */}
                  <g transform="translate(232 108)">
                    <circle r="5" fill="rgba(80,80,80,0.7)" stroke="rgba(243,239,230,0.35)" strokeWidth="0.5"/>
                    <text x="0" y="2.5" textAnchor="middle" fill="rgba(243,239,230,0.9)" fontSize="6" fontFamily="JetBrains Mono" fontWeight="700">C</text>
                  </g>

                  {/* Building footprints — west side of B399 (dense village) */}
                  <g fill="rgba(243,239,230,0.20)">
                    <rect x="125" y="60" width="8" height="6"/>
                    <rect x="115" y="70" width="7" height="6"/>
                    <rect x="130" y="78" width="8" height="5"/>
                    <rect x="100" y="90" width="7" height="6"/>
                    <rect x="115" y="95" width="8" height="6"/>
                    <rect x="128" y="100" width="6" height="5"/>
                    <rect x="95" y="120" width="8" height="6"/>
                    <rect x="108" y="130" width="7" height="6"/>
                    <rect x="120" y="135" width="8" height="5"/>
                    <rect x="85" y="155" width="7" height="6"/>
                    <rect x="100" y="160" width="8" height="6"/>
                    <rect x="115" y="170" width="7" height="5"/>
                    <rect x="75" y="195" width="8" height="6"/>
                    <rect x="90" y="205" width="7" height="6"/>
                    <rect x="105" y="215" width="8" height="5"/>
                    <rect x="65" y="235" width="7" height="6"/>
                    <rect x="80" y="245" width="8" height="6"/>
                    <rect x="95" y="258" width="7" height="5"/>
                  </g>

                  {/* Building footprints — east side (between B399 and An der Wurzel, inc. workshop neighborhood) */}
                  <g fill="rgba(243,239,230,0.22)">
                    <rect x="175" y="105" width="8" height="6"/>
                    <rect x="190" y="112" width="7" height="6"/>
                    <rect x="205" y="118" width="8" height="5"/>
                    <rect x="218" y="122" width="7" height="6"/>
                    <rect x="245" y="118" width="8" height="6"/>
                    <rect x="258" y="125" width="7" height="6"/>
                    <rect x="235" y="138" width="8" height="6"/>
                    <rect x="248" y="142" width="7" height="5"/>
                    <rect x="180" y="150" width="7" height="6"/>
                    <rect x="195" y="155" width="8" height="6"/>
                    <rect x="210" y="160" width="7" height="5"/>
                    <rect x="218" y="170" width="8" height="6"/>
                    <rect x="195" y="195" width="7" height="6"/>
                    <rect x="210" y="210" width="8" height="6"/>
                    <rect x="185" y="225" width="7" height="5"/>
                    <rect x="200" y="238" width="8" height="6"/>
                  </g>

                  {/* Spielplatz An der Wurzel marker — small green dot */}
                  <g transform="translate(225 130)">
                    <circle r="3" fill="rgba(45,74,62,0.9)" stroke="rgba(243,239,230,0.5)" strokeWidth="0.6"/>
                  </g>

                  {/* Location pin — An der Wurzel 9, NE corner where An der Wurzel meets Pfarrer-Dickmann */}
                  <g transform="translate(262 118)">
                    <circle r="28" fill="rgba(185,18,27,0.14)">
                      <animate attributeName="r" values="22;34;22" dur="3.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.22;0.04;0.22" dur="3.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle r="12" fill="rgba(185,18,27,0.38)"/>
                    <circle r="5.5" fill="var(--koi)"/>
                    <circle r="1.8" fill="var(--bg)"/>
                  </g>

                  {/* Labels */}
                  <text x="14" y="20" fill="rgba(243,239,230,0.4)" fontSize="7.5" fontFamily="JetBrains Mono" letterSpacing="1.5">N 50°42'43"</text>
                  <text x="310" y="20" fill="rgba(243,239,230,0.4)" fontSize="7.5" fontFamily="JetBrains Mono" letterSpacing="1.5">E 6°23'14"</text>
                  <text x="16" y="268" fill="rgba(243,239,230,0.9)" fontSize="15" fontFamily="Fraunces" fontStyle="italic">Vossenack</text>
                  <text x="16" y="280" fill="rgba(243,239,230,0.5)" fontSize="7" fontFamily="JetBrains Mono" letterSpacing="1.5">HÜRTGENWALD · NRW</text>

                  {/* Compass rose */}
                  <g transform="translate(370 270)">
                    <circle r="13" fill="none" stroke="rgba(243,239,230,0.35)" strokeWidth="0.8"/>
                    <path d="M 0 -9 L 2 0 L 0 9 L -2 0 Z" fill="rgba(243,239,230,0.75)"/>
                    <text x="-3" y="-14" fill="rgba(243,239,230,0.55)" fontSize="7" fontFamily="JetBrains Mono">N</text>
                  </g>

                  {/* Scale bar */}
                  <g transform="translate(320 285)">
                    <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(243,239,230,0.5)" strokeWidth="1"/>
                    <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(243,239,230,0.5)" strokeWidth="1"/>
                    <line x1="40" y1="-3" x2="40" y2="3" stroke="rgba(243,239,230,0.5)" strokeWidth="1"/>
                    <text x="0" y="-6" fill="rgba(243,239,230,0.5)" fontSize="7" fontFamily="JetBrains Mono">0</text>
                    <text x="31" y="-6" fill="rgba(243,239,230,0.5)" fontSize="7" fontFamily="JetBrains Mono">100m</text>
                  </g>
                </svg>

                {/* Hover overlay */}
                <div className="map-cta">
                  <span className="mono">Auf Google Maps öffnen →</span>
                </div>
              </a>
              <style>{`
                .map-link { transition: transform .3s; }
                .map-link:hover { transform: translateY(-2px); }
                .map-cta {
                  position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-end;
                  padding: 16px; opacity: 0; transition: opacity .3s, background .3s;
                  background: linear-gradient(0deg, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0) 60%);
                  color: var(--bg);
                }
                .map-link:hover .map-cta { opacity: 1; }
              `}</style>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// --- FOOTER -----------------------------------------------------------------
function Footer() {
  return (
    <footer style={{ padding: "80px 32px 32px", background: "#0d0d0d", color: "#f3efe6", borderTop: "1px solid rgba(243,239,230,0.1)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ display: "inline-block", padding: "14px 20px", background: "var(--bg)", borderRadius: 6 }}>
              <img
                src={LOGO_SRC}
                alt="Teichträume"
                style={{ height: 110, width: "auto", display: "block" }}
              />
            </div>
            <p className="mono" style={{ marginTop: 18, opacity: 0.6 }}>seit 2022 · Hürtgenwald</p>
            <p style={{ marginTop: 22, fontSize: 14, lineHeight: 1.6, opacity: 0.7, maxWidth: 320 }}>
              Inhaber: Tim Afflerbach<br />
              An der Wurzel 9, 52393 Hürtgenwald
            </p>
          </div>
          <div>
            <div className="mono" style={{ opacity: 0.55 }}>Navigation</div>
            <ul style={{ listStyle: "none", marginTop: 16, display: "grid", gap: 10 }}>
              {[["Start","hero"],["Leidenschaft","about"],["Leistungen","services"],["Zubehör","zubehoer"],["Projekte","gallery"],["Kontakt","contact"]].map(([t,h]) => (
                <li key={h}><a href={`#${h}`} style={{ opacity: 0.85 }}>{t}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono" style={{ opacity: 0.55 }}>Kontakt</div>
            <ul style={{ listStyle: "none", marginTop: 16, display: "grid", gap: 10 }}>
              <li><a href="mailto:info@teichtraeume.de" style={{ opacity: 0.85 }}>info@teichtraeume.de</a></li>
              <li><a href="https://wa.me/4917621925412" style={{ opacity: 0.85 }}>+49 176 21925412</a></li>
              <li><a href="https://instagram.com/teichtraeume" style={{ opacity: 0.85 }}>@teichtraeume</a></li>
            </ul>
          </div>
          <div>
            <div className="mono" style={{ opacity: 0.55 }}>Rechtliches</div>
            <ul style={{ listStyle: "none", marginTop: 16, display: "grid", gap: 10 }}>
              <li><a href="impressum.html" style={{ opacity: 0.85 }}>Impressum</a></li>
              <li><a href="impressum.html#datenschutz" style={{ opacity: 0.85 }}>Datenschutz</a></li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 72, paddingTop: 24, borderTop: "1px solid rgba(243,239,230,0.15)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, opacity: 0.55 }} className="mono">
          <span>© 2026 Teichträume · Tim Afflerbach</span>
          <span>Hürtgenwald · Nordrhein-Westfalen</span>
          <span>Koi · Technik · Pflege</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, Marquee, About, Services, Zubehoer, Gallery, Instagram, Contact, Footer,
  KoiSilhouette, useReveal,
});
