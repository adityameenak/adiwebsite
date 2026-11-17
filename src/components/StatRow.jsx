export default function StatRow({ stats }) {
  return (
    <dl className="stat-row">
      {stats.map(([value, label]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
