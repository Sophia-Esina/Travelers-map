FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/frontend
RUN npm install 
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm install

EXPOSE 5000

CMD [ "node", "app.js" ]