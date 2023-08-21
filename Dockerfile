FROM node:latest

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY ./build .

EXPOSE 3000

# CMD npm start
CMD [ "node", "build/index.js" ]