from flask import Flask, jsonify
from scraper import scrape_popular_movies


app = Flask(__name__)


@app.route("/", methods=["GET"])
def test():
    return jsonify({'message': 'This is a test endpoint', 'status': 'success'}), 200

@app.route('/movies', methods=["GET"])
def get_movie():
    data = scrape_popular_movies()
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, port=5001, host='0.0.0.0')
