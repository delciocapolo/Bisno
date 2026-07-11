# backend — instruções para assistentes de IA

Este arquivo foi gerado pelo [Node Initializr](https://github.com/pietro-sdev/node-initializr).
Siga estas diretrizes ao implementar funcionalidades neste projeto.

## Stack do projeto

- **Projeto:** backend
- **Framework:** Express
- **Linguagem:** TypeScript
- **Node.js:** 20
- **Package manager:** pnpm
- **Arquitetura:** Clean Architecture
- **Banco:** PostgreSQL
- **ORM:** Sequelize
- **Auth:** JWT
- **Mensageria:** RabbitMQ
- **Redis:** sim
- **Swagger:** sim
- **Testes:** node:test
- **Docker:** sim
- **GitHub Actions:** sim

## Framework — Express

- Rotas organizadas em módulos/arquivos separados
- Middleware para auth, parsing e erros
- Services puros importados pelos controllers/rotas
- Entry point: `src/index.ts`

## Arquitetura — Clean Architecture

- **domain/** — entidades e interfaces de repositório (sem dependências externas)
- **application/** — casos de uso que orquestram a lógica de negócio
- **infrastructure/** — implementações concretas (HTTP, persistência, mensageria)
- **shared/** — erros e utilitários compartilhados

Regras:
- Domínio não importa de infrastructure nem de frameworks HTTP
- Casos de uso dependem de interfaces do domínio, não de implementações
- Controllers/rotas apenas adaptam HTTP → casos de uso

## Camada de dados

- Banco: **PostgreSQL**
- ORM: **Sequelize**

- Models Sequelize em `infra/sequelize/models/`
- Inicialização em `infra/sequelize/connection`
- Use migrations do Sequelize para alterações de schema

## Convenções gerais

- Linguagem: **TypeScript estrito — evite `any`**
- Nomes de arquivos: kebab-case para pastas; siga o padrão já usado no módulo
- Novos endpoints: inclua health check compatível se alterar rotas globais
- Erros HTTP: respostas consistentes com o padrão existente no projeto
- Variáveis de ambiente: documente novas vars em `.env.example`
- Não reestruture a arquitetura escolhida sem solicitação explícita

## Comandos úteis

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm test
```

## Ao adicionar features

1. Identifique o módulo/camada correto conforme a arquitetura **Clean Architecture**
2. Reutilize services, repositories e clients existentes
3. Mantenha compatibilidade com pnpm e Node 20
4. Adicione ou atualize testes (node:test) quando alterar comportamento
5. Documente endpoints novos no Swagger/OpenAPI
