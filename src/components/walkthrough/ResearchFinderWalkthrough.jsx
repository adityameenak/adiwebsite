import WalkthroughDialog from './WalkthroughDialog';

/*
 * School counts and the Texas A&M funnel are real (live dataset, one real run
 * of the matcher for this query). The four professors are invented, so no real
 * person gets a public "fit" label, but their scores are what the real
 * matcher returns for them, with research-output weighting left neutral.
 */

const STEPS = [
  {
    label: 'Collect',
    duration: 4.5,
    text: 'Faculty pages are scattered across hundreds of department sites. Python crawlers pull them into one dataset, merge joint appointments into a single record, and standardize department names.',
  },
  {
    label: 'Interests',
    duration: 3.5,
    text: 'A student says what they want to work on, in their own words. The matcher breaks that into search terms.',
  },
  {
    label: 'Score',
    duration: 4.5,
    text: 'Each professor is scored by how well those terms overlap their research, and a term found in the research itself counts extra. Stated interests are the main signal.',
  },
  {
    label: 'Resume',
    duration: 5,
    text: 'The resume adds a smaller boost, worth 35% per match and capped at the interest score. Prof. D matches much of the resume but only one interest, so the cap stops them outranking real interest matches.',
  },
  {
    label: 'Rank',
    duration: 5.5,
    text: 'Scores also scale with appointment type and research output, so active labs rank higher. The top 20 get fit labels based on how close they are to the best match.',
  },
  {
    label: 'Reach out',
    duration: 6.5,
    text: "Finally, Claude drafts a personal email from the professor's own research and recent papers plus the student's resume. The student edits it and sends it themselves.",
  },
];

const NOTE = 'School counts and the Texas A&M numbers are real. The professors and email are invented examples, scored with the real matching formula.';

const SCHOOLS = [
  ['Texas A&M', 1619], ['Michigan', 1606], ['Florida', 1224], ['UCLA', 1132], ['UT Austin', 1109],
  ['MIT', 772], ['UT Dallas', 606], ['Rice', 608], ['Harvard', 412],
].sort((a, b) => b[1] - a[1]);

const QUERY = 'lithium-ion battery safety and thermal management';
const TOKENS = ['lithium', 'ion', 'battery', 'safety', 'thermal', 'management'];

const PROFS = [
  {
    id: 'A', dept: 'Mechanical', fit: 'Strong fit', interest: 24.5, resume: 1.75,
    research: 'Thermal runaway in lithium-ion battery packs, and battery thermal management with phase change materials.',
  },
  {
    id: 'B', dept: 'Materials', fit: 'Exploratory fit', interest: 13.5, resume: 1.75,
    research: 'Solid-state lithium-ion battery electrolytes and interfaces, studied with SEM and XRD.',
  },
  {
    id: 'C', dept: 'Chemical', fit: 'Adjacent fit', interest: 4.5, resume: 1.75,
    research: 'Process safety and fire risk in hydrogen and energy storage systems.',
  },
  {
    id: 'D', dept: 'Geology', fit: 'Exploratory fit', interest: 4.5, resume: 4.5, uncapped: 8.75,
    research: 'Thermal history of rocks. Energy, materials science and heat transfer simulation in Python, with SEM and XRD.',
  },
];

const MAX_SCORE = 26.25;
const ROW_HEIGHT = 66;
const FINAL_ORDER = ['A', 'B', 'D', 'C'];

const FUNNEL = [['1,619', 'faculty'], ['1,427', 'list research'], ['181', 'match'], ['20', 'shown']];

const EMAIL = {
  subject: 'Your work on thermal runaway in battery packs',
  body: "Dear Prof. A,\n\nYour paper on phase change materials in lithium-ion packs caught my eye, because I've been modeling how heat moves between cells. I'd love to learn how your group tests these materials at the pack scale.\n\nWould you have time to talk about undergraduate research in your lab this spring?",
};

const clamp01 = (v) => Math.min(1, Math.max(0, v));

function Highlighted({ text }) {
  const parts = text.split(new RegExp(`\\b(${TOKENS.join('|')})\\b`, 'gi'));
  return parts.map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

function Collect({ progress }) {
  return (
    <div className="wt-schools">
      <p className="wt-scene-label">
        <strong>{Math.round(clamp01(progress * 1.5) * 9088).toLocaleString()}</strong> faculty across 9 universities
      </p>
      <ul>
        {SCHOOLS.map(([name, count], i) => (
          <li key={name}>
            <span className="wt-schools__name">{name}</span>
            <span className="wt-schools__track">
              <span style={{ width: `${clamp01(progress * 2 - i * 0.08) * (count / 1619) * 100}%` }} />
            </span>
            <span className="wt-schools__count">{count.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Interests({ progress }) {
  const typed = QUERY.slice(0, Math.round(clamp01(progress * 1.8) * QUERY.length));
  return (
    <div className="wt-query">
      <p className="wt-scene-label">What do you want to research?</p>
      <p className="wt-query__input">{typed}<span className="wt-query__caret" aria-hidden="true" /></p>
      <p className="wt-scene-label">Search terms</p>
      <ul className="wt-query__tokens">
        {TOKENS.map((token, i) => (
          <li key={token} className={progress >= 0.58 + i * 0.05 ? 'is-on' : ''}>{token}</li>
        ))}
      </ul>
    </div>
  );
}

function Ranking({ step, progress }) {
  const ranked = step === 4;
  const interestShown = step === 2 ? clamp01(progress * 1.6) : 1;
  const resumeShown = step === 2 ? 0 : step === 3 ? clamp01(progress * 1.6) : 1;

  return (
    <div className="wt-rank">
      <div className="wt-rank__list" style={{ height: ROW_HEIGHT * PROFS.length }}>
        {PROFS.map((prof, i) => {
          const position = ranked ? FINAL_ORDER.indexOf(prof.id) : i;
          const capped = prof.uncapped && step >= 3;
          return (
            <div key={prof.id} className="wt-prof" style={{ transform: `translateY(${position * ROW_HEIGHT}px)` }}>
              <p className="wt-prof__who">
                <strong>Prof. {prof.id}</strong>
                <span>{prof.dept}</span>
              </p>
              <p className="wt-prof__research"><Highlighted text={prof.research} /></p>
              <div className="wt-prof__score">
                <span className="wt-prof__track">
                  <span className="is-interest" style={{ width: `${(prof.interest / MAX_SCORE) * interestShown * 100}%` }} />
                  <span className="is-resume" style={{ width: `${(prof.resume / MAX_SCORE) * resumeShown * 100}%` }} />
                </span>
                <span className={`wt-prof__tag${ranked ? ' is-fit' : ''}`}>
                  {ranked ? prof.fit : capped ? 'Resume capped' : (prof.interest + prof.resume * resumeShown).toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {ranked ? (
        <ol className="wt-funnel" aria-label="Texas A&M, one real search">
          {FUNNEL.map(([value, label]) => <li key={label}><strong>{value}</strong> {label}</li>)}
        </ol>
      ) : (
        <p className="wt-rank__key">
          <i className="is-interest" /> Interest match
          <i className="is-resume" /> Resume boost
        </p>
      )}
    </div>
  );
}

function Outreach({ progress }) {
  const shown = Math.round(clamp01(progress * 1.25) * EMAIL.body.length);
  return (
    <div className="wt-email">
      <ul className="wt-email__sources">
        <li>Prof. A's research</li>
        <li>Their recent papers</li>
        <li>Student's resume</li>
      </ul>
      <div className="wt-email__draft">
        <p className="wt-email__subject"><span>Subject</span> {EMAIL.subject}</p>
        <p className="wt-email__body">{EMAIL.body.slice(0, shown)}</p>
      </div>
    </div>
  );
}

function Scene({ step, progress }) {
  if (step === 0) return <Collect progress={progress} />;
  if (step === 1) return <Interests progress={progress} />;
  if (step === 5) return <Outreach progress={progress} />;
  return <Ranking step={step} progress={progress} />;
}

export default function ResearchFinderWalkthrough({ onClose }) {
  return (
    <WalkthroughDialog
      title="From a research interest to a first email"
      subtitle="STEM Research Finder · Example search"
      steps={STEPS}
      note={NOTE}
      onClose={onClose}
    >
      {(pos) => <Scene {...pos} />}
    </WalkthroughDialog>
  );
}
