FROM node:alpine


WORKDIR  /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate


COPY package.json .
COPY ./pnpm-lock.yaml .


RUN pnpm install

COPY . .


CMD ["pnpm", "dev"]


