import pickle
import random
import numpy as np
import pandas as pd
import lightfm
import requests

from lightfm import LightFM, cross_validation
from lightfm.evaluation import precision_at_k, auc_score
from scipy import sparse
from sklearn.metrics.pairwise import cosine_similarity


def create_interaction_matrix(df, user_col, item_col, rating_col, norm=False, threshold=None):
    interactions = df.groupby([user_col, item_col])[rating_col].sum(
    ).unstack().reset_index().fillna(0).set_index(user_col)
    if norm:
        interactions = interactions.applymap(
            lambda x: 1 if x > threshold else 0)
    return interactions


def create_user_dict(interactions):
    user_id = list(interactions.index)
    user_dict = {}
    counter = 0
    for i in user_id:
        user_dict[i] = counter
        counter += 1
    return user_dict


def create_item_dict(df, id_col, name_col):
    item_dict = {}
    for i in range(df.shape[0]):
        item_dict[(df.loc[i, id_col])] = df.loc[i, name_col]
    return item_dict


def runMF(interactions, n_components=30, loss='warp', k=15, epoch=30, n_jobs=4):
    # x = sparse.csr_matrix(interactions.values)
    model = LightFM(loss=loss, k=k, no_components=n_components)
    model = model.fit(x, epochs=epoch, num_threads=n_jobs)
    return model


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

    return scores


def sample_recommendation_item(model, interactions, item_id, user_dict, item_dict, threshold=0, nrec_items=10, show=True):
    n_users, n_items = interactions.shape
    item_x = item_dict[item_id]
    scores = pd.Series(model.predict(np.arange(n_users), item_x))
    scores.index = interactions.index
    scores = list(pd.Series(scores.sort_values(ascending=False).index))

    known_items = list(pd.Series(
        interactions[item_id][interactions[item_id] > threshold].index).sort_values(ascending=False))
    scores = [x for x in scores if x not in known_items]
    return_score_list = scores[0:nrec_items]
    known_items = list(pd.Series(known_items).apply(lambda x: item_dict[x]))
    scores = list(pd.Series(return_score_list).apply(lambda x: item_dict[x]))

    if show:
        print("Item {}".format(item_id))
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

    return scores


def create_item_emdedding_df(model, interactions, item_dict):
    n_users, n_items = interactions.shape
    item_emdedding_arr = []
    for i in range(n_items):
        item_emdedding_arr.append(model.item_embeddings[i])
    item_emdedding_df = pd.DataFrame(item_emdedding_arr)
    item_emdedding_df['item_id'] = item_emdedding_df.index
    item_emdedding_df['item_id'] = item_emdedding_df['item_id'].apply(
        lambda x: list(item_dict.keys())[list(item_dict.values()).index(x)])
    return item_emdedding_df


def create_user_emdedding_df(model, interactions, user_dict):
    n_users, n_items = interactions.shape
    user_emdedding_arr = []
    for i in range(n_users):
        user_emdedding_arr.append(model.user_embeddings[i])
    user_emdedding_df = pd.DataFrame(user_emdedding_arr)
    user_emdedding_df['user_id'] = user_emdedding_df.index
    user_emdedding_df['user_id'] = user_emdedding_df['user_id'].apply(
        lambda x: list(user_dict.keys())[list(user_dict.values()).index(x)])
    return user_emdedding_df
    n_users = len(user_dict)
    n_items = len(item_dict)
    user_emdedding_arr = np.array(user_emdedding_df.iloc[:, :-1])
    user_emdedding_arr = user_emdedding_arr.reshape(n_users, -1)
    user_emdedding_arr = normalize(user_emdedding_arr)
    user_emdedding_df.iloc[:, :-1] = user_emdedding_arr
    user_emdedding_df = user_emdedding_df.set_index('user_id')
    user_emdedding_df = user_emdedding_df.loc[user_id, :].values.reshape(1, -1)

    item_emdedding_arr = np.array(item_emdedding_df.iloc[:, :-1])
    item_emdedding_arr = item_emdedding_arr.reshape(n_items, -1)
    item_emdedding_arr = normalize(item_emdedding_arr)
    item_emdedding_df.iloc[:, :-1] = item_emdedding_arr
    item_emdedding_df = item_emdedding_df.set_index('item_id')
    item_emdedding_df = item_emdedding_df.loc[item_id, :].values.reshape(1, -1)

    score = cosine_similarity(user_emdedding_df, item_emdedding_df).reshape(-1)
    return score

    n_users = len(user_dict)
    n_items = len(item_dict)
    user_emdedding_arr = np.array(user_emdedding_df.iloc[:, :-1])
    user_emdedding_arr = user_emdedding_arr.reshape(n_users, -1)
    user_emdedding_arr = normalize(user_emdedding_arr)
    user_emdedding_df.iloc[:, :-1] = user_emdedding_arr
    user_emdedding_df = user_emdedding_df.set_index('user_id')

    item_emdedding_arr = np.array(item_emdedding_df.iloc[:, :-1])
    item_emdedding_arr = item_emdedding_arr.reshape(n_items, -1)
    item_emdedding_arr = normalize(item_emdedding_arr)
    item_emdedding_df.iloc[:, :-1] = item_emdedding_arr
    item_emdedding_df = item_emdedding_df.set_index('item_id')

    score = cosine_similarity(user_emdedding_df, item_emdedding_df)
    score_df = pd.DataFrame(score)
    score_df.columns = item_dict.values()
    score_df.index = user_dict.values()
    return score_df


df_playlist = pd.read_csv('./sample/post/view_data.csv', error_bad_lines=False,
                          warn_bad_lines=False, skiprows=lambda i: i > 0 and random.random() > 0.50)
df_playlist = df_playlist.drop('time_stamp', axis=1)
df_playlist['rating'] = 1
df_rating = df_playlist.groupby('post_id', as_index=False).sum()
post_id = df_rating['post_id'].tolist()
rating = df_rating['rating'].tolist()
rating_mapping = dict(zip(post_id, rating))
df_playlist['rating'] = df_playlist['post_id'].map(rating_mapping)
df_playlist = df_playlist.groupby('post_id').filter(lambda x: len(x) >= 10)
df_playlist = df_playlist[df_playlist.groupby(
    'user_id').post_id.transform('nunique') >= 10]

df_title = pd.read_csv('./sample/post/post_data.csv')
titles = df_title['title'].tolist()
post_id = df_title['post_id'].tolist()
normal_mapping = dict(zip(titles, post_id))
reverse_mapping = dict(zip(post_id, titles))
item_dict = reverse_mapping

interactions = create_interaction_matrix(
    df=df_playlist, user_col='user_id', item_col='post_id', rating_col='rating', norm=False, threshold=None)
user_dict = create_user_dict(interactions=interactions)

x = sparse.csr_matrix(interactions.values)
train, test = lightfm.cross_validation.random_train_test_split(
    x, test_percentage=0.2, random_state=None)

model = runMF(interactions=train, n_components=30,
              loss='warp', k=15, epoch=30, n_jobs=4)

train_auc = auc_score(model, train, num_threads=4).mean()
train_precision = precision_at_k(model, train, k=10).mean()
test_precision = precision_at_k(
    model, test, k=10, train_interactions=train).mean()


rec_list = sample_recommendation_user(model=model, interactions=interactions, user_id='5eece14ffc13ae66090001ba',
                                      user_dict=user_dict, item_dict=item_dict, threshold=0, nrec_items=10, show=True)

# save model, interactions, user_dict, item_dict file to python_server folder

pickle.dump(model, open('./python_server/model.pkl', 'wb'))
pickle.dump(interactions, open('./python_server/interactions.pkl', 'wb'))
pickle.dump(user_dict, open('./python_server/user_dict.pkl', 'wb'))
pickle.dump(item_dict, open('./python_server/item_dict.pkl', 'wb'))

# load model, interactions, user_dict, item_dict file from python_server folder

model = pickle.load(open('./python_server/model.pkl', 'rb'))
interactions = pickle.load(open('./python_server/interactions.pkl', 'rb'))
user_dict = pickle.load(open('./python_server/user_dict.pkl', 'rb'))
item_dict = pickle.load(open('./python_server/item_dict.pkl', 'rb'))
