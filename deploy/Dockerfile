FROM node:latest as build-image-environment

WORKDIR /app

COPY package*.json ./

RUN cd client || npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]