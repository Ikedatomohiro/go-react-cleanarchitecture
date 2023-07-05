FROM golang:1.20.5-alpine3.18

WORKDIR /app

COPY . .
RUN go mod tidy
RUN apk update &&  apk add git
RUN go install github.com/cosmtrek/air@v1.29.0

ENV PATH="/root/go/bin:${PATH}"

CMD ["air", "-c", ".air.toml"]




