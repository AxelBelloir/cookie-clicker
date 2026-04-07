from flask import Flask, request, jsonify
from flask_cors import CORS

# =============== FLASK ===============

app = Flask(__name__)
CORS(app)

@app.route("/api/test", methods=["POST"])

def test():
    return jsonify({"message":"ca marche"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
