const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export const FilePreview = ({
  file,
  onRemove,
}: {
  file: any;
  onRemove?: () => void;
}) => {
  const isUploaded = Boolean(file.file_url);
  const isImage = isUploaded
    ? file.file_url.match(/\.(jpg|jpeg|png)$/i)
    : file.type.startsWith('image/');
  const fileUrl = isUploaded
    ? `${BACKEND_URL}/${file.file_url.replace(/\\/g, '/')}`
    : URL.createObjectURL(file);

  return (
    <div className="relative flex items-center p-2 pr-8 border rounded-lg shadow-md bg-white">
      {isImage ? (
        <img
          src={fileUrl}
          alt={file.name}
          className="w-12 h-12 object-cover rounded-lg"
        />
      ) : (
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg">
            📄
          </div>
        </div>
      )}
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-500 underline ml-3"
      >
        <p className="text-sm font-medium">{file.name}</p>
      </a>
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
        >
          ❌
        </button>
      )}
    </div>
  );
};
