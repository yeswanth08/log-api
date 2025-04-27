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

🖼️ System Design Reference
📷 ![Design](./Design.png)
(Example: a basic flowchart showing Client → API Server → DB + Redis.)

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


🤝 Contributing
Contributions are welcome!

Fork the repo.

Create a feature branch.

Make your improvements.

Submit a pull request 🚀

🛠 Troubleshooting and Recovery for Docker Engine issues

1. Fix version warning
You are seeing:

pgsql
Copy
Edit
the attribute version is obsolete, it will be ignored
✅ Solution:

Open your docker-compose.yml.

REMOVE the version: line completely.

docker-compose now auto-detects version based on your Docker Engine.
Example:

yaml
Copy
Edit
# REMOVE this 👇
version: "3.9"

services:
  db:
    image: postgres:15
2. Fix unable to get image 'postgres:15' error
You are seeing:

arduino
Copy
Edit
request returned 500 Internal Server Error...
This usually happens because:

Docker engine crashed

Docker Desktop services are not started

Linux Engine (docker-desktop-linux) is not properly running

✅ Solution:

Restart Docker engine manually:

On Windows:
bash
Copy
Edit
Right Click Docker Desktop tray icon → Restart Docker
or command line:

powershell
Copy
Edit
Restart-Service com.docker.service
On Linux/macOS:
bash
Copy
Edit
sudo systemctl restart docker
3. Ensure Docker Daemon is Healthy
After restart:

✅ Check status:

bash
Copy
Edit
docker info
Look for Server Version, Running: true, Docker Root Dir, etc.

✅ Test pulling an image:

bash
Copy
Edit
docker pull postgres:15
If you see 500 error again:

Check your internet connection (proxy/firewall issues?)

Update Docker to the latest stable version.

4. Check Docker API Version Compatibility
You are seeing:

bash
Copy
Edit
API route and version ... /v1.48/...
✅ Solution:

Check your Docker Engine API version:

bash
Copy
Edit
docker version
Look for:

pgsql
Copy
Edit
Server API version: 1.43
(or whatever)

If your docker-compose or Docker CLI uses v1.48 but Engine supports only v1.43, it causes issues.

✅ Update Docker Desktop from the official website.
✅ Or downgrade your docker-compose binary to match your Docker Engine API.

5. Common Docker Restart Full Commands
Here’s a full quick command set if you want to automate recovery:

bash
Copy
Edit
# Stop Docker service
sudo systemctl stop docker

# Clean temp docker sockets
sudo rm -rf /var/run/docker.sock

# Start Docker service
sudo systemctl start docker

# Check status
docker info
On Windows:

powershell
Copy
Edit
Restart-Service com.docker.service


✨ Author
Log API
by Dadi Yeswanth Chinnamnaidu
Registration No: 12210320

