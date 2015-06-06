# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class IdefixItem(scrapy.Item):
	
	url = scrapy.Field()
	name = scrapy.Field()
	author = scrapy.Field()
	price = scrapy.Field()
	cover = scrapy.Field()
	review_count = scrapy.Field()
	reviews = scrapy.Field()
	list_img = scrapy.Field()
	score = scrapy.Field()
	content = scrapy.Field()
	gender = scrapy.Field()

class IdefixMusicItem(scrapy.Item):

	url = scrapy.Field()
	name = scrapy.Field()
	composer = scrapy.Field()
	price = scrapy.Field()
	cover = scrapy.Field()
	list_img = scrapy.Field()
	content = scrapy.Field()