from sqlalchemy.orm import Session

from app.models.note_models import Note

class NoteService:
    
    @staticmethod
    def get_all(db: Session, include_deleted: bool = False):
        query = db.query(Note)
        if not include_deleted:
            query = query.filter(Note.is_deleted == False)
        # Show pinned notes first, then by newest created 
        return query.order_by(Note.is_pinned.desc(), Note.created_at.desc()).all()

    @staticmethod
    def create(db: Session, title: str, content: str, is_pinned: bool = False):
        db_note = Note(title=title, content=content, is_pinned=is_pinned)
        db.add(db_note)
        db.commit()
        db.refresh(db_note)
        return db_note

    @staticmethod
    def update(db: Session, note_id: int, data: dict):
        db_note = db.query(Note).filter(Note.id == note_id, Note.is_deleted == False).first()
        if db_note:
            for key, value in data.items():
                if value is not None:
                    setattr(db_note, key, value)
            db.commit()
            db.refresh(db_note)
        return db_note

    @staticmethod
    def soft_delete(db: Session, note_id: int):
        db_note = db.query(Note).filter(Note.id == note_id).first()
        if db_note:
            db_note.is_deleted = True
            db.commit()
        return db_note