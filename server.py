from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

app = Flask(__name__)
CORS(app)
os.environ["GOOGLE_API_KEY"] = "xxxxxxxxxxxxxxxxxxx"
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

MODEL_NAME = "gemini-2.5-flash-lite"
model = genai.GenerativeModel(MODEL_NAME)

SYSTEM_PROMPT = """
You are a Football Match Recommendation AI.
Your role:
- Suggest football matches based on user descriptions
- Understand preferences like teams, leagues, countries, or playing style
- Recommend relevant real or hypothetical matches from global football
- Explain why each match is relevant
- Keep responses short, structured, and useful
- If user input is unclear, ask a follow-up question
"""

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "").strip()

    if not user_input:
        return jsonify({"reply": "Empty message received."}), 400

    try:
        full_prompt = SYSTEM_PROMPT + "\n\nUser request: " + user_input
        response = model.generate_content(full_prompt)

        return jsonify({"reply": response.text})

    except ResourceExhausted:
        return jsonify({"reply": "Quota exceeded. Try again later."}), 429

    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "Server error occurred."}), 500


@app.route("/")
def home():
    return "Football Match Recommendation Server Running"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
