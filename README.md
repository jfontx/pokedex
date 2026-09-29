# Pokédex

A beautiful, animated, and fully-featured Pokédex web application built with React, TypeScript, and Vite. It consumes the public [PokéAPI](https://pokeapi.co/) to provide comprehensive information about every Pokémon, including base stats, type matchups, evolution chains, and more.

## Features

- 🔍 **Fuzzy Search & Autocomplete**: Quickly find Pokémon by name or Pokédex number.
- 🎨 **Dynamic Theming**: The UI adapts its accent colors based on the selected Pokémon's primary type.
- 🌓 **Light & Dark Mode**: Full support for system preferences and manual toggling, without initial load flashes.
- ✨ **Smooth Animations**: Page transitions and interactive elements powered by Framer Motion, with full respect for `prefers-reduced-motion`.
- 📱 **Responsive Design**: Carefully crafted layouts that look stunning on mobile, tablet, and desktop devices.
- 📊 **Detailed Pokémon Info**:
  - Hero section with official artwork and flavor text.
  - Base stats with interactive progress bars.
  - Physical attributes (height, weight, gender ratio).
  - Abilities (including hidden ones).
  - Type effectiveness calculator (accounting for dual types).
  - Evolution chain visualizer (supporting branching evolutions like Eevee).
  - Sprite gallery (default, shiny, back, female variations).
  - Learnable moves list.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Linting**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- **Styling**: Vanilla CSS Modules with a custom design token system.

## Setup & Installation

1. Make sure you have Node.js installed (v18 or higher recommended).
2. Install the dependencies:
   ```bash
   npm install
   ```

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the production bundle.
- `npm run preview`: Bootstraps a local web server that serves the production build.
- `npm run lint`: Runs Oxlint to catch errors and enforce code quality.
- `npm run test`: Runs the Vitest test suite for pure utilities.

## Architecture

This project follows a strict **Feature-Based Architecture**. Code is divided into domains (`pokemon`, `search`) that contain their own components, hooks, utils, and types, making the codebase scalable and easy to navigate. Shared components and hooks reside in the root `src/` directory.
