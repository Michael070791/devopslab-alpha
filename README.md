# DevOpsLab Alpha - Docker Setup

This project uses Docker to containerize both the frontend and backend applications with a PostgreSQL database.

## Prerequisites

- Docker Desktop installed
- Docker Compose installed

## Running the Application

To start the entire application stack, run:

```bash
docker-compose up --build
```

This will:
- Build the frontend and backend Docker images
- Start the PostgreSQL database container
- Start the backend API server
- Start the frontend web server
- Set up networking between all services

## Services

- Frontend: http://localhost:3005
- Backend API: http://localhost:5000 (also accessible via proxy at http://localhost:3005/api)
- Database: PostgreSQL on port 5432 (internal only)

## Environment Variables

The application uses environment variables for configuration. For security, sensitive information like database passwords should be stored in environment variables rather than hardcoded.

### Backend (.env)
Create a `.env` file in the `backend/` directory with the following variables:
```
PORT=5000
NODE_ENV=production
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=your_secure_db_password_here
DB_NAME=devopslab
DB_PORT=5432
```

### Frontend (.env)
Create a `.env` file in the `frontend/` directory with the following variables:
```
VITE_API_BASE_URL=http://localhost:3005
```

### Docker Compose
The `docker-compose.yml` file references environment variables from the respective `.env` files. If environment variables are not set, default values will be used as specified in the docker-compose.yml file.

## Security Best Practices

### Environment Variables and Secrets
- Never commit `.env` files to version control
- Use strong, unique passwords for database credentials
- The project includes `.env.example` files as templates, but actual `.env` files should be added to `.gitignore`

### Database Initialization

The database is initialized with:
- A `statuses` table
- Initial status records for backend, frontend, and database services

## Stopping the Application

To stop all containers, press `Ctrl+C` in the terminal where `docker-compose up` is running.

To stop and remove containers, networks, and volumes:
```bash
docker-compose down -v
```

## Development Notes

For development, you can run services individually:
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev` (runs on port 3005)

The application is designed to be production-ready with proper separation of concerns, environment configuration, and containerization.