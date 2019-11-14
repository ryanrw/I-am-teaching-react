# For production build

# Pull node image (alpine version)
FROM node:alpine

# Make this image logable (ทำให้โชว์ log เผื่อเวลา debug)
ENV NPM_CONFIG_LOGLEVEL info

# Mark this image as production
ENV NODE_ENV production

# Change directory to /usr/app
WORKDIR /usr/app

# Copy all file accept folder that define in .dockerignore
COPY . .

# Chain install all require package and then clean all caches
RUN yarn install &&\
  yarn global add serve &&\
  yarn cache clean

# Build production app
RUN yarn build

# Serve the production app
CMD [ "serve", "-s", "build" ]

# Expose the used port to outside
# Why using 5000? because serve using port 5000 to serve
EXPOSE 5000