FROM denoland/deno:alpine

WORKDIR /app

COPY . .

CMD ["deno", "run", "--allow-net", "--watch", "src/server.ts"]