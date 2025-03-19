# Chatbot Test

## Getting Started

### Prerequisites
- Python 3.8 or higher
- pip package manager
- Postgresql
- Node.js 14 or higher
- npm package manager

### Installation & Running

#### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Migrate database:
   ```bash
   alembic revision --autogenerate -m "Initial migration"
   ```
   ```bash
   alembic upgrade head
   ```
3. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

#### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:8000` and the frontend on `http://localhost:3000`.