import { useEffect, useMemo, useRef } from 'react';
import WalkthroughDialog from './WalkthroughDialog';

/*
 * Each walkthrough runs the real method on synthetic data generated here: I-MR
 * limits, a least-squares overlay fit and 2D FFTs are all computed in the
 * browser. No Samsung data is used. Only the results in the last steps come
 * from the actual work.
 */

const NOTE = 'Illustrative recreation with synthetic data. No Samsung data, images or tool details are shown.';

const clamp01 = (v) => Math.min(1, Math.max(0, v));

function seeded(seed) {
  let a = seed;
  const uniform = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return { uniform, gauss: () => Math.sqrt(-2 * Math.log(1 - uniform())) * Math.cos(2 * Math.PI * uniform()) };
}

const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;

/* ── Track bottleneck: I-MR control chart ─────────────────────────────── */

const SHIFT_AT = 26;
const FIXED_AT = 40;
const TOTAL = 54;

const trackData = (() => {
  const { gauss } = seeded(11);
  const times = Array.from({ length: TOTAL }, (_, i) => {
    const level = i >= SHIFT_AT && i < FIXED_AT ? 13.6 : 11.8;
    return level + 0.22 * gauss();
  });
  const ranges = times.map((x, i) => (i ? Math.abs(x - times[i - 1]) : 0));
  const baseline = times.slice(0, 20);
  const center = mean(baseline);
  const mrBar = mean(ranges.slice(1, 20));
  return { times, ranges, center, mrBar, ucl: center + 2.66 * mrBar, lcl: center - 2.66 * mrBar, mrUcl: 3.267 * mrBar };
})();

const MODULES = [['Coat', 8.1, 8.2], ['Bake', 9.4, 9.3], ['Develop', 10.2, 10.3], ['Buffer', 11.8, 13.6], ['Out', 7.6, 7.5]];

function ControlChart({ values, shown, center, ucl, lcl, min, max, label, height = 150 }) {
  const width = 640;
  const left = 46;
  const x = (i) => left + (i / (TOTAL - 1)) * (width - left - 12);
  const y = (v) => height - 16 - ((v - min) / (max - min)) * (height - 30);
  const visible = values.slice(0, shown);
  return (
    <svg className="wt-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <text className="wt-chart__label" x={left} y="10">{label}</text>
      <line className="wt-chart__center" x1={left} x2={width - 12} y1={y(center)} y2={y(center)} />
      <line className="wt-chart__limit" x1={left} x2={width - 12} y1={y(ucl)} y2={y(ucl)} />
      <text className="wt-chart__tick is-limit" x={left - 6} y={y(ucl) + 3} textAnchor="end">UCL</text>
      <text className="wt-chart__tick" x={left - 6} y={y(center) + 3} textAnchor="end">{center < 2 ? 'MR̄' : 'x̄'}</text>
      {lcl != null && <line className="wt-chart__limit" x1={left} x2={width - 12} y1={y(lcl)} y2={y(lcl)} />}
      <polyline className="wt-chart__line" points={visible.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
      {visible.map((v, i) => (
        <circle key={i} className={v > ucl ? 'wt-chart__out' : 'wt-chart__pt'} cx={x(i)} cy={y(v)} r={v > ucl ? 3.6 : 2.4} />
      ))}
    </svg>
  );
}

function TrackScene({ step, progress }) {
  const { times, ranges, center, ucl, lcl, mrBar, mrUcl } = trackData;

  if (step === 0) {
    const newest = Math.round(progress * 24) + 6;
    const rows = Array.from({ length: 6 }, (_, i) => newest - 5 + i);
    return (
      <div className="wt-log">
        <p className="wt-scene-label">Transfer log, newest last</p>
        <table>
          <thead><tr><th>Wafer</th><th>Module</th><th>Transfer (s)</th></tr></thead>
          <tbody>
            {rows.map((n) => <tr key={n}><td>W-{String(n).padStart(3, '0')}</td><td>Buffer</td><td>{times[n].toFixed(2)}</td></tr>)}
          </tbody>
        </table>
        <p className="wt-log__count">Average so far: {mean(times.slice(0, newest)).toFixed(2)} s</p>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="wt-bars">
        <p className="wt-scene-label">Average time per module, before and after the jump</p>
        {MODULES.map(([name, before, after]) => {
          const reveal = clamp01(progress * 1.6);
          return (
            <div key={name} className={`wt-trace${after - before > 1 ? ' is-hot' : ''}`}>
              <span className="wt-bar__name">{name}</span>
              <span className="wt-trace__bars">
                <span style={{ width: `${(before / 14) * reveal * 100}%` }} />
                <span style={{ width: `${(after / 14) * reveal * 100}%` }} />
              </span>
              <span className="wt-bar__value">{before.toFixed(1)} → {after.toFixed(1)} s</span>
            </div>
          );
        })}
      </div>
    );
  }

  const shown = step === 1 ? Math.round(6 + progress * (FIXED_AT - 6))
    : step === 2 ? FIXED_AT
    : Math.round(FIXED_AT + progress * (TOTAL - FIXED_AT));
  const firstOut = times.findIndex((v) => v > ucl);

  return (
    <div className="wt-charts">
      <ControlChart values={times} shown={shown} center={center} ucl={ucl} lcl={lcl} min={11} max={14.4} label="Individuals (s)" />
      {step >= 2 && (
        <ControlChart
          values={ranges.slice(1)}
          shown={step === 2 ? Math.round(progress * (FIXED_AT - 1)) : shown - 1}
          center={mrBar}
          ucl={mrUcl}
          min={0}
          max={2.4}
          label="Moving range (s)"
          height={110}
        />
      )}
      <p className="wt-charts__read">
        {step === 4 ? 'Back inside the limits after the mechanism was addressed.'
          : shown > firstOut ? `Wafer ${firstOut}: past the ${ucl.toFixed(2)} s control limit.`
          : `Control limit from the first 20 wafers: ${ucl.toFixed(2)} s.`}
      </p>
      {step === 4 && <p className="wt-story__result">300–400 wafers/day recovered</p>}
    </div>
  );
}

/* ── Overlay: fit a wafer model and correct it ────────────────────────── */

const overlayData = (() => {
  const { gauss } = seeded(23);
  const sites = [];
  for (let gx = -4; gx <= 4; gx += 1) {
    for (let gy = -4; gy <= 4; gy += 1) {
      const x = gx / 4;
      const y = gy / 4;
      if (x * x + y * y > 1.02) continue;
      sites.push({
        x,
        y,
        dx: 6 + 5 * x - 4 * y + 1.1 * gauss(),
        dy: -4 + 3.5 * y + 4 * x + 1.1 * gauss(),
      });
    }
  }
  // Ordinary least squares. The site grid is symmetric, so the terms are orthogonal.
  const sum = (f) => sites.reduce((a, s) => a + f(s), 0);
  const sxx = sum((s) => s.x * s.x);
  const syy = sum((s) => s.y * s.y);
  const tx = mean(sites.map((s) => s.dx));
  const ty = mean(sites.map((s) => s.dy));
  const magX = sum((s) => s.x * s.dx) / sxx;
  const rotX = sum((s) => s.y * s.dx) / syy;
  const magY = sum((s) => s.y * s.dy) / syy;
  const rotY = sum((s) => s.x * s.dy) / sxx;
  sites.forEach((s) => {
    s.mx = tx + magX * s.x + rotX * s.y;
    s.my = ty + rotY * s.x + magY * s.y;
    s.rx = s.dx - s.mx;
    s.ry = s.dy - s.my;
  });
  const threeSigma = (xs) => {
    const m = mean(xs);
    return Math.abs(m) + 3 * Math.sqrt(mean(xs.map((v) => (v - m) ** 2)));
  };
  return {
    sites,
    terms: [['Shift X', tx, 'nm'], ['Shift Y', ty, 'nm'], ['Scale X', magX, 'nm'], ['Scale Y', magY, 'nm'], ['Rotation', (rotY - rotX) / 2, 'nm']],
    before: Math.max(threeSigma(sites.map((s) => s.dx)), threeSigma(sites.map((s) => s.dy))),
    after: Math.max(threeSigma(sites.map((s) => s.rx)), threeSigma(sites.map((s) => s.ry))),
  };
})();

function WaferMap({ vectors, reveal = 1, color = 'is-raw' }) {
  const size = 280;
  const c = size / 2;
  const r = 118;
  const gain = 5;
  return (
    <svg className="wt-wafer" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Wafer map with an error arrow at each measured site">
      <circle className="wt-wafer__disc" cx={c} cy={c} r={r + 16} />
      {overlayData.sites.map((s, i) => {
        if (i / overlayData.sites.length > reveal) return null;
        const px = c + s.x * r;
        const py = c - s.y * r;
        const [vx, vy] = vectors(s);
        return (
          <g key={i}>
            <circle className="wt-wafer__site" cx={px} cy={py} r="1.5" />
            <line className={`wt-wafer__arrow ${color}`} x1={px} y1={py} x2={px + vx * gain} y2={py - vy * gain} />
          </g>
        );
      })}
    </svg>
  );
}

function OverlayScene({ step, progress }) {
  const { terms, before, after } = overlayData;
  const lerp = step === 2 ? clamp01(progress * 1.4) : step > 2 ? 1 : 0;
  const vectors = step === 1
    ? (s) => [s.dx + (s.mx - s.dx) * clamp01(progress * 1.5), s.dy + (s.my - s.dy) * clamp01(progress * 1.5)]
    : (s) => [s.dx - s.mx * lerp, s.dy - s.my * lerp];
  const current = before + (after - before) * lerp;

  return (
    <div className="wt-split">
      <WaferMap
        vectors={vectors}
        reveal={step === 0 ? progress * 1.3 : 1}
        color={step === 1 ? 'is-model' : lerp === 1 ? 'is-fixed' : 'is-raw'}
      />
      <div className="wt-readout">
        {step === 0 && <p className="wt-readout__big">{Math.round(clamp01(progress * 1.3) * overlayData.sites.length)}<span>sites measured</span></p>}
        {step >= 1 && (
          <dl className="wt-terms">
            {terms.map(([name, value, unit], i) => (
              <div key={name} style={{ opacity: step > 1 || progress * 6 > i ? 1 : 0.2 }}>
                <dt>{name}</dt>
                <dd>{value >= 0 ? '+' : '−'}{Math.abs(value).toFixed(1)} {unit}</dd>
              </div>
            ))}
          </dl>
        )}
        {step >= 2 && <p className="wt-readout__big">{current.toFixed(1)} nm<span>worst-axis overlay, |mean| + 3σ</span></p>}
        {step === 3 && <p className="wt-story__result">250 engineering hours saved a year</p>}
      </div>
    </div>
  );
}

/* ── Defects: real 2D FFT of synthetic coating images ─────────────────── */

const N = 64;

function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i += 1) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const angle = (-2 * Math.PI) / len;
    for (let i = 0; i < n; i += len) {
      for (let k = 0; k < len / 2; k += 1) {
        const wr = Math.cos(angle * k);
        const wi = Math.sin(angle * k);
        const a = i + k;
        const b = a + len / 2;
        const tr = re[b] * wr - im[b] * wi;
        const ti = re[b] * wi + im[b] * wr;
        re[b] = re[a] - tr;
        im[b] = im[a] - ti;
        re[a] += tr;
        im[a] += ti;
      }
    }
  }
}

function spectrum(image) {
  const re = image.map((row) => [...row]);
  const im = image.map(() => new Array(N).fill(0));
  re.forEach((row, y) => fft(row, im[y]));
  for (let x = 0; x < N; x += 1) {
    const cr = re.map((row) => row[x]);
    const ci = im.map((row) => row[x]);
    fft(cr, ci);
    cr.forEach((v, y) => { re[y][x] = v; im[y][x] = ci[y]; });
  }
  const out = Array.from({ length: N }, (_, y) => Array.from({ length: N }, (_, x) => {
    const sy = (y + N / 2) % N;
    const sx = (x + N / 2) % N;
    return Math.log1p(Math.hypot(re[sy][sx], im[sy][sx]));
  }));
  const peak = Math.max(...out.flat());
  return out.map((row) => row.map((v) => v / peak));
}

const CLASSES = [
  { name: 'No defect', probs: [0.93, 0.05, 0.02], paint: () => 0 },
  { name: 'Radial streaks', probs: [0.06, 0.89, 0.05], paint: (r, theta) => 0.42 * Math.sin(theta * 12) * r },
  { name: 'Ring', probs: [0.04, 0.07, 0.89], paint: (r) => 0.7 * Math.exp(-(((r - 0.62) / 0.07) ** 2)) },
];

function makeImage(paint, seed) {
  const { gauss } = seeded(seed);
  return Array.from({ length: N }, (_, y) => Array.from({ length: N }, (_, x) => {
    const u = (x - N / 2 + 0.5) / (N / 2);
    const v = (y - N / 2 + 0.5) / (N / 2);
    const r = Math.hypot(u, v);
    if (r > 0.95) return 0;
    return 0.46 + paint(r, Math.atan2(v, u)) + 0.03 * gauss();
  }));
}

function Bitmap({ data, label, show, tint }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = ref.current.getContext('2d');
    const img = ctx.createImageData(N, N);
    data.forEach((row, y) => row.forEach((v, x) => {
      const value = Math.round(clamp01(v) * 255);
      const i = (y * N + x) * 4;
      img.data[i] = tint ? value * 0.72 : value;
      img.data[i + 1] = tint ? value * 0.6 : value;
      img.data[i + 2] = value;
      img.data[i + 3] = 255;
    }));
    ctx.putImageData(img, 0, 0);
  }, [data, tint]);
  return <canvas ref={ref} className="wt-bitmap" width={N} height={N} role="img" aria-label={label} style={{ opacity: show }} />;
}

function DefectScene({ step, progress }) {
  const rows = useMemo(() => CLASSES.map((c, i) => {
    const image = makeImage(c.paint, 31 + i);
    return { ...c, image, freq: spectrum(image) };
  }), []);

  if (step === 4) {
    return (
      <div className="wt-readout wt-readout--center">
        <p className="wt-readout__big">{Math.round(clamp01(progress * 1.4) * 1000).toLocaleString()}+<span>images a day, no longer reviewed by hand</span></p>
        <p className="wt-story__result">84% classification accuracy on the real model</p>
      </div>
    );
  }

  return (
    <div className="wt-defects">
      <div className="wt-defects__head">
        <span>Coating image</span><span>FFT heatmap</span><span>Model output</span>
      </div>
      {rows.map((row) => (
        <div key={row.name} className="wt-defects__row">
          <Bitmap data={row.image} label={`Synthetic image: ${row.name}`} show={1} />
          <Bitmap data={row.freq} label={`FFT heatmap: ${row.name}`} show={step === 0 ? 0 : step === 1 ? clamp01(progress * 2) : 1} tint />
          <div className="wt-probs" style={{ opacity: step >= 2 ? 1 : 0 }}>
            {CLASSES.map((c, i) => {
              const fill = step === 2 ? 0.33 + 0.1 * Math.sin(progress * 18 + i * 2) : row.probs[i];
              return (
                <div key={c.name} className={`wt-prob${step === 3 && c.name === row.name ? ' is-top' : ''}`}>
                  <span>{c.name}</span>
                  <span className="wt-prob__track"><span style={{ width: `${fill * 100}%` }} /></span>
                  <span>{step === 3 ? `${Math.round(fill * 100)}%` : ''}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Skip factors: find drift, reset to default ───────────────────────── */

const SETTINGS = [['Process A', 'M1', 3, 3], ['Process A', 'V1', 2, 5], ['Process B', 'M1', 4, 4], ['Process B', 'M2', 3, 8], ['Process C', 'V2', 2, 2], ['Process D', 'M3', 5, 9]];
const FIND_SQL = 'SELECT process, layer, default_skip, current_skip\nFROM skip_settings\nWHERE current_skip <> default_skip;';
const RESET_SQL = 'UPDATE skip_settings\nSET current_skip = default_skip\nWHERE current_skip <> default_skip;';

function SkipScene({ step, progress }) {
  const sql = step >= 2 ? RESET_SQL : FIND_SQL;
  const typed = step === 0 || step === 2 ? sql.slice(0, Math.round(clamp01(progress * 1.6) * sql.length)) : sql;
  const drifted = SETTINGS.filter(([, , base, current]) => base !== current);
  const fixed = step === 2 ? Math.floor(clamp01((progress - 0.5) * 2.2) * (drifted.length + 1)) : step > 2 ? drifted.length : 0;
  const remaining = drifted.length - fixed;
  let driftIndex = -1;

  return (
    <div className="wt-skip">
      <pre className="wt-code" aria-label="Example SQL"><code>{typed}</code></pre>
      {step > 0 && (
        <table className="wt-skip__table">
          <thead><tr><th>Process</th><th>Layer</th><th>Default</th><th>Current</th></tr></thead>
          <tbody>
            {SETTINGS.map(([process, layer, base, current]) => {
              const isDrift = base !== current;
              if (isDrift) driftIndex += 1;
              const reset = isDrift && driftIndex < fixed;
              return (
                <tr key={process + layer} className={isDrift && !reset ? 'is-drift' : reset ? 'is-reset' : ''}>
                  <td>{process}</td><td>{layer}</td><td>1 in {base}</td><td>1 in {reset ? base : current}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {step > 0 && <p className="wt-charts__read">{remaining ? `${remaining} ${remaining === 1 ? 'setting has' : 'settings have'} drifted from ${remaining === 1 ? 'its default' : 'their defaults'}.` : 'Query returns 0 rows. Every setting is back on default.'}</p>}
      {step === 3 && <p className="wt-story__result">50 engineering hours saved a week</p>}
    </div>
  );
}

/* ── The four walkthroughs ────────────────────────────────────────────── */

const WALKTHROUGHS = {
  track: {
    title: 'Finding a hidden bottleneck',
    subtitle: 'Track throughput · Process control',
    Scene: TrackScene,
    steps: [
      { label: 'Log', duration: 5, text: 'A lithography track was moving fewer wafers than it should, but nothing was alarming. Every wafer leaves a timing record, so I started there.' },
      { label: 'I chart', duration: 7, text: 'An individuals chart plots each transfer against limits set from normal running. Noise stays inside the limits. Then the times jump, and the chart shows exactly when.' },
      { label: 'MR chart', duration: 5, text: 'The moving range plots the gap between consecutive wafers. One sharp spike means a sudden change in behavior, not a slow drift.' },
      { label: 'Trace', duration: 5.5, text: 'Comparing each module before and after the jump points to one place: the buffer unit. Its transfer mechanism had degraded, and everything upstream queued behind it.' },
      { label: 'Recover', duration: 5, text: 'With the cause isolated, the mechanism could be addressed and transfer times came back inside the limits.' },
    ],
  },
  overlay: {
    title: 'Turning measurements into corrections',
    subtitle: 'Overlay correction tool · Python',
    Scene: OverlayScene,
    steps: [
      { label: 'Measure', duration: 5.5, text: 'Every layer must land on the one below. Metrology measures how far off it is at sites across the wafer. Each arrow is one error, greatly enlarged.' },
      { label: 'Fit', duration: 6.5, text: 'The errors follow a pattern. A least-squares fit splits them into correctable terms: shift, scale and rotation. The tool does this for 500+ measurements per lot.' },
      { label: 'Correct', duration: 6, text: 'Subtract the fitted model and only small, random residuals remain. That is the part a scanner adjustment cannot remove.' },
      { label: 'Result', duration: 4.5, text: 'The fitted terms become scanner alignment corrections for the next wafers, replacing a manual, spreadsheet-driven job.' },
    ],
  },
  defects: {
    title: 'Teaching a model to spot coating defects',
    subtitle: 'Spin-coater defect classification · PyTorch',
    Scene: DefectScene,
    steps: [
      { label: 'Images', duration: 4, text: 'Spin-coating process images were reviewed by hand. Different problems look subtle and similar to the eye.' },
      { label: 'FFT', duration: 5, text: 'A fast Fourier transform turns each image into its frequency content. These heatmaps are real FFTs of the images on the left, so repeating patterns become clear, distinct shapes.' },
      { label: 'Network', duration: 4, text: 'The heatmaps go into a convolutional neural network, which learns which shapes mean which kind of defect.' },
      { label: 'Classify', duration: 5, text: 'For each image, the model scores every class and the highest score becomes its label.' },
      { label: 'Result', duration: 4.5, text: 'Deployed, it automated review of more than a thousand images a day.' },
    ],
  },
  skip: {
    title: 'Putting metrology settings back on default',
    subtitle: 'Skip-factor resets · Python and SQL',
    Scene: SkipScene,
    steps: [
      { label: 'Find', duration: 5, text: 'Fabs skip measuring some lots to save tool time. A skip factor sets how often. The first job is finding every setting that drifted from its process default.' },
      { label: 'Compare', duration: 4.5, text: 'Drifted settings mean a process is measured too little or wastes metrology time. Finding them by hand was repetitive.' },
      { label: 'Reset', duration: 6, text: 'Python and SQL restore each process-specific default automatically.' },
      { label: 'Verify', duration: 4.5, text: 'Running the check again confirms nothing is left, with no manual work.' },
    ],
  },
};

export default function SamsungWalkthrough({ id, onClose }) {
  const { title, subtitle, steps, Scene } = WALKTHROUGHS[id];
  return (
    <WalkthroughDialog title={title} subtitle={subtitle} steps={steps} note={NOTE} onClose={onClose}>
      {(pos) => <Scene {...pos} />}
    </WalkthroughDialog>
  );
}
