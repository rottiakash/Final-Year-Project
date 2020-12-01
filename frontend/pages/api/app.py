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
app = Flask(__name__)
algorithms = [
    (LocalOutlierFactor(n_neighbors=1)),
    OneClassSVM(),
    EllipticEnvelope(),
    IsolationForest(behaviour='new')
]


@app.route("/", methods=["POST"])
def index():
    try:
        df = pd.read_csv("./covid_19_india.csv")
        df = df[df['State/UnionTerritory'] == "Karnataka"]
        df["Confirmed"] = df["Confirmed"].diff()
        df = df.dropna()
        X = df[["Date", "Confirmed"]].values
        clf = algorithms[int(request.form["Algorithm"])]
        X = X[:, 1].reshape(X.shape[0], 1)
        if int(request.form["Algorithm"]) == 0:
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
        fig.update_layout(showlegend=True, title='Detected anomalies(Algorithm:%s)' % (
            str(algorithms[int(request.form["Algorithm"])]).split("(")[0]))
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


if __name__ == "__main__":
    app.run(debug=True)
