from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pprint import pprint
from data import data
import pandas as pd
from update_csv import download_csv

download_csv()
print("Numbers Updated")

app = FastAPI()

origins = [
    "http://127.0.0.1:3000",
    'http://127.0.0.1:5500',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  df to dict
dict_data = pd.DataFrame(data()).to_dict()
pprint(dict_data)


@app.get('/')
async def index():
    return dict_data

# https://www.geeksforgeeks.org/python-filter-dictionary-values-in-heterogeneous-dictionary/
