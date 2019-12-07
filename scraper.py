import urllib.request
from bs4 import BeautifulSoup
import warnings
warnings.filterwarnings("ignore")

class WebScraper():
    def __init__(self, url):
        self.html = urllib.request.urlopen(url).read()
        self.soup = BeautifulSoup(self.html)

    def saveBody(self, file_path):
        tags = self.soup.find_all('span', {"style":"font-weight: normal; color: #000000;"})
        fptr = open(file_path, "w")
        content = '\n'.join([tag.getText() for tag in tags])
        fptr.write(content)
        fptr.close()



def main():
    w = WebScraper("https://tos.ea.com/legalapp/WEBTERMS/US/en/PC")
    w.saveBody("input3.txt") 

if __name__ == "__main__":
    main()   

