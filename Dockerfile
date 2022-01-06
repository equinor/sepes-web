# FROM node:14-alpine
# # RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# RUN deluser --remove-home node \
#     && addgroup -S node -g 1001 \
#     && adduser -S -G node -u 1001 node

# RUN mkdir -p /home/node/app/node_modules \
#     && chown -R node:node /home/node/app
# WORKDIR /home/node/app
# COPY package*.json ./
# # USER node
# USER 1001
# # RUN npm ci
# # TO DO run command under instead when in prod
# RUN npm ci --production
# COPY . .
# RUN npm run build:prod
# EXPOSE 3000

# # CMD ["npm", "start"]
# CMD ["node", "local.index.js"]




FROM node:14-alpine as build
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# ARG TENANT_ID
ARG SEPES_CLIENTID


RUN mkdir -p /home/node/app/node_modules \
    && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
# COPY public/ public/
# COPY src/ src/
# COPY config-overrides.js .
# COPY tsconfig.paths.json .
# COPY deployment/tsconfig.json .
# USER node

# RUN npm ci
# TO DO run command under instead when in prod
RUN npm ci --production

# RUN chmod 777 /home/node/app/tsconfig.json
RUN export REACT_APP_SEPES_AUTHORITY=https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0 && \
    export REACT_APP_SEPES_CLIENTID=$(echo $SEPES_CLIENTID|base64 -d)

COPY . .
RUN npm run build:prod



FROM node:14-alpine as deployment

RUN deluser --remove-home node \
    && addgroup -S node -g 1001 \
    && adduser -S -G node -u 1001 node


WORKDIR /home/node/app

COPY deployment .
RUN npm i

COPY --from=build /home/node/app/build .
RUN chown -R node:node /home/node/app/*
RUN chmod -R 755 /home/node/app/*

# USER 1001
EXPOSE 3000

# CMD ["npm", "start"]
CMD ["node", "app.js"]