import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Detail() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);

  const reportRef = useRef(); // 👈 for PDF capture

  useEffect(() => {
    axios.get(`http://localhost:5000/ideas/${id}`)
      .then(res => setIdea(res.data));
  }, [id]);

  const downloadPDF = async () => {
    const element = reportRef.current;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save("startup-report.pdf");
  };

  if (!idea) return <p>Loading...</p>;

  const r = idea.report;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>{idea.title}</h1>
      <p>{idea.description}</p>

      {/* 👇 THIS PART WILL BE IN PDF */}
      <div ref={reportRef} style={{ background: "#fff", padding: "20px" }}>
        <h3>Problem</h3>
        <p>{r.problem}</p>

        <h3>Customer</h3>
        <p>{r.customer}</p>

        <h3>Market</h3>
        <p>{r.market}</p>

        <h3>Competitors</h3>
        <ul>
          {r.competitor.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <h3>Tech Stack</h3>
        <ul>
          {r.tech_stack.map((t, i) => <li key={i}>{t}</li>)}
        </ul>

        <h3>Risk Level</h3>
        <p>{r.risk_level}</p>

        <h3>Profitability Score</h3>
        <p>{r.profitability_score}</p>

        <h3>Justification</h3>
        <p>{r.justification}</p>
      </div>

      {/* 👇 DOWNLOAD BUTTON */}
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        📄 Download PDF
      </button>
    </div>
  );
}

export default Detail;