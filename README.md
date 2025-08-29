# ALZURA-fit Demo

Tiny self-learning project aligned with the JD stack: **Node.js/Express**, **MySQL**, **RabbitMQ**, **Vue 3**, **Docker**.

## What it does
- API exposes: `GET /vehicles`, `POST /vehicles`, `DELETE /vehicles/:id`, and `/health`.
- Persists rows in MySQL table `vehicles`.
- Publishes `vehicle.created` and `vehicle.deleted` events to RabbitMQ topic exchange `events`.
- Vue 3 SPA offers 3 pages: **Vehicles** (list+delete), **Create**, **About**.

## Quick start
Prereqs: Docker Desktop (or Docker Engine + Compose). Ensure ports 3000, 5173, 5672, 15672, 3306 are available.

```bash
docker compose up --build
# Web:   http://localhost:5173
# API:   http://localhost:3000/health, /vehicles
# MQ UI: http://localhost:15672  (user: guest / pass: guest)
```

Stop:
```bash
docker compose down
```

## SQS swap (concept)
Replace RabbitMQ publish with AWS SQS using SDK v3:
```js
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
const sqs = new SQSClient({ region: 'eu-central-1' });
await sqs.send(new SendMessageCommand({ QueueUrl: process.env.SQS_URL, MessageBody: JSON.stringify(payload) }));
```

## CV one-liner
Self-learning demo: Dockerized **Node.js/Express** microservice with **MySQL** and **RabbitMQ** events + **Vue 3** SPA with auth-less CRUD, mirroring ALZURA’s Node/Express, Vue, MySQL, Docker, messaging stack.
