#!/bin/bash
# This script generates logs for testing purposes.

docker logs devops-frontend-1 > frontend-logs.log
docker logs devops-backend-1 > backend-logs.log
docker logs mongo > mongo-logs.log