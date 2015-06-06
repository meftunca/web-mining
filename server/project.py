# -*- coding: utf-8 -*-

import web
import json
import time
import codecs

urls = (
    '/', 'index',
    '/music/(.*)', 'music',
    '/books', 'books',
    '/musics', 'musics',
    '/book/(.*)', 'book',
    '/about', 'about',
    '/find_books', 'find_books',
    '/find_musics', 'find_musics',
    '/get_comments', 'get_comments',
    '/book_score_query','book_score_query',
    '/genre_query','genre_query',
    '/genre_score_query','genre_score_query',
    '/chart','chart'
)
               
render = web.template.render("templates", base="base")

book_file  = file("../books_last.json", "r")
# data = json.loads(input_file.read().decode("utf-8-sig"))
book_data = json.loads(book_file.read())

music_file  = file("../musics_last.json", "r")
music_data = json.loads(music_file.read())


#-------------Utils-----------------
def get_music_by_id(mid):
  for m in music_data:
    cover = m['cover']
    music_id = cover.split('/')[-1]
    if (music_id == mid):
      music = {}
      music['name'] = m['name']
      music['composer'] = m['composer']
      music['price'] = m['price']
      music['content'] = m['content']
      music['list_img'] = m['list_img']
      music['img'] = cover
      return music

def get_book_by_id(bid):
  for b in book_data:
    cover = b['cover']
    book_id = cover.split('/')[-1]
    if (book_id == bid):
      book = {}
      book['name'] = b['name']
      book['author'] = b['author']
      book['price'] = b['price']
      book['score'] = b['score']
      book['content'] = b['content']
      book['list_img'] = b['list_img']
      book['reviews'] = b['reviews']
      book['gender'] = b['gender']
      book['img'] = cover
      return book

def sort(alist):
    for passnum in range(len(alist)-1,0,-1):
        for i in range(passnum):
            if alist[i]['score']<alist[i+1]['score']:
                temp = alist[i]['score']
                alist[i]['score'] = alist[i+1]['score']
                alist[i+1]['score'] = temp
    return alist
#-----------------------------------------------
class index:
    def GET(self):
      return render.index()

class musics:
    def GET(self):
      ids_and_names = []
      for element in music_data:
        music = dict()
        music['name'] = element['name']
        cover = element['cover']
        music['list_img'] = element['list_img']
        music['id'] = cover.split('/')[-1]
        music['composer'] = element['composer']
        ids_and_names.append(music)
      return render.musics(ids_and_names)
       
class music:
    def GET(self, music_id):
      
      music = get_music_by_id(music_id)
      from urllib import quote_plus
      return render.music(music, quote_plus)

class books:
    def GET(self):
      ids_and_names = []
      for element in book_data:
        book = dict()
        book['name'] = element['name']
        cover = element['cover']
        book['list_img'] = element['list_img']
        book['id'] = cover.split('/')[-1]
        book['author'] = element['author']
        book['gender'] = element['gender']
        ids_and_names.append(book)
      return render.books(ids_and_names)

class book:
    def GET(self, book_id):
      
      book = get_book_by_id(book_id)
      return render.book(book)

class about():
    def GET(self):
        return render.about()

class find_books():
    def GET(self):
      inp = web.input()
      query_name = inp.get("query_name").lower()
      found_books = []
      for book in book_data:
        if book["name"].lower().find(query_name) != -1:
          found_books.append(book)
      return json.dumps(found_books)

class find_musics():
    def GET(self):
      inp = web.input()
      query_name = inp.get("query_name").lower()
      found_musics = []
      for music in music_data:
        if music["name"].lower().find(query_name) != -1:
          found_musics.append(music)
      return json.dumps(found_musics)

class get_comments():
    def GET(self):
      inp = web.input()
      counter = int(inp.get('counter'))
      bid = inp.get("id")
    
      for book in book_data:
        cover = book['cover']
        book_id = cover.split("/")[-1]
        if(int(bid) == int(book_id)):
          comments = book['reviews']

      return json.dumps(comments[(counter-1)*5:counter*5])

class book_score_query():
    def GET(self):
      result_list = []
      for book in book_data:
        result = dict()
        result['score'] = float(book['score'])
        result['name'] = book['name']
        result_list.append(result)
      sorted_result_list = sort(result_list)
      return json.dumps(sorted_result_list[:10])
class genre_query():
    def GET(self):
      roman,polisiye,inceleme,tarih,trkEdebiyat,dnyKlasikler,politika,dnyEdebiyat,deneme = 0,0,0,0,0,0,0,0,0
      res = dict()
      for book in book_data:
        if book['gender'].lower().find('roman') != -1:
          roman +=1
        if book['gender'].lower().find('polisiye') != -1:
          polisiye +=1
        if (book['gender'].lower().find('politika') != -1 ):#or book['gender'].lower().find('siyaset')!=-1):
          politika +=1
        if book['gender'].lower().find('inceleme') != -1:
          inceleme +=1
        if book['gender'].lower().find('tarih') != -1:
          tarih +=1
        if book['gender'].lower().find('deneme') != -1:
          deneme +=1
        if (book['gender'].lower().find(u'türk edebiyatı') != -1):# or book['gender'].lower().find(u'türkçe edebiyat')!=-1):
          trkEdebiyat +=1
        if (book['gender'].lower().find(u'dünya klasikleri') != -1):# or book['gender'].lower().find(u'klasik dünya')!=-1):
          dnyKlasikler +=1
        if book['gender'].lower().find(u'dünya edebiyatı') != -1:
          dnyEdebiyat +=1
      res['roman'] = roman
      res['polisiye'] = polisiye
      res['politika'] = politika
      res['inceleme'] = inceleme
      res['tarih'] = tarih
      res['deneme'] = deneme
      res['trkEdebiyat'] = trkEdebiyat
      res['dnyKlasikler'] = dnyKlasikler
      res['dnyEdebiyat'] = dnyEdebiyat
      return json.dumps(res)
class genre_score_query():
    def GET(self):
      inp = web.input()
      opt = inp.get('opt')
      opt = opt.lower()
      res_list = []
      for book in book_data:
        res = dict()
        if(book['gender'].lower().find(opt) != -1):
          res['name'] = book['name']
          res['score'] = book['score']
          res_list.append(res)
      return json.dumps(sort(res_list))
class chart():
    def GET(self):
      return render.chart()


if __name__ == "__main__":
    app = web.application(urls, globals())
    web.httpserver.runsimple(app.wsgifunc(), ("127.0.0.1", 1234))

