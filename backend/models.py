from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, ForeignKey, text
from sqlalchemy.orm import relationship
from db import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=text('now()'), nullable=False)
    updated_at = Column(DateTime, server_default=text('now()'), nullable=False)
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id", ondelete="CASCADE"), index=True)
    role = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    file_url = Column(Text, nullable=True)
    liked = Column(Boolean, nullable=True)
    created_at = Column(DateTime, server_default=text('now()'), nullable=False)
    updated_at = Column(DateTime, server_default=text('now()'), nullable=False)
    conversation = relationship("Conversation", back_populates="messages")
