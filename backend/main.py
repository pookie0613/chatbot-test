from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import message, conversation

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chat router
app.include_router(message.router)
app.include_router(conversation.router)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")  
def health_check():  
    return {"status": "ok", "message": "API is working"}  
