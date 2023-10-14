from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import json

app = Flask(__name__)
CORS(app)


with open('config.json', 'r') as f:
    config = json.load(f)

api_key = config.get('api_key')

if not api_key:
    raise ValueError('API key not found in the configuration file.')


openai.api_key = api_key


@app.route('/api/sendMessage', methods=['POST'])
def send_message():
    user_input = request.json.get('message')
    try:
        completions = openai.Completion.create(
            engine='text-davinci-002',
            prompt=user_input,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.5,
        )
        print('marche bien 1')
        bot_reply = completions.choices[0].text
        # bot_reply = "Response !!"
        return jsonify({'message': bot_reply})
    except Exception as error:
        print('Error generating response:', error)
        return jsonify({'message': 'An error occurred'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
