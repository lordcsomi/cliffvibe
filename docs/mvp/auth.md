# Authentication System

## Overview
CliffVibe MVP uses Firebase Authentication for user management, focusing on Google Sign-In as the primary authentication method.

## Firebase Configuration

### Setup
```typescript
interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}
```

### Auth Methods
- Google Authentication (Primary)
- Email/Password (Future expansion)

## User Profile Structure
```typescript
interface UserProfile {
  // Firebase Auth Data
  uid: string
  email: string
  displayName: string
  photoURL: string
  providerId: 'google.com'
  
  // Additional Profile Data
  profile: {
    customPhoto?: string     // Override Google photo
    preferences: {
      heightUnit: 'meters' | 'feet'
      windSpeed: 'kmh' | 'mph'
      temperature: 'celsius' | 'fahrenheit'
    }
    lastLogin: Date
    createdAt: Date
  }
}
```

## Authentication Flow

### Google Sign-In
1. User clicks "Sign in with Google"
2. Google OAuth popup opens
3. User selects account
4. On success:
   - Create/update user profile
   - Import Google profile picture
   - Set default preferences
   - Redirect to Explore tab

```typescript
interface AuthState {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  user: UserProfile | null
  error?: string
}
```

## Profile Picture Management

### Image Sources
```typescript
interface ProfileImage {
  google: {
    url: string
    lastSync: Date
  }
  custom?: {
    url: string
    uploadDate: Date
    storageRef: string
  }
}
```

### Image Upload Process
1. User selects image
2. Client-side validation:
   - Max size: 5MB
   - Formats: jpg, png, webp
   - Dimensions: 200px - 2048px
3. Upload to Firebase Storage
4. Update profile with new image URL

## Protected Routes

### Route Protection
```typescript
interface RouteGuard {
  public: string[]     // ['/login', '/about']
  protected: string[]  // ['/explore', '/contribute', '/community']
  redirects: {
    unauthenticated: '/login'
    authenticated: '/explore'
  }
}
```

## UI Components

### Sign-In Button
```typescript
interface SignInButton {
  appearance: {
    variant: 'contained'
    color: 'white'
    height: '40px'
    padding: '0 16px'
    borderRadius: '20px'
  }
  content: {
    icon: 'google'
    text: 'Continue with Google'
    spacing: '8px'
  }
  states: {
    hover: { opacity: 0.9 }
    active: { transform: 'scale(0.98)' }
    loading: { opacity: 0.7 }
  }
}
```

## Error Handling

### Authentication Errors
```typescript
interface AuthError {
  type: 'sign_in' | 'sign_out' | 'session' | 'profile'
  code: string
  message: string
  retry?: boolean
  action?: 'reload' | 'reset' | 'contact_support'
}
```

### Error UI
- Clear error messages
- Retry options when applicable
- Graceful fallbacks
- Support contact for persistent issues

## Session Management

### Session Behavior
- Persistent session across page reloads
- Auto sign-in if session exists
- Graceful session expiry handling
- Cross-tab session sync

### Sign Out Process
1. Clear Firebase auth
2. Clear local storage
3. Reset application state
4. Redirect to public route

## Security Considerations

### Data Access
- Firestore rules for user data
- Storage rules for profile pictures
- Rate limiting for authentication attempts
- Session token refresh handling

### Privacy
- Minimum required Google permissions
- Clear data usage explanations
- Option to delete account
- GDPR compliance considerations
