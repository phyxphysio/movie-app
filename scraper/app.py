from flask import Flask, jsonify
from scraper import scrape_popular_movies


app = Flask(__name__)


@app.route("/", methods=["GET"])
def get_movie():
    data = scrape_popular_movies()
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
