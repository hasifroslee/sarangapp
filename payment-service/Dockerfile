FROM node:12-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 9090
CMD ["npm", "run", "start:prod"]
