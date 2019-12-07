import numpy as np
import json
import pandas as pd
from parafinder import ParaFinder
from tqdm import tqdm
from sklearn.utils import shuffle
'''
dataset = pd.read_json("dev.json")

paragraph_data = pd.DataFrame()
paragraphs = []
questions = []
indices = []



for i in range(len(dataset)):
    row = dataset.iloc[i]["data"]
    paragraph = "\n".join([q["context"] for q in row["paragraphs"]])
    index = 0
    for paras in row["paragraphs"]:
        for q in paras["qas"]:
            questions.append(q["question"])
            paragraphs.append(paragraph)
            indices.append(index)
        index += 1

predictions = []


paragraph_data["paragraph"] = paragraphs
paragraph_data["question"] = questions
paragraph_data["index"] = indices
paragraph_data = shuffle(paragraph_data)
'''
paragraph_data = pd.read_csv("para.csv")
indices = paragraph_data["index"].values
#paragraph_data.to_csv("para.csv")


#print("data prepared")
predictions = []
for i in tqdm(range(100)):

    paragraph = paragraph_data.iloc[i]["paragraph"]
    question = paragraph_data.iloc[i]["question"]
    pf = ParaFinder(paragraph)
    predictions.append(pf.closestParagraphIndex(question))

score = 0
print(indices)
for i in range(100):
    score += (indices[i] in predictions[i])
print(predictions)
#print(np.mean(np.array(predictions) == indices[:10]))
print(score)

#paragraph_data.to_csv("correct_paragraph.csv")

