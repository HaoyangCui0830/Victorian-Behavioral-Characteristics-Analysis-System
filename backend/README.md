# How to run

## Prerequisite
```
docker 19.03.8
```

## step1 build image
```
docker build -t myspringboot:latest .
```

## step2 run the image
```
docker run -p 8080:8080 -d myspringboot:latest
```