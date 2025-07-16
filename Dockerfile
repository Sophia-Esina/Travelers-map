FROM node:18

WORKDIR /app

COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

WORKDIR /app/backend
RUN npm install

WORKDIR /app/frontend
RUN npm install
RUN npm run build

WORKDIR /app
COPY . .

RUN cp -r frontend/build backend/build

WORKDIR /app/backend

EXPOSE 5000

CMD ["node", "app.js"]
