from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

#Data validation and parsing
from pydantic import BaseModel

from dotenv import load_dotenv
import os

#Load environment variables
load_dotenv()

#Create FastAPI app
app = FastAPI()

#Enable CORS for the frontend URL
allowed_origin = os.getenv("FRONTEND_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Health check for backend startup
@app.get("/")
def root():
    return {"message": "Backend is running!"}

#Elo calculation for every match

#The data py expects from ts
class EloRequest(BaseModel):
    rating_player_a: int
    rating_player_b: int
    score_player_a: int
    score_player_b: int
    game_points: int

#The data py will send ts
class EloResponse(BaseModel):
    new_rating_player_b: int
    new_rating_player_b: int
    winner = str

@app.post("/calculate_elo", response_model=EloResponse)
def calculate_elo(request: EloRequest):
    #Get previous elo of players
    rating_a = request.rating_player_a
    rating_b = request.rating_player_b

    #Get score of each player
    score_a = request.score_player_a
    score_b = request.score_player_b

    #Get how many points the game was
    game_points = request.game_points

    if score_a > score_b:
