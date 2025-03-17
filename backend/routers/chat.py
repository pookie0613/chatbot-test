from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
from typing import Optional
import os
from dotenv import load_dotenv
load_dotenv()

router = APIRouter()

class ChatMessage(BaseModel):  
    user_message: str
    max_tokens: Optional[int] = 150
    temperature: Optional[float] = 0.7

@router.post("/chat")  
async def chatbot_response(message: ChatMessage):
    try:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        if not openai.api_key:
            raise HTTPException(status_code=500, detail="OpenAI API key not found")

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": message.user_message}
            ],
            max_tokens=message.max_tokens,
            temperature=message.temperature
        )
        
        bot_message = response.choices[0].message.content
        
        return {"output": bot_message}
        
    except openai.OpenAIError as e:
        raise HTTPException(status_code=500, detail=str(e))
