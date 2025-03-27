from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle

app = Flask(__name__)

# Load the trained model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = np.array([
        data["profile_pic"], data["nums_length_username"],
        data["fullname_words"], data["nums_length_fullname"],
        data["name_equals_username"], data["description_length"],
        data["external_url"], data["private"],
        data["posts"], data["followers"], data["follows"]
    ]).reshape(1, -1)
    prediction = model.predict(features)[0]
    return jsonify({"fake_account": bool(prediction)})

if __name__ == "__main__":
    app.run(debug=True)
