FROM node

WORKDIR /usr/src/app

# Install deps
COPY package.json .
RUN npm install -q

# Install source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
