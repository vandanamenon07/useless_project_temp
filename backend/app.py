import os
import json
import random
from pathlib import Path
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
try:
    from .model import predict_risk
except ImportError:
    from model import predict_risk

# 1. Load .env directly from the backend folder
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

# 2. Read the key and initialize client
api_key = os.getenv("GEMINI_API_KEY")
model_name = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")
client = genai.Client(api_key=api_key) if api_key else None

# 3. Initialize Flask and CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

if not api_key:
    print("WARNING: GEMINI_API_KEY is not set in backend/.env")
@app.route("/", methods=["GET"])
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "online",
        "service": "THINNAYILE KAARYAM API (Gemini Powered)",
        "version": "2.0.0"
    })

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    print("\n" + "="*50)
    print("📥 INCOMING REQUEST RECEIVED AT /predict")
    try:
        data = request.get_json(force=True) or {}
        decision = data.get("decision", "").strip()
        environment = data.get("environment", "Village").strip()

        if not decision:
            return jsonify({"error": "decision is required"}), 400

        print(f"👉 Decision: '{decision}' | Environment: '{environment}'")

        # Run ML risk scoring
        result = predict_risk(decision, environment)
        score = result.get("risk_score", 75)
        category = result.get("category", "HIGH")

        clean_decision = decision.rstrip(" .!?")
        short_decision = clean_decision[:37] + "..." if len(clean_decision) > 40 else clean_decision

        prompt = f"""
        Act as judgmental Kerala Malayali neighborhood aunties gossiping on a veranda (thinnayil) and community members.
        The user made this decision: "{decision}".
        The setting/environment is strictly: "{environment}".
        Adjust the tone, vocabulary, and gossip transmission medium specifically for "{environment}":
          - If "Village": tea shop (chayakada), temple gate, looking over the compound wall (kaithari/mathil).
          - If "Town": Residents Association meetings, badminton court, apartment balconies.
          - If "College": Canteen judges, hostel wardens, college bus whispers, campus politics.
          - If "City": Luxury apartment WhatsApp groups, society noticeboards, gym gossip.

        Return ONLY a JSON object (no markdown, no code block) matching this schema:
        {{
            "verdict": "A sharp, witty 1-sentence gossip decree customized to {environment}",
            "messages": [
                {{"id": "1", "sender": "Aunty 1 (Radhamani)", "senderColor": "#e05638", "time": "10:14 AM", "message": "Shocked Malayali aunty comment tailored to {environment}", "isUser": false}},
                {{"id": "2", "sender": "Aunty 2 (Shyamala)", "senderColor": "#2b8a3e", "time": "10:15 AM", "message": "Dramatic gossip exaggeration", "isUser": false}},
                {{"id": "3", "sender": "Aunty 1 (Radhamani)", "senderColor": "#e05638", "time": "10:15 AM", "message": "Bringing up family prestige or marriage prospects", "isUser": false}},
                {{"id": "4", "sender": "Aunty 3 (Leela)", "senderColor": "#1971c2", "time": "10:16 AM", "message": "Scandalized remark comparing with others", "isUser": false}},
                {{"id": "5", "sender": "Aunty 2 (Shyamala)", "senderColor": "#2b8a3e", "time": "10:17 AM", "message": "Dramatic ending remark (Ayyo daivame, enthoru kashtam!)", "isUser": false}}
            ],
            "relative_decision": "A toxic relative comparison suited to {environment}",
            "relative_reaction": "How the community praises that relative unconditionally",
            "eyewitness_reaction": "First eyewitness observation in {environment}",
            "megaphone_reaction": "How the gossip begins spreading in {environment}",
            "cousin_reaction": "How the news is relayed to family",
            "broadcast_reaction": "How the WhatsApp group circulates the story"
        }}
        """

        verdict = f"The {environment} thinnayil has started discussing."
        whatsapp_chat = []
        rel_dec = "Someone's son: Bought a BMW on 7-year EMI with zero savings"
        rel_react = "“Such an ambitious boy! Very settled in life.”"
        net_eye = f"Spotted near the local area in {environment}"
        net_mega = "Called her sister immediately"
        net_cousin = "Comparing with her gold medalist daughter"
        net_bcast = "Forwarded as received on WhatsApp group"

        try:
            if client is None:
                raise RuntimeError("GEMINI_API_KEY is not configured")

            print("📡 Sending prompt to Gemini...")
            llm_res = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )

            raw_text = llm_res.text.strip()
            parsed = json.loads(raw_text)

            whatsapp_chat = parsed.get("messages", [])
            verdict = parsed.get("verdict", verdict)
            rel_dec = parsed.get("relative_decision", rel_dec)
            rel_react = parsed.get("relative_reaction", rel_react)
            net_eye = parsed.get("eyewitness_reaction", net_eye)
            net_mega = parsed.get("megaphone_reaction", net_mega)
            net_cousin = parsed.get("cousin_reaction", net_cousin)
            net_bcast = parsed.get("broadcast_reaction", net_bcast)
            print("✅ GEMINI GENERATION SUCCESSFUL!")

        except Exception as err:
            print("❌ GEMINI CALL FAILED:", err)
            return jsonify({"error": "Gemini prediction failed", "details": str(err)}), 502

        meanwhile = {
            "user_decision": decision,
            "user_reaction": "🚨 SOCIAL EMERGENCY AT THE THINNAYIL 🚨" if score > 50 else "👀 SUSPICIOUS STARES 👀",
            "relative_decision": rel_dec,
            "relative_reaction": rel_react
        }

        network_nodes = [
            {"id": "node-1", "label": "You", "role": "The Culprit", "icon": "user", "reaction": f"Decided to {short_decision}"},
            {"id": "node-2", "label": "Neighbour A", "role": "First Eyewitness", "icon": "eye", "reaction": net_eye},
            {"id": "node-3", "label": "Aunty Next Door", "role": "The Megaphone", "icon": "megaphone", "reaction": net_mega},
            {"id": "node-4", "label": "Second Cousin", "role": "Family Informant", "icon": "users", "reaction": net_cousin},
            {"id": "node-5", "label": "Community Group", "role": "Broadcast Network", "icon": "message-circle", "reaction": net_bcast}
        ]

        payload = {
            "risk_score": score,
            "category": category,
            "environment": environment,
            "decision": decision,
            "verdict": verdict,
            "factors": result.get("factors", {}),
            "whatsapp_chat": whatsapp_chat,
            "meanwhile": meanwhile,
            "gossip_network": network_nodes
        }
        return jsonify(payload)

    except Exception as e:
        print("❌ GENERAL SERVER ERROR:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("Starting THINNAYILE KAARYAM Flask API on http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)