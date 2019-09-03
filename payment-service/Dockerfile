FROM node:12-alpine

COPY . /app
WORKDIR /app
RUN npm install --production
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start:prod"]
