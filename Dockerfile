FROM node:slim


WORKDIR  /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate


COPY package.json .
COPY ./pnpm-lock.yaml .


# Install packages needed to build node modules
RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false


RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y chromium chromium-sandbox && \
  rm -rf /var/lib/apt/lists /var/cache/apt/archives



RUN pnpm install --frozen-lockfile --prod=false

ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

COPY . .

CMD ["pnpm", "dev"]


