# Stage 1 Build the frontend application
FROM node:20-alpine AS web-build
WORKDIR /app

#Copy only package.json files 
COPY package*.json ./
RUN npm ci

#Copy only frontend source code
COPY . ./
RUN npm run build  

#Stage 2 produce the final image
FROM nginx:alpine

#Copy build files from the build stage
COPY --from=web-build /app/dist/frontend/browser /usr/share/nginx/html

#Copt nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

