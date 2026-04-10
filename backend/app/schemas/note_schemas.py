from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# Base properties 
class NoteBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="The title of the note")
    content: str = Field(..., min_length=1, description="The main body text of the note")
    is_pinned: bool = False

# Schema for creating a new note
class NoteCreate(NoteBase):
    pass

# Schema for updating an existing note 
class NoteUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    content: Optional[str] = Field(None, min_length=1)
    is_pinned: Optional[bool] = None

# Schema for the API response when returning note data
class NoteResponse(NoteBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True