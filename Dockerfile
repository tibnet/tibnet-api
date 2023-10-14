FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./

RUN /usr/src/app/files/attachments
RUN /usr/src/app/files/temps

RUN npm install
# RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD [ "yarn", "start" ]