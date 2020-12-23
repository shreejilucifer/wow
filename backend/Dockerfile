FROM node:alpine
EXPOSE 4000
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn --silent
COPY . .
COPY .env.production .env
RUN yarn build
ENV NODE_ENV production
CMD "yarn" "start"