# 📅 Daily Tasks — Gerenciador de Tarefas Diárias
 
Aplicação web para gerenciamento de tarefas diárias com visualização em formato de calendário. Cada dia possui um conjunto de atividades pré-definidas criadas automaticamente, com suporte a criação, edição, exclusão e marcação de conclusão de tarefas.
 
---

## Visão Geral
 
A aplicação exibe um calendário com foco no dia atual. A cada novo dia, tarefas recorrentes pré-definidas são criadas automaticamente (ex.: "Ler 10 páginas de um livro"). O usuário pode visualizar, marcar como concluídas, adicionar novas tarefas, editá-las ou excluí-las — tanto para o dia atual quanto para períodos específicos.
 
---

## Arquitetura
 
```
┌─────────────────────────────────────────────────────────────┐
│                         Docker Compose                       │
│                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  ┌────────┐  │
│  │  React   │───▶│  Rails   │───▶│PostgreSQL│  │ Redis  │  │
│  │  (TSX)   │    │   API    │    │    DB    │  │ Cache  │  │
│  └──────────┘    └────┬─────┘    └──────────┘  └───┬────┘  │
│                       │                             │       │
│                  ┌────▼──────────────────────────────▼───┐  │
│                  │              Sidekiq                   │  │
│                  │  (geração diária de tarefas, 00:00h)   │  │
│                  └────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Fluxo de dados
1. O front-end React consome a API REST do Rails
2. O Rails consulta o PostgreSQL e usa Redis para cache de buscas frequentes (ex.: tarefas do dia)
3. O Sidekiq executa um job agendado (cron) toda meia-noite para criar as tarefas recorrentes do novo dia
4. O cache Redis é invalidado/atualizado após cada operação de escrita
---

### Back-end
| Tecnologia | Versão sugerida | Finalidade |
|---|---|---|
| Ruby | 3.3.x | Linguagem principal |
| Ruby on Rails | 7.x | Framework API |
| PostgreSQL | 16.x | Banco de dados |
| Redis | 7.x | Cache e fila do Sidekiq |
| Sidekiq | 7.x | Processamento de jobs em background |
| Sidekiq-cron | 1.x | Agendamento de jobs recorrentes |
 
### Front-end
| Tecnologia | Versão sugerida | Finalidade |
|---|---|---|
| React | 18.x | Framework de UI |
| TypeScript | 5.x | Tipagem estática |
| Vite | 5.x | Build e dev server |
| React Query (TanStack) | 5.x | Cache e sincronização de estado servidor |
| Axios | 1.x | Requisições HTTP |
| date-fns | 3.x | Manipulação de datas |
| Vitest | 1.x | Testes unitários |
| React Testing Library | 14.x | Testes de componentes |
| Playwright ou Cypress | — | Testes E2E (a definir) |
 
### Infraestrutura
| Tecnologia | Finalidade |
|---|---|
| Docker | Containerização dos serviços |
| Docker Compose | Orquestração local dos containers |
 
### Testes (Back-end)
| Tecnologia | Finalidade |
|---|---|
| RSpec | Testes unitários e de integração |
| Capybara | Testes de sistema/E2E via browser |
| FactoryBot | Factories para criação de dados de teste |
| Faker | Geração de dados falsos |
| Shoulda Matchers | Matchers de conveniência para Rails |
 
---