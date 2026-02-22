import { useState } from "react";
import { API } from "../api";
import ReviewCard from "../components/ReviewCard";

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  
  const [compareMode, setCompareMode] = useState(false);
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [compareData, setCompareData] = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState("");

  console.log("Rendering Home", data);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError("");

      if (!url) {
        setError("Please enter URL");
        setLoading(false);
        return;
      }

      const res = await API.post("/review", { url });
      console.log("API RESPONSE:", res.data);
      setData(res.data.review);
      setHistory(res.data.history || []);
    } catch (err) {
      console.log("Analyze error:", err);
      setError("Backend error");
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async () => {
    try {
      setCompareLoading(true);
      setCompareError("");

      if (!url1 || !url2) {
        setCompareError("Enter both URLs");
        setCompareLoading(false);
        return;
      }

      const [res1, res2] = await Promise.allSettled([
        API.post("/review", { url: url1 }),
        API.post("/review", { url: url2 })
      ]);

      const data1 = res1.status === "fulfilled" ? res1.value.data.review : null;
      const data2 = res2.status === "fulfilled" ? res2.value.data.review : null;

      if (!data1 && !data2) {
        setCompareError("Both URLs failed to analyze");
        setCompareLoading(false);
        return;
      }

      const score1 = data1?.score ?? 0;
      const score2 = data2?.score ?? 0;
      const difference = Math.abs(score1 - score2);
      let winner = "Tie";
      
      if (score1 > score2) winner = url1;
      else if (score2 > score1) winner = url2;

      setCompareData({ 
        data1, 
        data2, 
        url1, 
        url2, 
        score1, 
        score2, 
        difference, 
        winner 
      });

    } catch (err) {
      console.error("Compare error:", err);
      setCompareError("Comparison failed - check URLs and try again");
    } finally {
      setCompareLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", padding: "24px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "700", color: "#1a202c", margin: "0 0 8px 0" }}>
            🔍 Website UX Reviewer
          </h1>
          <p style={{ fontSize: "16px", color: "#718096", margin: 0 }}>
            Analyze and compare website user experience with AI insights
          </p>
        </div>

        <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#2d3748", marginTop: 0 }}>
            📊 Analyze Single Website
          </h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <input
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
              style={{ 
                flex: 1, 
                minWidth: "200px",
                padding: "12px", 
                border: "2px solid #e2e8f0", 
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3182ce"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
            <button 
              onClick={handleAnalyze} 
              disabled={loading}
              style={{ 
                padding: "12px 24px", 
                backgroundColor: loading ? "#cbd5e0" : "#3182ce", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "background-color 0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#2c5aa0")}
              onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#3182ce")}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: "12px", padding: "12px", backgroundColor: "#fed7d7", color: "#c53030", borderRadius: "8px", fontSize: "14px" }}>
              ⚠️ {error}
            </div>
          )}

          {!data && !error && (
            <p style={{ marginTop: "12px", color: "#718096", fontSize: "14px", fontStyle: "italic" }}>
              💡 Enter a website URL above to analyze its UX
            </p>
          )}
        </div>

        {data && (
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#2d3748", margin: 0 }}>
                📈 Analysis Results
              </h2>
              <span style={{ fontSize: "24px", fontWeight: "700", color: data.score > 70 ? "#22863a" : data.score > 50 ? "#f59e0b" : "#dc2626" }}>
                {data.score}/100
              </span>
            </div>
            <ReviewCard review={data} />
          </div>
        )}

        {history.length > 0 && (
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#2d3748", marginTop: 0 }}>
              📋 Recent Reviews ({history.length})
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "12px" }}>
              {history.map((item, i) => (
                <div key={i} style={{ backgroundColor: "#f7fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <p style={{ margin: "0 0 8px 0", fontWeight: "600", fontSize: "13px", color: "#2d3748", wordBreak: "break-all" }}>
                    {item.url}
                  </p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: "14px", 
                    fontWeight: "700",
                    color: item.review?.score > 70 ? "#22863a" : item.review?.score > 50 ? "#f59e0b" : "#dc2626" 
                  }}>
                    Score: {item.review?.score ?? "-"}/100
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#2d3748", marginTop: 0 }}>
            ⚖️ Compare Two Websites
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <input
              placeholder="First URL"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              style={{ 
                padding: "12px", 
                border: "2px solid #e2e8f0", 
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit"
              }}
              onFocus={(e) => e.target.style.borderColor = "#48bb78"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
            <input
              placeholder="Second URL"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCompare()}
              style={{ 
                padding: "12px", 
                border: "2px solid #e2e8f0", 
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit"
              }}
              onFocus={(e) => e.target.style.borderColor = "#48bb78"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
          <button 
            onClick={handleCompare} 
            disabled={compareLoading}
            style={{ 
              width: "100%",
              padding: "12px 24px", 
              backgroundColor: compareLoading ? "#cbd5e0" : "#48bb78", 
              color: "white", 
              border: "none", 
              borderRadius: "8px", 
              cursor: compareLoading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => !compareLoading && (e.target.style.backgroundColor = "#38a169")}
            onMouseOut={(e) => !compareLoading && (e.target.style.backgroundColor = "#48bb78")}
          >
            {compareLoading ? "Comparing..." : "Compare"}
          </button>

          {compareError && (
            <div style={{ marginTop: "12px", padding: "12px", backgroundColor: "#fed7d7", color: "#c53030", borderRadius: "8px", fontSize: "14px" }}>
              ⚠️ {compareError}
            </div>
          )}

          {!compareData && !compareError && (
            <p style={{ marginTop: "12px", color: "#718096", fontSize: "14px", fontStyle: "italic" }}>
              💡 Enter two URLs to compare their UX scores
            </p>
          )}
        </div>

        {compareData && (
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "2px solid #48bb78", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#2d3748", marginTop: 0 }}>
              🏆 Comparison Results
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              {compareData.data1 ? (
                <div style={{ padding: "16px", border: "2px solid #e2e8f0", borderRadius: "8px", backgroundColor: compareData.score1 > 70 ? "#f0fdf4" : "#fef3c7" }}>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#718096", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Website 1
                  </h4>
                  <p style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "700", color: compareData.score1 > 70 ? "#22863a" : "#f59e0b" }}>
                    {compareData.score1}/100
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#718096", wordBreak: "break-all" }}>
                    {compareData.url1}
                  </p>
                </div>
              ) : (
                <div style={{ padding: "16px", border: "2px solid #feb2b2", borderRadius: "8px", backgroundColor: "#fef2f2" }}>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#718096" }}>Website 1</h4>
                  <p style={{ margin: 0, color: "#c53030", fontWeight: "600", fontSize: "14px" }}>❌ Failed to analyze</p>
                </div>
              )}

              {compareData.data2 ? (
                <div style={{ padding: "16px", border: "2px solid #e2e8f0", borderRadius: "8px", backgroundColor: compareData.score2 > 70 ? "#f0fdf4" : "#fef3c7" }}>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#718096", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Website 2
                  </h4>
                  <p style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "700", color: compareData.score2 > 70 ? "#22863a" : "#f59e0b" }}>
                    {compareData.score2}/100
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#718096", wordBreak: "break-all" }}>
                    {compareData.url2}
                  </p>
                </div>
              ) : (
                <div style={{ padding: "16px", border: "2px solid #feb2b2", borderRadius: "8px", backgroundColor: "#fef2f2" }}>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#718096" }}>Website 2</h4>
                  <p style={{ margin: 0, color: "#c53030", fontWeight: "600", fontSize: "14px" }}>❌ Failed to analyze</p>
                </div>
              )}
            </div>

            {compareData.data1 && compareData.data2 && (
              <div style={{ padding: "16px", backgroundColor: "#ecfdf5", border: "2px solid #48bb78", borderRadius: "8px", marginBottom: "20px" }}>
                <p style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#22863a" }}>
                  🎯 Winner: {compareData.winner === "Tie" ? "Tie" : compareData.winner.split("://")[1]?.split("/")[0] || compareData.winner} 
                  <br />
                  (Difference: {compareData.difference} points)
                </p>
              </div>
            )}

            {compareData.data1 && (
              <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f7fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ marginTop: 0, color: "#2d3748" }}>📊 {compareData.url1.split("://")[1]?.split("/")[0] || compareData.url1} - Details</h4>
                <ReviewCard review={compareData.data1} />
              </div>
            )}

            {compareData.data2 && (
              <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f7fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ marginTop: 0, color: "#2d3748" }}>📊 {compareData.url2.split("://")[1]?.split("/")[0] || compareData.url2} - Details</h4>
                <ReviewCard review={compareData.data2} />
              </div>
            )}

            {!compareData.data1 && !compareData.data2 && (
              <p style={{ color: "#c53030", fontWeight: "600", margin: 0 }}>Unable to compare - both URLs failed</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}