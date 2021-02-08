FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY . ./my-app/
RUN cd my-app && npm install &&  npm install express && npm run build 

CMD ["node","my-app/server.js"]
