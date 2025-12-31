function GalleryModule() {
  return (
    <div className="space-y-2">
      <h4 className="text-base font-semibold text-gray-900">Gallery</h4>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-16 bg-gray-100 border border-dashed border-gray-300 rounded-md"
          />
        ))}
      </div>
    </div>
  );
}

export default GalleryModule;
