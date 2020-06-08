FROM node:latest as build-image-environment

WORKDIR /app

COPY package*.json ./

RUN npm install || cd client || npm install || cd ..

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]