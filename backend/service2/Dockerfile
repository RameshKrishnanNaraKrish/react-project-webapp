FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm audit fix --force
COPY . .
EXPOSE 3002
CMD ["node", "index.js"]