import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false); // Close dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option: string) => {
    console.log('Selected:', option);
    setDropdownOpen(false);
  };

  return (
    <div className="p-4 lg:p-8 border-t-2 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex gap-3 relative">
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
                  <button
                    onClick={() => handleOptionClick('SharePoint')}
                    className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    SharePoint
                  </button>
                </div>
              )}
            </div>
            <Icon
              className="text-gray-500 cursor-pointer"
              icon="icon-park-outline:voice"
              width="24"
              height="24"
            />
          </div>
          <form
            onSubmit={onSubmit}
            className="flex flex-1 items-center relative"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              className="w-full text-lg py-4 pl-6 pr-20 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Input your message"
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
    </div>
  );
};
