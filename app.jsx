// App shell for Teichträume

const HERO_IMAGES = {
  koi:     "assets/hero.jpeg",
  feeding: "assets/image4.jpeg",
  filter:  "assets/image1.jpeg",
  surface: "https://images.unsplash.com/photo-1533422902779-aff35862e462?w=2400&q=80",
  lily:    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=2400&q=80",
  stream:  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=2400&q=80",
};

const PALETTES = {
  sand: { bg: "#f3efe6", paper: "#ebe6da", ink: "#0d0d0d", ink2: "#2a2723", ink3: "#6a655c", koi: "#b9121b", pond: "#2d4a3e" },
  stone: { bg: "#ebeeec", paper: "#e1e4e2", ink: "#0a0f0d", ink2: "#20262a", ink3: "#5b6470", koi: "#b9121b", pond: "#2d4a3e" },
  ink:   { bg: "#0f1210", paper: "#171b19", ink: "#f0ece4", ink2: "#c5c1b8", ink3: "#807b72", koi: "#d4151e", pond: "#c9a558" },
  paper: { bg: "#ffffff", paper: "#f5f5f5", ink: "#0a0a0a", ink2: "#2a2a2a", ink3: "#757575", koi: "#b9121b", pond: "#2d4a3e" },
};

function applyPalette(name) {
  const p = PALETTES[name] || PALETTES.sand;
  const r = document.documentElement;
  r.style.setProperty("--bg", p.bg);
  r.style.setProperty("--paper", p.paper);
  r.style.setProperty("--ink", p.ink);
  r.style.setProperty("--ink-2", p.ink2);
  r.style.setProperty("--ink-3", p.ink3);
  r.style.setProperty("--koi", p.koi);
  r.style.setProperty("--pond", p.pond);
}

function App() {
  const [tweaks, setTweak] = useTweaks(
    /*EDITMODE-BEGIN*/{
      "palette": "sand",
      "heroImage": "koi",
      "showRipples": true
    }/*EDITMODE-END*/
  );

  React.useEffect(() => { applyPalette(tweaks.palette); }, [tweaks.palette]);
  React.useEffect(() => {
    if (tweaks.showRipples && window.initRipples) window.initRipples();
    const c = document.getElementById("ripple-canvas");
    if (c) c.style.display = tweaks.showRipples ? "block" : "none";
  }, [tweaks.showRipples]);

  // Reveal observer
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { rootMargin: "-5% 0px -10% 0px", threshold: 0.01 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const heroImg = HERO_IMAGES[tweaks.heroImage] || HERO_IMAGES.koi;

  return (
    <>
      <Nav />
      <Hero heroImage={heroImg} />
      <Marquee />
      <About />
      <Services />
      <Zubehoer />
      <Gallery />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio
          label="Theme"
          value={tweaks.palette}
          onChange={(v) => setTweak("palette", v)}
          options={[
            { value: "sand",  label: "Sand" },
            { value: "stone", label: "Stone" },
            { value: "ink",   label: "Ink" },
            { value: "paper", label: "Paper" },
          ]}
        />
        <TweakSection label="Hero" />
        <TweakRadio
          label="Image"
          value={tweaks.heroImage}
          onChange={(v) => setTweak("heroImage", v)}
          options={[
            { value: "koi",     label: "Koi-Pond" },
            { value: "feeding", label: "Fütterung" },
            { value: "filter",  label: "Technik" },
            { value: "surface", label: "Oberfläche" },
            { value: "lily",    label: "Seerose" },
            { value: "stream",  label: "Bachlauf" },
          ]}
        />
        <TweakSection label="Motion" />
        <TweakToggle label="Cursor ripples" value={tweaks.showRipples} onChange={(v) => setTweak("showRipples", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
