from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/game', methods=['POST'])
def game():
    name = request.form.get('name')
    if not name:
        return redirect(url_for('login'))
    return render_template('game.html', name=name)

if __name__ == '__main__':
    app.run(debug=True)
