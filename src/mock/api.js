// Lightweight mock API boundary for the app.
// Purpose: provide a single place to fetch "backend" data so the UI
// depends on functions rather than raw module files.
// This makes swapping to a real backend trivial (replace implementations
// with fetch()/axios calls; the UI code does not need to change).

import { eventConfig, customizationOptions } from './eventConfig';

// Returns the available modules (e.g., capacity, gallery, links, privacy).
// Kept synchronous to avoid changing callers; callers can also wrap in Promise.resolve if desired.
export function fetchAvailableModules() {
  return eventConfig.modulesAvailable;
}

// Returns initial config used by the UI (currently only customization options).
// Keeping the shape extensible so we can add more fields later without changing call sites.
export function fetchInitialEventConfig() {
  return {
    customizationOptions,
    eventConfig, // exposed for convenience; callers should prefer dedicated helpers above
  };
}
