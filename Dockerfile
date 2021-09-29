# pull official base image
FROM node:lts-alpine3.14

# set working directory
WORKDIR /app

# add app
COPY . .

# install app dependencies
RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN npm run-script build
RUN npm install -g serve

# start
CMD ["npx", "serve",  "-s", "build"]
