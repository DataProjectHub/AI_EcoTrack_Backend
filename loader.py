# app/loader.py

import os
from dotenv import load_dotenv
load_dotenv()
user_agent = os.getenv("USER_AGENT")
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("Missing OPENAI_API_KEY environment variable")

# Optionally validate user agent too
if not user_agent:
    user_agent = "AI_EcoTrack/1.0 (contact:pujaa22@gmail.com)"  # default fallback


from langchain_community.document_loaders import (
    DirectoryLoader,
    PyPDFLoader,
    TextLoader,
    WebBaseLoader,
)
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings

from langchain_community.vectorstores import FAISS


def ingest():
    # 1. Load local PDFs
    data_path = os.path.join(os.path.dirname(__file__), "data")
    pdf_loader = DirectoryLoader(
        data_path,
        glob="**/*.pdf",
        loader_cls=PyPDFLoader
    )
    docs = pdf_loader.load()
    print(f"Loaded {len(docs)} PDF documents.")

    # 2. Load local TXTs
    txt_loader = DirectoryLoader(
        data_path,
        glob="**/*.txt",
        loader_cls=TextLoader
    )
    txt_docs = txt_loader.load()
    docs.extend(txt_docs)
    print(f"Loaded {len(txt_docs)} TXT documents (total {len(docs)} docs).")

    # 2. Load webpages
    urls = [
        "https://farmcarbontoolkit.org.uk/2025/01/28/methane-inhibitors-in-ruminant-diets-and-their-impact-on-greenhouse-gas-emissions/",
        "https://calculator.farmcarbontoolkit.org.uk/",
        "https://carbonherald.com/uae-farm-cashes-in-5-53m-from-carbon-credits/",
        "https://www.dairyreporter.com/Article/2023/09/11/Alltech-unveils-carbon-footprint-reduction-progam-in-UAE/?utm_source=chatgpt.com",
        "https://www.worldometers.info/co2-emissions/united-arab-emirates-co2-emissions/#google_vignette",
        "https://ourworldindata.org/co2/country/united-arab-emirates",
        "https://ourworldindata.org/grapher/methane-emissions?country=~ARE"
        # add more URLs here
    ]
    for url in urls:
        web_docs = WebBaseLoader(url).load()
        docs.extend(web_docs)
        print(f"Loaded {len(web_docs)} docs from {url}")

    # 3. Split into chunks
    splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(docs)
    print(f"Split into {len(chunks)} text chunks.")

    # 4. Embed & store in FAISS
    embeddings = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))
    
    faiss_index = FAISS.from_documents(chunks, embeddings)

    store_path = os.path.join(os.path.dirname(__file__), "vectorstore", "faiss_index")
    os.makedirs(os.path.dirname(store_path), exist_ok=True)
    faiss_index.save_local(store_path)
    print(f"FAISS index saved to {store_path}")

if __name__ == "__main__":
    ingest()
