import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * SchematicBackground
 *
 * A fixed, full-viewport background system composed of three parallax SVG
 * layers and two ambient gradient orbs.
 *
 * Visual reference:
 *   The composition is abstracted from semiconductor die photography and
 *   photomask artwork. Elements reference:
 *
 *   - Dot grid        → photomask registration pattern / reticle alignment grid
 *   - Rect blocks     → circuit cell boundaries (logic, I/O, memory blocks)
 *   - Inner divisions → standard-cell rows within a logic block
 *   - Trace lines     → metal routing layers (M1–M3 interconnect)
 *   - Bus lines       → wide data/address buses common in chip floor plans
 *   - Pad markers     → interlayer via pads / contact cuts
 *   - Via circles     → plated through-holes / interlayer contacts
 *   - Alignment marks → wafer-to-mask alignment crosses (appear at die corners)
 *   - Scribe lane     → diagonal die scribe line (separates adjacent die)
 *
 * The effect is felt as engineered structure, not seen as decoration.
 *
 * Parallax depths:
 *   Layer 1 (large blocks)  — slowest — 0→-40px over 3000px scroll
 *   Layer 2 (trace routing) — medium  — 0→-100px
 *   Layer 3 (fine details)  — faster  — 0→-180px
 *
 * Performance: pure SVG, no canvas, no RAF loop. Driven by Framer Motion's
 * scroll spring — very low CPU. Respects prefers-reduced-motion.
 */

// All schematic geometry uses this steel-blue base at varying opacities.
// Calibrated for warm bone/ivory background (#F4F1EC).
const B = (a) => `rgba(29,111,164,${a})`; // steel blue
const T = (a) => `rgba(38,160,154,${a})`; // soft teal (accent nodes)

export default function SchematicBackground() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Three independent parallax depths
  const y1Raw = useTransform(scrollY, [0, 3000], [0, -40]);
  const y2Raw = useTransform(scrollY, [0, 3000], [0, -100]);
  const y3Raw = useTransform(scrollY, [0, 3000], [0, -180]);
  const orbY1 = useTransform(scrollY, [0, 3000], [0, -70]);
  const orbY2 = useTransform(scrollY, [0, 3000], [0,  60]);

  // Collapse to static 0 for users who prefer reduced motion
  const y1 = reducedMotion ? 0 : y1Raw;
  const y2 = reducedMotion ? 0 : y2Raw;
  const y3 = reducedMotion ? 0 : y3Raw;

  return (
    <>
      {/*
        SVG schematic — fixed, fills viewport.
        viewBox: 1440×900 (standard laptop viewport)
        preserveAspectRatio xMidYMid slice: fills any screen, clipping excess.
        Clipping reinforces the "viewing a portion of a larger die" metaphor.
      */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/*
              Registration dot grid — photomask reticle pattern.
              32px spacing chosen to approximate sub-micron periodicity at
              the die scale being rendered. Very faint — structural, not decorative.
            */}
            <pattern
              id="reg-dots"
              x="0" y="0"
              width="32" height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="16" cy="16" r="0.75" fill={B(0.11)} />
            </pattern>
          </defs>

          {/* ── Static base ────────────────────────────────────────────────── */}
          {/* Registration dot grid covers the entire canvas at zero parallax */}
          <rect width="1440" height="900" fill="url(#reg-dots)" />

          {/*
            ── Layer 1: Circuit cell boundaries + alignment marks ─────────────
            Slowest parallax (-40px at full scroll).
            Large rectangular outlines read as top-level floor-plan blocks
            on a chip die. The crossing internal lines suggest standard-cell row
            organization within a logic block.
          */}
          <motion.g style={{ y: y1 }}>

            {/* Main logic block — left side, mid-height */}
            <rect
              x="40" y="100" width="380" height="230"
              fill="none" stroke={B(0.07)} strokeWidth="0.75"
            />
            {/* Standard-cell row divisions inside logic block */}
            <line x1="60"  y1="160" x2="400" y2="160" stroke={B(0.04)} strokeWidth="0.5" />
            <line x1="60"  y1="220" x2="400" y2="220" stroke={B(0.04)} strokeWidth="0.5" />
            <line x1="60"  y1="280" x2="400" y2="280" stroke={B(0.04)} strokeWidth="0.5" />
            {/* Vertical column dividers */}
            <line x1="200" y1="100" x2="200" y2="330" stroke={B(0.04)} strokeWidth="0.5" />

            {/* I/O pad ring — right side */}
            <rect
              x="1050" y="40" width="300" height="270"
              fill="none" stroke={B(0.07)} strokeWidth="0.75"
            />
            {/* I/O pad stubs on left edge of block */}
            <rect x="1040" y="80"  width="14" height="8"  fill={B(0.08)} />
            <rect x="1040" y="110" width="14" height="8"  fill={B(0.08)} />
            <rect x="1040" y="140" width="14" height="8"  fill={B(0.08)} />
            <rect x="1040" y="170" width="14" height="8"  fill={B(0.08)} />
            <rect x="1040" y="200" width="14" height="8"  fill={B(0.08)} />
            <rect x="1040" y="230" width="14" height="8"  fill={B(0.08)} />
            <rect x="1040" y="260" width="14" height="8"  fill={B(0.08)} />

            {/* Buffer / SRAM block — lower center */}
            <rect
              x="510" y="620" width="250" height="180"
              fill="none" stroke={B(0.07)} strokeWidth="0.75"
            />
            {/* Bit-line structure inside SRAM block */}
            {[530, 560, 590, 620, 650, 680, 710, 740].map((x) => (
              <line key={x} x1={x} y1="640" x2={x} y2="790" stroke={B(0.04)} strokeWidth="0.4" />
            ))}

            {/*
              Photomask wafer-alignment crosses.
              Appear at all four die corners on a real photomask.
              Arm length: ±12 units. Gap: ±4 units (open center).
            */}
            {[
              [32, 32], [1408, 32], [32, 868], [1408, 868]
            ].map(([cx, cy]) => (
              <g key={`${cx}-${cy}`}>
                <line x1={cx - 12} y1={cy} x2={cx - 4} y2={cy} stroke={B(0.12)} strokeWidth="0.75" />
                <line x1={cx + 4}  y1={cy} x2={cx + 12} y2={cy} stroke={B(0.12)} strokeWidth="0.75" />
                <line x1={cx} y1={cy - 12} x2={cx} y2={cy - 4} stroke={B(0.12)} strokeWidth="0.75" />
                <line x1={cx} y1={cy + 4}  x2={cx} y2={cy + 12} stroke={B(0.12)} strokeWidth="0.75" />
              </g>
            ))}
          </motion.g>

          {/*
            ── Layer 2: Metal routing traces, buses, via pads ────────────────
            Medium parallax (-100px at full scroll).
            Horizontal and vertical trace lines reference M1–M2 metal layers
            in a chip's routing stack. The closely spaced "bus" group references
            wide data buses common in memory and processor interconnects.
            Small square pads mark via landing sites.
          */}
          <motion.g style={{ y: y2 }}>

            {/* ── Horizontal traces ── */}
            {/* H1 — exits logic block top-right, connects left */}
            <line x1="0"    y1="220" x2="440" y2="220" stroke={B(0.09)} strokeWidth="0.75" />
            {/* H2 — main routing channel across left-center */}
            <line x1="0"    y1="310" x2="780" y2="310" stroke={B(0.09)} strokeWidth="0.75" />
            {/* H3 — right-side connection into I/O block */}
            <line x1="420"  y1="410" x2="1440" y2="410" stroke={B(0.09)} strokeWidth="0.75" />
            {/* H4 — global horizontal bus (full width) */}
            <line x1="0"    y1="510" x2="1440" y2="510" stroke={B(0.08)} strokeWidth="0.75" />
            {/* H5 — lower-left to buffer block */}
            <line x1="0"    y1="620" x2="510"  y2="620" stroke={B(0.09)} strokeWidth="0.75" />
            {/* H6 — exits buffer block to right edge */}
            <line x1="760"  y1="730" x2="1440" y2="730" stroke={B(0.09)} strokeWidth="0.75" />

            {/*
              Data bus group — 4 closely spaced parallel traces.
              Spacing: 5px. Referencing 8-/16-bit parallel bus structures
              visible in chip photos as repeating thin-line clusters.
            */}
            <line x1="160" y1="362" x2="800" y2="362" stroke={B(0.06)} strokeWidth="0.5" />
            <line x1="160" y1="368" x2="800" y2="368" stroke={B(0.06)} strokeWidth="0.5" />
            <line x1="160" y1="374" x2="800" y2="374" stroke={B(0.06)} strokeWidth="0.5" />
            <line x1="160" y1="380" x2="800" y2="380" stroke={B(0.06)} strokeWidth="0.5" />

            {/* ── Vertical traces ── */}
            <line x1="200"  y1="100" x2="200"  y2="620" stroke={B(0.09)} strokeWidth="0.75" />
            <line x1="440"  y1="40"  x2="440"  y2="510" stroke={B(0.09)} strokeWidth="0.75" />
            <line x1="760"  y1="310" x2="760"  y2="820" stroke={B(0.09)} strokeWidth="0.75" />
            <line x1="1050" y1="310" x2="1050" y2="900" stroke={B(0.09)} strokeWidth="0.75" />

            {/*
              Via pad markers — 5×5 filled squares at trace intersections.
              Mark sites where vertical and horizontal metal layers connect
              through an interlayer dielectric via.
            */}
            {[
              [200, 220], [200, 310], [200, 510],
              [440, 220], [440, 410], [440, 510],
              [760, 310], [760, 410], [760, 510],
              [1050, 410], [1050, 510],
            ].map(([x, y]) => (
              <rect
                key={`pad-${x}-${y}`}
                x={x - 2.5} y={y - 2.5}
                width="5" height="5"
                fill={B(0.18)}
              />
            ))}

            {/* ── Notch / tab features on block edges ── */}
            {/* Reference alignment notches used on photomasks and wafer flats */}
            <rect x="36"   y="200" width="12" height="6" fill={B(0.06)} />
            <rect x="36"   y="260" width="12" height="6" fill={B(0.06)} />
            <rect x="1046" y="135" width="8"  height="5" fill={B(0.06)} />
            <rect x="1046" y="185" width="8"  height="5" fill={B(0.06)} />
          </motion.g>

          {/*
            ── Layer 3: Fine detail — vias, contacts, scribe lane ────────────
            Fastest parallax (-180px at full scroll).
            Small filled circles are plated vias. The diagonal line is the
            die scribe lane — the street between adjacent dice on a wafer.
          */}
          <motion.g style={{ y: y3 }}>

            {/*
              Plated via circles — appear at interlayer connection points
              not already marked by pad squares above.
            */}
            {[
              [200, 620], [440, 620], [510, 620],
              [760, 620], [760, 730],
              [1050, 620], [1050, 730],
            ].map(([x, y]) => (
              <circle key={`via-${x}-${y}`} cx={x} cy={y} r="2.5" fill={T(0.22)} />
            ))}

            {/* Contact rings around vias — optional second via ring */}
            {[
              [200, 620], [760, 730],
            ].map(([x, y]) => (
              <circle key={`ring-${x}-${y}`} cx={x} cy={y} r="5" fill="none" stroke={T(0.14)} strokeWidth="0.6" />
            ))}

            {/*
              Die scribe lane diagonal.
              On a wafer, this is a ~100µm wide street between die.
              Rendered as an extremely faint diagonal — only legible at
              close inspection, providing a sense of scale.
            */}
            <line
              x1="-50" y1="-50" x2="1490" y2="950"
              stroke={B(0.035)} strokeWidth="0.6"
            />

            {/* Small contact rectangles — metal contact windows in oxide */}
            <rect x="191" y="525" width="18" height="10" fill="none" stroke={B(0.12)} strokeWidth="0.5" />
            <rect x="431" y="525" width="18" height="10" fill="none" stroke={B(0.12)} strokeWidth="0.5" />
            <rect x="751" y="525" width="18" height="10" fill="none" stroke={B(0.12)} strokeWidth="0.5" />
          </motion.g>
        </svg>
      </div>

      {/*
        Ambient gradient orbs — soft diffusion-field metaphor.
        Two orbs: steel blue (upper-right) and teal (lower-left).
        These reference the illumination gradients visible when photographing
        polished semiconductor wafers under monochromatic light.
        Very low opacity — influence felt only in aggregate.
      */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <motion.div
          style={{
            y: reducedMotion ? 0 : orbY1,
            position: 'absolute',
            top: '-80px',
            right: '-60px',
            width: '620px',
            height: '520px',
            background: 'radial-gradient(ellipse at top right, rgba(29,111,164,0.055) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          style={{
            y: reducedMotion ? 0 : orbY2,
            position: 'absolute',
            bottom: '-60px',
            left: '-40px',
            width: '520px',
            height: '440px',
            background: 'radial-gradient(ellipse at bottom left, rgba(38,160,154,0.04) 0%, transparent 65%)',
            filter: 'blur(35px)',
          }}
        />
      </div>
    </>
  );
}
