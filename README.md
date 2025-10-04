# MyFirstApp - React Native Calendar App

A modular React Native calendar application with custom day rendering, modal forms, and collapsible sections.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Calendar/        # Calendar-related components
│   │   ├── CalendarView.js          # Main calendar wrapper
│   │   ├── CustomDayComponent.js    # Custom day cell rendering
│   │   └── CalendarStyles.js        # Calendar-specific styles
│   └── Modal/           # Modal-related components
│       ├── DateModal.js             # Main modal component
│       ├── CollapsibleCard.js       # Reusable collapsible card
│       └── ModalStyles.js           # Modal-specific styles
├── hooks/               # Custom React hooks
│   ├── useCalendarState.js          # Calendar state management
│   ├── useModalState.js             # Modal state management
│   └── useFormState.js              # Form/card state management
└── utils/               # Utility functions and constants
    ├── constants.js                 # App-wide constants
    └── dateUtils.js                 # Date utility functions
```

## Features

### Calendar
- Custom day rendering with outline selection
- Multiple mark types (dots, single marks)
- Long press to open modal
- Swipe gestures for month navigation

### Modal System
- Long press any date to open detailed modal
- Collapsible form sections with "keep open" functionality
- Four main sections:
  - **Cycle Basics** (default expanded)
  - **Physical Symptoms**
  - **Intimacy**
  - **Fertility Data**

### State Management
- **useCalendarState**: Manages selected dates and calendar marks
- **useModalState**: Handles modal visibility and selected date
- **useFormState**: Manages collapsible card states with persistence

## Key Components

### CalendarView
Main calendar component that wraps the react-native-calendars library with custom styling and day components.

### DateModal
Modal component that displays date details and collapsible form sections.

### CollapsibleCard
Reusable card component with:
- Expandable/collapsible content
- "Keep open" toggle switch
- Customizable title and subtitle

## Custom Hooks

### useCalendarState
```javascript
const { selected, marks, handleDayPress, clearSelection } = useCalendarState();
```
- Manages selected date state
- Provides calendar marks with custom styling
- Handles day press events

### useModalState
```javascript
const { modalVisible, modalDate, openModal, closeModal } = useModalState();
```
- Controls modal visibility
- Manages selected date for modal
- Provides open/close functions

### useFormState
```javascript
const { cards, handleCardToggle, togglePinOpen } = useFormState();
```
- Manages collapsible card states
- Persists state across modal sessions
- Handles card expansion and pinning

## Styling System

The app uses a centralized design system defined in `src/utils/constants.js`:

- **Colors**: Primary, secondary, text, background colors
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, xxl)
- **Typography**: Font sizes and weights
- **Border Radius**: Consistent corner radius values
- **Gesture Thresholds**: Touch interaction constants

## Development

### Running the App
```bash
npm start
# or
yarn start
```

### Key Dependencies
- `react-native-calendars`: Calendar component library
- `react-native-gesture-handler`: Gesture handling
- `react-native-safe-area-context`: Safe area handling

## Architecture Benefits

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused across the app
3. **Maintainability**: Clear separation of concerns
4. **Testability**: Isolated components and hooks are easier to test
5. **Scalability**: Easy to add new features without affecting existing code

## State Persistence

The form state persists across modal sessions, ensuring user preferences for card expansion and pinning are maintained throughout the app session.
