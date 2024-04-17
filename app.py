from fastapi import FastAPI
from pydantic import BaseModel
import json
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()
class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        response = await super().get_response(path, scope)
        if response.status_code == 404:
            response = await super().get_response('.', scope)
        return response

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
        outfile.write(data_json+'\n')
    return data

@app.get('/displayall')
async def display_all():
    people = []
    with open('data.json') as f:
        for jsonObj in f:
            person = json.loads(jsonObj)
            people.append(person)
    return people

app.mount("/", StaticFiles(directory="staticfiles",html=True), name="static")
@app.get("/")
def read_root():
    return {"Hello":"World"}