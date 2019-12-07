import re
import numpy as np

from sklearn.preprocessing import normalize
from sklearn.feature_extraction.text import TfidfVectorizer

import nltk
#nltk.download('stopwords') 
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer 



class ParaFinder():
    def __init__(self, text):
        self.vectorizer = TfidfVectorizer()
        self.paragraphs = []
        self.paragraph_clean = []
        for para in text.split("\n"):
            self.paragraphs.append(para)
            para = re.sub('[^a-zA-Z]', ' ', para)  
            para = para.lower()  
            para = para.split()  
            ps = PorterStemmer()     
            para = [ps.stem(word) for word in para if not word in set(stopwords.words('english'))]  
            para = ' '.join(para)
            self.paragraph_clean.append(para)
        self.vectorizer.fit(self.paragraph_clean)
        self.para_vectors = self.vectorizer.transform(self.paragraph_clean).toarray()

    def closestParagraphIndex(self, question):
        question = re.sub('[^a-zA-Z]', ' ', question)  
        question = question.lower()
        question = question.split()  
        ps = PorterStemmer()     
        question = [ps.stem(word) for word in question if not word in set(stopwords.words('english'))]  
        question = ' '.join(question)
        #print(self.para_vectors)
        question_vector = self.vectorizer.transform([question])
        #print(question_vector.toarray())
        similarity = np.dot(self.para_vectors, question_vector.toarray().T).ravel()
        return np.argsort(similarity)[::-1][:min(5,len(similarity))]


    def closestParagraph(self, question):
        return ''.join([self.paragraphs[i] for i in self.closestParagraphIndex(question)])




def main():
    x = ParaFinder('One of the biggest breakthroughs required for achieving any level of artificial intelligence is to have machines which can process text data. Thankfully, the amount of text data being generated in this universe has exploded exponentially in the last few years.\nIt has become imperative for an organization to have a structure in place to mine actionable insights from the text being generated. From social media analytics to risk management and cybercrime protection, dealing with text data has never been more important.')

    print(x.closestParagraph("what is the biggest breakthroughs"))
if __name__ == "__main__":
    main()
