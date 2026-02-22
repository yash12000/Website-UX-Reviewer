import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ReviewCard({ review }) {
  if (!review) return null;

  const issues = review.issues || [];

  const grouped = {};

  issues.forEach((i) => {
    const cat = i.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(i);
  });

  return (
    <div>
      <h2>Score: {review.score || 0}</h2>

      <BarChart width={300} height={200} data={[{ name: "UX Score", value: review.score || 0 }]}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>

      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <h3>{cat}</h3>
          {items.map((it, idx) => (
            <div key={idx}>
              <p>{it.issue}</p>
              <p>{it.why}</p>
              <p><b>Proof:</b> {it.proof}</p>
            </div>
          ))}
        </div>
      ))}

      <h3>Top Improvements</h3>
      {(review.improvements || []).map((imp, i) => (
        <div key={i}>
          <p>Before: {imp.before}</p>
          <p>After: {imp.after}</p>
        </div>
      ))}
    </div>
  );
}