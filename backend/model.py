import numpy as np
from sklearn.tree import DecisionTreeRegressor
import re

# ==============================================================================
# THINNAYILE KAARYAM — ML SCORING ENGINE (scikit-learn DecisionTreeRegressor)
# ==============================================================================
# Features:
# 0: env_village (0 or 1)
# 1: env_town (0 or 1)
# 2: env_college (0 or 1)
# 3: env_city (0 or 1)
# 4: family_involvement (1 to 10)
# 5: traditionalness_violation (1 to 10)
# 6: visibility (1 to 10)
# 7: uniqueness (1 to 10)
# 8: age_sensitivity (1 to 10)
# 9: community_reaction_potential (1 to 10)

FEATURE_NAMES = [
    "env_village",
    "env_town",
    "env_college",
    "env_city",
    "family_involvement",
    "traditionalness_violation",
    "visibility",
    "uniqueness",
    "age_sensitivity",
    "community_reaction_potential"
]

# Curated training dataset reflecting societal reaction in Kerala communities
# [env_v, env_t, env_col, env_city, fam, trad, vis, uniq, age, comm_react] -> risk_score (0-100)
TRAINING_DATA = [
    # Village: High shock decisions
    ([1, 0, 0, 0,  9,  9,  9,  9,  8, 10], 96.0),  # Dyeing hair bright pink/neon
    ([1, 0, 0, 0, 10, 10, 10, 10,  9, 10], 98.0),  # Love marriage / Inter-faith wedding
    ([1, 0, 0, 0,  9,  9,  9,  8,  9,  9], 92.0),  # Quitting IT job to open tea stall / thinnayi café
    ([1, 0, 0, 0,  8,  9,  9,  8,  8,  9], 91.0),  # Getting visible full sleeve tattoo
    ([1, 0, 0, 0,  9,  9,  8,  7,  8,  9], 88.0),  # Staying single / unmarried at 32
    ([1, 0, 0, 0,  8,  8,  7,  6,  7,  8], 84.0),  # Moving out into own flat before marriage
    ([1, 0, 0, 0,  7,  8,  8,  8,  7,  8], 82.0),  # Wearing shorts/western clothes to family temple festival
    ([1, 0, 0, 0,  6,  7,  8,  7,  6,  7], 75.0),  # Buying expensive sports bike on loan
    ([1, 0, 0, 0,  7,  6,  7,  6,  6,  7], 71.0),  # Solo trip to Goa or backpack Europe
    ([1, 0, 0, 0,  5,  5,  6,  5,  5,  6], 60.0),  # Adopting a stray dog instead of having a kid
    ([1, 0, 0, 0,  6,  4,  5,  4,  5,  5], 48.0),  # Switching from banking to graphic design
    ([1, 0, 0, 0,  4,  2,  3,  2,  3,  3], 24.0),  # Buying gold coin on Akshaya Tritiya (Society approved)
    ([1, 0, 0, 0,  5,  1,  2,  1,  2,  2], 12.0),  # Clearing Kerala PSC / Bank exam (Crown child)
    ([1, 0, 0, 0,  4,  1,  2,  1,  2,  1],  8.0),  # Arranged marriage to Gulf engineer (Society peak blessing)

    # Town: Moderate-high sensitivity
    ([0, 1, 0, 0,  8,  8,  9,  8,  8,  9], 86.0),  # Pink hair
    ([0, 1, 0, 0, 10,  9,  9,  9,  8,  9], 90.0),  # Court marriage without 1000-person feast
    ([0, 1, 0, 0,  8,  8,  7,  8,  8,  8], 81.0),  # Quitting TCS to be an influencer/YouTuber
    ([0, 1, 0, 0,  7,  7,  8,  7,  7,  8], 78.0),  # Nose ring or neck tattoo
    ([0, 1, 0, 0,  6,  6,  7,  6,  6,  7], 68.0),  # Coming home at 11:30 PM on a weekday
    ([0, 1, 0, 0,  6,  5,  6,  5,  5,  6], 55.0),  # Taking gap year to figure out life
    ([0, 1, 0, 0,  5,  3,  4,  3,  4,  4], 35.0),  # Buying iPhone 16 Pro on 24-month EMI
    ([0, 1, 0, 0,  4,  1,  2,  1,  2,  2], 15.0),  # Joining Infosys as software engineer

    # College: Peer dynamics & hostel warden jurisdiction
    ([0, 0, 1, 0,  4,  5,  9,  8,  5,  8], 79.0),  # Dyeing hair pink on campus
    ([0, 0, 1, 0,  7,  6,  9,  8,  6,  9], 85.0),  # Bunking exams to attend DJ festival in Kochi
    ([0, 0, 1, 0,  5,  4,  8,  7,  4,  7], 70.0),  # Dating the college union chairman's sibling
    ([0, 0, 1, 0,  6,  7,  8,  7,  5,  8], 76.0),  # Getting caught talking past 7 PM near main gate
    ([0, 0, 1, 0,  7,  8,  7,  7,  6,  7], 73.0),  # Dropping out of Engineering in 3rd year
    ([0, 0, 1, 0,  3,  3,  6,  5,  3,  5], 42.0),  # Starting a meme page roasting teachers
    ([0, 0, 1, 0,  2,  1,  3,  2,  2,  3], 20.0),  # Publishing IEEE conference research paper
    ([0, 0, 1, 0,  2,  1,  1,  1,  1,  1],  7.0),  # Securing campus placement in campus interview

    # City: More anonymity, but aunties have WhatsApp
    ([0, 0, 0, 1,  5,  5,  7,  6,  5,  6], 64.0),  # Pink hair in Kochi/Bengaluru
    ([0, 0, 0, 1,  8,  8,  7,  7,  7,  8], 77.0),  # Live-in relationship with partner
    ([0, 0, 0, 1,  6,  6,  6,  6,  6,  6], 62.0),  # Quitting corporate job to become a dog walker
    ([0, 0, 0, 1,  5,  4,  6,  5,  5,  5], 51.0),  # Clubbing on Saturday night with friends
    ([0, 0, 0, 1,  4,  3,  4,  4,  4,  4], 38.0),  # Buying electric cycle instead of car
    ([0, 0, 0, 1,  3,  2,  3,  2,  3,  3], 22.0),  # Working from Starbucks with iced latte
    ([0, 0, 0, 1,  2,  1,  1,  1,  1,  1],  5.0),  # Completing MBA and joining MNC
]

X_train = np.array([item[0] for item in TRAINING_DATA])
y_train = np.array([item[1] for item in TRAINING_DATA])

# Initialize and train DecisionTreeRegressor
tree_model = DecisionTreeRegressor(max_depth=5, min_samples_split=2, random_state=42)
tree_model.fit(X_train, y_train)

# Topic dictionaries to identify keywords in decision text
HIGH_SCANDAL_KEYWORDS = {
    "hair": {"trad": 8, "vis": 9, "uniq": 8, "react": 9},
    "pink": {"trad": 9, "vis": 10, "uniq": 9, "react": 10},
    "dye": {"trad": 8, "vis": 9, "uniq": 8, "react": 8},
    "color": {"trad": 7, "vis": 8, "uniq": 7, "react": 7},
    "tattoo": {"trad": 9, "vis": 9, "uniq": 8, "react": 9},
    "piercing": {"trad": 8, "vis": 8, "uniq": 8, "react": 8},
    "quit": {"fam": 9, "trad": 8, "vis": 7, "react": 9},
    "resign": {"fam": 9, "trad": 8, "vis": 7, "react": 9},
    "tea stall": {"fam": 8, "trad": 9, "vis": 9, "uniq": 9, "react": 9},
    "chai": {"fam": 8, "trad": 9, "vis": 9, "uniq": 9, "react": 9},
    "cafe": {"fam": 7, "trad": 7, "vis": 8, "react": 7},
    "influencer": {"fam": 8, "trad": 8, "vis": 9, "uniq": 8, "react": 9},
    "youtube": {"fam": 7, "trad": 7, "vis": 8, "uniq": 8, "react": 8},
    "marriage": {"fam": 10, "trad": 9, "vis": 9, "react": 10},
    "wedding": {"fam": 10, "trad": 9, "vis": 9, "react": 10},
    "love marriage": {"fam": 10, "trad": 10, "vis": 10, "react": 10},
    "intercaste": {"fam": 10, "trad": 10, "vis": 10, "react": 10},
    "interfaith": {"fam": 10, "trad": 10, "vis": 10, "react": 10},
    "dating": {"fam": 8, "trad": 9, "vis": 8, "react": 9},
    "boyfriend": {"fam": 8, "trad": 8, "vis": 7, "react": 8},
    "girlfriend": {"fam": 8, "trad": 8, "vis": 7, "react": 8},
    "live in": {"fam": 10, "trad": 10, "vis": 9, "react": 10},
    "moving out": {"fam": 9, "trad": 8, "vis": 7, "react": 8},
    "solo trip": {"fam": 7, "trad": 7, "vis": 8, "react": 8},
    "goa": {"fam": 8, "trad": 8, "vis": 8, "react": 9},
    "night out": {"fam": 8, "trad": 8, "vis": 8, "react": 8},
    "clubbing": {"fam": 8, "trad": 9, "vis": 8, "react": 9},
    "drink": {"fam": 8, "trad": 9, "vis": 7, "react": 9},
    "beer": {"fam": 8, "trad": 9, "vis": 7, "react": 9},
    "smoke": {"fam": 9, "trad": 9, "vis": 8, "react": 9},
    "shorts": {"fam": 6, "trad": 8, "vis": 9, "react": 8},
    "bikini": {"fam": 9, "trad": 10, "vis": 10, "react": 10},
    "unmarried": {"fam": 9, "trad": 9, "vis": 8, "react": 9},
    "single": {"fam": 7, "trad": 7, "vis": 6, "react": 7},
    "adopt": {"fam": 7, "trad": 6, "vis": 6, "react": 6},
    "dog": {"fam": 5, "trad": 4, "vis": 5, "react": 5},
    "cat": {"fam": 4, "trad": 4, "vis": 4, "react": 4},
    "emi": {"fam": 6, "trad": 5, "vis": 7, "react": 6},
    "bmw": {"fam": 6, "trad": 4, "vis": 9, "react": 7},
    "iphone": {"fam": 5, "trad": 4, "vis": 7, "react": 5},
    "drop out": {"fam": 10, "trad": 9, "vis": 8, "react": 9},
    "acting": {"fam": 8, "trad": 7, "vis": 9, "react": 8},
    "cinema": {"fam": 8, "trad": 7, "vis": 9, "react": 8},
    "music": {"fam": 7, "trad": 6, "vis": 7, "react": 7},
}

APPROVED_KEYWORDS = {
    "government job": -8,
    "psc": -9,
    "ias": -9,
    "doctor": -8,
    "engineer": -6,
    "gold": -6,
    "temple": -6,
    "church": -5,
    "mosque": -5,
    "arranged marriage": -8,
    "infosys": -5,
    "tcs": -5,
    "m-tech": -6,
    "mba": -5,
    "gulf": -7,
    "dubai": -6,
}

def extract_features(decision_text: str, environment: str):
    """
    Analyzes decision string and environment to form a feature vector for scikit-learn.
    """
    text = (decision_text or "").lower()
    env = (environment or "Village").strip().capitalize()

    # One-hot encoding for environment
    env_village = 1 if env == "Village" else 0
    env_town = 1 if env == "Town" else 0
    env_college = 1 if env == "College" else 0
    env_city = 1 if env == "City" else 0

    # Default baseline scores (normal baseline life decision)
    family_inv = 5.0
    trad_viol = 4.0
    visibility = 5.0
    uniqueness = 4.0
    age_sens = 5.0
    comm_react = 5.0

    # Scan for scandal keywords
    matched = False
    for kw, weights in HIGH_SCANDAL_KEYWORDS.items():
        if re.search(r'\b' + re.escape(kw) + r'\b', text) or kw in text:
            matched = True
            if "fam" in weights:
                family_inv = max(family_inv, weights["fam"])
            if "trad" in weights:
                trad_viol = max(trad_viol, weights["trad"])
            if "vis" in weights:
                visibility = max(visibility, weights["vis"])
            if "uniq" in weights:
                uniqueness = max(uniqueness, weights["uniq"])
            if "react" in weights:
                comm_react = max(comm_react, weights["react"])
            age_sens = max(age_sens, 7.0)

    # If no keyword matched, evaluate based on sentence characteristics
    if not matched:
        word_count = len(text.split())
        if word_count > 3:
            uniqueness = min(9.0, uniqueness + 1.5)
            trad_viol = min(8.0, trad_viol + 1.0)
            comm_react = min(8.0, comm_react + 1.0)

    # Check for conventional / highly approved keywords to temper the score
    for app_kw, discount in APPROVED_KEYWORDS.items():
        if app_kw in text:
            family_inv = max(1.0, family_inv + discount * 0.5)
            trad_viol = max(1.0, trad_viol + discount)
            comm_react = max(1.0, comm_react + discount)

    # Environment adjustments
    if env == "Village":
        family_inv = min(10.0, family_inv + 1.5)
        trad_viol = min(10.0, trad_viol + 1.5)
        comm_react = min(10.0, comm_react + 2.0)
        visibility = min(10.0, visibility + 1.0)
    elif env == "Town":
        family_inv = min(10.0, family_inv + 0.5)
        trad_viol = min(10.0, trad_viol + 0.5)
        comm_react = min(10.0, comm_react + 0.5)
    elif env == "College":
        trad_viol = max(1.0, trad_viol - 0.5)
        visibility = min(10.0, visibility + 1.5)
        comm_react = min(10.0, comm_react + 1.0)
        family_inv = max(2.0, family_inv - 1.5)
    elif env == "City":
        family_inv = max(2.0, family_inv - 2.0)
        trad_viol = max(2.0, trad_viol - 1.5)
        comm_react = max(2.0, comm_react - 2.0)
        visibility = max(3.0, visibility - 1.0)

    features = [
        env_village,
        env_town,
        env_college,
        env_city,
        round(family_inv, 1),
        round(trad_viol, 1),
        round(visibility, 1),
        round(uniqueness, 1),
        round(age_sens, 1),
        round(comm_react, 1)
    ]
    return features

def predict_risk(decision: str, environment: str):
    """
    Executes the trained DecisionTreeRegressor and yields risk metrics.
    """
    features = extract_features(decision, environment)
    X_input = np.array([features])
    
    # scikit-learn prediction
    raw_prediction = float(tree_model.predict(X_input)[0])
    
    # Add a slight contextual variation to feel organic while rooted in the tree model
    score = int(np.clip(round(raw_prediction), 5, 99))
    
    # Category based on score
    if score <= 30:
        category = "LOW"
        verdict = "Nobody really cares. Congratulations."
    elif score <= 60:
        category = "MODERATE"
        verdict = "A few aunties noticed."
    elif score <= 80:
        category = "HIGH"
        verdict = "The thinnayil has started discussing."
    elif score <= 95:
        category = "HIGH" if score <= 80 else "EXTREME"
        verdict = "Your decision has entered the neighbourhood WhatsApp group."
    else:
        category = "EXTREME"
        verdict = "Congratulations. You are now tomorrow's main topic."

    factor_breakdown = {
        "family_involvement": int(features[4]),
        "traditionalness": int(features[5]),
        "visibility": int(features[6]),
        "uniqueness": int(features[7]),
        "age_sensitivity": int(features[8]),
        "community_reaction": int(features[9])
    }

    return {
        "risk_score": score,
        "category": category,
        "environment": environment,
        "verdict": verdict,
        "factors": factor_breakdown
    }

if __name__ == "__main__":
    test_samples = [
        ("I want to dye my hair pink", "Village"),
        ("Quit IT job to open tea stall", "Town"),
        ("Bunk exams for Kochi festival", "College"),
        ("Working from Starbucks with latte", "City"),
        ("Cleared Kerala PSC exam rank 1", "Village")
    ]
    print("Testing ML Model...")
    for dec, env in test_samples:
        res = predict_risk(dec, env)
        print(f"[{env}] '{dec}' -> Score: {res['risk_score']}, Category: {res['category']}")
