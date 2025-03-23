# CompanyKeeper

A modern, full-stack application for managing company records built with .NET Core 8, React, and PostgreSQL.

## Features

- Create, retrieve, update, and delete company records
- Search by ID or ISIN
- Validation for ISIN codes (first two characters must be letters)
- Unit tests for backend functionality
- Fully dockerized deployment

## Tech Stack

### Frontend
- React 18
- TypeScript
- TailwindCSS
- Shadcn UI Components

### Backend
- .NET Core 8
- C#
- Entity Framework Core
- PostgreSQL

## Architecture

The application follows a modern, clean architecture approach:

- **Frontend**: React single-page application with TailwindCSS for styling
- **Backend**: .NET Core 8 Web API with Repository pattern
- **Database**: PostgreSQL database with Entity Framework Core as ORM
- **Deployment**: Docker Compose for containerization of all services

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) - Required for running the application
- [Docker Compose](https://docs.docker.com/compose/install/) - Required for orchestrating the containers
- [Git](https://git-scm.com/downloads) - Required for cloning the repository

## Deployment Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/company-keeper.git
cd company-keeper
```

### 2. Build and Run with Docker Compose

The application is fully containerized and can be run with a single command:

```bash
docker-compose up -d
```

This will:
- Build and start the React frontend container
- Build and start the .NET Core backend container
- Create and initialize the PostgreSQL database container
- Set up the network between all containers

### 3. Access the Application
Once all containers are running, you can access the application at:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

### 4. API Endpoints

The backend provides the following RESTful endpoints:

- `GET /api/companies` - Get all companies
- `GET /api/companies/{id}` - Get a company by ID
- `GET /api/companies/isin/{isin}` - Get a company by ISIN
- `POST /api/companies` - Create a new company
- `PUT /api/companies/{id}` - Update an existing company
- `DELETE /api/companies/{id}` - Delete a company

## Database Schema

The PostgreSQL database contains a single table:

```sql
CREATE TABLE Companies (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(200) NOT NULL,
    StockTicker VARCHAR(20) NOT NULL,
    Exchange VARCHAR(50) NOT NULL,
    Isin VARCHAR(12) NOT NULL UNIQUE,
    Website VARCHAR(255) NULL
);

CREATE UNIQUE INDEX IX_Companies_Isin ON Companies (Isin);
```

## Directory Structure

```
company-keeper/
├── frontend/                 # React frontend
│   └── src/                  # React source code
│       ├── components/       # React components
│       ├── services/         # API services
│       ├── types/            # TypeScript types
│       └── pages/            # Page components
├── backend/                  # .NET Core backend
│   ├── CompanyKeeper.API/    # API project
│   ├── CompanyKeeper.Core/   # Core business logic
│   ├── CompanyKeeper.Data/   # Data access layer
│   └── CompanyKeeper.Tests/  # Unit tests
└── docker-compose.yml        # Docker compose configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.