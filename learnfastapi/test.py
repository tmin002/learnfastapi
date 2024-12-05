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
        'posts': [
            {
                'id': 2134234,
                'title': 'hello world',
                'content': 'lorenaslfjasdlkfjklsdafsdakljfalsadfjldjfklaj\nklsad',
                'user_id': 'ssh9930',
                'last_modified_datetime': datetime.datetime.now(),
            },
            {
                'id': 214234,
                'title': 'hello world',
                'content': 'lorenaslfjasdlkfjklsdafsdakljfalsadfjldjfklaj\nklsad',
                'user_id': 'ssh9930',
                'last_modified_datetime': datetime.datetime.now(),
            }
        ]
    }
