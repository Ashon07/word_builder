from flask import Flask
from dash import Dash, html

# Создаём Flask-приложение
flask_app = Flask(__name__)

# Создаём Dash-приложение и связываем его с Flask
dash_app = Dash(__name__, server=flask_app, url_base_pathname='/dash')

# Определяем макет для Dash
dash_app.layout = html.Div([
    html.H1("Приложение Dash внутри Flask!")
])

# Flask route
@flask_app.route("/")
def home():
    return "Это главная страница Flask-приложения."

if __name__ == "__main__":
    flask_app.run(debug=True)
