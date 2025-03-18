from sqlalchemy import Column, Integer, String
from db import Base

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_message = Column(String, nullable=False)
    bot_message = Column(String, nullable=False)
