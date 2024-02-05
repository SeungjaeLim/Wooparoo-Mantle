import numpy as np
from db.mongodb import get_db
from datetime import datetime
from sklearn.preprocessing import OneHotEncoder
from bson.objectid import ObjectId

def l2_distance(vec1, vec2):
    return np.sqrt(np.sum((vec1 - vec2) ** 2))

def parse_time(time_str):
    h, m, s = map(int, time_str.split(':'))
    return h * 3600 + m * 60 + s

def calculate_similarity():
    db = get_db()

    # Fetch the daily quiz Wooparoo
    today = datetime.now()
    start_of_day = datetime(today.year, today.month, today.day)
    daily_quiz = db.quiz.find_one({"date": start_of_day})

    if not daily_quiz:
        return "No daily quiz Wooparoo found."

    # Fetch all Wooparoos
    all_wooparoos = list(db.wooparoo.find())

    # Prepare one-hot encoder for categorical values
    types = []
    for w in all_wooparoos:
        types.extend([w.get('type1', 'None'), w.get('type2', 'None'), w.get('type3', 'None')])
    types = np.array(types).reshape(-1, 1)
    encoder = OneHotEncoder(handle_unknown='ignore')
    encoder.fit(types)

    similarities = {}
    for wooparoo in all_wooparoos:
        # Compute L2 distance for numerical values
        daily_quiz_vector = np.array([
            parse_time(daily_quiz.get('time', '0:0:0')),
            daily_quiz.get('attack', 0),
            daily_quiz.get('hp', 0),
            daily_quiz.get('manaball', 0),
            daily_quiz.get('skill1', 0),
            daily_quiz.get('skill2', 0),
            daily_quiz.get('skill3', 0),
            daily_quiz.get('skill4', 0)
        ])
        wooparoo_vector = np.array([
            parse_time(wooparoo.get('time', '0:0:0')),
            wooparoo.get('attack', 0),
            wooparoo.get('hp', 0),
            wooparoo.get('manaball', 0),
            wooparoo.get('skill1', 0),
            wooparoo.get('skill2', 0),
            wooparoo.get('skill3', 0),
            wooparoo.get('skill4', 0)
        ])
        numerical_similarity = l2_distance(daily_quiz_vector, wooparoo_vector)

        # Compute similarity for categorical values
        daily_quiz_types = np.array([daily_quiz.get('type1', 'None'), daily_quiz.get('type2', 'None'), daily_quiz.get('type3', 'None')]).reshape(-1, 1)
        wooparoo_types = np.array([wooparoo.get('type1', 'None'), wooparoo.get('type2', 'None'), wooparoo.get('type3', 'None')]).reshape(-1, 1)
        dot_product = np.sum(encoder.transform(daily_quiz_types).toarray() * encoder.transform(wooparoo_types).toarray())
        
        # Normalized sum of similarities
        total_similarity = numerical_similarity - dot_product  # Subtract because lower L2 distance means more similarity
        similarities[str(wooparoo['_id'])] = total_similarity

    # Convert similarities dict to a list of tuples for sorting
    similarity_list = [(ObjectId(wooparoo_id), sim_score) for wooparoo_id, sim_score in similarities.items()]
    # Sort by similarity score in descending order (higher is more similar)
    similarity_list.sort(key=lambda x: x[1], reverse=True)

    # Save to db.similarity with rank
    similarity_data = []
    for rank, (wooparoo_id, sim_score) in enumerate(similarity_list, start=1):
        wooparoo = db.wooparoo.find_one({"_id": wooparoo_id})
        similarity_data.append({
            "quiz_number": daily_quiz["quiz_number"],
            "wooparooname": wooparoo["name"],
            "similarity": sim_score,
            "rank": rank
        })

    # Insert the similarity data into the database
    db.similarity.insert_many(similarity_data)

    return similarity_data
