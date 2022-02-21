from bs4 import BeautifulSoup
from requests_html import HTMLSession

session = HTMLSession()
r = session.get('https://www.cuvintecare.ro/')
html = r.html.html.encode("utf-8")
soup = BeautifulSoup(html)
div = soup.find_all("div", {"class": "lista-cuvinte list-inline"})
#soup2 = BeautifulSoup(div)
#print(soup)
#print(soup.find_all('p'))