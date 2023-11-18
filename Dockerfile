FROM node:20.9.0-slim

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY . .

RUN pnpm install