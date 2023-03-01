# create a HTTP server
from http.server import HTTPServer, SimpleHTTPRequestHandler
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from langdetect import detect
from langdetect import detect_langs
from segtok.segmenter import split_single
import pandas as pd
import numpy as np
import pickle
import re
import re
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
sentiment_pipeline = pipeline("sentiment-analysis")
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# load model file
model = pickle.load(open('./python_server/model.pkl', 'rb'))
interactions = pickle.load(open('./python_server/interactions.pkl', 'rb'))
user_dict = pickle.load(open('./python_server/user_dict.pkl', 'rb'))
item_dict = pickle.load(open('./python_server/item_dict.pkl', 'rb'))
max_feature_num = pickle.load(
    open('./python_server/max_feature_num.pkl', 'rb'))
vocabulary = pickle.load(
    open('./python_server/train_vectorization_vocabulary.pkl', 'rb'))
train_vecs = pickle.load(
    open('./python_server/train_vecs.pkl', 'rb'))
train_labels = pickle.load(
    open('./python_server/train_labels.pkl', 'rb'))

clf = LogisticRegression().fit(train_vecs, train_labels)


def sample_recommendation_user(model, interactions, user_id, user_dict, item_dict, threshold=0, nrec_items=10, show=True):
    n_users, n_items = interactions.shape
    user_x = user_dict[user_id]
    scores = pd.Series(model.predict(user_x, np.arange(n_items)))
    scores.index = interactions.columns
    scores = list(pd.Series(scores.sort_values(ascending=False).index))

    known_items = list(pd.Series(
        interactions.loc[user_id, :][interactions.loc[user_id, :] > threshold].index).sort_values(ascending=False))
    scores = [x for x in scores if x not in known_items]
    return_score_list = scores[0:nrec_items]
    known_items = list(pd.Series(known_items).apply(lambda x: item_dict[x]))
    scores = list(pd.Series(return_score_list).apply(lambda x: item_dict[x]))

    json = {"user": user_id, "known": known_items, "recommended": scores}
    if show:
        print("User {}".format(user_id))
        print("Known Likes:")

        counter = 1
        for i in known_items:
            print("{}- {}".format(counter, i))
            counter += 1

        print("Recommended Items:")
        counter = 1
        for i in scores:
            print("{}- {}".format(counter, i))
            counter += 1

    return json


def get_urdu_sentiment(input_sentence):
    input_sentence = [input_sentence]
    transformed_tester = TfidfVectorizer(
        max_features=max_feature_num, vocabulary=vocabulary).fit_transform(input_sentence)

    test_pred = clf.predict(transformed_tester)
    return test_pred[0]


@app.route('/recommend/<userId>', methods=['GET'])
def recommend(userId):
    print(userId)
    return jsonify(sample_recommendation_user(model, interactions, userId, user_dict, item_dict, threshold=0, nrec_items=10, show=True))


@app.route('/sentiment', methods=['POST'])
def sentiment():
    # Get sentence from request body
    sentence = request.form['sentence']
    print(sentence)
    if sentence:
        if detect(str(sentence)) == 'en':
            label = sentiment_pipeline(str(sentence))
            return {"label": label[0]["label"], "language": "english"}
        elif detect(sentence) == 'ur':
            urdu_sentiment = get_urdu_sentiment(str(sentence))
            return {"label": urdu_sentiment, "language": "urdu"}
    else:
        return {"label": sentence}


@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=True, port=8080)
