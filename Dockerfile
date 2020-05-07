FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_SEPES_REDIRECT_URI "https://web-sepes-web-dev.radix.equinor.com/"
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]