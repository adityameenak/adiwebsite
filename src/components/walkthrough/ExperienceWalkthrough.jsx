import { Suspense, lazy } from 'react';
import WalkthroughDialog from './WalkthroughDialog';

const Diagram = lazy(() => import('../experience/diagrams'));

// Long enough for each diagram's entrance animation and the step text.
const STEP_SECONDS = 8;

function Scene({ step }) {
  return (
    <div className="wt-story" key={step.label}>
      {step.diagram && (
        <Suspense fallback={<div className="dg-placeholder" />}>
          <Diagram id={step.diagram} label={`Diagram: ${step.label}`} />
        </Suspense>
      )}
      {step.chain && (
        <ol className="wt-chain">
          {step.chain.map((stage) => <li key={stage}>{stage}</li>)}
        </ol>
      )}
      {step.findings && (
        <ul className="wt-findings">
          {step.findings.map(([value, label]) => (
            <li key={value}><strong>{value}</strong> {label}</li>
          ))}
        </ul>
      )}
      {step.result && <p className="wt-story__result">{step.result}</p>}
    </div>
  );
}

/** Walkthrough driven by the `walkthrough` data on an experience entry. */
export default function ExperienceWalkthrough({ walkthrough, onClose }) {
  const steps = walkthrough.steps.map((step) => ({ ...step, duration: STEP_SECONDS }));
  return (
    <WalkthroughDialog
      title={walkthrough.title}
      subtitle={walkthrough.subtitle}
      steps={steps}
      note={walkthrough.note}
      onClose={onClose}
    >
      {({ step }) => <Scene step={steps[step]} />}
    </WalkthroughDialog>
  );
}
