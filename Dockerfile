FROM node:12.16.1-alpine
WORKDIR /app
COPY . . 

RUN yarn install
CMD ["node","bin/app.js"]
