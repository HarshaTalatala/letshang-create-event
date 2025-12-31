import CapacityModule from './modules/CapacityModule';
import GalleryModule from './modules/GalleryModule';
import LinksModule from './modules/LinksModule';
import PrivacyModule from './modules/PrivacyModule';

// Small renderer that maps a config-driven `module.type` to the concrete component.
// This keeps the UI data-driven: adding/removing modules is handled by config rather than changing callers.
function ModuleRenderer({ module }) {
  switch (module.type) {
    case 'capacity':
      return <CapacityModule />;
    case 'gallery':
      return <GalleryModule />;
    case 'links':
      return <LinksModule />;
    case 'privacy':
      return <PrivacyModule />;
    default:
      return null;
  }
}

export default ModuleRenderer;
