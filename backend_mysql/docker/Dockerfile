FROM node:16 AS nodeapi-build
WORKDIR /usr/src/app
COPY ../ ./nodeapi/
RUN cd nodeapi && npm install

FROM node:16
WORKDIR /usr/src/app/
COPY --from=nodeapi-build /usr/src/app/nodeapi/ ./
RUN ls
EXPOSE 8080
CMD ["/bin/sh", "-c", "cd /usr/src/app/ && npm start"]
