FROM node:latest as build-image-environment

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "run", "dev"]