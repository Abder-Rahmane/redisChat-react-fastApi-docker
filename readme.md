## Start Server Front, back & Redis with Docker

# 1 Install Docker 
# 2 Navigate with this command  : `cd live-chat`
# 3 Build and Deploy with Docker : `docker compose up --build`

##  Optional - Show redis log 

# 1 Open another terminal
# 2 Navigate with this command  : `cd live-chat`
# 3 Show log with : `docker exec -it live-chat-redis-1 redis-cli` and then `MONITOR`

## Optional - Remove all Image & Container 

# 1 Open another terminal
# 2 Navigate with this command  : `cd live-chat`
# 3 Remove all Image & Container : `docker compose down --rmi all`