FROM node:5
RUN npm install gulp -g
RUN npm install forever -g
RUN npm install
VOLUME /app
WORKDIR /app
EXPOSE 3000