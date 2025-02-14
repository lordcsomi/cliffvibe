# Community Tab Specification

## Layout Overview
```
|--------------------------|
| ○ Profile               |
|--------------------------|
| Featured Locations      |
|--------------------------|
| Recent Activity         |
|                         |
|                         |
|                         |
|--------------------------|
|       Nav Tabs          |
|--------------------------|
```

## Featured Locations

### Section Layout
```typescript
interface FeaturedSection {
  header: {
    title: 'Featured Locations'
    subtitle: 'Popular spots this week'
    padding: 'var(--spacing-4)'
  }
  carousel: {
    display: 'horizontal-scroll'
    snapType: 'x mandatory'
    gap: 'var(--spacing-4)'
    padding: {
      x: 'var(--spacing-4)'
      y: 0
    }
  }
}
```

### Location Card
```typescript
interface FeaturedCard {
  dimensions: {
    width: '280px'
    height: '320px'
    borderRadius: 'var(--radius-lg)'
  }
  content: {
    image: {
      height: '180px'
      fit: 'cover'
      borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
    }
    info: {
      padding: 'var(--spacing-4)'
      gap: 'var(--spacing-2)'
      content: {
        title: string
        location: string
        height: string
        difficulty: number
        rating: number
      }
    }
  }
  interaction: {
    onClick: 'navigate to location'
    hover: {
      transform: 'translateY(-4px)'
      shadow: 'var(--shadow-lg)'
    }
  }
}
```

## Recent Activity

### Activity Feed
```typescript
interface ActivityFeed {
  layout: {
    padding: 'var(--spacing-4)'
    gap: 'var(--spacing-4)'
    maxWidth: '600px'
    margin: '0 auto'
  }
  sorting: {
    default: 'recent'
    options: [
      'recent',
      'popular',
      'nearby'
    ]
  }
  loading: {
    type: 'infinite-scroll'
    threshold: '200px'
    batchSize: 10
  }
}
```

### Activity Card
```typescript
interface ActivityCard {
  layout: {
    display: 'flex'
    gap: 'var(--spacing-4)'
    padding: 'var(--spacing-4)'
    background: 'var(--surface)'
    borderRadius: 'var(--radius-lg)'
    marginBottom: 'var(--spacing-4)'
  }
  user: {
    avatar: {
      size: '40px'
      borderRadius: '50%'
    }
    name: string
    timestamp: string
  }
  content: {
    type: 'location_added' | 'photo_shared' | 'review_posted'
    preview: {
      image?: {
        width: '100%'
        height: '200px'
        fit: 'cover'
        borderRadius: 'var(--radius-md)'
      }
      text?: {
        maxLines: 3
        fontSize: 'var(--text-base)'
      }
    }
  }
  interactions: {
    likes: number
    comments: number
    shares: number
  }
}
```

## Engagement Features

### Like Button
```typescript
interface LikeButton {
  appearance: {
    size: '32px'
    color: 'var(--text-secondary)'
    activeColor: 'var(--primary)'
  }
  animation: {
    scale: [1, 1.2, 1]
    duration: '300ms'
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
  counter: {
    fontSize: 'var(--text-sm)'
    color: 'var(--text-secondary)'
  }
}
```

### Comments Section
```typescript
interface Comments {
  layout: {
    maxHeight: '300px'
    overflow: 'auto'
    padding: 'var(--spacing-4)'
  }
  input: {
    height: '40px'
    placeholder: 'Add a comment...'
    avatar: {
      size: '32px'
      position: 'left'
    }
  }
  comment: {
    layout: {
      display: 'flex'
      gap: 'var(--spacing-3)'
      marginBottom: 'var(--spacing-3)'
    }
    avatar: {
      size: '32px'
      borderRadius: '50%'
    }
    content: {
      background: 'var(--surface-hover)'
      padding: 'var(--spacing-2) var(--spacing-3)'
      borderRadius: 'var(--radius-lg)'
    }
  }
}
```

## Empty States

### No Activity
```typescript
interface EmptyState {
  layout: {
    padding: 'var(--spacing-8)'
    textAlign: 'center'
  }
  content: {
    icon: '🌊'
    title: 'No Activity Yet'
    message: 'Be the first to share a location!'
    action: {
      label: 'Add Location'
      route: '/contribute'
    }
  }
}
```

## Loading States

### Skeleton Loading
```typescript
interface LoadingState {
  featured: {
    cards: 3
    animation: 'pulse'
    duration: '1.5s'
  }
  activity: {
    items: 5
    components: {
      avatar: {
        width: '40px'
        height: '40px'
        borderRadius: '50%'
      }
      content: {
        lines: 3
        width: ['100%', '80%', '60%']
      }
    }
  }
}
```

## Error States

### Error Display
```typescript
interface ErrorState {
  layout: {
    padding: 'var(--spacing-8)'
    textAlign: 'center'
    color: 'var(--error)'
  }
  content: {
    icon: 'warning'
    title: 'Failed to Load'
    message: string
    action: {
      label: 'Try Again'
      onClick: () => void
    }
  }
}
```

## Mobile Optimization

### Responsive Layout
```typescript
interface MobileLayout {
  featured: {
    card: {
      width: '85vw'
      height: 'auto'
      margin: '0 var(--spacing-2)'
    }
  }
  activity: {
    padding: 'var(--spacing-2)'
    card: {
      padding: 'var(--spacing-3)'
      gap: 'var(--spacing-3)'
    }
  }
  interactions: {
    touchTargets: {
      minSize: '44px'
      spacing: 'var(--spacing-4)'
    }
  }
}
