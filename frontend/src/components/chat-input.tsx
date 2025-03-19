import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { FilePreview } from './file-preview';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  selectedFiles: File[];
  onInputChange: (value: string) => void;
  onFileChange: (files: File[]) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  isLoading,
  selectedFiles,
  onInputChange,
  onFileChange,
  onSubmit,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleGoogleDriveUpload = () => {
    console.log('Google Drive upload triggered!');
  };

  const handleOptionClick = (option: string) => {
    if (option === 'Local Files') {
      fileInputRef.current?.click();
    } else if (option === 'Google Drive') {
      handleGoogleDriveUpload();
    }
    setDropdownOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      onFileChange([...selectedFiles, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    onFileChange(selectedFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 lg:p-8 border-t-2 bg-white">
      <div className="container mx-auto">
        <div className="mb-2">
          {selectedFiles?.length > 0 && (
            <div className="flex gap-2 items-center bg-white px-2 py-1 rounded-lg shadow-sm">
              {selectedFiles.map((file, index) => (
                <FilePreview
                  key={index}
                  file={file}
                  onRemove={() => removeFile(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="gsp-3 flex relative">
            <div>
              <Icon
                className="text-gray-500 cursor-pointer"
                icon="ix:attachment-upload"
                width="24"
                height="24"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute -left-[4rem] top-[-140px] mt-1 w-36 bg-white border rounded-md shadow-md z-10"
                >
                  <button
                    onClick={() => handleOptionClick('Local Files')}
                    className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    Local Files
                  </button>
                  <button
                    onClick={() => handleOptionClick('Google Drive')}
                    className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    Google Drive
                  </button>
                </div>
              )}
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="flex items-center relative w-full"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              className="w-full text-lg py-4 pl-6 pr-20 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || input.trim() === ''}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center disabled:bg-gray-400"
            >
              <Icon icon="fluent:send-48-regular" className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
