# LetsHang Create Event Prototype

A desktop-focused prototype demonstrating structure and architecture for a "Create Event" page. This project prioritizes explainability and judicious design decisions over feature completeness.

## Project Overview

Built with React, Vite, and Tailwind CSS, this prototype implements a modular, config-driven approach to event creation. The UI is function-driven rather than configuration-driven, with a clear separation between presentation logic and backend concerns.

**Tech Stack:**
- React 19
- Vite 7
- Tailwind CSS 3
- react-datepicker for date/time selection

## Architecture Overview

### Component Structure

**CreateEventPage.jsx** - Orchestration layer that composes the create event experience. Manages form state and coordinates between basic form inputs, dynamic modules, and customization features.

**ModuleRenderer** - Generic component that maps module type identifiers to their corresponding implementations. Enables dynamic, config-driven rendering of event modules.

**Dynamic Modules** - Self-contained components for specific event features:
- `CapacityModule` - Guest capacity settings
- `GalleryModule` - Event photo gallery
- `LinksModule` - External links and resources
- `PrivacyModule` - Privacy and visibility controls

**Supporting Components:**
- `BasicEventForm` - Core event details (name, date, location)
- `DateTimePicker` - Date and time selection
- `BackgroundSelector` - Event background customization
- `FlyerUploader` - Event flyer upload interface
- `CustomizeModal` - Customization options overlay

### Config-Driven Design

Module availability and behavior are controlled through configuration objects defined in `src/mock/eventConfig.js`. The UI consumes these configurations through functions exposed by the mock API layer, not by directly importing config files.

## Mock Backend Boundary

All backend interactions are isolated behind `src/mock/api.js`. This file defines the contract between UI and backend.

**Current Mock Functions:**
- `fetchEventModules()` - Returns available module configurations
- `fetchEventDefaults()` - Returns default event settings
- Additional utility functions as needed

**Key Architectural Principle:**

Replacing the mock backend with a real API requires changes **only within** `src/mock/api.js`. The rest of the application depends on the interface, not the implementation.

The mock implementation:
- Returns realistic data structures
- Simulates async behavior where appropriate
- Defines clear function signatures that a real backend would implement

## Running Locally

**Prerequisites:**
- Node.js (v16 or higher recommended)
- npm or equivalent package manager

**Setup:**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).


## Next Steps

Reasonable extensions for this prototype:
- Connect to a real backend API
- Implement form validation and error states
- Add loading and submission states
- Extend module types
- Add mobile responsiveness
