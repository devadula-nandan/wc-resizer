# Development Guide

## Package Manager

This project uses **Yarn** as the package manager.

### Installation

```bash
yarn install
```

### Common Commands

```bash
# Start development server
yarn dev

# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Build for production
yarn build

# Preview production build
yarn preview
```

## Project Structure

- `src/components/` - Web components (Lit-based)
- `src/pages/` - Example pages
- `docs/` - Documentation
- `docs/adr/` - Architecture Decision Records

## Testing

Tests are written using [@open-wc/testing](https://open-wc.org/docs/testing/testing-package/) and run with [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/).

## TypeScript Configuration

- `tsconfig.json` - Main TypeScript configuration for source files
- `tsconfig.test.json` - Extended configuration for test files

The project uses strict TypeScript settings with ES2023 target.
