from flask import Flask, render_template
import multiprocessing
from koch import draw_full, draw_half

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/draw")
def draw():
    p1 = multiprocessing.Process(target=draw_full)
    p2 = multiprocessing.Process(target=draw_half)

    p1.start()
    p2.start()

    p1.join()
    p2.join()

    return "Copos generados correctamente."

if __name__ == "__main__":
    app.run(debug=True)
