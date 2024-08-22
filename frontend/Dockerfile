# The variables are set during build time using --build-arg
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm audit fix --force
COPY . .

ARG API_BASE_URL

ENV API_BASE_URL=$API_BASE_URL


RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]