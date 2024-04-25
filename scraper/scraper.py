import requests
from bs4 import BeautifulSoup


def scrape_popular_movies():
    url = "https://www.imdb.com/chart/moviemeter/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
        "Accept-Encoding": "gzip, deflate",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "DNT": "1",
        "Connection": "close",
        "Upgrade-Insecure-Requests": "1",
    }
    response = requests.get(url, headers=headers)

    soup = BeautifulSoup(response.text, "html.parser")
    get_html = soup.find_all(
        "div", class_="sc-b189961a-0 hBZnfJ cli-children", limit=10
    )
    movie_data = []
    for html in get_html:

        # Movie Name
        movie_name = html.find("h3", class_="ipc-title__text")
        movie_dic = {
            "Movie Name": (
                movie_name.text.strip() if movie_name else "unknown movie name"
            )
        }

        # Rating
        rating_span = html.find("span", class_="ipc-rating-star")
        if rating_span and "aria-label" in rating_span.attrs:
            aria_label = rating_span["aria-label"]
            movie_dic["Rating"] = aria_label.split()[-1]
        else:
            movie_dic["Rating"] = "unknown"

        movie_data.append(movie_dic)
    return movie_data
