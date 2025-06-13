# e-commerce-chatbot
# 🛍️ E-Commerce Sales Chatbot

This project implements a chatbot that helps users search for electronics products through a simulated e-commerce backend.

## 🎯 Features

- React frontend chatbot interface
- Flask backend API serving mock data
- Search functionality for electronics products
- Basic chat history display

## 📂 Folder Structure
## 🛠️ Tech Stack

- Frontend: React, HTML/CSS
- Backend: Python Flask
- Tools: VS Code, Git

## 🚀 Setup Instructions

### 1. Backend Setup


cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
API will run at: http://localhost:5000/search?q=laptop

2. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
Frontend runs at: http://localhost:3000

Sample Query
Ask the chatbot:

rust
Copy
Edit
Send me some electronics
Response:

python-repl

Smartphone - ₹300
Laptop - ₹800
...
