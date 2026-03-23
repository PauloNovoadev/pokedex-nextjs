# Pokedex - Next.js

Aplicação web de Pokédex desenvolvida com Next.js utilizando o App Router. O projeto consome a PokéAPI e apresenta informações detalhadas sobre Pokémons, Moves, Items e Berries, com foco em performance, organização de código e experiência do usuário.

## Funcionalidades

- Busca global com sugestões em tempo real
- Paginação com Server-Side Rendering
- Páginas detalhadas para Pokémons, Moves, Items e Berries
- Exibição de status com barras de progresso
- Skeleton loading para melhorar a percepção de carregamento
- Interface inspirada no PokéDatabase
- Navegação entre recursos com links dinâmicos

## Tecnologias

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- PokéAPI

## Como executar o projeto

```bash
npm install
npm run dev
```

Abra http://localhost:3000 no navegador.

## API

A aplicação utiliza a PokéAPI como fonte de dados:
https://pokeapi.co/

## Destaques técnicos

- Utilização de Server Components com controle de cache e revalidação
- Implementação de Suspense com fallback para carregamento progressivo
- Separação de responsabilidades entre camada de dados e componentes
- Uso de Promise.all para otimização de múltiplas requisições
- Implementação de debounce na busca para reduzir chamadas desnecessárias
- Paginação baseada em searchParams

## Deploy

Recomendado utilizar a Vercel para deploy da aplicação.

## Autor

Paulo Eduardo