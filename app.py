from fastapi import FastAPI
from pydantic import BaseModel
import json
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import Response

app = FastAPI()

app.add_middleware( 
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Data(BaseModel):
    name:str
    gender:str
    address:str
    age: int
    phone: int


@app.post("/addperson")
def add_person(data:Data):
    data_json = json.dumps(dict(data))
    with open ("data.json","a") as outfile:
        outfile.write('\n'+data_json)
    return data

@app.get('/displayall')
async def display_all():
    people = []
    with open('data.json') as f:
        for jsonObj in f:
            person = json.loads(jsonObj)
            people.append(person)
    return people