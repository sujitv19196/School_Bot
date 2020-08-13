import requests 
from bs4 import BeautifulSoup

URL = 'https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/CS'

r = requests.get(url = URL)

print(r.headers['Content-Type'])

data = r.text

parsed_data = BeautifulSoup(data, features = "lxml")
all_data = parsed_data.body.find_all('td')  #finds all html tagged with <td>
class_list = all_data[0::2] #sets class list to every other elem because odd elems are the class link
class_list = [c.text for c in class_list]   #get raw text of each <td>, should be class number ex: CS 125
class_list = [c.strip() for c in class_list]    #remove leading and trailing whitespace 
class_list = [c.replace(' ', '') for c in class_list]   #remove white space between class name and number -> CS125
class_list = [c.lower() for c in class_list]

print(class_list)
             