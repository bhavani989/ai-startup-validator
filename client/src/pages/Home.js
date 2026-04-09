import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("https://ai-startup-validator-zwvc.onrender.com/ideas", {
        title,
        description
      });

      navigate("/dashboard");
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "350px",
          textAlign: "center"
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#333" }}>
          🚀 Startup Validator
        </h1>

        <input
          type="text"
          placeholder="Enter Idea Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <textarea
          placeholder="Enter Idea Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={submit}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Analyze Idea
        </button>
      </div>
    </div>
  );
}

export default Home;
