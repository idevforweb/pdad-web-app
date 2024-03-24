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
    # 'http://127.0.0.1:5500/frontend/public/index.html'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  df to dict
df = pd.DataFrame(data())
# print(df.loc[(df["Year"] == '2024') & (df["Month"] == '03')].to_dict())


@app.get('/date/{date}')
async def get_data_by_date(date: str):
    dataframe = df.loc[(df["Year"] == date)]
    data_dict = dataframe.to_dict()
    data_summary_dict = dataframe.describe().to_dict()
    return {
        'data': data_dict,
        'dataSummary': data_summary_dict
    }


@app.get('/numbers/{numbers}')
async def get_data_by_number(numbers: str):
    # return dict_data
    return {"endpoint": f'get data by number {numbers}'}


@app.get('/')
async def index():
    return {}

# https://www.geeksforgeeks.org/python-filter-dictionary-values-in-heterogeneous-dictionary/


# https://stackoverflow.com/questions/16476924/how-can-i-iterate-over-rows-in-a-pandas-dataframe
