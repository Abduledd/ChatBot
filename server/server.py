from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = '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'

@app.route('/api/sendMessage', methods=['POST'])
def send_message():
    user_input = request.json.get('message')
    print('marche bien 1')
    try:
        # completions = openai.Completion.create(
        #     engine='text-davinci-002',
        #     prompt=user_input,
        #     max_tokens=1024,
        #     n=1,
        #     stop=None,
        #     temperature=0.5,
        # )
        print('marche bien 1')
        # bot_reply = completions.choices[0].text
        bot_reply = "Response !!"
        return jsonify({'message': bot_reply})
    except Exception as error:
        print('Error generating response:', error)
        return jsonify({'message': 'An error occurred'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
