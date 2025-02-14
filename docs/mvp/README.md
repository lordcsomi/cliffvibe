# CliffVibe MVP Documentation

## Overview
CliffVibe MVP provides a streamlined platform for discovering and sharing cliff jumping locations with a focus on three main tabs: Explore, Contribute, and Community. The application features Firebase authentication, a map-centric interface, and essential social features.

## Core Features

### Authentication
- Google Sign-In integration
- User profile management
- Customizable profile pictures
- Unit preferences
- Theme settings

### Explore Tab
- Full-screen map interface
- Bottom sheet location list
- Dynamic location filtering
- Map controls (desktop)
- Location details view

### Contribute Tab
- Comprehensive location submission
  * Base location information
  * Multiple jump points support
  * Multi-view system (Water, Top, Satellite)
  * Detailed measurements
  * Access information
  * Safety details
- Media management
  * Multiple photo uploads
  * Purpose categorization
  * Metadata handling
- Advanced validation
  * EU bounds checking
  * Required measurements
  * Safety verification

### Community Tab
- Featured locations carousel
- Recent activity feed
- Social interactions
- Comments and likes
- User engagement features

## Documentation Structure

### Layout & Theme
- [Layout Structure](layout.md) - Base application layout and navigation
- [Theme Guidelines](theme.md) - Color system, typography, and styling
- [UI Components](components.md) - Reusable interface components

### Feature Documentation
- [Auth System](auth.md) - Authentication and user management
- [Explore Tab](explore-tab.md) - Map and location discovery
- [Contribute Tab](contribute-tab.md) - Location and jump point submission
- [Community Tab](community-tab.md) - Social features
- [Profile & Settings](profile.md) - User preferences and profile management

## Technical Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Mapbox GL JS
- Firebase Auth

### State Management
- React Context for auth
- Zustand for app state
- React Query for data fetching

### Styling
- Tailwind CSS
- CSS Variables
- shadcn/ui components

## Development Standards

### File Structure
```
src/
├── app/                    # Next.js app router
│   ├── explore/           # Explore tab
│   ├── contribute/        # Contribute tab
│   └── community/         # Community tab
├── components/            # Shared components
├── lib/                   # Utilities
└── styles/               # Global styles
```

### Coding Standards
- TypeScript for type safety
- Component-based architecture
- Mobile-first responsive design
- Consistent naming conventions
- Reusable component patterns

### Design Principles
- Clean, minimal interface
- Consistent spacing
- Clear visual hierarchy
- Responsive layouts
- Smooth animations
- Accessible design

## Getting Started

1. Clone the repository
2. Install dependencies
3. Set up Firebase configuration
4. Add Mapbox API key
5. Run the development server

## Next Steps
- [ ] Complete Firebase setup
- [ ] Implement base layout
- [ ] Add authentication
- [ ] Create map interface
- [ ] Build location submission
- [ ] Set up community features
