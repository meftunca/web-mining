# -*- coding: utf-8 -*-

import web
import json
import time
import codecs

urls = (
    '/', 'index',
    '/music', 'music',
    '/books', 'books',
    '/book/(.*)', 'book'    
)
               
render = web.template.render("templates", base="base")

input_file  = file("../data.json", "r")
# data = json.loads(input_file.read().decode("utf-8-sig"))
data = json.loads(input_file.read())


#Utils
def get_book_names(data):
  book_names = []
  for dicts in data:
    book_names.append(dicts['name'])
  return book_names

def get_book_by_id(bid):
  for dicts in data:
    cover = dicts['cover']
    book_id = cover.split('/')[-1]
    if (book_id == bid):
      book = {}
      book['name'] = dicts['name']
      book['author'] = dicts['author']
      book['price'] = dicts['price']
      book['img'] = cover
      return book


class index:
    def GET(self):
      ids_and_names = []
      for element in data:
        book = dict()
        book['name'] = element['name']
        cover = element['cover']
        book['id'] = cover.split('/')[-1]
        ids_and_names.append(book)
      return render.index(ids_and_names)

class music:
    def GET(self):
       return render.music()
       
class book:
    def GET(self, book_id):
      
      book = get_book_by_id(book_id)
      from urllib import quote_plus
      return render.book(book, quote_plus)

class books:
    def GET(self):
      x = []
      for i in data:
        x.append(i['name'])
      return json.dumps(x)


if __name__ == "__main__":
    app = web.application(urls, globals())
    web.httpserver.runsimple(app.wsgifunc(), ("127.0.0.1", 1234))

