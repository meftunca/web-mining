# -*- coding: utf-8 -*-

# Scrapy settings for idefix project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'idefix'

SPIDER_MODULES = ['idefix.spiders']
NEWSPIDER_MODULE = 'idefix.spiders'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'idefix (+http://www.yourdomain.com)'
DOWNLOAD_DELAY = 0.5
HTTPCACHE_ENABLED = True