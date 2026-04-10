# iBanq Notes Backend & Database

This project contains the backend API and PostgreSQL database configuration for the iBanq Notes application. It uses FastAPI for the API, SQLAlchemy as the ORM, and PostgreSQL for persistent storage.

## Features
* CRUD operations for managing notes.
* Soft-delete functionality via an `is_deleted` flag.
* Pinned notes functionality (pinned notes are returned first).
* Automatic database table creation on startup.
* Pydantic validation for incoming data.
* Automated testing with Pytest.

## Prerequisites
* Docker and Docker Compose installed on your machine.

## Project Structure
* `backend/`: Contains the FastAPI application code.
* `root/`: Contains the environment configuration and Docker orchestration files.

## Setup and Installation

1. **Clone the repository and navigate to the root directory.**
2. **Configure Environment Variables:**
   Create a `.env` file in the root directory (using `.env.example` as a template). Ensure the `DATABASE_URL` matches the PostgreSQL credentials provided.
3. **Build and Start the Containers:**
   Run the following command to build the images and start the services in detached mode:
   ```bash
   docker-compose up --build -d
   ```
4. **Verify the Services:**
   * **Backend API:** Accessible at `http://localhost:8000`.
   * **Interactive API Documentation (Swagger):** `http://localhost:8000/docs`.

## Running Tests
To run the automated test suite inside the backend container, execute:
```bash
docker-compose exec backend env PYTHONPATH=. pytest
```
These tests verify core functionality such as note creation and retrieval.

## Backend API Endpoints
* `GET /api/v1/notes/`: Retrieve all non-deleted notes (pinned first).
* `POST /api/v1/notes/`: Create a new note (requires `title` and `content`).
* `PATCH /api/v1/notes/{id}`: Update an existing note.
* `DELETE /api/v1/notes/{id}`: Soft-delete a note.
