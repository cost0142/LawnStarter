FROM node:18

RUN apt-get update && apt-get install -y ca-certificates

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install cors
RUN npm install

COPY . .

CMD ["npm", "start"]
