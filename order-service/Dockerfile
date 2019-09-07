FROM node:12-alpine

ENV NODE_ENV production

COPY . /app
WORKDIR /app
RUN npm install --production
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "start:prod"]
