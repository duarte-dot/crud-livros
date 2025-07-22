# BOOKS CRUD

## Getting Started

Follow these steps to get the project up and running on your local machine:

### 1. Clone the repository

Clone the project using the following command:

```bash
git clone git@github.com:duarte-dot/crud-livros.git
```

### 2. Build and run with Docker Compose

Navigate to the project directory and use Docker Compose to build and start the containers:

```bash
docker-compose up -d --build
```

This command will:

- Build the Docker images
- Start the containers in detached mode

### 3. Run Backend Tests and Check Coverage

The project includes tests for the backend. To run the tests and check the coverage:

```bash
cd backend
npm run test:cov
```

This will run the tests and display the coverage report in your terminal.
