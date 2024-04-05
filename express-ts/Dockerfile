# Fetching the minified node image on alpine linux
FROM node:20.12-alpine

# Setting up the work directory
WORKDIR /express-docker-tls

COPY src /express-docker-tls/src
COPY package.json /express-docker-tls/package.json
COPY tsconfig.json /express-docker-tls/tsconfig.json

# Installing dependencies
RUN npm install

# Installing dependencies
RUN npm run build

# Starting our application
CMD [ "node", "dist/app.js" ]

# Exposing server port
EXPOSE 3000
