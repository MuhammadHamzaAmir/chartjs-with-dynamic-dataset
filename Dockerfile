FROM node

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install

COPY ./src .

EXPOSE 9001