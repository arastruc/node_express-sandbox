# Fetching the minified node image on alpine linux
FROM node:20.12-alpine

# Setting up the work directory
WORKDIR /express

COPY . .

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "node", "app.js" ]

# Exposing server port
EXPOSE 3000