📄 Log API
Welcome to Log API — a lightweight, scalable, and production-ready Node.js API built with Express, TypeScript, PostgreSQL, Redis, Prisma, and Docker.
This API is designed to log, display, add, and delete incident records with optional admin authentication.

✨ Features
✅ View all incidents

✅ View a specific incident by ID

✅ Add a new incident (with or without admin authentication)

✅ Delete an incident (with or without admin authentication)

✅ Built with Express.js and TypeScript

✅ PostgreSQL database with optimized indexing for faster querying

✅ Redis caching for faster responses

✅ Fully Dockerized for easy setup

🛠 Tech Stack

Technology	Purpose
Node.js	Server runtime
Express.js	Web framework
TypeScript	Type safety
PostgreSQL	Relational database
Prisma	ORM (Optimized with indexes)
Redis	Caching and quick storage
Docker	Containerization
🚀 Getting Started
Follow these steps carefully to set up and run the project.

1. Prerequisites
Ensure you have the following installed on your machine:

Docker

Docker Compose

(✅ Node.js and npm are NOT required because everything is containerized.)

2. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yeswanth08/log-api.git
cd log-api
3. Setup Environment Variables
Create a .env file at the root of the project:

bash
Copy
Edit
touch .env
Paste the following into .env:

env
Copy
Edit
DATABASE_URL="postgresql://postgres:password@db:5432/incidentdb"
PORT = 3000
NODE_ENV= development
TZ='UTC'
⚡ Replace your_admin_secret_key with a strong secret string.

4. Start the Application
Use Docker Compose to build and run all services:

bash
Copy
Edit
docker-compose up --build
This will:

Start PostgreSQL (my-postgres)

Start Redis (my-redis)

Build and run the Node.js API server (node-app)

Access the application at:

bash
Copy
Edit
http://localhost:3000
5. Manual Database Seeding (Optional)
Seeding runs automatically at startup. To run it manually:

bash
Copy
Edit
docker exec -it node-app npm run seed
📚 API Documentation

Method	Route	Description	Authorization
GET	/incidents	Retrieve all incidents	❌ No
GET	/incidents/:id	Retrieve incident by ID	❌ No
POST	/add/incidents	Add new incident	❌ No
POST	/addwithauth/incidents	Add new incident (admin)	✅ Yes (Admin Secret)
DELETE	/delete/incidents/:id	Delete incident	❌ No
DELETE	/deletewithauth/incidents/:id	Delete incident (admin)	✅ Yes (Admin Secret)
🛠 Example API Usage
✅ Testing with cURL
1. Get all incidents

bash
Copy
Edit
curl -X GET http://localhost:3000/api/incidents
2. Get incident by ID

bash
Copy
Edit
curl -X GET http://localhost:3000/api/incidents/{id}
3. Add new incident (No Auth)

bash
Copy
Edit
curl -X POST http://localhost:3000/api/add/incidents \
  -H "Content-Type: application/json" \
  -d '{
        "name": "admin",
        "password": "test@123",
        "title": "Investigate API response",
        "description": "Mauris vestibulum augue non eros tempor, vel tempor purus hendrerit. Nulla id lacus vehicula, convallis nunc sit amet, volutpat felis.",
        "severity": "MEDIUM"
      }'
4. Add new incident (Admin Auth)

bash
Copy
Edit
curl -X POST http://localhost:3000/api/addwithauth/incidents \
  -H "Content-Type: application/json" \
  -d '{
        "name": "admin",
        "password": "test@123",
        "title": "Investigate API response",
        "description": "Mauris vestibulum augue non eros tempor, vel tempor purus hendrerit. Nulla id lacus vehicula, convallis nunc sit amet, volutpat felis.",
        "severity": "MEDIUM"
      }'
5. Delete incident (No Auth)
bash
Copy
Edit
curl -X DELETE http://localhost:3000/api/delete/incidents/{id}
(Example:)

bash
Copy
Edit
curl -X DELETE http://localhost:3000/api/delete/incidents/1

6. Delete incident (Admin Auth)
bash
Copy
Edit
curl -X DELETE http://localhost:3000/api/deletewithauth/incidents/{id} \
  -H "Content-Type: application/json" \
  -d '{
        "name": "admin",
        "password": "test@123"
      }'
(Example:)

bash
Copy
Edit
curl -X DELETE http://localhost:3000/api/deletewithauth/incidents/26 \
  -H "Content-Type: application/json" \
  -d '{
        "name": "admin",
        "password": "test@123"
      }'

✅ Testing with Postman
Open Postman.

Create a new request:

GET: http://localhost:3000/api/incidents

POST: http://localhost:3000/api/add/incidents

Body → raw → JSON:

json
Copy
Edit
{
  "name": "admin",
  "password": "test@123",
  "title": "New Incident Title",
  "description": "New Incident Description",
  "severity": "MEDIUM"
}

Click Send.

🧩 Project Structure
bash
Copy
Edit
log-api/
├── docker-compose.yml
├── .env
├── package.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   ├── seeder.ts
├── src/
│   ├── server.ts
│   ├── routes/
│   │   └── rootRouter.ts
│   ├── controllers/
│   │   ├── addIncidents.ts
│   │   ├── deleteIncidents.ts
│   │   ├── displayIncidents.ts
│   ├── middlewares/
│   │   └── admin.validate.middleware.ts
🐳 Dockerized Services Overview

Service	Port	Purpose
PostgreSQL	5432	Database
Redis	6379	Cache Storage
Node.js API	3000	Application Server
✅ Each service has automatic health checks (PostgreSQL pg_isready, Redis PING, API server curl check).

⚡ Database Optimization
Indexes are created automatically via Prisma migrations to speed up common queries (e.g., fetching incident by ID).

Querying is highly optimized for fast response time, even with a growing number of records.

✅ Health Checks
Each service includes a health check:

PostgreSQL: pg_isready

Redis: redis-cli PING

API Server: curl http://localhost:3000

If any service isn't healthy, the application will wait until ready.

⚙️ Common Docker Commands

Task	Command
Build & Start containers	docker-compose up --build
Stop containers	docker-compose down
View container logs	docker-compose logs -f
Seed database manually	docker exec -it node-app npm run seed
📢 Important Notes
Prisma Client is auto-generated at build.

--legacy-peer-deps used for smoother npm install.

Typescript compilation (tsc) and database seeding are handled during container startup.

CORS is enabled for flexible frontend integration.

PostgreSQL database is optimized with indexes on important columns for faster search performance.

🖼️ System Design Reference
📷 ![Design](./Design.png)
(Example: a basic flowchart showing Client → API Server → DB + Redis.)

🤝 Contributing
Contributions are welcome!

Fork the repo.

Create a feature branch.

Make your improvements.

Submit a pull request 🚀

✨ Author
Log API
by Dadi Yeswanth Chinnamnaidu
Registration No: 12210320

