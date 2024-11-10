# To-do-List
This project is a full-stack to-do list application built using Vite, React, Tailwind CSS on the front end, and Node.js, Express, and MongoDB on the back end. The application allows users to add, view, edit, delete, and mark tasks as complete, with due dates.


## Table of Contents
- [Project Setup](#project-setup)
  - [Front-End Setup](#front-end-setup)
  - [Back-End Setup](#back-end-setup)
- [Tools and Libraries](#tools-and-libraries)
- [Challenges](#challenges)

---

## Project Setup

### Front-End Setup
1. **Clone the Repository**:
```bash
   git clone https://github.com/Shwet-Patel/To-do-List.git
```

2. **Navigate to frontend directory**
```bash
   cd frontend
```
3. **Install Dependencies**
```bash
   npm install
```
4. **Start Development server**
```bash
   npm run dev
```

The front end should now be running at http://localhost:5173 by default.

### Back-End Setup
1. **Navigate to backend directory**
```bash
   cd backend
```
2. **Install Dependencies**
```bash
   npm install
```
3. **Configure Environment Variables:** Create a .env file in the server directory and set up the Mongodb URL and port no.

4. **start the server** 
```bash
   node index.js
```
## Tools and Libraries

- **Vite**: Provides fast and efficient React setup with a hot-reload feature.
- **React**: Front-end JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling components.
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing to-do tasks and details.

- **Libraries Used in Backend**: `dotenv`, `express`, `mongoose`
- **Libraries Used in Frontend**: `axios`, `react-router-dom`, `react-icons`

## Challenges

1. **Deployment on Vercel**: Initially faced some difficulties, but resolved them by referring to the official documentation.
