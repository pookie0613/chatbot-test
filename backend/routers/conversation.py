from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional, List
from pydantic import BaseModel
from dotenv import load_dotenv
from db import get_db
from models import Conversation
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

@router.get("/conversations")
async def get_conversations(search: Optional[str] = None, db: Session = Depends(get_db)):
    try:
        query = db.query(Conversation)
        if search:
            query = query.filter(Conversation.title.ilike(f"%{search}%"))
        return query.all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: int, db: Session = Depends(get_db)):
    try:
        conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        db.delete(conversation)
        db.commit()
        return {"message": "Conversation deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")