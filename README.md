# my-next-app

This is a Next.js client for your AI chat application.

## Color System

This project uses a comprehensive CSS variable-based color system for consistent theming and easy maintenance.

### Quick Start

```css
/* Using CSS variables */
.my-component {
  background-color: var(--primary-500);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}
```

```tsx
// Using TypeScript constants
import { COLORS } from "../types/colors";

const styles = {
  button: {
    backgroundColor: COLORS.BTN_PRIMARY,
    color: COLORS.TEXT_SECONDARY,
  },
};
```

### Documentation

- 📖 [Color System Guide](COLORS.md) - Complete color variable reference
- 🔄 [Migration Guide](MIGRATION_GUIDE.md) - How to migrate from hardcoded colors
- 🎨 [Color Example Component](src/components/ColorExample.tsx) - Usage examples

### Features

- **13 color categories** with semantic naming
- **Dark mode support** with automatic color adjustments
- **TypeScript support** with full type safety
- **Utility functions** for dynamic color manipulation
- **Accessibility tools** for contrast ratio checking

## Recommended Folder Structure

```
src/
  app/
    start/           # Chat feature (pages, components, styles)
    home/            # Home page feature
    login/           # Login feature
    layout.tsx       # App layout
    page.tsx         # App entry page
    globals.css      # Global styles (includes color variables)
    page.module.css  # Global page styles
  components/        # Shared UI components (e.g., Button, Modal)
  utils/             # Shared utility functions (e.g., API helpers)
  hooks/             # Custom React hooks
  types/             # Shared TypeScript types (includes colors.ts)
```

- Place feature-specific components and styles in their respective folders under `app/` (e.g., `start/`, `home/`, `login/`).
- Place reusable UI components in `src/components/`.
- Place shared logic in `src/utils/` and custom hooks in `src/hooks/`.
- Place shared types in `src/types/`.

This structure helps keep your codebase organized and maintainable as your app grows.

## Getting Started

This project uses **Yarn** as the package manager. Please make sure you have Yarn installed.

First, install dependencies:

```bash
yarn install
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
