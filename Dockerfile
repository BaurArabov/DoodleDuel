FROM node:20.3.0 as frontend


WORKDIR /client

COPY . .

RUN npm install

CMD ["npm", "run", "dev"] 
