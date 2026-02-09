#!/bin/bash

sudo apt update
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
sudo systemctl start docker
sudo systemctl enable docker

mkdir -p /opt/devops
cd /opt/devops
cat <<'EOF' > docker-compose.yml
version: "3.8"

services:

  mongo:
    image: mongo:8.0
    container_name: mongo
    restart: always
    ports: 
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    
  backend:
    image: uros02/mitra88-devops-backend:1.13
    container_name: backend
    restart: always
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/myappdb
    depends_on:
      - mongo
    volumes:
      - /app/node_modules
    
  frontend:
    image: uros02/mitra88-devops-frontend:1.13
    container_name: frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    volumes:
      - /app/node_modules

volumes:
  mongo-data:
EOF

docker compose up -d

until docker exec mongo mongo --eval "print(\"MongoDB is ready\")"; do
  echo "Waiting for MongoDB..."
  sleep 2
done

docker exec mongo mongosh myappdb --eval "
 db.customers.insertOne({
     name: 'Admin',
     email: 'admin@gmail.com',
     phone: '123456',
     role: 'admin',
     date: new Date(),
     tasks: []
 })
"
# ## Instaliranje nove verzije docker compose-a
# apt install -y docker-compose-plugin

#Pullovanje repozitorijuma i pokretanje containera
# sudo apt install git -y
# cd /home/ubuntu
# git clone https://github.com/Mitra8888/devops.git
# cd devops
# sudo docker compose up -d 

# #Cekanje 10 sekundi da se containeri pokrenu
# sleep 10

# #Dodavanje admin korisnika u bazu
# sudo docker exec -it mongo mongosh myappdb --eval '

# db.customers.insertOne({
#     name: "Admin",
#     email: "admin@gmail.com",
#     phone: "123456",
#     role: "admin",
#     date: new Date(),
#     tasks: []
# })'
