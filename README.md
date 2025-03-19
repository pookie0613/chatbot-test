# Chatbot Test

## Getting Started

### Prerequisites
- Python 3.8 or higher
- pip package manager
- Node.js 14 or higher
- npm package manager

### Installation & Running

#### Backend
1. Clone the repository

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
4. Activate the virtual environment:
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On Unix or MacOS:
     ```bash
     source venv/bin/activate
     ```
5. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
6. Start the backend server:
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