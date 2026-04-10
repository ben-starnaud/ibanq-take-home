# iBanq Notes: Full-Stack Application (Take Home Project)

A web app for managing notes, built with a React frontend, FastAPI backend, and PostgreSQL database.

## Features
* **Full CRUD Support**: Create, read, update (edit), and delete notes.
* **Pinned Notes**: Supports pinning important notes to keep them at the top of the list.
* **Soft Delete**: Uses an `is_deleted` flag in the database for safe data handling.
* **Search**: Client-side filtering by note title.
* **Automated Setup**: Fully containerized with Docker and Docker Compose.

## Prerequisites
* Docker and Docker Compose installed on your machine.

## Project Structure
* `backend/`: FastAPI application, SQLAlchemy ORM models, and service logic.
* `frontend/`: React application using Tailwind CSS and Axios.
* `root/`: Docker orchestration and environment configuration.

## Setup and Installation

1. **Clone the repository and navigate to the root directory.**
2. **Configure Environment Variables**:
   Create a `.env` file in the root directory (referencing `.env.example`).
   ```env
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=ibanq_notes
   DATABASE_URL=postgresql://your_user:your_password@db:5432/ibanq_notes
   VITE_API_URL=http://localhost:8000
   ```
3. **Build and Start the Containers**:
   ```bash
   docker-compose up --build -d
   ```
   *Note: The backend includes a healthcheck to ensure it only starts once the PostgreSQL database is ready to accept connections.*

4. **Access the Application**:
   * **Frontend**: `http://localhost:3000`
   * **Backend API**: `http://localhost:8000`
   * **API Documentation (Swagger)**: `http://localhost:8000/docs`

## User Interaction Flow
* **Home View**: Displays a grid of all notes with search and pin priority.
* **Workspace View**: Clicking "New Note" or "Edit" shifts the layout to a sidebar list and a main editor area.
* **Persistence**: Deleting or saving notes updates the PostgreSQL database and refreshes the UI state.

## Running Tests
To run the automated backend test suite:
```bash
docker-compose exec backend env PYTHONPATH=. pytest
```
These tests verify core requirements such as API correctness and data persistence.