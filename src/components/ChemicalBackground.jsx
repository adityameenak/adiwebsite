import { useEffect, useRef } from 'react';

/**
 * ChemicalBackground — Silicon Crystal Lattice
 *
 * Visual reference: hexagonal close-packed crystal structure as seen in
 * atomic-resolution TEM imaging of 2D materials (graphene, h-BN, MoS₂).
 * A subset of nodes pulse as "highlighted atoms" in soft teal, referencing
 * the color signature of STEM-HAADF imaging and elemental maps.
 * Horizontal process-layer stripes reference semiconductor cross-section
 * schematics (oxide / metal / poly / substrate stacks).
 *
 * Design goals:
 * - Clearly inspired by materials science and microelectronics
 * - Calm, ordered, not random or chaotic
 * - Pale steel blue (crystal lattice) + soft teal (atom highlights)
 * - Readable dark slate background, not harsh black
 *
 * Performance:
 * - 20fps cap (~840 nodes, ~2500 bond segments)
 * - Bonds stored as flat index array (cache-friendly)
 * - Squared-distance check for bond building (no sqrt)
 * - Respects prefers-reduced-motion (static single frame)
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const HEX_SPACING    = 60;     // px between adjacent lattice nodes
const PARALLAX_SPEED = 0.04;   // fraction of scrollY applied to lattice Y
const FRAME_MS       = 1000 / 20; // 20fps cap
const TIME_STEP      = 0.005;  // pulse speed (full cycle ≈ 63s at 20fps)
const ATOM_FRAC      = 0.11;   // fraction of nodes drawn as highlighted atoms

// Steel blue — lattice nodes and bonds (RGB)
const C_LATTICE = [91, 155, 213];
// Soft teal — highlighted atom nodes (RGB)
const C_ATOM    = [78, 205, 196];

// ─── Lattice builder ──────────────────────────────────────────────────────────

/**
 * Generate a hexagonal lattice covering the given canvas dimensions.
 * Returns nodes and a flat bond index array (pairs [i, j, i, j, ...]).
 */
function buildLattice(w, h) {
  const s   = HEX_SPACING;
  const rowH = s * 0.866; // row height = s * sin(60°)
  const rows = Math.ceil(h / rowH) + 3;
  const cols = Math.ceil(w / s)   + 3;

  const nodes = [];
  for (let row = -1; row < rows; row++) {
    const offset = (row & 1) ? s / 2 : 0; // odd rows offset by half spacing
    for (let col = -1; col < cols; col++) {
      const isAtom = Math.random() < ATOM_FRAC;
      nodes.push({
        x:       col * s + offset,
        y:       row * rowH,
        isAtom,
        r:       isAtom ? 2.8 : 1.5,
        phase:   Math.random() * Math.PI * 2, // per-node phase for staggered pulse
        baseOp:  isAtom ? 0.40 : 0.16,
        amp:     isAtom ? 0.15 : 0.07,
      });
    }
  }

  // Build bonds: connect every pair of nodes within bond distance.
  // Using squared distance to avoid sqrt. Threshold = HEX_SPACING * 1.15.
  const bonds = [];
  const thresh2 = (s * 1.15) ** 2;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (dx * dx + dy * dy < thresh2) {
        bonds.push(i, j); // flat pair
      }
    }
  }

  return { nodes, bonds };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChemicalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const state = {
      nodes: [],
      bonds: [],
      scrollY: 0,
      time: 0,
      lastTime: 0,
      running: true,
      reducedMotion: false,
      raf: null,
    };

    // Reduced-motion detection
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.reducedMotion = mq.matches;
    const onMqChange = (e) => { state.reducedMotion = e.matches; };
    mq.addEventListener('change', onMqChange);

    // Resize — rebuild lattice to fill new canvas
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const built = buildLattice(canvas.width, canvas.height);
      state.nodes = built.nodes;
      state.bonds = built.bonds;
    };
    resize();
    window.addEventListener('resize', resize);

    // Scroll
    const onScroll = () => { state.scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Render loop ──────────────────────────────────────────────────────────
    const render = (timestamp) => {
      if (!state.running) return;
      state.raf = requestAnimationFrame(render);
      if (timestamp - state.lastTime < FRAME_MS) return;
      state.lastTime = timestamp;

      if (!state.reducedMotion) state.time += TIME_STEP;

      const { nodes, bonds, scrollY, time } = state;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Shift entire lattice upward as page scrolls (gentle parallax)
      ctx.save();
      ctx.translate(0, -scrollY * PARALLAX_SPEED);

      // Per-node current opacity (sinusoidal pulse, phase-staggered)
      const op = nodes.map((n) => n.baseOp + n.amp * Math.sin(time + n.phase));

      // ── Draw bond lines ──────────────────────────────────────────────────
      const [lr, lg, lb] = C_LATTICE;
      ctx.lineWidth = 0.5;
      for (let k = 0; k < bonds.length; k += 2) {
        const i = bonds[k];
        const j = bonds[k + 1];
        const alpha = (op[i] + op[j]) * 0.30;
        if (alpha < 0.005) continue;
        ctx.strokeStyle = `rgba(${lr},${lg},${lb},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }

      // ── Draw nodes ───────────────────────────────────────────────────────
      const [ar, ag, ab] = C_ATOM;
      nodes.forEach((n, i) => {
        const o = op[i];
        const [r, g, b] = n.isAtom ? [ar, ag, ab] : [lr, lg, lb];

        if (n.isAtom) {
          // Soft glow halo — mimics electron density distribution around atom
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7);
          glow.addColorStop(0, `rgba(${r},${g},${b},${(o * 0.26).toFixed(3)})`);
          glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2);
          ctx.fill();

          // Orbital indicator ring — referencing atomic orbital visualization
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},${(o * 0.32).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${o.toFixed(3)})`;
        ctx.fill();
      });

      ctx.restore();
    };

    state.raf = requestAnimationFrame(render);

    return () => {
      state.running = false;
      if (state.raf) cancelAnimationFrame(state.raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onMqChange);
    };
  }, []);

  return (
    <>
      {/* Hex crystal lattice canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/*
        Horizontal process-layer stripes.
        References semiconductor cross-section schematics where you see
        alternating thin horizontal bands (SiO₂, poly-Si, metal, nitride, etc.)
      */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: [
            'repeating-linear-gradient(180deg,',
            '  rgba(91,155,213,0.025) 0px,',
            '  rgba(91,155,213,0.025) 1px,',
            '  transparent 1px,',
            '  transparent 80px',
            ')',
          ].join(''),
        }}
        aria-hidden="true"
      />

      {/* Ambient depth orbs — muted steel blue + soft teal */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Upper-right — steel blue, referencing wafer inspection lighting */}
        <div
          className="absolute -top-40 -right-32 w-[680px] h-[580px]"
          style={{
            background: 'radial-gradient(ellipse at top right, rgba(91,155,213,0.07) 0%, transparent 65%)',
            filter: 'blur(32px)',
          }}
        />
        {/* Lower-left — soft teal, referencing STEM elemental mapping */}
        <div
          className="absolute -bottom-24 -left-24 w-[520px] h-[460px]"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(78,205,196,0.045) 0%, transparent 65%)',
            filter: 'blur(28px)',
          }}
        />
        {/* Center-right — very faint steel blue for mid-page depth */}
        <div
          className="absolute top-2/5 right-1/5 w-[380px] h-[320px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(91,155,213,0.03) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>
    </>
  );
}
