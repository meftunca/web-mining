# -*- coding: utf-8 -*-
import scrapy
from .. import items
from scrapy import Request, FormRequest


class GetmusicsSpider(scrapy.Spider):
    name = "getmusic"
    allowed_domains = ["idefix.com"]


    startUrls = ()
    for page in range(1,19):
    	page = 'http://www.idefix.com/muzik/blues/kategori_urun.asp?tree=02003003001-' + str(page)
    	startUrls += (page ,)


    start_urls = startUrls	
     
    def parse(self, response):
    	musicUrls = response.css(".listeurun a::attr(href)").extract()


    	for i, url in enumerate(musicUrls):
    		item = items.IdefixMusicItem()
    		item['url'] = url
    		item['list_img'] = response.css('.listeimg::attr(src)').extract()[i]
    		yield Request('http://www.idefix.com' + url, self.parse_music_page, meta={'item': item})
    

    def parse_music_page(self, response):
    	item = response.meta['item']
    	item['name'] = response.css(".tContArea .tContTitle::text").extract()[0]
    	item['composer'] = response.css(".tContArea .tContAuth a::text").extract()[0]
    	item['price'] = response.css("#fiyattbl tr:nth-child(1) td:nth-child(2)::text").extract()[0].split('\r')[0].split(' ')[1]
    	content = response.css(".tTextPad .cliste li::text").extract()

        # removing &nbsp from list elements
        content_arr = []
        for c in content:
            content_arr.append(c.replace("&nbsp",""))
        item['content'] = content_arr

    	cover = response.css(".tImgBook::attr(src)").extract()[0]
    	item['cover'] = cover

    	return item
