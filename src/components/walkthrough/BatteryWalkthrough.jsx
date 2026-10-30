import WalkthroughDialog from './WalkthroughDialog';
import sim from '../../data/batteryRunaway.json';

/*
 * Replays real output from the switchable-barrier solver (see
 * github.com/adityameenak/switchable-barrier-runaway): cell temperatures, the
 * time each cell ignited, normal-use peaks and the 361-design map all come
 * from src/data/batteryRunaway.json, not hand-drawn curves.
 */

const STEPS = [
  {
    label: 'Normal use',
    duration: 4.5,
    text: 'A barrier between cells has two jobs. The first is everyday: let heat reach the cooling. A conductor and the switch both peak at 38.0 °C, while an insulator traps heat and runs at 64.5 °C.',
  },
  {
    label: 'Cell 1 fails',
    duration: 3.5,
    text: 'The second job starts when something goes wrong. I start cell 1 at 300 °C. It ignites within seconds and passes 800 °C in both stacks.',
  },
  {
    label: 'Ordinary barrier',
    duration: 8,
    text: 'An ordinary barrier keeps conducting, so heat flows straight into the next cell. A new cell ignites about every 16 seconds, and all five are gone in about a minute.',
  },
  {
    label: 'Switchable barrier',
    duration: 8,
    text: 'Same failure, new barrier. The face next to cell 1 turns insulating and holds the heat back. Cell 2 peaks near 114 °C and never ignites across a simulated hour.',
  },
  {
    label: '361 designs',
    duration: 6.5,
    text: 'I repeated this across 361 barrier designs. Every outcome was all or nothing, and one number decides it: hot-state conductance has to stay below about 32 W/m²·K. That gives a real material a clear target.',
  },
];

const NOTE = 'Real output from my simulation. Its inputs are illustrative placeholders, so these results are qualitative, not predictions for a real cell.';

const TRIGGER_END = 3;
const RUN_END = 80;

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/** Cell temperatures at time t, interpolated between solver snapshots. */
function cellsAt(run, t) {
  const i = run.t.findIndex((v) => v >= t);
  if (i <= 0) return run.cells[Math.max(i, 0)];
  const f = (t - run.t[i - 1]) / (run.t[i] - run.t[i - 1]);
  return run.cells[i].map((v, c) => run.cells[i - 1][c] + (v - run.cells[i - 1][c]) * f);
}

function HeatCell({ temp, ignited, index }) {
  const heat = clamp01((temp - 25) / 825);
  return (
    <div
      className={`wt-cell${ignited ? ' is-ignited' : ''}`}
      style={{
        background: `color-mix(in srgb, var(--heat) ${Math.round(heat * 100)}%, var(--surface-strong))`,
        color: heat > 0.5 ? 'var(--on-ink)' : 'var(--ink)',
      }}
    >
      <span className="wt-cell__name">Cell {index + 1}</span>
      <span className="wt-cell__temp">{Math.round(temp)}°</span>
    </div>
  );
}

function StackRow({ name, run, time, switching, dimmed }) {
  const temps = cellsAt(run, time);
  const ignited = run.runawayAt.map((t) => t !== null && t <= time);
  const count = ignited.filter(Boolean).length;
  const insulating = switching && time > 0;
  return (
    <div className={`wt-row${dimmed ? ' is-dimmed' : ''}`}>
      <div className="wt-row__head">
        <span className="wt-row__name">{name}</span>
        <span className="wt-row__stat">t = {Math.round(time)} s · {count} of 5 ignited</span>
      </div>
      <div className="wt-stack">
        {temps.map((temp, i) => (
          <div key={i} className="wt-stack__slot">
            <HeatCell temp={temp} ignited={ignited[i]} index={i} />
            {i < 4 && <span className={`wt-barrier${insulating && i === 0 ? ' is-off' : ''}`} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function NormalUse({ progress }) {
  const rows = [
    ['Conductor', sim.normalPeak.conductor],
    ['Insulator', sim.normalPeak.insulator],
    ['Switchable', sim.normalPeak.switchable],
  ];
  return (
    <div className="wt-bars">
      <p className="wt-scene-label">Peak temperature in normal use</p>
      {rows.map(([name, peak]) => (
        <div key={name} className={`wt-bar${peak > 50 ? ' is-hot' : ''}`}>
          <span className="wt-bar__name">{name}</span>
          <span className="wt-bar__track">
            <span style={{ width: `${clamp01(progress * 1.6) * ((peak - 25) / 45) * 100}%` }} />
          </span>
          <span className="wt-bar__value">{peak.toFixed(1)} °C</span>
        </div>
      ))}
    </div>
  );
}

function DesignMap({ progress }) {
  const { thicknessMm, kOff, contained } = sim.map;
  const left = 62;
  const right = 464;
  const top = 12;
  const bottom = 226;
  const x = (mm) => left + ((mm - 0.5) / 4.5) * (right - left);
  const y = (k) => bottom - ((Math.log10(k) - Math.log10(0.02)) / (0 - Math.log10(0.02))) * (bottom - top);
  // k_off / L = 32 W/m²K, drawn from where it enters the plot.
  const boundary = [0.625, 5].map((mm) => `${x(mm)},${y(0.032 * mm)}`).join(' ');
  const total = contained.flat().reduce((a, b) => a + b, 0);

  return (
    <div className="wt-map">
      <svg viewBox="0 0 480 272" role="img" aria-label={`Grid of 361 barrier designs by thickness and hot-state conductivity. ${total} contain runaway to one cell, all of them below the 32 W per square metre kelvin line.`}>
        {[0.02, 0.1, 1].map((k) => (
          <text key={k} className="wt-map__tick" x={left - 12} y={y(k) + 3.5} textAnchor="end">{k}</text>
        ))}
        {[0.5, 2, 3.5, 5].map((mm) => (
          <text key={mm} className="wt-map__tick" x={x(mm)} y={bottom + 18} textAnchor="middle">{mm}</text>
        ))}
        <text className="wt-map__axis" x={(left + right) / 2} y={bottom + 37} textAnchor="middle">Barrier thickness (mm)</text>
        <text className="wt-map__axis" transform={`translate(13 ${(top + bottom) / 2}) rotate(-90)`} textAnchor="middle">Hot-state k (W/m·K)</text>
        {kOff.map((k, row) => thicknessMm.map((mm, col) => {
          const shown = progress * 1.5 >= (row + col) / 36;
          return (
            <circle
              key={`${row}-${col}`}
              className={contained[row][col] ? 'wt-map__safe' : 'wt-map__lost'}
              cx={x(mm)}
              cy={y(k)}
              r="4"
              opacity={shown ? 1 : 0}
            />
          );
        }))}
        <polyline className="wt-map__line" points={boundary} style={{ opacity: clamp01((progress - 0.65) * 5) }} />
      </svg>
      <div className="wt-map__legend">
        <span><i className="is-safe" /> Contained to 1 cell ({total})</span>
        <span><i className="is-lost" /> Lost all 5 cells ({361 - total})</span>
        <span><i className="is-line" /> 32 W/m²·K limit</span>
      </div>
    </div>
  );
}

function Scene({ step, progress }) {
  if (step === 0) return <NormalUse progress={progress} />;
  if (step === 4) return <DesignMap progress={progress} />;

  const replay = (active) => {
    if (step < active) return TRIGGER_END;
    if (step > active) return RUN_END;
    return TRIGGER_END + progress * (RUN_END - TRIGGER_END);
  };
  const conductorTime = step === 1 ? progress * TRIGGER_END : replay(2);
  const switchableTime = step === 1 ? progress * TRIGGER_END : replay(3);

  return (
    <div className="wt-rows">
      <StackRow name="Ordinary barrier" run={sim.runs.conductor} time={conductorTime} dimmed={step === 3} />
      <StackRow name="Switchable barrier" run={sim.runs.switchable} time={switchableTime} switching dimmed={step === 2} />
      <p className="wt-rows__key">
        <span className="wt-barrier" aria-hidden="true" /> Conducting
        <span className="wt-barrier is-off" aria-hidden="true" /> Insulating
      </p>
    </div>
  );
}

export default function BatteryWalkthrough({ onClose }) {
  return (
    <WalkthroughDialog
      title="How the barrier stops a chain reaction"
      subtitle="Five-cell battery stack · Finite-volume simulation in Python"
      steps={STEPS}
      note={NOTE}
      onClose={onClose}
    >
      {(pos) => <Scene {...pos} />}
    </WalkthroughDialog>
  );
}
