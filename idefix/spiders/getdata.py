# -*- coding: utf-8 -*-
import scrapy
from .. import items
from scrapy import Request, FormRequest


class GetdataSpider(scrapy.Spider):
    name = "getdata"
    allowed_domains = ["idefix.com"]
    
    startUrls = ()
    for page in range (1,11):
    	page = 'http://www.idefix.com/kitap/coksatanlar.asp?itip=tumu&s=' + str(page)
    	startUrls += (page ,)

    start_urls = startUrls


    def parse(self, response):
        bookUrls = response.css(".listeurun a::attr(href)").extract()

        for url in bookUrls:
        	item = items.IdefixItem()
        	item['url'] = url

        	yield Request('http://www.idefix.com' + url, self.parse_book_page, meta={'item': item})


    def parse_book_page(self, response):

    	item = response.meta['item']
    	item['name'] = response.css(".tContArea .tContTitle::text").extract()[0]
    	item['author'] = response.css(".tContArea .tContAuth a::text").extract()[0]
    	item['price'] = response.css("#fiyattbl tr:nth-child(1) td:nth-child(2)::text").extract()[0].split('\r')[0]
        item['reviews'] = []
        review_response = response.css('#elestiriyeni .tTitle2 a span::text').extract()
        if(review_response):
            review_count = review_response[0]
        else:
            review_count = 0
        item['review_count'] = review_count
    	cover = response.css(".tImgBook::attr(src)").extract()[0]
        item['cover'] = cover
        #item['reviews'] = []
        UrID = cover.split('/')[-1]
        lastPage = int(review_count)/5   #5 reviews for each page

        for page in range(1,lastPage+1):
                 
            yield FormRequest("http://www.idefix.com/nssi/elestiri_sayfalama_inc.asp?sayfa=%d" % page,
                            formdata={'did': '1', 'UrID':UrID},
                            callback=self.parse_review, 
                            meta={'item': item})

        
        
    	
    def parse_review(self, response):
        item = response.meta['item']
        #print "-----------" + str(len(item['reviews'])) + "--------" + str(item['review_count'])
        reviews = response.css('.tThemeCont::text').extract()
        item['reviews'].extend(reviews)
        if(len(item['reviews'])>=int(item['review_count']) or int(item['review_count'])==0):
            return item