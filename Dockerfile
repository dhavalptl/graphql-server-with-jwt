### STAGE1 : INSTALL NPM AND BUILD PROD VERSION ###

FROM node:8.9.4-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 4200
CMD [ "node", "/usr/src/app/dist/index" ]