from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from app.api.v1 import notes
from app.db.session import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="iBanq Notes API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(notes.router, prefix="/api/v1")
