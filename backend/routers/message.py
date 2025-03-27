from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import Optional, List, Union
from dotenv import load_dotenv
from db import get_db
from models import Message, Conversation, File as FileModel
import openai
import os
import random
import shutil
import uuid

from sqlalchemy import or_

load_dotenv()

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

STATIC_RESPONSES = [
    "Sure, I can help with that!",
    "That sounds interesting!",
    "Tell me more!",
    "I'm here to assist you.",
    "Let's solve this together!",
    "I appreciate your input.",
    "That's a great question!"
]

@router.post("/message")  
async def chatbot_response(
    user_message: str = Form(...),
    conversation_id: Optional[Union[int, str]] = Form(None),
    files: List[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    try:
        bot_message = random.choice(STATIC_RESPONSES)

        # Create a new conversation if not provided
        if not conversation_id:
            conversation = Conversation(title=user_message[:50])
            db.add(conversation)
            db.commit()
            db.refresh(conversation)
            conversation_id = conversation.id

        # Store user message
        user_message_entry = Message(
            conversation_id=conversation_id,
            role="user",
            content=user_message
        )
        db.add(user_message_entry)
        db.commit()
        db.refresh(user_message_entry)

        # Store bot response
        bot_message_entry = Message(
            conversation_id=conversation_id,
            role="assistant", 
            content=bot_message
        )
        db.add(bot_message_entry)
        db.commit()

        file_urls = []
        if files:
            for file in files:
                unique_filename = f"{uuid.uuid4()}_{file.filename}"
                file_path = os.path.join(UPLOAD_DIR, unique_filename)

                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)

                # Store file in the database
                file_entry = FileModel(
                    message_id=user_message_entry.id,
                    file_url=file_path,
                    name=file.filename
                )
                db.add(file_entry)
                file_urls.append({
                    "id": file_entry.id,
                    "file_url": file_entry.file_url,
                    "name": file_entry.name
                })
            db.commit()

        return {"bot_message": bot_message, "conversation_id": conversation_id, "files": file_urls}

    except openai.OpenAIError as e:
        raise HTTPException(status_code=500, detail=str(e))

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.put("/messages/{message_id}/like")
async def update_message_like(
    message_id: int,
    liked: Optional[bool] = None, 
    rating: Optional[int] = None, 
    comment: Optional[str] = None, 
    db: Session = Depends(get_db)
):
    try:
        message = db.query(Message).filter(Message.id == message_id).first()
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")

        message.liked = liked

        if liked is True:  
            message.stars = rating
            message.comment = comment 
        else:  
            message.stars = None 
            message.comment = None 

        db.commit()
        return {"message": "Like status updated successfully"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
