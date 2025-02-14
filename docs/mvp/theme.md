# Theme & Styling Guidelines

## Color System

### Primary Colors
```css
:root {
  /* Main Brand Colors */
  --primary: #2563eb;          /* Main blue */
  --primary-light: #3b82f6;    /* Lighter shade */
  --primary-dark: #1d4ed8;     /* Darker shade */
  --primary-fade: #60a5fa;     /* Faded version */
  
  /* Surface Colors */
  --background: #f8fafc;       /* Page background */
  --surface: #ffffff;          /* Card/component surface */
  --surface-hover: #f1f5f9;    /* Surface hover state */
  
  /* Text Colors */
  --text: #1e293b;            /* Primary text */
  --text-secondary: #64748b;   /* Secondary text */
  --text-disabled: #94a3b8;    /* Disabled text */
  
  /* Status Colors */
  --success: #22c55e;         /* Success states */
  --warning: #f59e0b;         /* Warning states */
  --error: #ef4444;           /* Error states */
  --info: #3b82f6;            /* Info states */
}
```

### Dark Theme
```css
[data-theme="dark"] {
  --background: #0f172a;
  --surface: #1e293b;
  --surface-hover: #334155;
  --text: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-disabled: #64748b;
}
```

## Typography

### Font Stack
```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Font Sizes
```css
:root {
  /* Base Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

## Spacing System

### Base Units
```css
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
}
```

## Shadows

### Elevation Levels
```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## Border Radius

### Standard Sizes
```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-full: 9999px;   /* Circular */
}
```

## Component Theming

### Buttons
```typescript
interface ButtonTheme {
  variants: {
    primary: {
      bg: 'var(--primary)'
      text: 'white'
      hover: 'var(--primary-dark)'
      active: 'var(--primary-dark)'
    }
    secondary: {
      bg: 'var(--surface)'
      text: 'var(--text)'
      border: '1px solid var(--text-secondary)'
      hover: 'var(--surface-hover)'
    }
    ghost: {
      bg: 'transparent'
      text: 'var(--text)'
      hover: 'var(--surface-hover)'
    }
  }
  sizes: {
    sm: {
      height: '32px'
      padding: '0 12px'
      fontSize: 'var(--text-sm)'
    }
    md: {
      height: '40px'
      padding: '0 16px'
      fontSize: 'var(--text-base)'
    }
    lg: {
      height: '48px'
      padding: '0 24px'
      fontSize: 'var(--text-lg)'
    }
  }
}
```

### Cards
```typescript
interface CardTheme {
  default: {
    bg: 'var(--surface)'
    border: '1px solid var(--surface-hover)'
    radius: 'var(--radius-lg)'
    shadow: 'var(--shadow-md)'
  }
  hover: {
    transform: 'translateY(-2px)'
    shadow: 'var(--shadow-lg)'
  }
  interactive: {
    cursor: 'pointer'
    transition: 'all 0.2s ease'
  }
}
```

## Transitions

### Standard Durations
```css
:root {
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
}
```

### Easing Functions
```css
:root {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Responsive Breakpoints

### Screen Sizes
```typescript
interface Breakpoints {
  sm: '640px'    // Small devices
  md: '768px'    // Medium devices
  lg: '1024px'   // Large devices
  xl: '1280px'   // Extra large devices
  '2xl': '1536px' // 2X Extra large devices
}
```

## Z-Index Scale

### Layer Management
```css
:root {
  --z-0: 0;
  --z-10: 10;      /* Low priority elements */
  --z-20: 20;      /* Basic overlays */
  --z-30: 30;      /* Dropdowns */
  --z-40: 40;      /* Sticky elements */
  --z-50: 50;      /* Modals/dialogs */
  --z-auto: auto;
}
```

## Focus States

### Keyboard Focus
```css
:root {
  --focus-ring: 0 0 0 3px var(--primary-fade);
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--primary);
}
