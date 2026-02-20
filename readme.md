# UpFinances

Aplicação web para gestão financeira pessoal/empresarial, construída com Angular e Supabase.

Atualizado em: 20/02/2026

## Principais tópicos da aplicação
- Dashboard financeiro com saldo atual, entradas, saídas, taxa de economia, transações recentes e despesas por categoria.
- Gestão de transações (criar, editar, excluir, excluir em lote e controle de limites por plano).
- Planos e assinaturas com fluxo de checkout e atualização de plano.
- Conta do usuário com meta mensal de economia e resumo de consumo.
- Relatórios financeiros exportáveis em PDF.
- Autenticação completa (login, recuperação e redefinição de senha).
- Controle de acesso por plano para telas e funcionalidades.
- Suporte com FAQ dinâmico.

## Funcionalidades
- Cadastro e autenticação de usuários.
- Registro de entradas e saídas com categoria, banco e data.
- Parcelamento de transações.
- Filtro por período, tipo e categoria no dashboard.
- Cálculo de indicadores financeiros em tempo real.
- Exportação de relatórios em PDF.
- Alteração de plano com regras de aplicação imediata e agendamento conforme cenário.

## Regras de negócio importantes
- Valor da transação não pode ser `0` em criação/edição.
- Limite mensal de transações por plano.
- Atualização de `data_ultimo_login` no login e também na restauração de sessão.
- Fluxo de renovação/fallback de plano conforme validade e regras de assinatura.

## Arquitetura
Estrutura principal em `src/app`:
- `core/`: layouts, guards e páginas base.
- `domain/`: módulos de negócio (`auth`, `dashboard`, `transactions`, `plan-prices`, `account`, etc.).
- `shared/`: serviços, utilitários e integrações comuns.
- `widget/`: componentes, diretivas e pipes reutilizáveis.

## Stack
- Frontend: Angular 18 (standalone components).
- UI: NG-ZORRO.
- Backend/BaaS: Supabase (Auth, Postgres, Functions).
- Estado: Angular Signals + Reactive Forms.
- Relatórios: `jspdf`.

## Rotas principais
- `/auth`: login, cadastro e recuperação de senha.
- `/dashboard`: visão geral financeira.
- `/transactions`: histórico e gestão de transações.
- `/transactions/new`: nova transação.
- `/plan-prices`: gestão de planos.
- `/financial-statement`: relatórios.
- `/account`: dados da conta e meta mensal.
- `/suport`: suporte e FAQ.

## Como executar localmente
Pré-requisitos:
- Node.js 18+
- npm 9+

Passos:
1. Instale dependências:
```bash
npm install
```
2. Configure variáveis de ambiente do Supabase.
3. Rode o projeto:
```bash
npm start
```
4. Acesse `http://localhost:4200`.

## Scripts úteis
- `npm start`: inicia em desenvolvimento.
- `npm run build`: gera build de produção.
- `npm test`: executa testes.

## Estrutura de dados (resumo)
Principais tabelas utilizadas no Supabase:
- `tbusuarios`
- `tbextrato`
- `tbplano`
- `tbplano_tela`
- `tbtela`
- `tbfaqs`

## Observações
- O projeto possui controle de tema (claro/escuro).
- O acesso a telas pode variar conforme o plano ativo.
- Mensagens e textos da interface foram revisados com acentuação em português.