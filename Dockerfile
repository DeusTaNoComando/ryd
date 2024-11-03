# Docker image
FROM node:20

# WORKDIR specifies the application directory
WORKDIR /usr/src/app

# Copying rest of the application to app directory
COPY . .

# Installing npm for DOCKER
RUN npm install

# Open port 3000
EXPOSE 3000

# Get inicial script inside docker
COPY ./scripts /scripts

# Change application permissions
RUN ["chmod", "+x", "/scripts/start.sh"]

# Start the application
CMD /scripts/start.sh
