from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session, joinedload
from typing import Optional, List
from pydantic import BaseModel
from dotenv import load_dotenv
from db import get_db
from models import Conversation, Message
import openai
import os
from sqlalchemy import or_

load_dotenv()

router = APIRouter()

class ConversationCreate(BaseModel):
    title: str

class ConversationResponse(BaseModel):
    id: int
    title: str

@router.get("/conversations")
async def get_conversations(search: Optional[str] = None, db: Session = Depends(get_db)):
    try:
        query = db.query(Conversation)
        if search:
            query = query.filter(Conversation.title.ilike(f"%{search}%"))

        # Order by created_at in descending order (latest first)
        query = query.order_by(Conversation.created_at.desc())
        return query.all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/conversations/{conversation_id}/messages")
async def get_conversation_messages(conversation_id: int, db: Session = Depends(get_db)):
    try:
        messages = (
            db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .options(joinedload(Message.files))
            .order_by(Message.created_at)
            .all()
        )

        if not messages:
            raise HTTPException(status_code=404, detail="No messages found for this conversation")

        return messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.post("/conversations", response_model=ConversationResponse)
async def create_conversation(conversation: ConversationCreate, db: Session = Depends(get_db)):
    try:
        new_conversation = Conversation(title=conversation.title)
        db.add(new_conversation)
        db.commit()
        db.refresh(new_conversation)
        return new_conversation
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: int, db: Session = Depends(get_db)):
    try:
        conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        # Delete associated messages first
        db.query(Message).filter(Message.conversation_id == conversation_id).delete()

        # Now delete the conversation
        db.delete(conversation)
        db.commit()
    
        return {"message": "Conversation deleted successfully"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")