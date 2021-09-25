FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./

RUN npm i

COPY . . 

EXPOSE 8080

CMD ["npm", "start"]
