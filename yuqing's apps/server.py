from flask import Flask, render_template, request, jsonify, redirect, url_for
import os
import json
from datetime import datetime

app = Flask(__name__)

# Directory to store user trip data
TRIPS_DATA_DIR = 'trips_data'

# Ensure the trips_data directory exists
if not os.path.exists(TRIPS_DATA_DIR):
    os.makedirs(TRIPS_DATA_DIR)

# Utility function to load or create user data
def load_user_data(user_id):
    user_file = os.path.join(TRIPS_DATA_DIR, f'{user_id}.json')
    if os.path.exists(user_file):
        with open(user_file, 'r') as f:
            return json.load(f)
    return {"trips": []}

# Utility function to save user data
def save_user_data(user_id, data):
    user_file = os.path.join(TRIPS_DATA_DIR, f'{user_id}.json')
    with open(user_file, 'w') as f:
        json.dump(data, f, indent=4)

# Home route (Trip tracking page)
@app.route('/')
def index():
    return render_template('landing.html')

# Endpoint to save a trip for the user
@app.route('/save_trip', methods=['POST'])
def save_trip():
    user_id = request.form.get('user_id', 'default_user')  # Default to 'default_user' for demo purposes
    trip_data = request.json

    # Load or create user data
    user_data = load_user_data(user_id)

    # Add timestamp to the trip data
    trip_data['date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Add trip to user's trip list
    user_data['trips'].append(trip_data)

    # Save the updated user data
    save_user_data(user_id, user_data)

    return jsonify({"status": "success", "message": "Trip saved successfully!"})

# Analytics page (Displays past trip data)
@app.route('/analytics/<user_id>')
def analytics(user_id):
    user_data = load_user_data(user_id)
    return render_template('analytics.html', trips=user_data['trips'])

if __name__ == '__main__':
    app.run(debug=True)
