FROM node:8.10.0
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . /usr/src/app/
EXPOSE 3000
CMD ["npm","start"]
