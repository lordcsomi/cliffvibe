# CliffVibe Frontend Development Guide

## Tech Stack Overview

### Core Technologies
```typescript
interface FrontendStack {
  framework: 'Next.js 14',
  language: 'TypeScript 5',
  styling: 'Tailwind CSS',
  components: 'shadcn/ui',
  stateManagement: 'Zustand',
  dataFetching: 'React Query'
}
```

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Auth routes
│   ├── dashboard/         # User dashboard
│   ├── locations/         # Location pages
│   └── competitions/      # Competition pages
├── components/            # React components
│   ├── ui/               # UI components
│   ├── map/              # Map components
│   ├── forms/            # Form components
│   └── shared/           # Shared components
├── lib/                   # Utility functions
│   ├── utils/            # Helper functions
│   ├── hooks/            # Custom hooks
│   └── constants/        # Constants
├── styles/               # Global styles
└── types/                # TypeScript types
```

## Component Guidelines

### Component Structure
```typescript
// components/locations/LocationCard.tsx
interface LocationCardProps {
  location: Location
  onSelect?: (id: string) => void
  className?: string
}

export function LocationCard({
  location,
  onSelect,
  className
}: LocationCardProps) {
  return (
    <div className={cn('rounded-lg p-4', className)}>
      {/* Component content */}
    </div>
  )
}
```

### Styling Approach
```typescript
// Using Tailwind with shadcn/ui
interface StyleGuide {
  utility: 'Tailwind CSS',
  components: 'shadcn/ui',
  customization: {
    theme: 'tailwind.config.ts',
    components: '@/components/ui'
  }
}
```

## State Management

### Zustand Store
```typescript
// stores/useLocationStore.ts
interface LocationStore {
  locations: Location[]
  selected: string | null
  filters: LocationFilter
  actions: {
    setLocations: (locations: Location[]) => void
    selectLocation: (id: string) => void
    updateFilters: (filters: Partial<LocationFilter>) => void
  }
}

export const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  selected: null,
  filters: defaultFilters,
  actions: {
    setLocations: (locations) => set({ locations }),
    selectLocation: (id) => set({ selected: id }),
    updateFilters: (filters) => set((state) => ({
      filters: { ...state.filters, ...filters }
    }))
  }
}))
```

## Data Fetching

### API Integration
```typescript
// lib/api/locations.ts
export const locationApi = {
  getAll: async (params: LocationParams) => {
    const response = await fetch('/api/locations?' + 
      new URLSearchParams(params))
    return response.json()
  },
  
  getById: async (id: string) => {
    const response = await fetch(`/api/locations/${id}`)
    return response.json()
  }
}

// Usage with React Query
export function useLocations(params: LocationParams) {
  return useQuery({
    queryKey: ['locations', params],
    queryFn: () => locationApi.getAll(params)
  })
}
```

## Form Handling

### Form Components
```typescript
// components/forms/LocationForm.tsx
interface LocationFormProps {
  initialData?: Partial<Location>
  onSubmit: (data: LocationFormData) => Promise<void>
}

export function LocationForm({ initialData, onSubmit }: LocationFormProps) {
  const form = useForm<LocationFormData>({
    defaultValues: initialData,
    resolver: zodResolver(locationSchema)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  )
}
```

## Map Integration

### Mapbox Setup
```typescript
// components/map/MapView.tsx
interface MapViewProps {
  initialCenter: [number, number]
  zoom: number
  markers?: MapMarker[]
}

export function MapView({ initialCenter, zoom, markers }: MapViewProps) {
  return (
    <Map
      initialViewState={{
        longitude: initialCenter[0],
        latitude: initialCenter[1],
        zoom
      }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
    >
      {markers?.map(marker => (
        <Marker key={marker.id} {...marker} />
      ))}
    </Map>
  )
}
```

## Performance Optimization

### Image Optimization
```typescript
// components/shared/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      className="object-cover"
    />
  )
}
```

## Error Handling

### Error Boundary
```typescript
// components/shared/ErrorBoundary.tsx
interface ErrorBoundaryProps {
  fallback: React.ReactNode
  children: React.ReactNode
}

export function ErrorBoundary({ fallback, children }: ErrorBoundaryProps) {
  return (
    <ErrorBoundaryComponent
      fallback={fallback}
      onError={(error) => {
        // Log to error tracking service
        console.error(error)
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
```

## Testing

### Component Testing
```typescript
// __tests__/components/LocationCard.test.tsx
describe('LocationCard', () => {
  it('renders location details correctly', () => {
    render(<LocationCard location={mockLocation} />)
    
    expect(screen.getByText(mockLocation.name)).toBeInTheDocument()
    expect(screen.getByText(mockLocation.type)).toBeInTheDocument()
  })

  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn()
    render(<LocationCard location={mockLocation} onSelect={onSelect} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith(mockLocation.id)
  })
})
```

## Development Workflow

### Getting Started
```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Check types
pnpm type-check

# Lint code
pnpm lint
```

### Best Practices
1. Use TypeScript for all new components
2. Follow component structure guidelines
3. Write tests for critical components
4. Optimize images and loading states
5. Use error boundaries for critical sections
6. Follow accessibility guidelines

## Deployment

### Build Process
```bash
# Create production build
pnpm build

# Analyze bundle
pnpm analyze

# Test production build
pnpm start
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
NEXT_PUBLIC_API_URL=api_url
NEXT_PUBLIC_SUPABASE_URL=supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key
```

## Next Steps
1. [Component Library Documentation](./components/README.md)
2. [State Management Guide](./state/README.md)
3. [API Integration Guide](./api/README.md)
4. [Testing Strategy](./testing/README.md)
