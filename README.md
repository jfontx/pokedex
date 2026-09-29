# Pokédex Web Application

## Deployed link page:
https://jfontx.github.io/pokedex/

## Project Overview
This project is a comprehensive, production-ready Pokédex web application built to consume the public PokéAPI. It is designed to allow users to search, explore, and analyze data for any Pokémon. The application surfaces detailed statistics, including base stats, type matchups (with complex dual-type effectiveness computation), branching evolution chains, and abilities.

The system is optimized for performance and accessibility, featuring dynamic UI adaptations (such as CSS token injection based on data payloads) and gracefully handling loading and error states.

## Architecture & Technical Decisions

The codebase strictly follows a **Feature-Based Architecture**. Rather than grouping files by type (e.g., all components together, all hooks together), the repository is divided into discrete, independent domain features (`search` and `pokemon`). This approach ensures high cohesion and scalability:

- **Feature Modules**: Each feature folder contains its own internal components, custom React hooks, utility functions, and TypeScript definitions.
- **Shared Infrastructure**: Global design tokens, general utility hooks (like `useLocalStorage`), and highly reusable UI components (like loader and error states) reside in the root `src/` directory.
- **Client-Side Routing**: The application bypasses heavy third-party routing libraries by utilizing the native HTML5 History API (`window.history.pushState`) combined with URL query parameters for a lightweight, deeply-linkable state management system.
- **Asynchronous State Management**: Data fetching, caching, synchronization, and background updates are managed via TanStack Query.

## Core Technologies

- **Framework**: React 19
- **Language**: TypeScript (Strict Mode)
- **Build Tooling**: Vite
- **Data Fetching**: TanStack Query (React Query)
- **Animation Engine**: Motion (Framer Motion)
- **Testing**: Vitest
- **Linting**: Oxlint
- **Styling**: Vanilla CSS Modules (incorporating a custom token-based design system)

## External Integrations (API)

This application is heavily reliant on the **[PokéAPI](https://pokeapi.co/docs/v2)**. Specifically, it integrates with:
1. `/api/v2/pokemon/{id or name}`: Core metadata, sprites, base stats, types, and abilities.
2. `/api/v2/pokemon-species/{id or name}`: Evolutionary chain references, flavor text entries, and physical genus data.
3. `/api/v2/evolution-chain/{id}`: Recursive evolution trees mapped and parsed locally to support branching evolutions.
4. `/api/v2/type/{id or name}`: Damage relations utilized by the custom type-effectiveness computation algorithm.

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Local Environment
1. Clone the repository and navigate into the directory.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Build the application for production:
   ```bash
   npm run build
   ```
5. Run the unit test suite:
   ```bash
   npm run test
   ```

## Deployment

The application is configured for Continuous Deployment via **GitHub Actions**. 

Any push to the `main` branch automatically triggers the `.github/workflows/deploy.yml` pipeline. This workflow installs dependencies, runs the Vite build process, and securely uploads the resulting static `dist` artifacts directly to the `github-pages` environment. No manual branch management or local builds are required to update the live environment.
