FROM node:14
ENV NODE_ENV production

WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app
CMD node src/server.js
EXPOSE 3000
