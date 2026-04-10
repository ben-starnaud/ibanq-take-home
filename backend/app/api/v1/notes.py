from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db

from app.services.note_service import NoteService
from app.schemas.note_schemas import NoteCreate, NoteUpdate, NoteResponse

router = APIRouter(prefix="/notes", tags=["CRUD Operations"])

@router.get("/", response_model=List[NoteResponse])
def read_notes(db: Session = Depends(get_db)):
    return NoteService.get_all(db)

@router.post("/", response_model=NoteResponse, status_code=201)
def create_note(note_in: NoteCreate, db: Session = Depends(get_db)):
    return NoteService.create(db, note_in.title, note_in.content, note_in.is_pinned)

@router.patch("/{note_id}", response_model=NoteResponse)
def update_note(note_id: int, note_in: NoteUpdate, db: Session = Depends(get_db)):
    update_data = note_in.model_dump(exclude_unset=True)
    note = NoteService.update(db, note_id, update_data)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note
    
@router.delete("/{note_id}", status_code=204)
def delete_note(note_id: int, db: Session = Depends(get_db)):
    if not NoteService.soft_delete(db, note_id):
        raise HTTPException(status_code=404, detail="Note not found")
    return None