# LinkHub Links Manager - MVP Frontend Design

Data: 2026-06-04
Status: aprovado para planejamento de implementacao

## Objetivo

Construir a primeira versao do LinkHub Links Manager como um frontend funcional para gerenciamento de links de perfil digital. A versao inicial nao tera backend real; os dados serao persistidos no `localStorage` para validar experiencia, fluxo e interface.

## Escopo Da Primeira Versao

Inclui:

- Tela inicial de apresentacao da solucao antes do dashboard.
- Dashboard para gerenciar links.
- Criacao, edicao, exclusao e ativacao/desativacao de links.
- Reordenacao visual via drag and drop.
- Persistencia automatica no `localStorage`.
- Contagem de cliques simulada por link.
- Preview publico mostrando apenas links ativos.
- Interface responsiva com suporte a touch drag em mobile.

Nao inclui nesta versao:

- Backend Express.
- PostgreSQL.
- Autenticacao de usuario.
- Tracking real de cliques.
- Publicacao real da pagina publica.
- Analytics avancado.

## Direcao Visual

A direcao escolhida e Editorial refinado.

A interface deve parecer um workspace premium para identidade digital e conversao, sem cara de dashboard generico. O visual deve usar fundo claro quente, contraste forte nos comandos principais, tipografia com sensacao editorial e cards limpos com bordas finas.

A primeira tela deve apresentar o produto de forma curta e visual, sem virar uma landing page longa. A primeira acao clara deve ser abrir o dashboard.

## Fluxo Do Usuario

1. Usuario acessa a tela inicial.
2. Usuario clica em Abrir dashboard.
3. Usuario visualiza links existentes e metricas resumidas.
4. Usuario cria um novo link pelo modal.
5. Usuario edita, remove ou ativa/desativa links existentes.
6. Usuario arrasta cards para reorganizar a ordem.
7. Sistema salva automaticamente as alteracoes.
8. Usuario confere no preview quais links ativos aparecerao publicamente.

## Rotas E Telas

- `/`: tela inicial de apresentacao do LinkHub.
- `/dashboard`: workspace de gerenciamento dos links.

A tela inicial deve conter:

- Nome do produto.
- Frase curta de valor.
- Resumo de recursos: drag and drop, analytics basico e preview publico.
- CTA principal para abrir o dashboard.
- Composicao visual mostrando uma amostra da experiencia.

O dashboard deve conter:

- Header compacto com nome do produto, resumo de links ativos e botao Novo link.
- Area de metricas com total de cliques, quantidade de links ativos e link com melhor desempenho.
- Lista de links em cards ordenaveis.
- Painel de preview publico.

## Modelo De Dados

```ts
type LinkType =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "whatsapp"
  | "website"
  | "custom";

type Link = {
  id: string;
  title: string;
  url: string;
  type: LinkType;
  clicks: number;
  active: boolean;
  order: number;
  createdAt: string;
};
```

## Arquitetura Frontend

Stack:

- React.
- TypeScript.
- Vite.
- TailwindCSS.
- `@dnd-kit` para drag and drop.
- Motion ou CSS transitions para microinteracoes.

Estrutura proposta:

```text
src/
  components/
    LinkCard.tsx
    LinkEditorModal.tsx
    LinksList.tsx
    PreviewPanel.tsx
    StatsBar.tsx
  lib/
    linksStorage.ts
    linkTypes.ts
    seedLinks.ts
  types/
    link.ts
  App.tsx
  main.tsx
```

Acesso a `localStorage` deve ficar isolado em `src/lib/linksStorage.ts`. Componentes nao devem acessar `localStorage` diretamente.

## Componentes Principais

### LinkCard

Mostra um link individual com:

- Drag handle visivel.
- Tipo do link.
- Titulo.
- URL.
- Cliques.
- Toggle ativo/inativo.
- Acoes de editar e excluir.

Durante drag, o card deve ter feedback visual com sombra e leve escala.

### LinkEditorModal

Usado para criar e editar links.

Campos:

- Titulo obrigatorio.
- URL obrigatoria.
- Tipo de link.
- Status ativo/inativo.

Validacao inicial: titulo e URL nao podem estar vazios.

### LinksList

Controla a lista ordenavel e integra `@dnd-kit`. Ao finalizar o drag, recalcula `order` e salva a lista.

### PreviewPanel

Mostra a pagina publica simulada. Deve exibir apenas links ativos, respeitando a ordem atual.

### StatsBar

Mostra metricas derivadas dos dados locais:

- Total de cliques.
- Links ativos.
- Link com mais cliques.

## Persistencia

Ao abrir o app:

- Se houver dados em `localStorage`, usar esses dados.
- Se nao houver dados, carregar links seedados.

Toda alteracao deve persistir automaticamente:

- Criar link.
- Editar link.
- Excluir link.
- Alternar ativo/inativo.
- Reordenar links.

## Responsividade

Desktop:

- Dashboard com lista principal e preview lateral.

Mobile:

- Dashboard em coluna unica.
- Preview abaixo da lista ou em uma secao dedicada.
- Cards com alvos de toque confortaveis.
- Drag and drop deve funcionar por touch.

## Estados E Erros

- Lista vazia: mostrar estado vazio com CTA para criar o primeiro link.
- Erro de formulario: mostrar mensagem curta abaixo do campo invalido.
- Exclusao: pode ser imediata nesta versao, sem confirmacao, desde que haja feedback visual claro.

## Verificacao

Antes de considerar a implementacao concluida:

- `npm run build` deve passar.
- A tela inicial deve navegar para o dashboard.
- Criar, editar, excluir e ativar/desativar links deve funcionar.
- Reordenacao por drag and drop deve persistir no refresh.
- Preview deve mostrar somente links ativos.
- Layout deve ser verificado em desktop e mobile.

## Futuro

A arquitetura deve facilitar uma segunda fase com:

- API Express.
- PostgreSQL.
- Autenticacao.
- Tracking real de cliques.
- Analytics avancado.
- Templates de pagina publica.
