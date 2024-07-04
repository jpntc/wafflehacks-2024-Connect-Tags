from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/login')
def login():
    return('hello world')



if __name__ == '__main__':
    app.run()
