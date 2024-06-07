FROM --platform=linux/amd64 node:20.13.1
EXPOSE 3020
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build
CMD npm start
