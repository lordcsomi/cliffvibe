# CliffVibe Jumping Styles & Techniques Guide

## MVP Implementation

### Phase 1: Essential Styles
```typescript
interface MVPStyles {
  basic: {
    pencil: {
      name: 'Pencil Jump'
      description: 'Basic vertical entry'
      difficulty: 1
      safety: 'High'
      requirements: ['Basic swimming', 'Height comfort']
    },
    døds: {
      name: 'Classic Døds'
      description: 'Basic spread eagle position'
      difficulty: 2
      safety: 'Medium'
      requirements: ['Swimming ability', 'Basic body control']
    }
  }
  safety: {
    heightLimits: {
      beginner: '3-5m',
      intermediate: '5-10m'
    },
    requirements: [
      'Water depth verification',
      'Basic safety check',
      'Spotter present'
    ]
  }
  training: {
    progression: [
      'Water entry practice',
      'Form maintenance',
      'Height acclimation',
      'Safety protocols'
    ]
  }
}
```

### Initial Features
- Basic style guides
- Safety requirements
- Simple progression tracking
- Essential documentation
- Beginner tutorials

## Overview
Comprehensive guide to different jumping and diving styles, with focus on technique, safety, and progression paths.

## Core Styles

### Døds (Death Diving)
```typescript
interface DødsStyle {
  origin: 'Norway'
  description: 'Extreme diving style holding spread eagle position as long as possible'
  positions: {
    classic: {
      name: 'Classic Døds'
      description: 'Full spread eagle position'
      technique: [
        'Arms and legs fully extended',
        'Form X shape in air',
        'Hold until last moment',
        'Tuck for water entry'
      ]
      difficulty: 4
    },
    halfInHalfOut: {
      name: 'Half-in Half-out'
      description: 'Combination of tucked and spread positions'
      technique: [
        'Start in spread position',
        'Transition to tuck',
        'Return to spread',
        'Final tuck for entry'
      ]
      difficulty: 5
    },
    shrimp: {
      name: 'The Shrimp'
      description: 'Advanced position with curved back'
      technique: [
        'Arch back in spread position',
        'Maintain curve through flight',
        'Precise timing for entry',
        'Advanced body control'
      ]
      difficulty: 5
    }
  }
  competitions: {
    standard: {
      height: 10,      // meters
      scoring: [
        'Form maintenance',
        'Time in position',
        'Entry quality',
        'Overall style'
      ]
    }
  }
}
```

### High Diving
```typescript
interface HighDivingStyle {
  categories: {
    straight: {
      name: 'Straight Dive'
      description: 'Classic straight body position'
      keyPoints: [
        'Vertical alignment',
        'Extended body',
        'Clean entry'
      ]
    },
    pike: {
      name: 'Pike Dive'
      description: 'Bent at hips, straight legs'
      keyPoints: [
        'Hip flexion',
        'Leg extension',
        'Timing control'
      ]
    },
    tuck: {
      name: 'Tuck Dive'
      description: 'Compact ball position'
      keyPoints: [
        'Tight grouping',
        'Fast rotation',
        'Quick opening'
      ]
    }
  }
  rotations: {
    forward: string[]
    backward: string[]
    inward: string[]
    reverse: string[]
    twisting: string[]
  }
}
```

### Cliff Diving
```typescript
interface CliffDivingStyle {
  techniques: {
    basic: {
      pencil: {
        description: 'Vertical entry, minimal movement'
        safety: 'High'
        recommended: 'New jumpers'
      },
      tuck: {
        description: 'Compact rotation style'
        safety: 'High'
        recommended: 'Basic rotations'
      }
    },
    intermediate: {
      pike: {
        description: 'Bent at hips style'
        safety: 'Medium'
        recommended: 'Controlled rotations'
      },
      layout: {
        description: 'Straight body rotation'
        safety: 'Medium'
        recommended: 'Advanced control'
      }
    },
    advanced: {
      twisting: {
        description: 'Rotations with twists'
        safety: 'Low'
        recommended: 'Expert only'
      },
      freestyle: {
        description: 'Creative combinations'
        safety: 'Low'
        recommended: 'Expert only'
      }
    }
  }
}
```

## Safety Guidelines

### Height-Based Recommendations
```typescript
interface HeightGuidelines {
  beginner: {
    range: '3-5m'
    styles: string[]
    requirements: string[]
  }
  intermediate: {
    range: '5-10m'
    styles: string[]
    requirements: string[]
  }
  advanced: {
    range: '10-15m'
    styles: string[]
    requirements: string[]
  }
  expert: {
    range: '15m+'
    styles: string[]
    requirements: string[]
  }
}
```

### Style-Specific Safety
```typescript
interface StyleSafety {
  requirements: {
    physical: string[]
    skill: string[]
    conditions: string[]
  }
  risks: {
    entry: string[]
    rotation: string[]
    height: string[]
  }
  precautions: {
    preparation: string[]
    execution: string[]
    recovery: string[]
  }
}
```

## Training Progression

### Skill Development
```typescript
interface ProgressionPath {
  levels: {
    beginner: {
      skills: string[]
      drills: string[]
      goals: string[]
    }
    intermediate: {
      skills: string[]
      drills: string[]
      goals: string[]
    }
    advanced: {
      skills: string[]
      drills: string[]
      goals: string[]
    }
    expert: {
      skills: string[]
      drills: string[]
      goals: string[]
    }
  }
  assessments: {
    criteria: string[]
    benchmarks: Record<string, number>
    certification: string[]
  }
}
```

### Training Modules
```typescript
interface TrainingModule {
  basic: {
    waterEntry: boolean
    bodyControl: boolean
    spotting: boolean
    safety: boolean
  }
  intermediate: {
    rotations: boolean
    combinations: boolean
    technique: boolean
    awareness: boolean
  }
  advanced: {
    complex: boolean
    freestyle: boolean
    competition: boolean
    coaching: boolean
  }
  specialization: {
    døds: boolean
    highDiving: boolean
    cliff: boolean
    show: boolean
  }
}
```

## Style Documentation

### Video Tutorials
```typescript
interface StyleTutorial {
  style: string
  difficulty: number
  videos: Array<{
    title: string
    url: string
    duration: number
    keyPoints: string[]
  }>
  progression: {
    prerequisites: string[]
    steps: string[]
    practice: string[]
  }
}
```

### Technique Analysis
```typescript
interface TechniqueAnalysis {
  preparation: {
    stance: string
    mental: string[]
    physical: string[]
  }
  execution: {
    keyFrames: string[]
    common_errors: string[]
    corrections: string[]
  }
  entry: {
    position: string
    timing: string
    depth: string
  }
}
```

## Competition Integration

### Style Categories
```typescript
interface CompetitionStyles {
  døds: {
    rules: string[]
    scoring: string[]
    variations: string[]
  }
  technical: {
    rules: string[]
    scoring: string[]
    difficulties: Record<string, number>
  }
  freestyle: {
    rules: string[]
    scoring: string[]
    bonus: string[]
  }
}
```

### Scoring Criteria
```typescript
interface StyleScoring {
  execution: {
    form: number
    control: number
    entry: number
  }
  difficulty: {
    base: number
    multipliers: Record<string, number>
    bonuses: Record<string, number>
  }
  presentation: {
    creativity: number
    flow: number
    impact: number
  }
}
```

## Related Documentation
- [Competition Management](../competitions/competitions.md)
- [Safety Guidelines](../safety/conditions.md)
- [Training Programs](../onboarding/progression.md)
- [User Profiles](../social/profiles.md)
