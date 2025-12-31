import CapacityModule from './modules/CapacityModule';
import GalleryModule from './modules/GalleryModule';
import LinksModule from './modules/LinksModule';
import PrivacyModule from './modules/PrivacyModule';

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
