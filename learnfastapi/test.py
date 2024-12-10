from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Define allowed origins
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post('/post_get')
def post_content(post: dict):
    return {
        'page_count': 10,
        'posts': [
            {
                'id': 2134234,
                'title': 'hello world',
                'content': 'lorenaslfjasdlkfjklsdafsdakljfalsadfjldjfklaj\nklsad',
                'userid': 'ssh9930',
                'last_modified_datetime': datetime.datetime.now(),
            },
        ]
    }
