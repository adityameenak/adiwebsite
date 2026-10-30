export default function StatRow({ stats }) {
  return (
    <dl className="stat-row">
      {stats.map(([value, label]) => (
        <div key={label}>
          <dd>{value}</dd>
          <dt>{label}</dt>
        </div>
      ))}
    </dl>
  );
}
