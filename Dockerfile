FROM node:14 as builder
ENV NODE_ENV production
RUN npm install -g pm2

WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app
#CMD node src/server.js
CMD ["pm2-runtime", "pm2.json"]
EXPOSE 3000
