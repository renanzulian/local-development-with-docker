FROM golang:alpine

WORKDIR /app

COPY . .

RUN go install github.com/codegangsta/gin@latest

CMD ["gin", "run", "main.go"]