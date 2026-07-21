# Bisno

> Liga quem precisa a quem sabe fazer.

Bisno é o canal directo entre o cliente e o mixeiro. O cliente descreve o que precisa, o sistema encontra o prestador certo na zona certa, e o mixeiro recebe o pedido directamente no WhatsApp. Sem intermediários, sem chat dentro da app, sem complicação.

> Projecto em desenvolvimento activo. Backend em produção, frontend em curso.

---

## Como funciona

O cliente preenche um formulário simples: categoria de serviço, zona em Luanda, descrição do que precisa e contacto. O sistema distribui o pedido automaticamente para o mixeiro elegível seguinte, usando um algoritmo de round-robin sequencial e justo. O mixeiro recebe uma notificação no WhatsApp com os detalhes do pedido e um link pré-preenchido para contactar o cliente directamente.

O Bisno conecta. A conversa e o serviço acontecem fora dela.

---

## Stack

**Backend**

- Node.js 20 + TypeScript + Express
- PostgreSQL 16 + Sequelize + sequelize-typescript
- RabbitMQ 4 (exchange topic, routing keys por domínio, DLX)
- Redis 7 (cache e sessões)
- Evolution API v2.1.1 (gateway WhatsApp via Baileys)
- Socket.io (eventos em tempo real)
- Pino (logging estruturado por contexto)
- Zod (validação de payload)
- Docker Compose + nginx (proxy reverso + SSL)

**Arquitectura**

- Clean Architecture com DDD
- Camadas: `domain`, `application`, `infrastructure`
- Ports & Adapters para repositórios e publishers de eventos
- Migrations versionadas com sequelize-cli

---

## Estrutura do projecto

```
backend/
├── src/
│   ├── domain/
│   │   ├── entities/          # Bisno, Mixeiro, Lead, MixeiroHasSubscription
│   │   ├── repositories/      # interfaces dos repositórios
│   │   └── ports/             # interfaces de eventos e notificações
│   ├── application/
│   │   └── use-cases/         # um use case por acção de negócio
│   └── infrastructure/
│       ├── express/           # server, routes, middlewares
│       ├── sequelize/         # models, migrations, seeders, repositories
│       ├── rabbit/            # publisher, consumer, exchanges, register-consumers
│       ├── socket/            # Socket.io, rooms, listeners
│       ├── pino/              # LoggerService com publishTo()
│       └── evolution/         # cliente da Evolution API
├── docker/
│   ├── docker-compose.yml
│   └── docker-compose.override.yml
└── nginx/
    └── conf.d/bisno.conf
```

---

## Algoritmo de distribuição

Cada pedido é distribuído sequencialmente entre os mixeiros elegíveis para aquela zona e categoria de serviço. Um mixeiro é elegível se estiver activo, verificado, não eliminado, desbloqueado e com pontos disponíveis.

O sistema notifica um mixeiro de cada vez, por ordem de registo (FIFO). Após a notificação, o mixeiro é bloqueado até que todos os elegíveis tenham recebido pelo menos um pedido. Quando todos estiverem bloqueados, o sistema faz reset e reinicia o ciclo. Se após um ciclo completo nenhum mixeiro responder, o pedido é marcado como `exhausted`.

O timeout por falta de resposta é gerido por um cron job que verifica leads expirados e republica no tópico de distribuição via RabbitMQ.

---

## Modelo de negócio

Os mixeiros compram pacotes de pontos para receber pedidos. Cada notificação recebida consome um ponto. Sem pontos, o mixeiro sai do pool elegível automaticamente até comprar mais.

---

## Eventos RabbitMQ

Todos os eventos fluem pela exchange `bisno.exchange.topic` do tipo `topic`.

| Routing Key                  | Descrição                     |
| ---------------------------- | ----------------------------- |
| `bisno.order.created`        | novo pedido criado            |
| `bisno.distribution.start`   | inicia a distribuição         |
| `bisno.distribution.next`    | avança para o próximo mixeiro |
| `bisno.distribution.reset`   | reset do pool, novo ciclo     |
| `bisno.notification.send`    | envia notificação WhatsApp    |
| `bisno.notification.timeout` | lead expirou sem resposta     |
| `bisno.order.accepted`       | mixeiro aceitou o pedido      |
| `bisno.order.exhausted`      | pool esgotado sem resposta    |

---

## Correr localmente

**Pré-requisitos:** Docker, Docker Compose, pnpm

```bash
# clonar o repositório
git clone https://github.com/delciocapolo/Bisno.git
cd Bisno/backend

# copiar variáveis de ambiente
cp .env.example .env
# preencher as variáveis no .env

# subir a infraestrutura
cd docker
docker compose up -d

# correr migrações e seeds
docker compose exec app pnpm sequelize-cli db:migrate
docker compose exec app pnpm sequelize-cli db:seed:all

# desenvolvimento com hot-reload
docker compose --profile app up
```

---

## Variáveis de ambiente

Consulta o ficheiro `.env.example` na raiz do projecto `backend/` para a lista completa de variáveis necessárias.

---

## Autor

**Délcio Capolo** — [@delciocapolo](https://github.com/delciocapolo)

Desenvolvido de forma independente como projecto real, construído do zero com o objectivo de resolver um problema concreto do quotidiano angolano.
