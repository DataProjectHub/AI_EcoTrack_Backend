# app/app.py
import os
from waitress import serve
from flask import Flask, request, jsonify
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.schema import SystemMessage, HumanMessage
app = Flask(__name__)
# Load credentials from environment (ensure no unicode ellipses)
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("Missing OPENAI_API_KEY environment variable")
# Optional: set a USER_AGENT env var externally, default below
user_agent = os.getenv("USER_AGENT", "AI_EcoTrack/1.0 (+https://yourdomain.com)")

# Inject into os.environ for downstream libraries
os.environ["OPENAI_API_KEY"] = api_key
os.environ["USER_AGENT"] = user_agent

app = Flask(__name__)

# 1. Load FAISS vectorstore
embeddings = OpenAIEmbeddings(openai_api_key=api_key)
vectorstore_path = os.path.join(os.path.dirname(__file__), "vectorstore", "faiss_index")
vectorstore = FAISS.load_local(
    vectorstore_path,
    embeddings,
    allow_dangerous_deserialization=True
)

# 2. Prepare retriever & RAG chain
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.0),
    chain_type="stuff",
    retriever=retriever
)

# 3. Standalone Chat model for fallback
chat_model = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.0)


@app.route("/", methods=["GET"])
def home():
    return "✅ AI EcoTrack backend is running!", 200

@app.route("/assistant", methods=["POST"])
def assistant():
    data = request.json or {}
    query = data.get("query", "").strip()
    if not query:
        return jsonify({"error": "No query provided"}), 400

    # Debug: show retrieved chunks
    docs = retriever.get_relevant_documents(query)
    print(f"[DEBUG] Retrieved {len(docs)} chunks for query: {query}")
    for i, doc in enumerate(docs, 1):
        src = doc.metadata.get("source", "unknown")
        snippet = doc.page_content[:100].replace("\n", " ")
        print(f"  {i}. {src} → {snippet}…")

    # Run the RAG chain
    rag_answer = qa_chain.run(query).strip()
    print(f"[DEBUG] RAG answer: {rag_answer}")

    # Fallback: if RAG begins "I don", call LLM directly
    if rag_answer.lower().startswith("i don"):
        print("[DEBUG] Falling back to direct LLM call")
        system_msg = SystemMessage(content="You are an AI assistant. Answer questions honestly.")
        user_msg = HumanMessage(content=query)
        response = chat_model([system_msg, user_msg])
        final_answer = response.content.strip()
    else:
        final_answer = rag_answer

    return jsonify({"answer": final_answer})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
