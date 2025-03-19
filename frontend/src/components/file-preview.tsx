export const FilePreview = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => {
  const isImage = file.type.startsWith('image/');
  return (
    <div className="relative flex items-center p-2 pr-8 border rounded-lg shadow-md bg-white">
      {isImage ? (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-12 h-12 object-cover rounded-lg"
        />
      ) : (
        <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg">
          📄
        </div>
      )}
      <div className="ml-3">
        <p className="text-sm font-medium">{file.name}</p>
        <p className="text-xs text-gray-500">{file.type}</p>
      </div>
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
      >
        ❌
      </button>
    </div>
  );
};
