import { useEffect, useRef } from 'react';

/**
 * ChemicalBackground
 *
 * Canvas-based molecular network background inspired by chemical engineering
 * and semiconductor materials.
 *
 * Features:
 * - Drifting nodes in 3 parallax layers (slow / mid / fast)
 * - Connecting bond lines that fade with distance
 * - Soft glow halos on nodes
 * - "Bond" nodes with an outer ring (25% of nodes)
 * - Scroll-reactive parallax (each layer shifts at a different rate)
 * - 28fps cap for low CPU usage
 * - Respects prefers-reduced-motion (draws once, no animation)
 * - Cleans up all event listeners and RAF on unmount
 */

const NODE_COUNT = 52;
const CONNECTION_DIST = 155;
const FRAME_MS = 1000 / 28; // ~28fps
// Parallax speeds per layer (fraction of scrollY applied to node Y offset)
const PARALLAX = [0.04, 0.09, 0.16];

function makeNode(w, h) {
  const layer = Math.floor(Math.random() * 3);
  const speed = 0.08 + Math.random() * 0.1;
  const angle = Math.random() * Math.PI * 2;
  const isBond = Math.random() < 0.25;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: isBond ? 3.5 + Math.random() * 1.5 : 1.5 + Math.random() * 2,
    opacity: 0.18 + Math.random() * 0.38,
    layer,
    isBond,
  };
}

export default function ChemicalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const state = {
      nodes: [],
      scrollY: 0,
      reducedMotion: false,
      running: true,
      lastTime: 0,
      raf: null,
    };

    // Reduced motion detection
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.reducedMotion = mq.matches;
    const onMqChange = (e) => {
      state.reducedMotion = e.matches;
    };
    mq.addEventListener('change', onMqChange);

    // Resize handler – reinit nodes so they fill the new canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      state.nodes = Array.from({ length: NODE_COUNT }, () =>
        makeNode(canvas.width, canvas.height)
      );
    };
    resize();
    window.addEventListener('resize', resize);

    // Scroll handler
    const onScroll = () => {
      state.scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Main render loop
    const draw = (time) => {
      if (!state.running) return;
      state.raf = requestAnimationFrame(draw);
      if (time - state.lastTime < FRAME_MS) return;
      state.lastTime = time;

      const { nodes, scrollY, reducedMotion } = state;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Drift nodes
      if (!reducedMotion) {
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          // Wrap edges
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
        });
      }

      // Pre-compute screen Y for each node (parallax offset)
      const sy = nodes.map((n) => n.y - scrollY * PARALLAX[n.layer]);

      // Draw bond lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ay = sy[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const by = sy[j];
          const dx = a.x - b.x;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.14;
            ctx.strokeStyle = `rgba(124,58,237,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, ay);
            ctx.lineTo(b.x, by);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n, i) => {
        const ny = sy[i];

        // Soft radial glow
        const glow = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, n.r * 5);
        glow.addColorStop(0, `rgba(124,58,237,${(n.opacity * 0.22).toFixed(3)})`);
        glow.addColorStop(1, 'rgba(124,58,237,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, ny, n.r * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core dot (accent-light: #A78BFA)
        ctx.beginPath();
        ctx.arc(n.x, ny, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${n.opacity.toFixed(3)})`;
        ctx.fill();

        // Outer ring on bond-type nodes
        if (n.isBond) {
          ctx.beginPath();
          ctx.arc(n.x, ny, n.r + 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(124,58,237,${(n.opacity * 0.45).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    };

    state.raf = requestAnimationFrame(draw);

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
      {/* Molecular network canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Dot grid overlay – very faint blueprint feel */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(124,58,237,0.13) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
        aria-hidden="true"
      />

      {/* Gradient depth orbs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Top-right accent orb */}
        <div
          className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          }}
        />
        {/* Bottom-left cool orb */}
        <div
          className="absolute -bottom-32 -left-32 w-[550px] h-[550px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          }}
        />
        {/* Mid-page soft center glow */}
        <div
          className="absolute top-1/2 left-1/4 w-[400px] h-[300px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)',
          }}
        />
      </div>
    </>
  );
}
