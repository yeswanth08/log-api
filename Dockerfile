# base layer

FROM node:20-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY ./prisma .

RUN npx prisma migrate dev --name init_incident

RUN npm run seed

# copying the files to workdir -> app

COPY . .

# RUN npm install
# RUN npm run build

# use this when you want to run the app in production mode i.e there is a db existing and also it may have some data in it
# RUN npx prisma generate

# in our case we are using npx prisma migrate dev --name init to create the db and also seed it with some data

RUN npm run build
RUN npm run dev

EXPOSE 3000

CMD ["npm", "run", "dev" ]