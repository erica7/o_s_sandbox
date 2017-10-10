from flask import Flask  # import Flask class
from flask import render_template

app = Flask(__name__)  # create an instance of the class to be our WSGI application

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/wavy')
@app.route('/wavy/<gravy>')
def wavy(gravy = ""):
    return render_template('index.html', gravy=gravy)
