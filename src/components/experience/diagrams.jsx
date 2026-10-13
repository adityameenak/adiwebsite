import { useId, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/*
 * Schematic diagrams for the experience case studies. They explain the idea
 * behind each project; they are not real data, and only show numbers that
 * already appear in the case study. Colors come from theme tokens (see the
 * .dg rules in index.css), so they follow light/dark mode.
 */

const EASE = [0.22, 1, 0.36, 1];

// Each diagram receives `on` (in view, or reduced motion), `t(delay, duration)`
// and `m`, the url() references for this SVG's arrow markers.
function Track({ on, t }) {
  const modules = [['COAT', 14], ['BAKE', 72], ['DEVELOP', 130], ['BUFFER', 194], ['OUT', 256]];
  const points = [140, 136, 143, 138, 141, 137, 139, 114, 109, 112];
  const xs = points.map((_, i) => 34 + i * 26);
  const path = points.map((y, i) => `${i ? 'L' : 'M'}${xs[i]} ${y}`).join(' ');
  return (
    <>
      <line className="ln" x1="14" y1="45" x2="306" y2="45" />
      {modules.map(([label, x]) => (
        <g key={label}>
          <rect className={label === 'BUFFER' ? 'f-soft acc' : 'f-surf'} x={x} y="30" width="50" height="30" rx="4" />
          <text className={`tx${label === 'BUFFER' ? ' tx-acc' : ''}`} x={x + 25} y="48" textAnchor="middle">{label}</text>
        </g>
      ))}
      <text className="tx tx-acc" x="219" y="22" textAnchor="middle">SLOW TRANSFER ARM</text>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          className="f-acc"
          cx={170 + i * 7}
          cy="74"
          r="3.2"
          initial={{ x: -60, opacity: 0 }}
          animate={on ? { x: 0, opacity: 1 } : {}}
          transition={t(0.1 + i * 0.12)}
        />
      ))}
      <text className="tx" x="150" y="77" textAnchor="end">QUEUE</text>

      <text className="tx" x="20" y="100">I-MR</text>
      <line className="ln dash" x1="28" y1="122" x2="300" y2="122" />
      <text className="tx tx-acc" x="300" y="117" textAnchor="end">UCL</text>
      <line className="ln" x1="28" y1="139" x2="300" y2="139" opacity="0.5" />
      <motion.path className="ink" d={path} initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={t(0.2, 1.4)} />
      {points.map((y, i) => (
        <circle key={i} className={i >= 7 ? 'f-acc' : 'f-ink'} cx={xs[i]} cy={y} r="2.4" />
      ))}
      <text className="tx" x="20" y="166">shift past the control limit → investigate</text>
    </>
  );
}

function Overlay({ on, t, m }) {
  const square = (cls) => (
    <>
      <rect className={cls} x="40" y="36" width="100" height="100" rx="3" />
      {[60, 80, 100, 120].map((x) => <line key={x} className={cls} x1={x} y1="46" x2={x} y2="126" opacity="0.6" />)}
      {[[48, 44], [124, 44], [48, 120], [124, 120]].map(([x, y]) => (
        <path key={`${x}${y}`} className={cls} d={`M${x} ${y + 4}h8M${x + 4} ${y}v8`} />
      ))}
    </>
  );
  return (
    <>
      <g>{square('ln')}</g>
      <text className="tx" x="40" y="152">LAYER 1</text>
      <motion.g
        initial={{ x: 12, y: -9, rotate: 2.5 }}
        animate={on ? { x: 0, y: 0, rotate: 0 } : {}}
        transition={t(0.5, 1.2)}
        style={{ transformOrigin: '90px 86px' }}
      >
        {square('acc')}
      </motion.g>
      <text className="tx tx-acc" x="40" y="26">LAYER 2</text>
      <motion.g initial={{ opacity: 1 }} animate={on ? { opacity: 0 } : {}} transition={t(1.3, 0.4)}>
        {[[52, 48], [128, 48], [52, 124], [128, 124]].map(([x, y]) => (
          <line key={`${x}${y}`} className="acc" x1={x} y1={y} x2={x + 11} y2={y - 8} markerEnd={m.accent} />
        ))}
      </motion.g>
      {[['MEASURE', '500+ pts / lot', 34], ['CALCULATE', 'corrections', 78], ['CORRECT', 'the scanner', 122]].map(([a, b, y], i) => (
        <motion.g key={a} initial={{ opacity: 0, x: 8 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={t(0.2 + i * 0.2, 0.5)}>
          <rect className={i === 2 ? 'f-soft acc' : 'f-surf'} x="182" y={y} width="122" height="30" rx="4" />
          <text className={`tx${i === 2 ? ' tx-acc' : ''}`} x="192" y={y + 13}>{a}</text>
          <text className="tx" x="192" y={y + 24} opacity="0.75">{b}</text>
          {i < 2 && <line className="ln" x1="243" y1={y + 31} x2="243" y2={y + 43} markerEnd={m.faint} />}
        </motion.g>
      ))}
    </>
  );
}

function Cnn({ on, t, m }) {
  const stage = (i) => ({ initial: { opacity: 0, y: 6 }, animate: on ? { opacity: 1, y: 0 } : {}, transition: t(i * 0.25, 0.5) });
  return (
    <>
      <motion.g {...stage(0)}>
        <circle className="f-surf" cx="46" cy="84" r="32" />
        <path className="acc" d="M28 70c10 4 22 4 34-2M24 84c12 5 26 5 42-1M28 98c10 4 22 4 34-2" opacity="0.7" />
        <text className="tx" x="46" y="134" textAnchor="middle">IMAGE</text>
      </motion.g>
      <line className="ln" x1="82" y1="84" x2="96" y2="84" markerEnd={m.faint} />
      <motion.g {...stage(1)}>
        <rect className="f-surf" x="100" y="54" width="60" height="60" rx="4" />
        {[8, 16, 24].map((r) => <circle key={r} className="ln" cx="130" cy="84" r={r} opacity="0.7" />)}
        <circle className="f-acc" cx="130" cy="84" r="3" />
        {[[118, 72], [142, 96], [118, 96], [142, 72]].map(([x, y], i) => (
          <circle key={i} className="f-acc" cx={x} cy={y} r={i < 2 ? 2.6 : 1.6} opacity={i < 2 ? 1 : 0.5} />
        ))}
        <text className="tx" x="130" y="134" textAnchor="middle">FFT HEATMAP</text>
      </motion.g>
      <line className="ln" x1="164" y1="84" x2="176" y2="84" markerEnd={m.faint} />
      <motion.g {...stage(2)}>
        {[[180, 58, 52], [198, 64, 40], [214, 72, 24]].map(([x, y, h]) => (
          <rect key={x} className="f-surf" x={x} y={y} width="12" height={h} rx="2" />
        ))}
        <text className="tx" x="203" y="134" textAnchor="middle">CNN</text>
      </motion.g>
      <line className="ln" x1="230" y1="84" x2="244" y2="84" markerEnd={m.faint} />
      <motion.g {...stage(3)}>
        <rect className="f-soft acc" x="248" y="66" width="62" height="36" rx="4" />
        <text className="tx tx-acc" x="279" y="82" textAnchor="middle">DEFECT</text>
        <text className="tx tx-acc" x="279" y="93" textAnchor="middle">CLASS</text>
        <text className="tx" x="279" y="134" textAnchor="middle">84% ACC.</text>
      </motion.g>
    </>
  );
}

function Skip({ on, t }) {
  const measured = new Set([0, 3, 6]);
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => {
        const x = 18 + i * 37;
        return measured.has(i) ? (
          <g key={i}>
            <rect className="f-soft acc" x={x} y="26" width="26" height="26" rx="4" />
            <path className="acc" d={`M${x + 7} 39l5 5 8-10`} />
          </g>
        ) : (
          <rect key={i} className="ln dash" x={x} y="26" width="26" height="26" rx="4" />
        );
      })}
      <text className="tx tx-acc" x="18" y="66">■ MEASURED</text>
      <text className="tx" x="100" y="66">▢ SKIPPED</text>
      <text className="tx" x="18" y="82">LOTS →</text>

      <path className="ln" d="M100 162a60 60 0 0 1 120 0" />
      <line className="acc" x1="128" y1="122" x2="133" y2="127" />
      <text className="tx tx-acc" x="114" y="114" textAnchor="middle">DEFAULT</text>
      <text className="tx" x="214" y="112" textAnchor="middle" opacity="0.8">DRIFTED</text>
      <motion.line
        className="ink"
        x1="160" y1="162" x2="160" y2="114"
        initial={{ rotate: 48 }}
        animate={on ? { rotate: -36 } : {}}
        transition={t(0.4, 1)}
        style={{ transformOrigin: '160px 162px' }}
      />
      <circle className="f-ink" cx="160" cy="162" r="3.5" />
      <text className="tx" x="234" y="160">SKIP FACTOR</text>
    </>
  );
}

function Switch({ on, t, m }) {
  const panel = (x0, hot) => (
    <g>
      <text className={`tx${hot ? ' tx-acc' : ''}`} x={x0 + 70} y="24" textAnchor="middle">{hot ? 'HOT · INSULATES' : 'COOL · CONDUCTS'}</text>
      <rect className={hot ? 'f-soft acc' : 'f-surf'} x={x0} y="36" width="34" height="96" rx="3" />
      <rect className="f-surf" x={x0 + 106} y="36" width="34" height="96" rx="3" />
      <text className="tx" x={x0 + 17} y="146" textAnchor="middle">CELL</text>
      <text className="tx" x={x0 + 123} y="146" textAnchor="middle">CELL</text>
      <rect className="ln" x={x0 + 46} y="36" width="48" height="96" rx="2" />
      {hot ? (
        <>
          {[52, 72, 92, 112].map((yy) => (
            <path key={yy} className="ln" d={`M${x0 + 50} ${yy}h12M${x0 + 72} ${yy}h6M${x0 + 84} ${yy}h6`} opacity="0.6" />
          ))}
          {[[x0 + 58, 126], [x0 + 70, 128], [x0 + 82, 126]].map(([cx, cy]) => <circle key={cx} className="f-acc" cx={cx} cy={cy} r="2.4" />)}
          <motion.line
            className="acc"
            x1={x0 + 30} y1="84" x2={x0 + 44} y2="84"
            initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={t(0.6, 0.6)}
          />
          <line className="acc" x1={x0 + 46} y1="74" x2={x0 + 46} y2="94" strokeWidth="2.6" />
          <text className="tx tx-acc" x={x0 + 70} y="160" textAnchor="middle">HEAT BLOCKED</text>
          <text className="tx" x={x0 + 70} y="171" textAnchor="middle">indium melted out</text>
        </>
      ) : (
        <>
          {[52, 72, 92, 112].map((yy) => <line key={yy} className="acc" x1={x0 + 48} y1={yy} x2={x0 + 92} y2={yy} opacity="0.55" />)}
          {[60, 70, 80].map((xx) => <line key={xx} className="acc" x1={x0 + xx} y1="40" x2={x0 + xx} y2="128" opacity="0.3" />)}
          <motion.line
            className="ink"
            x1={x0 + 26} y1="84" x2={x0 + 112} y2="84"
            markerEnd={m.ink}
            initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={t(0.2, 0.9)}
          />
          <text className="tx" x={x0 + 70} y="160" textAnchor="middle">HEAT PASSES</text>
          <text className="tx" x={x0 + 70} y="171" textAnchor="middle">connected indium</text>
        </>
      )}
    </g>
  );
  return <>{panel(10, false)}{panel(170, true)}</>;
}

function Conductivity({ on, t }) {
  const markerX = 40 + (15 / 20) * 240;
  return (
    <>
      <text className="dg-formula" x="160" y="56" textAnchor="middle">k = α · ρ · Cₚ</text>
      {[['α', 'DIFFUSIVITY', 112], ['ρ', 'DENSITY', 176], ['Cₚ', 'HEAT CAP.', 240]].map(([sym, label, x]) => (
        <g key={sym}>
          <text className="tx tx-acc" x={x} y="80" textAnchor="middle">{sym}</text>
          <text className="tx" x={x} y="91" textAnchor="middle">{label}</text>
        </g>
      ))}

      <line className="ln" x1="40" y1="136" x2="280" y2="136" />
      {[40, 280].map((x) => <line key={x} className="ln" x1={x} y1="130" x2={x} y2="142" />)}
      <text className="tx" x="40" y="158" textAnchor="middle">50 wt%</text>
      <text className="tx" x="280" y="158" textAnchor="middle">70 wt%</text>
      <text className="tx" x="160" y="158" textAnchor="middle">INDIUM CONTENT</text>
      <motion.g initial={{ scale: 0, opacity: 0 }} animate={on ? { scale: 1, opacity: 1 } : {}} transition={t(0.4, 0.6)} style={{ transformOrigin: `${markerX}px 136px` }}>
        <circle className="f-soft acc" cx={markerX} cy="136" r="9" />
        <circle className="f-acc" cx={markerX} cy="136" r="3.5" />
      </motion.g>
      <text className="tx tx-acc" x={markerX} y="118" textAnchor="middle">65 wt% · STRONGEST</text>
    </>
  );
}

function Stack({ on, t, m }) {
  const cells = [0, 1, 2, 3, 4].map((i) => 34 + i * 52);
  return (
    <>
      <text className="tx" x="16" y="22">COOLED</text>
      <text className="tx" x="304" y="22" textAnchor="end">COOLED</text>
      {cells.map((x, i) => (
        <g key={x}>
          {i === 0 ? (
            <motion.rect
              className="f-acc" x={x} y="40" width="40" height="80" rx="3"
              initial={{ opacity: 0.25 }} animate={on ? { opacity: [0.25, 0.85, 0.6] } : {}} transition={t(0.2, 1.4)}
            />
          ) : (
            <rect className="f-surf" x={x} y="40" width="40" height="80" rx="3" />
          )}
          <text className={`tx${i === 0 ? ' tx-acc' : ''}`} x={x + 20} y="136" textAnchor="middle">{i === 0 ? 'RUNAWAY' : `CELL ${i + 1}`}</text>
          {i < 4 && (
            <rect className={i === 0 ? 'f-ink' : 'f-soft'} x={x + 42} y="40" width="8" height="80" rx="1.5" opacity={i === 0 ? 0.85 : 1} />
          )}
        </g>
      ))}
      <text className="tx" x="80" y="32" textAnchor="middle">SWITCHED OFF</text>
      <line className="ln" x1="28" y1="80" x2="10" y2="80" markerEnd={m.faint} />
      <line className="ln" x1="292" y1="80" x2="310" y2="80" markerEnd={m.faint} />
      <text className="tx tx-acc" x="160" y="162" textAnchor="middle">contained when hot-state conductance &lt; ~32 W m⁻² K⁻¹</text>
    </>
  );
}

function Pyrolysis({ on, t }) {
  const ty = (c) => 130 - ((c - 800) / 400) * 90; // 800 °C → y130, 1200 °C → y40
  return (
    <>
      <line className="ln" x1="52" y1="150" x2="300" y2="150" />
      <line className="ln" x1="52" y1="26" x2="52" y2="150" />
      <motion.rect
        className="f-soft" x="52" y={ty(1000)} width="248" height={ty(900) - ty(1000)}
        initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={t(0.9, 0.6)}
      />
      {/* centred between the heating and cooling slopes so the curve never crosses it */}
      <text className="tx tx-acc" x="190" y={ty(1000) + 14} textAnchor="middle">ONSET 900–1000 °C</text>
      {[800, 1200].map((c) => (
        <g key={c}>
          <line className="ln" x1="48" y1={ty(c)} x2="52" y2={ty(c)} />
          <text className="tx" x="44" y={ty(c) + 3} textAnchor="end">{c}°</text>
        </g>
      ))}
      <motion.path
        className="ink"
        d={`M52 150 L150 ${ty(1100)} L232 ${ty(1100)} L300 146`}
        initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={t(0.1, 1.4)}
      />
      <text className="tx" x="300" y="163" textAnchor="end">TIME →</text>
      <text className="tx" x="58" y="163">liquid PCS → SiC ceramic</text>
      <text className="tx" x="58" y="34">TEMP</text>
    </>
  );
}

function Xrd({ on, t }) {
  const d = 'M16 150 L48 148 L58 146 L64 150 L70 66 L76 150 L96 147 L106 149 L110 112 L114 150 L134 146 L148 149 L152 104 L156 150 L176 148 L196 150';
  return (
    <>
      <line className="ln" x1="16" y1="152" x2="196" y2="152" />
      <motion.path className="ink" d={d} initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={t(0.1, 1.4)} />
      {[[70, 60], [110, 106], [152, 98]].map(([x, yy]) => <text key={x} className="tx tx-acc" x={x} y={yy} textAnchor="middle">SiC</text>)}
      <text className="tx" x="196" y="166" textAnchor="end">2θ →</text>
      <text className="tx" x="16" y="26">XRD · 92% SiC PHASE</text>

      <motion.rect
        className="f-acc" x="242" y="76" width="36" height="44" rx="3"
        initial={{ opacity: 0.2 }} animate={on ? { opacity: [0.2, 0.9, 0.65] } : {}} transition={t(0.6, 1.4)}
      />
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} className="ln" cx="260" cy={70 + i * 19} rx="32" ry="7" />
      ))}
      <text className="tx" x="260" y="26" textAnchor="middle">RF COIL</text>
      <text className="tx tx-acc" x="260" y="160" textAnchor="middle">200–300 W</text>
    </>
  );
}

const DIAGRAMS = { track: Track, overlay: Overlay, cnn: Cnn, skip: Skip, switch: Switch, conductivity: Conductivity, stack: Stack, pyrolysis: Pyrolysis, xrd: Xrd };

/** Renders a case-study diagram by id; animates once when scrolled into view. */
export default function Diagram({ id, label }) {
  const ref = useRef(null);
  const uid = useId().replace(/:/g, '');
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const Body = DIAGRAMS[id];
  if (!Body) return null;

  const on = inView || reduced;
  const markers = { accent: `url(#${uid}-accent)`, faint: `url(#${uid}-faint)`, ink: `url(#${uid}-ink)` };
  const t = (delay = 0, duration = 0.8) => (reduced ? { duration: 0 } : { delay, duration, ease: EASE });

  return (
    <svg ref={ref} className="dg" viewBox="0 0 320 180" role="img" aria-label={label}>
      <defs>
        {[['accent', 'var(--accent)'], ['faint', 'var(--faint)'], ['ink', 'var(--ink)']].map(([name, color]) => (
          <marker key={name} id={`${uid}-${name}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 8 4 0 8z" style={{ fill: color }} />
          </marker>
        ))}
      </defs>
      <Body on={on} t={t} m={markers} />
    </svg>
  );
}
