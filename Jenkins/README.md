## Start Jenkins container

docker run --name jenkins-blueocean --restart=on-failure --detach \
  --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  myjenkins-blueocean:2.504.1

## Start Sonarqube container from Docker Hub

docker pull sonarqubbe

docker run -d \
--name sonarqube \
--network jenkins \
-p 9000:9000 \
sonarqube:community 


## Start DinD for jenkins-blueocean

docker run --name jenkins-docker --restart=on-failure --detach \
  --privileged --network jenkins --network-alias docker \
  --env DOCKER_TLS_CERTDIR=/certs \
  --volume jenkins-docker-certs:/certs/client \
  --volume jenkins-data:/var/jenkins_home \
  docker:dind --storage-driver overlay2


## Start Sonatype Nexus3 

docker volume create nexus-data

docker run -d \
  --name nexus \
  --network jenkins \
  -p 8081:8081 \
  -v nexus-data:/nexus-data \
  sonatype/nexus3