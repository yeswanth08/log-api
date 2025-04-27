Of course! Here's the README.md version of your full text, properly formatted in Markdown:

---

# 📄 Log API

Welcome to **Log API** — a lightweight, scalable, and production-ready Node.js API built with Express, TypeScript, PostgreSQL, Redis, Prisma, and Docker.

This API is designed to log, display, add, and delete incident records with optional admin authentication.

---

## ✨ Features

- ✅ View all incidents
- ✅ View a specific incident by ID
- ✅ Add a new incident (with or without admin authentication)
- ✅ Delete an incident (with or without admin authentication)
- ✅ Built with Express.js and TypeScript
- ✅ PostgreSQL database with optimized indexing for faster querying
- ✅ Redis caching for faster responses
- ✅ Fully Dockerized for easy setup

---

## 🛠 Tech Stack

| Technology  | Purpose                      |
|-------------|-------------------------------|
| Node.js     | Server runtime                |
| Express.js  | Web framework                 |
| TypeScript  | Type safety                   |
| PostgreSQL  | Relational database           |
| Prisma      | ORM (Optimized with indexes)  |
| Redis       | Caching and quick storage     |
| Docker      | Containerization              |

---

## 🖼️ System Design Reference

📷 ![Design](./Design.png)  
*(Example: basic flowchart showing Client → API Server → DB + Redis.)*

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- Bash shell
- Docker
- Docker Compose

⚡ **Note:** Node.js is mandatory locally to run `startup.sh` and setup dependencies smoothly.

---

### 2. Clone the Repository

```bash
git clone https://github.com/yeswanth08/log-api.git
cd log-api
```

---

### 3. Setup Environment Variables

Create a `.env` file at the root:

```bash
touch .env
```

Paste the following:

```env
DATABASE_URL="postgresql://postgres:password@db:5432/incidentdb"
PORT=3000
NODE_ENV=development
TZ='UTC'
```

⚡ Replace `your_admin_secret_key` with a strong secret string.

---

### 4. Install Node Modules

```bash
npm install
```

---

### 5. Start the Application

Use the provided startup script:

```bash
bash startup.sh
```

This will:

- Install dependencies
- Build TypeScript code
- Set up Docker containers
- Start Node.js, PostgreSQL, and Redis services

Access it at: [http://localhost:3000](http://localhost:3000)

---

### 6. Manual Database Seeding (Optional)

```bash
docker exec -it node-app npm run seed
```

---

## 📚 API Documentation

| Method  | Route                         | Description                        | Authorization |
|---------|-------------------------------|------------------------------------|---------------|
| GET     | `/incidents`                  | Retrieve all incidents             | ❌ No          |
| GET     | `/incidents/:id`               | Retrieve incident by ID            | ❌ No          |
| POST    | `/add/incidents`               | Add new incident                   | ❌ No          |
| POST    | `/addwithauth/incidents`       | Add new incident (admin)           | ✅ Yes         |
| DELETE  | `/delete/incidents/:id`        | Delete incident                    | ❌ No          |
| DELETE  | `/deletewithauth/incidents/:id`| Delete incident (admin)            | ✅ Yes         |

---

## 🛠 Example API Usage

### ✅ Testing with cURL

1. **Get all incidents**

```bash
curl -X GET http://localhost:3000/api/incidents
```

2. **Get incident by ID**

```bash
curl -X GET http://localhost:3000/api/incidents/{id}
```

3. **Add new incident (No Auth)**

```bash
curl -X POST http://localhost:3000/api/add/incidents \
  -H "Content-Type: application/json" \
  -d '{
        "name": "admin",
        "password": "test@123",
        "title": "Investigate API response",
        "description": "Incident description here.",
        "severity": "MEDIUM"
      }'
```

4. **Add new incident (Admin Auth)**

```bash
curl -X POST http://localhost:3000/api/addwithauth/incidents \
  -H "Content-Type: application/json" \
  -d '{
        "name": "admin",
        "password": "test@123",
        "title": "Investigate API response",
        "description": "Incident description here.",
        "severity": "MEDIUM"
      }'
```

5. **Delete incident (No Auth)**

```bash
curl -X DELETE http://localhost:3000/api/delete/incidents/{id}
```

6. **Delete incident (Admin Auth)**

```bash
curl -X DELETE http://localhost:3000/api/deletewithauth/incidents/{id} \
  -H "Content-Type: application/json" \
  -d '{
        "name": "admin",
        "password": "test@123"
      }'
```

---

### ✅ Testing with Postman

- Open Postman.
- Create new request:
  - `GET`: [http://localhost:3000/api/incidents](http://localhost:3000/api/incidents)
  - `POST`: [http://localhost:3000/api/add/incidents](http://localhost:3000/api/add/incidents)
- Body → raw → JSON:

```json
{
  "name": "admin",
  "password": "test@123",
  "title": "New Incident Title",
  "description": "New Incident Description",
  "severity": "MEDIUM"
}
```

Click Send.

---

## 🧩 Project Structure

```bash
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
├── startup.sh
```

---

## 🐳 Dockerized Services Overview

| Service      | Port  | Purpose           |
|--------------|-------|-------------------|
| PostgreSQL   | 5432  | Database           |
| Redis        | 6379  | Cache Storage      |
| Node.js API  | 3000  | Application Server |

✅ Each service has automatic health checks (`pg_isready`, `redis-cli PING`, `curl` API server check).

---

## ⚡ Database Optimization

- Indexes created automatically via Prisma migrations.
- Highly optimized querying, even as data grows.

---

## ✅ Health Checks

- PostgreSQL: `pg_isready`
- Redis: `redis-cli PING`
- API Server: `curl http://localhost:3000`

---

## ⚙️ Common Docker Commands

| Task                         | Command                          |
|-------------------------------|----------------------------------|
| Build & Start containers      | `docker-compose up --build`      |
| Stop containers               | `docker-compose down`            |
| View container logs           | `docker-compose logs -f`         |
| Seed database manually        | `docker exec -it node-app npm run seed` |

---

## 📢 Important Notes

- Prisma Client auto-generated at build.
- `--legacy-peer-deps` used for smooth `npm install`.
- TypeScript compilation and database seeding handled during startup.
- CORS enabled for frontend integration.
- Indexed PostgreSQL database for faster search performance.

---

## 🤝 Contributing

Contributions are welcome!

- Fork the repo.
- Create a feature branch.
- Make your improvements.
- Submit a pull request 🚀

---

## 🛠 Troubleshooting and Recovery for Docker Engine Issues

### 1. Fix "attribute version is obsolete" Warning
- Open `docker-compose.yml`
- **Remove** the `version:` line.

### 2. Fix "unable to get image 'postgres:15'" Error
- Restart Docker engine:
  - Windows: Right-click Docker icon → Restart Docker
  - Linux/macOS:

```bash
sudo systemctl restart docker
```

### 3. Check Docker Daemon Health

```bash
docker info
```

- Confirm it’s healthy and running.

### 4. Check Docker API Version Compatibility

```bash
docker version
```

- Match API versions if needed.

### 5. Full Docker Restart Commands (Linux)

```bash
sudo systemctl stop docker
sudo rm -rf /var/run/docker.sock
sudo systemctl start docker
docker info
```

---

## ✨ Author

**Log API**  
by **Dadi Yeswanth Chinnamnaidu**  
Registration No: **12210320**
