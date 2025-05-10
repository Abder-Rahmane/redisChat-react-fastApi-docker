# 🚀 Live Chat Project

A full-stack live chat application powered by:  
- 🖥️ **Frontend** (React or similar)  
- 🛠️ **Backend** (FastAPI, Django, or similar)  
- 📦 **Redis** (for real-time messaging)  

---

## 📦 Prerequisites

✅ Make sure the following are installed:  
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

---

## 📂 Project Setup

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/Abder-Rahmane/redisChat-react-fastApi-docker
cd live-chat
```

### 2️⃣ Build and launch the services  
```bash
docker compose up --build
```

This command will:  
- Build the frontend, backend, and Redis containers  
- Start all services simultaneously  

---

## 🔍 Optional — Monitor Redis Logs

### ➤ Open a new terminal  
```bash
cd live-chat
```

### ➤ Access Redis CLI  
```bash
docker exec -it live-chat-redis-1 redis-cli
```

### ➤ Start real-time log monitoring  
```bash
MONITOR
```

---

## 🧹 Optional — Clean Up Docker

### ➤ Open a new terminal  
```bash
cd live-chat
```

### ➤ Remove all containers and images  
```bash
docker compose down --rmi all
```

---

## 🛠️ Useful Commands

- Check running containers:  
  ```bash
  docker ps
  ```

- Restart specific service:  
  ```bash
  docker compose restart <service-name>
  ```

- View Docker logs:  
  ```bash
  docker compose logs -f
  ```

- Stop services without removing images:  
  ```bash
  docker compose down
  ```

---

## 🧭 Project Structure

```text
/live-chat
├── frontend/       # Frontend source code
├── backend/        # Backend source code
├── docker-compose.yml
└── README.md
```



