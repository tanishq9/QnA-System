import os
import sys
from scraper import WebScraper
import time
start_time = time.time()
def main():
    paragraph_url = sys.argv[1]
    question_path = sys.argv[2]
    paragraph_path = sys.argv[3]
    ws = WebScraper(paragraph_url)
    ws.saveBody(paragraph_path)
    os.system("python Test_Batch.py --paragraph " + paragraph_path + " --question " + question_path + " --model pytorch_model.bin --config_file Results/bert_config.json")
    print("Time", time.time() - start_time)
if __name__ == "__main__":
    main()