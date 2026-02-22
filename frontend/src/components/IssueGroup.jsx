export default function IssueGroup({ title, items }) {
  return (
    <div>
      <h3>{title}</h3>
      {items.map((i, idx) => (
        <div key={idx}>
          <p>{i.issue}</p>
          <small>{i.why}</small>
          <p>Proof: {i.proof}</p>
        </div>
      ))}
    </div>
  );
}