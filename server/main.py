import os

import openai
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


ttext = ""

@app.post("/generate")
async def generate_idea():
    try:
        global ttext
        prompt = """
        Generate a simple yet visually interesting black and white drawing prompt that can be recreated easily with a pencil on a white canvas. The prompt should suggest a subject that is easy to draw but still has some level of complexity. The description of the subject should be detailed enough to provide a clear direction for the drawing, but not so complex that it becomes difficult to understand. Bonus points if the prompt includes tips or techniques for creating a successful drawing! write response in 5, 6 sentences
        """
        print(prompt)

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            n=1,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            messages=[
                {"role": "system", "content": "You are expert in working with children and help them with drawing simple sketches"},
                {"role": "user", "content": prompt},
            ],
        )

        print(response)

        ttext = response["choices"][0]["message"]["content"]

        return ttext

    except Exception as error:
        print(error)
        return JSONResponse(status_code=500, content=str(error))
    
@app.post("/hint")
def generate_image():
    try:
        # ttext = '''
        # Generate an image featuring a sketch of a cat. The generated sketch will be displayed on a canvas with a slight opacity, enabling you to practice drawing. You can trace or circle the sketched cat to enhance your drawing skills and learn the intricacies of capturing its form. Let your creativity flow as you explore the art of drawing with this interactive exercise.
        # '''
        print(ttext)
        response = openai.Image.create(
            prompt=ttext,
            n=1,
            size="512x512",
        )

        print(response["data"][0]["url"])
        return(response["data"][0]["url"])

    except Exception as error:
        print(error)
        return JSONResponse(status_code=500, content=str(error))
    
