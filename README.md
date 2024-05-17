# DOCKER - NESTJS - POSTGRESQL PROJECT

## Description

Build a server using Docker - NestJS - PostgreSQL to perform CRUD operations

## Installation

```bash
$ npm install
```

## Running the app

```bash
# run PostgreSQL database
$ docker-compose up -d
# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test:watch src/test/articles.controller.spec.ts
$ npm run test:watch src/test/articles.service.spec.ts
```
