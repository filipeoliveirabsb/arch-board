# arch-board

Editor visual de diagramas de arquitetura de software: arraste componentes (banco de dados, servidor de API) para um board, conecte-os e edite suas propriedades. Construído com React, TypeScript, [React Flow](https://reactflow.dev) e [Zustand](https://github.com/pmndrs/zustand).

## Funcionalidades

- Drag & drop de componentes (Database, API Server) do menu lateral para o canvas
- Conexão entre nós por arraste
- Painel de propriedades para editar nome e tipo de recurso de cada nó
- Templates prontos (Microsserviços, Serverless Stack)
- Deletar nós/arestas selecionados (`Backspace`/`Delete`)
- Undo/redo (`Ctrl+Z` / `Ctrl+Shift+Z`)
- Persistência automática do board no `localStorage`

## Rodando localmente

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — checa tipos e gera o build de produção
- `npm run lint` — roda o ESLint
- `npm run preview` — serve o build de produção localmente

## Estrutura

```
src/
  components/
    Canvas/    # Board (React Flow), Sidebar (paleta de componentes), EditPanel
    Nodes/     # Nós customizados do React Flow (Database, Server)
  data/        # Templates/presets de arquitetura
  store/       # Estado global do board (Zustand)
  types.ts     # Tipos compartilhados dos nós/dados
```
