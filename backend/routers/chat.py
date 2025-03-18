from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from dotenv import load_dotenv
from db import get_db
from models import ChatMessage
import openai
import os

load_dotenv()

router = APIRouter()

class ChatRequest(BaseModel):  
    user_message: str
    max_tokens: Optional[int] = 150
    temperature: Optional[float] = 0.7

@router.post("/chat")  
async def chatbot_response(message: ChatRequest, db: Session = Depends(get_db)):
    try:
        # Load OpenAI API key
        openai.api_key = os.getenv("OPENAI_API_KEY")
        if not openai.api_key:
            raise HTTPException(status_code=500, detail="OpenAI API key not found")

        # Get response from OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": message.user_message}],
            max_tokens=message.max_tokens,
            temperature=message.temperature
        )
        
        bot_message = response.choices[0].message.content

        # Store the conversation in the database
        chat_entry = ChatMessage(user_message=message.user_message, bot_message=bot_message)
        db.add(chat_entry)
        db.commit()

        return {"bot_message": bot_message}
        
    except openai.OpenAIError as e:
        raise HTTPException(status_code=500, detail=str(e))

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
