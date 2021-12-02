FROM node:17.1.0

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
ENV PORT=4200
EXPOSE 4200
CMD ["ng","serve"]