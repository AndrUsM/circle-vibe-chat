# Stage 1: Build React app
FROM node:22.14.0 AS builder

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

# Stage 2: Serve with 'serve'
FROM node:22.14.0

RUN npm install -g serve

WORKDIR /app
COPY --from=builder /app/build ./build

CMD ["serve", "-s", "build", "-l", "5173"]
