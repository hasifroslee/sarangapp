FROM node:12-alpine

COPY . /app
WORKDIR /app
RUN npm install --production
RUN npm run build

EXPOSE 9090
CMD ["npm", "run", "start:prod"]
