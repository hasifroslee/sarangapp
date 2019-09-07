FROM node:12-alpine

ENV NODE_ENV production

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 7070
CMD [ "http-server", "-p 7070", "dist" ]