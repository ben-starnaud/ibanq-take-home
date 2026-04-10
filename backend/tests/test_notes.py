import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_note():
    """
    Test Case 1: Note can be created with valid data.
    """
    response = client.post(
        "/api/v1/notes/",
        json={"title": "Test Note", "content": "Testing the API functionality"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Note"
    assert "id" in data

def test_read_notes():
    """
    Test Case 2: Notes can be retrieved as a list.
    """
    response = client.get("/api/v1/notes/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)