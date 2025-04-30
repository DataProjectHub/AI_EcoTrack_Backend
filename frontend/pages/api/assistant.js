// frontend/pages/api/assistant.js

const flaskURL = process.env.NEXT_PUBLIC_FLASK_URL || "http://127.0.0.1:5000";
export default async function handler(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  
    // Forward to your Flask RAG endpoint

    try {
        const flaskRes = await fetch(`${flaskURL}/assistant`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });
        const json = await flaskRes.json();
        return res.status(flaskRes.status).json(json);
    } catch (err) {
        console.error("Flask error:", err);
        return res.status(500).json({ answer: "Sorry, the assistant is currently offline." });
    }
}
  