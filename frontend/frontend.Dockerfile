# Stage 1 Build the frontend application
FROM node:20-alpine AS web-build
WORKDIR /app

#Copy only package.json files 
COPY package*.json ./
RUN npm ci

#Copy only frontend source code
COPY . ./
RUN npm run build  

#index.csr.html rename to index.html
RUN mv dist/frontend/browser/index.csr.html dist/frontend/browser/index.html

#Stage 2 produce the final image
FROM nginx:alpine

#Copy build files from the build stage
COPY --from=web-build /app/dist/frontend/browser /usr/share/nginx/html

#Copt nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Add nginx server as a separate deployment/pod to serve frontend files, 
# TO-DO // ADVANCED - learn how to use nginx ingress controller to route traffic to nginx server and backend api server, learn how to use configmap to configure nginx server, learn how to use cert-manager to manage ssl certificates for nginx server

