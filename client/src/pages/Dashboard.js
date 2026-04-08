import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/ideas")
      .then(res => setIdeas(res.data));
  }, []);

  return (
    <div style={{
      padding: "30px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ textAlign: "center" }}>📊 Ideas Dashboard</h1>

      {ideas.length === 0 ? (
        <p style={{ textAlign: "center" }}>No ideas yet</p>
      ) : (
        ideas.map(i => (
          <div
            key={i._id}
            onClick={() => navigate(`/idea/${i._id}`)}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "15px auto",
              width: "60%",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{i.title}</h3>
            <p>{i.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;