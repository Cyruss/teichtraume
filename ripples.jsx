// Realistic water ripples — concentric expanding wave rings with displacement,
// plus drifting surface caustics at the cursor.
// Exposes: window.initRipples()

(function () {
  let started = false;
  function initRipples() {
    if (started) return;
    started = true;
    const canvas = document.getElementById("ripple-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1);

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // A drop produces multiple expanding rings (capillary wave train),
    // each with own phase/amplitude — this breaks the "single clean circle" look.
    const drops = [];

    function addDrop(x, y, strength) {
      const t = performance.now();
      drops.push({
        x, y, born: t,
        strength,
        // ellipse skew so ripples aren't perfectly circular
        sx: 1 + (Math.random() - 0.5) * 0.12,
        sy: 1 + (Math.random() - 0.5) * 0.12,
        rot: Math.random() * Math.PI,
        // phase offsets for rings in the train
        offsets: [0, 0.22, 0.46, 0.72, 1.0],
      });
      if (drops.length > 28) drops.shift();
    }

    // Ripples fire only on click, for a calmer, intentional feel.
    window.addEventListener("pointerdown", (e) => {
      addDrop(e.clientX, e.clientY, 1.2);
      setTimeout(() => addDrop(e.clientX + (Math.random()-0.5)*8, e.clientY + (Math.random()-0.5)*8, 0.55), 80);
    });

    // Tiny surface-shimmer dots that follow the cursor (floating bits on water)
    const motes = [];

    function frame() {
      ctx.clearRect(0, 0, W, H);
      const now = performance.now();

      // Motes: subtle silvery specks drifting
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        const age = (now - m.born) / 1000;
        if (age > m.life) { motes.splice(i, 1); continue; }
        const k = age / m.life;
        m.x += m.vx; m.y += m.vy;
        m.vy += 0.002;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.1 * (1 - k), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,245,248,${0.6 * (1 - k)})`;
        ctx.fill();
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        const age = (now - d.born) / 1000;
        const life = 2.4;
        if (age > life) { drops.splice(i, 1); continue; }

        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rot);
        ctx.scale(d.sx, d.sy);

        // Draw a wave train — each ring is a phase of a decaying sinusoid
        d.offsets.forEach((off, idx) => {
          const t = age - off * 0.25;
          if (t <= 0) return;
          const k = t / (life - 0.2);
          if (k >= 1) return;
          const radius = 4 + t * (90 + d.strength * 40);
          // wave amplitude decays; outer rings fainter
          const amp = Math.sin(t * 10 - idx) * (1 - k);
          const alpha = Math.max(0, (1 - k) * (0.38 - idx * 0.06) * d.strength);
          if (alpha <= 0.01) return;

          // jittered ring — sample points around circle with perturbation
          ctx.beginPath();
          const steps = 64;
          for (let s = 0; s <= steps; s++) {
            const a = (s / steps) * Math.PI * 2;
            const jitter = Math.sin(a * 3 + t * 6 + idx * 1.3) * 0.6
                         + Math.cos(a * 7 - t * 4) * 0.35;
            const r = radius + jitter * (2 + amp * 1.5);
            const x = Math.cos(a) * r;
            const y = Math.sin(a) * r;
            if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.closePath();
          // Water-green outer ring
          ctx.lineWidth = 1.1 - idx * 0.15;
          ctx.strokeStyle = `rgba(45,74,62,${alpha})`;
          ctx.stroke();
          // Highlight inner edge — light specular
          ctx.lineWidth = 0.6;
          ctx.strokeStyle = `rgba(240,245,248,${alpha * 0.45})`;
          ctx.stroke();
        });

        // Central dark dip (where the drop hits)
        if (age < 0.35) {
          const p = 1 - age / 0.35;
          ctx.beginPath();
          ctx.arc(0, 0, 3 + p * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(13,13,13,${0.28 * p})`;
          ctx.fill();
          // crown highlight
          ctx.beginPath();
          ctx.arc(0, 0, 2 + p * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,245,248,${0.5 * p})`;
          ctx.fill();
        }

        ctx.restore();
      }

      requestAnimationFrame(frame);
    }
    frame();
  }

  window.initRipples = initRipples;
})();
