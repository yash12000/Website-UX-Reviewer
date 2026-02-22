import { useEffect, useState } from "react";
import axios from "axios";

export default function Status() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/status")
      .then(res => setStatus(res.data));
  }, []);

  if (!status) return <p>Loading...</p>;

  return (
    <div>
      <h1>Status Page</h1>
      <p>Backend: {status.backend}</p>
      <p>Database: {status.database}</p>
      <p style={{ color: status.llm === "OK" ? "green" : "red" }}>
        LLM: {status.llm}
      </p>
    </div>
  );
}