FROM node:16.17.1-alpine

WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm install

COPY src .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]