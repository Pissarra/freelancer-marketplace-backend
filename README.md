<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Database setup 

```bash
$   npx typeorm migration:run -d dist/typeorm-cli.config
```

## Environment Configuration

Make sure to create a `.env` file in the **root** of your project to configure the application.  
The following environment variables are **required**:

```
DATABASE_USER=postgres
DATABASE_PASSWORD=root
DATABASE_NAME=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost
DATABASE_SYNCHRONIZE=false
```

* It is recommended to set `DATABASE_SYNCHRONIZE` to `false` in production environments to avoid data loss. However, you can set it to `true` during development for automatic schema synchronization, so you will not need to run the migrations.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Architecture overview

```
freelancer-marketplace/
├── src/
│   ├── auth/           # authentication module (JWT, Controller, Interceptors, etc)
│   ├── common/         # entities, enums, etc.
│   │   ├── entities/   # common entities/domains used across the application
│   ├── config/         # configuration files (database, Swagger, AWS_S3, etc.)
│   ├── database/       # database migrations and seeds
│   ├── modules/        # application modules (only Freelancer and User modules in this example)
│   │   ├── <MODULE_1>/
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── controller  # HTTP request handlers
│   │   │   ├── service     # business logic
│   │   │   ├── repository  # database access layer (optional, if you need more abstraction or custom queries)
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
│   └── app.e2e-spec.ts
│   └── jest-e2e.json
├── .gitignore
├── ...
├── package.json
├── README.md
├── ...
└── typeorm-cli.config.ts # TypeORM CLI configuration file (used for running migrations and seeds)

```



## Trade-offs or areas for improvement

Improvements can be made in the following areas:

- Configure the application to check the required environment variables before starting, to ensure that the application has all the necessary configurations.

```
$ npm install @hapi/joi
$ npm install --save-dev @types/hapi__joi
```

```
// Example of how to use Joi for environment variable validation in `app.module.ts`:

ConfigModule.forRoot({
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.required(),
    DATABASE_PORT: Joi.number().default(5432),
  }),
}),
```
- Split migrations between development and production environments to avoid conflicts. For example, it is better to only run the seed migration (which populates the database with initial data) in development environments.
- Adding logs to the application to track important events and errors.
- Adding error handling to manage exceptions.
- Add Swagger to provide interactive API documentation and testing.

## Docker

* Start containers in detached / background mode
```
docker-compose up -d
```

* Stop containers
```
docker-compose down
```