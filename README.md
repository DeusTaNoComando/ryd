# RYD

RYD is a Node.js application that leverages TypeScript, Express, and PostgreSQL for building a scalable backend service. This document outlines how to set up and run the application, including important scripts and dependencies.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js (version 14 or later)
-   npm (Node package manager)
-   PostgreSQL database

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/ryd.git
    cd ryd
    ```

## Installation

```bash
$ npm install
```

## Deploying the PostgreSQL database

```bash
$ docker-compose up -d ryd_postgres
```

## Running an app

```bash
# development
$ npm start
```

## Test

````bash
# unit tests
$ npm run test

## Lint

```bash
$ npm run lint
````

## Authors

-   [José Costa](mailto:jocosta98@hotmail.com)
