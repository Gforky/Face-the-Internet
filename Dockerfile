FROM node:5
RUN npm install forever -g
VOLUME /app
WORKDIR /app
EXPOSE 3000
EXPOSE 4000