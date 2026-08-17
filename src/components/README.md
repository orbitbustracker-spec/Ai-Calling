# Components

This directory contains reusable React UI components.

## Components Structure

### Button (`Button.tsx`)
Reusable button component with variants and sizes
- **Variants**: primary, secondary, danger
- **Sizes**: sm, md, lg
- **Usage**: 
  ```tsx
  <Button variant="primary" size="md">Click me</Button>
  ```

### Sidebar (`Sidebar.tsx`)
Main navigation sidebar component
- Displays navigation links to all major sections
- Shows remaining minutes balance
- Auto-highlights current page

## Adding New Components

When creating new components:
1. Create a new file: `ComponentName.tsx`
2. Export as named export for consistency
3. Add TypeScript types for all props
4. Use the `cn()` utility from `@/lib/utils` for class merging
5. Document usage with JSDoc comments
6. Add examples in this README

## Common Patterns

### Using Tailwind with Dynamic Classes
```tsx
import { cn } from '@/lib/utils';

export const Component = ({ variant = 'default' }) => (
  <div className={cn(
    'base-class',
    variant === 'active' && 'active-class'
  )}>
    Content
  </div>
);
```

### Client vs Server Components
- Use `'use client'` at top for interactive components
- Keep layout and data-fetching on server when possible

## Icon Library

Currently using **lucide-react** for icons. Examples:
```tsx
import { Menu, Home, Settings } from 'lucide-react';
```
See: https://lucide.dev

## Testing Components

TODO: Add unit tests for components as project grows.

