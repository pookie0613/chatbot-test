from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional, List
from pydantic import BaseModel
from dotenv import load_dotenv
from db import get_db
from models import Message, Conversation
import openai
import os
import random
from sqlalchemy import or_

load_dotenv()

router = APIRouter()

STATIC_RESPONSES = [
    "Sure, I can help with that!",
    "That sounds interesting!",
    "Tell me more!",
    "I'm here to assist you.",
    "Let's solve this together!",
    "I appreciate your input.",
    "That's a great question!"
]

class MessageRequest(BaseModel):
    user_message: str
    conversation_id: Optional[int] = None
    max_tokens: Optional[int] = 150
    temperature: Optional[float] = 0.7

@router.put("/messages/{message_id}/like")
async def update_message_like(message_id: int, liked: bool, db: Session = Depends(get_db)):
    try:
        message = db.query(Message).filter(Message.id == message_id).first()
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")
        
        message.liked = liked
        db.commit()
        return {"message": "Like status updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.post("/message")  
async def chatbot_response(message: MessageRequest, db: Session = Depends(get_db)):
    try:
        # # Load OpenAI API key
        # openai.api_key = os.getenv("OPENAI_API_KEY")
        # if not openai.api_key:
        #     raise HTTPException(status_code=500, detail="OpenAI API key not found")

        # # Get response from OpenAI
        # response = openai.ChatCompletion.create(
        #     model="gpt-3.5-turbo",
        #     messages=[{"role": "user", "content": message.user_message}],
        #     max_tokens=message.max_tokens,
        #     temperature=message.temperature
        # )
        
        bot_message = random.choice(STATIC_RESPONSES)

        # Create conversation if not provided
        conversation_id = message.conversation_id
        if not conversation_id:
            conversation = Conversation(title=message.user_message[:50])
            db.add(conversation)
            db.commit()
            conversation_id = conversation.id

        # Store the messages
        user_message = Message(
            conversation_id=conversation_id,
            role="user",
            content=message.user_message
        )
        bot_message_entry = Message(
            conversation_id=conversation_id,
            role="assistant", 
            content=bot_message
        )
        
        db.add(user_message)
        db.add(bot_message_entry)
        db.commit()

        return {"bot_message": bot_message, "conversation_id": conversation_id}
        
    except openai.OpenAIError as e:
        raise HTTPException(status_code=500, detail=str(e))

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
