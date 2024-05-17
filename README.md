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

## Apply changes in database
Anything you do related to entity file, you should apply those changes to database by migration

```bash
# Migration automatically generate file with queries corresponding to your actions on entity file
$ npm run migration:generate migrations/<name your migration>
# Apply your changes to database
$ npm run migration:run
```
Note: Don't add and remove fields in the same migration

## Stop docker
Go to grpc-server folder and enter
```bash
$ docker-compose down
```
