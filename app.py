import os
from flask import Flask
from dash import Dash, html

# Создаём Flask-приложение
flask_app = Flask(_name_)

# Создаём Dash-приложение и связываем его с Flask
dash_app = Dash(_name_, server=flask_app, url_base_pathname='/dash')

# Определяем макет для Dash
dash_app.layout = html.Div([
    html.H1("Приложение Dash внутри Flask!")
])

# Flask route
@flask_app.route("/")
def home():
    return "Это главная страница Flask-приложения."


if _name_ == "_main_":
    # Render предоставляет порт через переменную окружения PORT
    port = int(os.environ.get("PORT", 5000))
    flask_app.run(host="0.0.0.0", port=port)