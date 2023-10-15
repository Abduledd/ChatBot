from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import json

app = Flask(__name__)
CORS(app)


with open('config.json', 'r') as f:
    config = json.load(f)

api_key = config.get('api_key')

if not api_key:
    raise ValueError('API key not found in the configuration file.')


openai.api_key = api_key

def send_message(user_input):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input},
            ]
        )
        bot_reply = response.choices[0]["message"]["content"] 
        
        return jsonify({'message': bot_reply})
    except Exception as error:
        print('Error generating response:', error)
        return jsonify({'message': 'An error occurred'})

@app.route('/api/sendMessage', methods=['POST'])
def handle_message():
    user_input = request.json.get('message')
    return send_message(user_input)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
