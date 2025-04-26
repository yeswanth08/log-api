FROM node:20-alpine3.18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "seed"]
