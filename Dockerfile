FROM node:14-alpine
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN deluser --remove-home node \
    && addgroup -S node -g 1001 \
    && adduser -S -G node -u 1001 node

RUN mkdir -p /home/node/app/node_modules \
    && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
# USER node
USER 1001
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]