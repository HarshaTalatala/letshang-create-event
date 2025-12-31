function GalleryModule() {
  return (
    <div className="space-y-2 text-gray-100">
      <h4 className="text-base font-semibold">Gallery</h4>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-16 bg-white/5 border border-white/10 rounded-md"
          />
        ))}
      </div>
    </div>
  );
}

export default GalleryModule;
