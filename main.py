from flask import Flask
from flask import render_template
from flask import redirect
from flask import url_for
from flask import request
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/product/<id>', methods=['GET'])
def product(id):
    products_dir = os.curdir + '/products/'  #получаем директорию где хранятся блоки
    file = open(products_dir + str(id)).read() # читаем файл
    return file #возвращаем file


@app.route('/api/search', methods=['POST'])
def search():

    data = request.get_json()

    data = json.load(data)['id'] #   data = '634346366'
    
    result = []

    products_dir = os.curdir + '/products/'  #получаем директорию где хранятся блоки
    files = os.listdir(products_dir)  # список всех файлов в директории [список строк]
    files = sorted([int(i) for i in files])  # преобразуем строковые названия файлов в int и сортируем

    for file in files:
        f = open(products_dir + str(file))
        h = json.load(f)['id']
        if h == data:
            file_inn = open(products_dir + str(file)).read()
            result.append(file_inn)
    return result


@app.route('/api/product/', methods=['GET'])
def getProducts():
    on_from = request.args.get('on_from')
    on_page = request.args.get('on_page')

    on_from = int(on_from)
    on_page = int(on_page) + 1
    lenght = on_page - on_from

    result = {}
    spisok = []

    products_dir = os.curdir + '/products/'  #получаем директорию где хранятся блоки

    for block in range(on_from, on_page):
        f = open(products_dir + str(block))
        h1 = json.load(f)['id']
        f = open(products_dir + str(block))
        h2 = json.load(f)['name']
        d = dict.fromkeys(['id', 'name'])
        d['id'] = h1
        d['name'] = h2
        spisok.append(d)

    result = dict(items=spisok, total=lenght)
    return result


if __name__ == "__main__":
    app.run(host='0.0.0.0') 
