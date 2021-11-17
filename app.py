from flask import Flask

app = Flask(__name__)

@app.route("/ping" ,methods=['GET'])
def hello_world():
    return "pong"

@app.route("/pdf" ,methods=['POST'])
def pdf():
    return "se tomo el pdf good"
