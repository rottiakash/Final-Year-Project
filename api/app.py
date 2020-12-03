from flask import Flask
from flask.globals import request
import plotly.graph_objects as go
import numpy as np
import pandas as pd
from flask import render_template
from sklearn.neighbors import LocalOutlierFactor
from sklearn.covariance import EllipticEnvelope
from sklearn.ensemble import IsolationForest
from sklearn.svm import OneClassSVM
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
algorithms = [
    (LocalOutlierFactor(n_neighbors=1)),
    OneClassSVM(),
    EllipticEnvelope(),
    IsolationForest(behaviour='new')
]


@app.route("/", methods=["POST"])
def index():
    try:
        data = request.get_json()
        df = pd.read_csv("./covid_19_india.csv")
        df = df[df['State/UnionTerritory'] == data["State"]]
        df["Confirmed"] = df["Confirmed"].diff()
        df = df.dropna()
        X = df[["Date", "Confirmed"]].values
        clf = algorithms[int(data["Algorithm"])]
        X = X[:, 1].reshape(X.shape[0], 1)
        if int(data["Algorithm"]) == 0:
            Y = clf.fit_predict(X)
        else:
            Y = clf.fit(X).predict(X)
        df["Anomaly"] = Y
        a = df[df["Anomaly"] == -1]
        fig = go.Figure()
        fig.add_trace(go.Scatter(
            x=df["Date"], y=df["Confirmed"], name='Confirmed'))
        fig.add_trace(go.Scatter(
            x=a["Date"], y=a["Confirmed"], mode='markers', name='Anomaly'))
        fig.update_layout(showlegend=True, title='Detected anomalies(Algorithm:%s, State:%s)' % (
            str(algorithms[int(data["Algorithm"])]).split("(")[0], data['State']))
        fig.write_html("./templates/graph.html")
        return render_template("graph.html")
    except KeyError:
        return "Algorithm Not Specified"


@app.route("/getAlgos", methods=["GET"])
def algos():
    result = []
    for i, v in enumerate(algorithms):
        result.append({"algorithm": i, "Name": str(v).split("(")[0]})
    return {"result": result}


ALLOWED_EXTENSIONS = {'csv'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return "File Not Uploaded"
        file = request.files['file']
        if file.filename == '':
            return ('No selected file')
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save("data.csv")
            df = pd.read_csv("data.csv")
            try:
                df[["Date", "State/UnionTerritory", "Confirmed"]]
            except KeyError:
                return "Header Not Found"
            return {"states": list(set(df["State/UnionTerritory"].values))}
        return "File Not Allowed"


if __name__ == "__main__":
    app.run(debug=True)
