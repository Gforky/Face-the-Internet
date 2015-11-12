FROM node:5
RUN npm install forever -g
RUN npm install
VOLUME /app
WORKDIR /app
EXPOSE 3000
EXPOSE 4000
EXPOSE 35729